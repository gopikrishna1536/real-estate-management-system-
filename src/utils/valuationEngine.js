/**
 * Property Valuation, Rental Yield, and Capitalization Rate Engine.
 */

export function calculateGrossRentalYield(annualRent, propertyPrice) {
  if (propertyPrice <= 0) throw new Error('Property price must be greater than zero');
  if (annualRent < 0) throw new Error('Annual rent cannot be negative');
  return Math.round((annualRent / propertyPrice) * 10000) / 100;
}

export function calculateCapRate(grossRevenue, operatingExpenses, propertyValue) {
  if (propertyValue <= 0) throw new Error('Property value must be greater than zero');
  if (operatingExpenses < 0) throw new Error('Operating expenses cannot be negative');
  const netOperatingIncome = grossRevenue - operatingExpenses;
  return Math.round((netOperatingIncome / propertyValue) * 10000) / 100;
}

export function calculatePricePerSqFt(price, sqft) {
  if (sqft <= 0) throw new Error('Square footage must be greater than zero');
  if (price < 0) throw new Error('Price cannot be negative');
  return Math.round((price / sqft) * 100) / 100;
}

export function assessInvestmentGrade(capRate, rentalYield) {
  if (capRate >= 8.0 || rentalYield >= 9.0) {
    return { grade: 'A', status: 'HIGH_PERFORMING_ASSET', recommendation: 'Strong cashflow potential' };
  }
  if (capRate >= 6.0 || rentalYield >= 7.0) {
    return { grade: 'B', status: 'SOLID_STABLE_YIELD', recommendation: 'Good risk-adjusted return' };
  }
  if (capRate >= 4.0 || rentalYield >= 5.0) {
    return { grade: 'C', status: 'MODERATE_APPRECIATION_FOCUS', recommendation: 'Primarily capital growth target' };
  }
  return { grade: 'D', status: 'LOW_CASH_YIELD', recommendation: 'High risk or strictly trophy asset' };
}
