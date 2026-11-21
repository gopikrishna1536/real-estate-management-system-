/**
 * Mid-Month Move-In/Move-Out Rent Proration Calculator
 */
export class LeaseProration {
  static calculateProratedRent(monthlyRent, moveInDay, totalDaysInMonth = 30) {
    if (monthlyRent <= 0 || moveInDay < 1 || moveInDay > totalDaysInMonth) {
      throw new Error('Invalid rent or move-in date parameters');
    }

    const occupiedDays = totalDaysInMonth - moveInDay + 1;
    const dailyRate = monthlyRent / totalDaysInMonth;
    const proratedAmount = Number((dailyRate * occupiedDays).toFixed(2));

    return {
      monthlyRent,
      moveInDay,
      totalDaysInMonth,
      occupiedDays,
      dailyRate: Number(dailyRate.toFixed(2)),
      proratedAmount
    };
  }
}
