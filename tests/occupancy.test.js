import test from 'node:test';
import assert from 'node:assert/strict';
import { OccupancyRateAnalytics } from '../src/utils/occupancyRateAnalytics.js';

test('Occupancy Rate Analytics Tests', async (t) => {
  await t.test('should calculate physical and economic occupancy alongside WALE', () => {
    const leases = [
      { squareFootage: 1000, isOccupied: true, potentialMonthlyRent: 2000, actualMonthlyRent: 2000, remainingLeaseMonths: 24 },
      { squareFootage: 1000, isOccupied: false, potentialMonthlyRent: 2000, actualMonthlyRent: 0, remainingLeaseMonths: 0 }
    ];
    const res = OccupancyRateAnalytics.analyzePortfolio(leases);
    assert.equal(res.physicalOccupancyRatePercent, 50.0);
    assert.equal(res.economicOccupancyRatePercent, 50.0);
    assert.equal(res.weightedAverageLeaseExpiryMonths, 24.0);
  });
});
