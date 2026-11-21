import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { calculateMortgage } from '../src/utils/mortgageCalculator.js';

describe('Real Estate Mortgage & EMI Amortization Tests', () => {
  test('should accurately calculate standard 30-year fixed mortgage', () => {
    // $500,000 property, 20% down ($100,000), $400,000 loan at 6% for 30 years
    const result = calculateMortgage({
      propertyPrice: 500000,
      downPaymentPercent: 20,
      annualInterestRate: 6.0,
      loanTenureYears: 30
    });

    assert.equal(result.loanAmount, 400000);
    assert.equal(result.downPaymentAmount, 100000);
    // Standard monthly payment for $400k at 6% over 30 yrs is ~$2398.20
    assert.ok(result.monthlyEMI >= 2390 && result.monthlyEMI <= 2410);
    assert.equal(result.schedule.length, 30);
    // Final balance at year 30 should be 0
    assert.equal(result.schedule[29].remainingBalance, 0);
  });

  test('should throw validation errors on negative prices or invalid rates', () => {
    assert.throws(() => calculateMortgage({ propertyPrice: -100 }), /Property price must be positive/);
    assert.throws(() => calculateMortgage({ propertyPrice: 100, downPaymentPercent: 100 }), /Down payment percent/);
    assert.throws(() => calculateMortgage({ propertyPrice: 100, downPaymentPercent: 10, annualInterestRate: 0 }), /Interest rate/);
  });
});
