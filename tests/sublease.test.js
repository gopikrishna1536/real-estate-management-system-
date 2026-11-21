import test from 'node:test';
import assert from 'node:assert/strict';
import { SubleaseConsentChecker } from '../src/utils/subleaseConsentChecker.js';

test('Sublease Consent Checker Tests', async (t) => {
  await t.test('should approve qualified subtenant when master lease allows', () => {
    const res = SubleaseConsentChecker.validateSublease(true, 6, 720, true);
    assert.equal(res.isApproved, true);
    assert.equal(res.reasons.length, 0);
  });
});
