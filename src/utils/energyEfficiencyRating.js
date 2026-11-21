/**
 * Building Energy Efficiency Index (EUI) & Green Building Rebate Estimator
 * EUI = Annual Total Energy (kBtu) / Gross Floor Area (sqft)
 */
export class EnergyEfficiencyRating {
  static evaluateBuilding(annualKWh, annualGasTherms, squareFootage) {
    if (squareFootage <= 0) throw new Error('Square footage must be positive');

    // 1 kWh = 3.412 kBtu, 1 Therm = 99.976 kBtu
    const electricKbtu = annualKWh * 3.412;
    const gasKbtu = annualGasTherms * 99.976;
    const totalKbtu = electricKbtu + gasKbtu;

    const eui = Number((totalKbtu / squareFootage).toFixed(1));
    let energyStarTier = 'Standard';
    let estimatedTaxCreditPerSqFt = 0.50;

    if (eui < 45.0) {
      energyStarTier = 'Platinum';
      estimatedTaxCreditPerSqFt = 2.50;
    } else if (eui < 65.0) {
      energyStarTier = 'Gold';
      estimatedTaxCreditPerSqFt = 1.50;
    }

    return {
      energyUseIntensityEUI: eui,
      energyStarTier,
      estimatedGreenTaxRebate: Number((estimatedTaxCreditPerSqFt * squareFootage).toFixed(2))
    };
  }
}
