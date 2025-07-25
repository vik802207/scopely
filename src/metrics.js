let total = 0;
let hits = 0;
let misses = 0;
let totalLatency = 0;

module.exports = {
  recordEvaluation: (latency, hit) => {
    total++;
    totalLatency += latency;
    hit ? hits++ : misses++;
  },
  getStats: () => ({
    total_evaluations: total,
    hits,
    misses,
    avg_latency_ms: total ? (totalLatency / total).toFixed(2) : 0
  })
};
