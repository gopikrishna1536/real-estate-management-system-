import test from 'node:test';
import assert from 'node:assert/strict';
import { EnergyEfficiencyRating } from '../src/utils/energyEfficiencyRating.js';

test('Energy Efficiency Rating Tests', async (t) => {
  await t.test('should classify high-efficiency low-EUI structure as Platinum', () => {
    // 50,000 kWh (~170k kBtu) + 500 Therms (~50k kBtu) across 10,000 sqft -> EUI ~22 kBtu/sqft
    const res = EnergyEfficiencyRating.evaluateBuilding(50000, 500, 10000);
    assert.equal(res.energyStarTier, 'Platinum');
    assert.equal(res.estimatedGreenTaxRebate, 25000);
  });
});
