import test from 'node:test';
import assert from 'node:assert/strict';
import { EvictionNoticeTimeline } from '../src/utils/evictionNoticeTimeline.js';

test('Eviction Notice Timeline Tests', async (t) => {
  await t.test('should calculate 3 business days cure deadline skipping weekend', () => {
    // Friday 2026-05-01: skips Sat (May 2) & Sun (May 3) -> Mon (May 4), Tue (May 5), Wed (May 6)
    const res = EvictionNoticeTimeline.calculateCureDeadline('2026-05-01', 'standard_nonpayment');
    assert.equal(res.deadlineDate, '2026-05-06');
  });
});
