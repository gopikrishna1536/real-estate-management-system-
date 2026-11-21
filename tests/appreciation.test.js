import test from 'node:test';
import assert from 'node:assert/strict';
import { PropertyAppreciationModel } from '../src/utils/propertyAppreciationModel.js';

test('Property Appreciation Model Tests', async (t) => {
  await t.test('should accurately compound property value over 10 years at 5% annual growth', () => {
    const res = PropertyAppreciationModel.projectAppreciation(500000, 5.0, 10, 2.0);
    assert.ok(res.nominalFutureValue > 800000);
    assert.equal(res.compoundAnnualGrowthRate, 5.0);
  });
});
