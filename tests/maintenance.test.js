import test from 'node:test';
import assert from 'node:assert/strict';
import { MaintenanceTracker } from '../src/utils/maintenanceTracker.js';

test('Maintenance Reserve Fund Tests', async (t) => {
  await t.test('should calculate 1% reserve for modern property', () => {
    const res = MaintenanceTracker.calculateReserveFund(500000, 5, 2000, 1.0);
    assert.equal(res.annualReserveRequired, 5000);
    assert.equal(res.monthlyReserveRequired, 416.67);
    assert.equal(res.reservePerSqFt, 2.5);
  });

  await t.test('should increase reserve requirement for older structures', () => {
    // 20 years old -> +0.5% -> 1.5% of $1,000,000 = $15,000
    const res = MaintenanceTracker.calculateReserveFund(1000000, 20, 4000, 1.0);
    assert.equal(res.annualReserveRequired, 15000);
    assert.equal(res.effectiveRatePercent, 1.5);
  });
});
