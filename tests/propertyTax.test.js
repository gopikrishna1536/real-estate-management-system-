import test from 'node:test';
import assert from 'node:assert/strict';
import { PropertyTaxEstimator } from '../src/utils/propertyTaxEstimator.js';

test('Property Tax Estimator Tests', async (t) => {
  await t.test('should calculate UAV property tax accurately', () => {
    // 1000 sqft * 10 rate = 10,000 UAV -> 15% tax ($1,500) + 5% cess ($75) = $1,575
    const res = PropertyTaxEstimator.computeTax(1000, 10.0, 1.0, 1.0, 1.0);
    assert.equal(res.unitAreaValue, 10000);
    assert.equal(res.totalAnnualTax, 1575);
  });
});
