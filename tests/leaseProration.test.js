import test from 'node:test';
import assert from 'node:assert/strict';
import { LeaseProration } from '../src/utils/leaseProration.js';

test('Lease Proration Tests', async (t) => {
  await t.test('should calculate prorated rent for move-in on the 16th of a 30-day month', () => {
    // 15 days occupied (30 - 16 + 1 = 15) @ $3,000/mo = $1,500
    const res = LeaseProration.calculateProratedRent(3000, 16, 30);
    assert.equal(res.occupiedDays, 15);
    assert.equal(res.proratedAmount, 1500);
  });
});
