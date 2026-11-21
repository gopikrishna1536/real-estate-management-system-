import test from 'node:test';
import assert from 'node:assert/strict';
import { HoaFeeDistributor } from '../src/utils/hoaFeeDistributor.js';

test('HOA Fee Distributor Tests', async (t) => {
  await t.test('should allocate CAM expenses proportional to unit square footage', () => {
    const units = [
      { unitId: '101', squareFootage: 1000 },
      { unitId: '102', squareFootage: 1500 }
    ];
    // Total 2500 sqft: Unit 101 is 40% ($400), Unit 102 is 60% ($600)
    const res = HoaFeeDistributor.distributeExpenses(1000, units);
    assert.equal(res.unitFees[0].monthlyFee, 400);
    assert.equal(res.unitFees[1].monthlyFee, 600);
  });
});
