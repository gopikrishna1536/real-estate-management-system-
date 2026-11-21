import test from 'node:test';
import assert from 'node:assert/strict';
import { CommercialLeaseEscalation } from '../src/utils/commercialLeaseEscalation.js';

test('Commercial Lease Escalation Tests', async (t) => {
  await t.test('should calculate 3-year commercial compound lease schedule', () => {
    // $100,000 initial @ 3% compound
    const res = CommercialLeaseEscalation.calculateEscalationSchedule(100000, 3, 'compound', 3.0);
    assert.equal(res.schedule[0].annualRent, 100000);
    assert.equal(res.schedule[1].annualRent, 103000);
    assert.equal(res.schedule[2].annualRent, 106090);
  });
});
