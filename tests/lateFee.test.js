import test from 'node:test';
import assert from 'node:assert/strict';
import { LateFeeScheduler } from '../src/utils/lateFeeScheduler.js';

test('Late Fee Scheduler Tests', async (t) => {
  await t.test('should waive fee when paid within grace period', () => {
    const res = LateFeeScheduler.calculateLateFee(2000, 3, 5);
    assert.equal(res.isLate, false);
    assert.equal(res.lateFeeAmount, 0);
  });

  await t.test('should assess flat fee plus daily accumulation past grace period', () => {
    // Day 8 (3 days overdue) on $2,000 rent @ 0.5% daily ($10/day) + $50 flat = $80
    const res = LateFeeScheduler.calculateLateFee(2000, 8, 5, 50, 0.5);
    assert.equal(res.isLate, true);
    assert.equal(res.lateFeeAmount, 80);
  });
});
