/**
 * Occupancy Rate & Weighted Average Lease Expiry (WALE) Analyzer
 */
export class OccupancyRateAnalytics {
  static analyzePortfolio(leases) {
    if (!leases || leases.length === 0) throw new Error('Lease roster cannot be empty');

    let totalPotentialRent = 0;
    let actualCollectedRent = 0;
    let totalSqFt = 0;
    let occupiedSqFt = 0;
    let weightedLeaseMonths = 0;

    for (const l of leases) {
      totalPotentialRent += l.potentialMonthlyRent;
      totalSqFt += l.squareFootage;

      if (l.isOccupied) {
        actualCollectedRent += l.actualMonthlyRent;
        occupiedSqFt += l.squareFootage;
        weightedLeaseMonths += (l.remainingLeaseMonths * l.actualMonthlyRent);
      }
    }

    const physicalOccupancy = Number(((occupiedSqFt / totalSqFt) * 100).toFixed(1));
    const economicOccupancy = Number(((actualCollectedRent / totalPotentialRent) * 100).toFixed(1));
    const waleMonths = actualCollectedRent > 0 ? Number((weightedLeaseMonths / actualCollectedRent).toFixed(1)) : 0;

    return {
      physicalOccupancyRatePercent: physicalOccupancy,
      economicOccupancyRatePercent: economicOccupancy,
      economicVacancyRatePercent: Number((100 - economicOccupancy).toFixed(1)),
      weightedAverageLeaseExpiryMonths: waleMonths
    };
  }
}
