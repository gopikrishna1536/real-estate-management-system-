/**
 * Micro-Market Gross vs Net Rental Yield Benchmarking
 */
export class RentalYieldHeatmap {
  static benchmarkYield(propertyPrice, monthlyRent, annualOperatingCosts) {
    if (propertyPrice <= 0) throw new Error('Price must be positive');

    const grossAnnualRent = monthlyRent * 12;
    const netAnnualOperatingIncome = Math.max(0, grossAnnualRent - annualOperatingCosts);

    const grossYield = Number(((grossAnnualRent / propertyPrice) * 100).toFixed(2));
    const netYield = Number(((netAnnualOperatingIncome / propertyPrice) * 100).toFixed(2));

    return {
      propertyPrice,
      grossAnnualRent,
      netAnnualOperatingIncome,
      grossYieldPercent: grossYield,
      netYieldPercent: netYield,
      isAttractiveInvestment: netYield >= 5.0
    };
  }
}
