import test from 'node:test';
import assert from 'node:assert/strict';
import { StateStampDuty } from '../src/utils/stateStampDuty.js';

test('State Stamp Duty Matrix Tests', async (t) => {
  await t.test('should calculate Maharashtra duty with female concession', () => {
    // 5% - 1% = 4% stamp, 1% reg on ₹10,000,000 -> 400k + 100k = 500k
    const res = StateStampDuty.calculateDuty(10000000, 'maharashtra', true);
    assert.equal(res.stampDutyAmount, 400000);
    assert.equal(res.registrationFeeAmount, 100000);
    assert.equal(res.totalGovernmentCharges, 500000);
  });
});
