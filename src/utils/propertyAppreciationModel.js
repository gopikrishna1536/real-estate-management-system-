/**
 * Real Estate Compound Asset Appreciation & Equity Growth Model
 */
export class PropertyAppreciationModel {
  static projectAppreciation(purchasePrice, annualAppreciationPercent, holdYears, annualInflationPercent = 2.5) {
    if (purchasePrice <= 0 || holdYears <= 0) {
      throw new Error('Invalid price or hold years');
    }

    const nominalValue = purchasePrice * Math.pow(1 + annualAppreciationPercent / 100, holdYears);
    const realRate = ((1 + annualAppreciationPercent / 100) / (1 + annualInflationPercent / 100)) - 1;
    const realValue = purchasePrice * Math.pow(1 + realRate, holdYears);

    const nominalGain = nominalValue - purchasePrice;
    const cagr = Number(((Math.pow(nominalValue / purchasePrice, 1 / holdYears) - 1) * 100).toFixed(2));

    return {
      initialPurchasePrice: purchasePrice,
      holdYears,
      nominalFutureValue: Number(nominalValue.toFixed(2)),
      realInflationAdjustedValue: Number(realValue.toFixed(2)),
      totalNominalEquityGain: Number(nominalGain.toFixed(2)),
      compoundAnnualGrowthRate: cagr
    };
  }
}
