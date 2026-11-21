/**
 * Municipal Unit Area Value (UAV) Property Tax Assessment Calculator
 */
export class PropertyTaxEstimator {
  static computeTax(coveredAreaSqFt, baseRatePerSqFt, ageMultiplier = 1.0, occupancyMultiplier = 1.0, structureMultiplier = 1.0) {
    if (coveredAreaSqFt <= 0 || baseRatePerSqFt <= 0) {
      throw new Error('Covered area and base rate must be positive');
    }

    const annualUnitAreaValue = coveredAreaSqFt * baseRatePerSqFt * ageMultiplier * occupancyMultiplier * structureMultiplier;
    // Standard property tax rate 15% on UAV plus 5% education cess
    const baseTax = annualUnitAreaValue * 0.15;
    const educationCess = baseTax * 0.05;
    const totalAnnualTax = Number((baseTax + educationCess).toFixed(2));

    return {
      coveredAreaSqFt,
      unitAreaValue: Number(annualUnitAreaValue.toFixed(2)),
      basePropertyTax: Number(baseTax.toFixed(2)),
      educationCess: Number(educationCess.toFixed(2)),
      totalAnnualTax
    };
  }
}
