// test/engine.test.js
const engine = require('../src/promotionEngine');

describe("Promotion Engine", () => {
  beforeAll(async () => {
    await engine.init();
  });

  it("should return promotion for matching rule", () => {
    const player = { level: 15, spend_tier: "high", country: "US", days_since_last_purchase: 5 };
    const promo = engine.evaluate(player);
    expect(promo).not.toBeNull();
    expect(promo.id).toBe("promo_50off");
  });

  it("should return null if no rule matches", () => {
    const player = { level: 1, spend_tier: "low", country: "FR", days_since_last_purchase: 2 };
    const promo = engine.evaluate(player);
    expect(promo).toBeNull();
  });
});
