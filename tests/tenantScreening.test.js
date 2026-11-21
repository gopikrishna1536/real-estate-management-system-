import test from 'node:test';
import assert from 'node:assert/strict';
import { TenantScreeningScore } from '../src/utils/tenantScreeningScore.js';

test('Tenant Screening Score Tests', async (t) => {
  await t.test('should approve prime applicant with high income and good credit', () => {
    // $10k income, $2.5k rent (25%), 760 credit -> 40 + 40 + 20 = 100 pts
    const res = TenantScreeningScore.evaluateApplicant(10000, 2500, 760, 0, 0);
    assert.equal(res.screeningScore, 100);
    assert.equal(res.approved, true);
    assert.equal(res.riskRating, 'Low Risk');
  });

  await t.test('should reject applicant with prior eviction record', () => {
    const res = TenantScreeningScore.evaluateApplicant(10000, 2500, 700, 1, 0);
    assert.equal(res.approved, false);
  });
});
