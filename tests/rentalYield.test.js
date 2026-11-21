import test from 'node:test';
import assert from 'node:assert/strict';
import { RentalYieldHeatmap } from '../src/utils/rentalYieldHeatmap.js';

test('Rental Yield Heatmap Tests', async (t) => {
  await t.test('should calculate gross and net rental yield accurately', () => {
    // $400k property, $2.5k rent ($30k/yr), $6k operating expenses ($24k NOI) -> Gross 7.5%, Net 6.0%
    const res = RentalYieldHeatmap.benchmarkYield(400000, 2500, 6000);
    assert.equal(res.grossYieldPercent, 7.5);
    assert.equal(res.netYieldPercent, 6.0);
    assert.equal(res.isAttractiveInvestment, true);
  });
});
