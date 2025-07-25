const fs = require('fs');
const yaml = require('js-yaml');
let rules = [];

function matchesRule(player, rule) {
  const cond = rule.conditions;

  if (cond.level && player.level < cond.level.min) return false;
  if (cond.spend_tier && player.spend_tier !== cond.spend_tier) return false;
  if (cond.country && !cond.country.includes(player.country)) return false;
  if (cond.days_since_last_purchase && player.days_since_last_purchase < cond.days_since_last_purchase.min) return false;

  return true;
}

module.exports = {
  init: async () => {
    await module.exports.reloadRules();
  },
  evaluate: (player) => {
    for (const rule of rules) {
      if (matchesRule(player, rule)) return rule.promotion;
    }
    return null;
  },
  reloadRules: async () => {
    const content = fs.readFileSync('./rules/rules.yaml', 'utf8');
    rules = yaml.load(content).rules;
  }
};
