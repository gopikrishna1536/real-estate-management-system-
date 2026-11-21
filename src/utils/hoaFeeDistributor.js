/**
 * Homeowners Association (HOA) Common Area Maintenance (CAM) Distributor
 */
export class HoaFeeDistributor {
  static distributeExpenses(totalMonthlyExpenses, units) {
    if (totalMonthlyExpenses <= 0 || !units || units.length === 0) {
      throw new Error('Invalid expenses or empty unit list');
    }

    const totalSqFt = units.reduce((acc, u) => acc + u.squareFootage, 0);
    const unitFees = [];

    for (const u of units) {
      const shareRatio = u.squareFootage / totalSqFt;
      const fee = Number((totalMonthlyExpenses * shareRatio).toFixed(2));
      unitFees.push({
        unitId: u.unitId,
        squareFootage: u.squareFootage,
        sharePercentage: Number((shareRatio * 100).toFixed(2)),
        monthlyFee: fee
      });
    }

    return {
      totalMonthlyExpenses,
      totalCommunitySqFt: totalSqFt,
      unitFees
    };
  }
}
