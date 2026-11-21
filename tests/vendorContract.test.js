import test from 'node:test';
import assert from 'node:assert/strict';
import { VendorContractManager } from '../src/utils/vendorContractManager.js';

test('Vendor Contract Manager Tests', async (t) => {
  await t.test('should deduct penalty for delayed elevator maintenance work orders', () => {
    const workOrders = [
      { actualResolutionHours: 2 }, // on-time (expected 4)
      { actualResolutionHours: 6 }, // late
      { actualResolutionHours: 8 }  // late
    ];
    // 2 late -> 4% penalty on $5,000 = $200
    const res = VendorContractManager.evaluateVendorInvoice(5000, 4, workOrders);
    assert.equal(res.breachedWorkOrders, 2);
    assert.equal(res.penaltyAmount, 200);
    assert.equal(res.payableAmount, 4800);
  });
});
