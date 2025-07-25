const express = require('express');
const bodyParser = require('body-parser');
const promotionEngine = require('./promotionEngine');
const metrics = require('./metrics');
const { validatePlayerPayload } = require('./validators');

const app = express();
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send("Backend is Running");
})

app.post('/promotion', (req, res) => {
  const start = Date.now();
  try {
    validatePlayerPayload(req.body);
    const result = promotionEngine.evaluate(req.body);
    metrics.recordEvaluation(Date.now() - start, !!result);
    res.json(result || null);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/reload-rules', (req, res) => {
  try {
    promotionEngine.reloadRules();
    res.json({ message: 'Rules reloaded successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reload rules' });
  }
});
app.post('/evaluate', (req, res) => {
  const playerData = req.body;

  try {
    const result = evaluatePlayer(playerData);
    metrics.totalRequests++;
    metrics.successfulEvaluations++;
    res.json(result);
  } catch (err) {
    metrics.failedEvaluations++;
    res.status(400).json({ error: err.message });
  }
});

app.get('/metrics', (req, res) => {
  res.json(metrics.getStats());
});

promotionEngine.init();

app.listen(3000, () => {
  console.log('🚀 Promotion Rule Engine running on port 3000');
});