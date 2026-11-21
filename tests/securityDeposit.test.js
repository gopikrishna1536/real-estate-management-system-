import test from 'node:test';
import assert from 'node:assert/strict';
import { SecurityDepositRefund } from '../src/utils/securityDepositRefund.js';

test('Security Deposit Refund Tests', async (t) => {
  await t.test('should refund deposit plus interest minus verified repairs', () => {
    const deductions = [
      { reason: 'Deep carpet cleaning', amount: 150 },
      { reason: 'Drywall hole repair', amount: 200 }
    ];
    // $2,000 deposit, 3% interest over 24 months (2 yrs) = +$120 interest -> $2120 - $350 deductions = $1770
    const res = SecurityDepositRefund.calculateRefund(2000, 3.0, 24, deductions);
    assert.equal(res.accruedInterest, 120);
    assert.equal(res.totalDeductions, 350);
    assert.equal(res.netRefundAmount, 1770);
  });
});
