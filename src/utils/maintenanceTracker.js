/**
 * Maintenance Reserve Fund & Capital Expenditure Scheduler
 */
export class MaintenanceTracker {
  static calculateReserveFund(propertyValue, buildingAgeYears, squareFootage, annualBudgetPercent = 1.0) {
    if (propertyValue <= 0 || squareFootage <= 0) {
      throw new Error('Property value and square footage must be positive');
    }

    // Baseline 1% rule adjusted by age factor (+0.05% per year over 10 years)
    const ageFactor = buildingAgeYears > 10 ? (buildingAgeYears - 10) * 0.05 : 0;
    const effectivePercent = annualBudgetPercent + ageFactor;

    const annualReserve = Number((propertyValue * (effectivePercent / 100)).toFixed(2));
    const monthlyReserve = Number((annualReserve / 12).toFixed(2));
    const reservePerSqFt = Number((annualReserve / squareFootage).toFixed(2));

    return {
      propertyValue,
      buildingAgeYears,
      effectiveRatePercent: Number(effectivePercent.toFixed(2)),
      annualReserveRequired: annualReserve,
      monthlyReserveRequired: monthlyReserve,
      reservePerSqFt
    };
  }
}
