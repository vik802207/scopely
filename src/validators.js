function validatePlayerPayload(player) {
  if (typeof player.level !== 'number') throw new Error('Invalid or missing level');
  if (!['low', 'medium', 'high'].includes(player.spend_tier)) throw new Error('Invalid spend_tier');
  if (typeof player.country !== 'string') throw new Error('Invalid or missing country');
  if (typeof player.days_since_last_purchase !== 'number') throw new Error('Invalid days_since_last_purchase');
}

module.exports = {
  validatePlayerPayload
};
