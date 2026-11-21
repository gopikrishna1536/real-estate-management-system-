import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateGrossRentalYield,
  calculateCapRate,
  calculatePricePerSqFt,
  assessInvestmentGrade
} from '../src/utils/valuationEngine.js';

describe('Real Estate Property Valuation & Yield Tests', () => {
  test('should accurately calculate gross rental yield', () => {
    // $30,000 annual rent on $400,000 property = 7.5%
    const yieldPct = calculateGrossRentalYield(30000, 400000);
    assert.equal(yieldPct, 7.5);
  });

  test('should accurately calculate capitalization rate (Cap Rate)', () => {
    // $45,000 gross revenue - $15,000 expenses = $30,000 NOI on $500,000 property = 6.0%
    const cap = calculateCapRate(45000, 15000, 500000);
    assert.equal(cap, 6.0);
  });

  test('should calculate price per square foot', () => {
    // $450,000 for 1,500 sqft = $300/sqft
    const ppsf = calculatePricePerSqFt(450000, 1500);
    assert.equal(ppsf, 300);
  });

  test('should assess investment grade tiers correctly', () => {
    assert.equal(assessInvestmentGrade(8.5, 9.2).grade, 'A');
    assert.equal(assessInvestmentGrade(6.2, 7.1).grade, 'B');
    assert.equal(assessInvestmentGrade(4.5, 5.2).grade, 'C');
    assert.equal(assessInvestmentGrade(2.5, 3.0).grade, 'D');
  });

  test('should reject invalid zero or negative inputs', () => {
    assert.throws(() => calculateGrossRentalYield(1000, 0), /Property price must be greater than zero/);
    assert.throws(() => calculateCapRate(1000, -50, 10000), /Operating expenses cannot be negative/);
    assert.throws(() => calculatePricePerSqFt(1000, 0), /Square footage must be greater than zero/);
  });
});
