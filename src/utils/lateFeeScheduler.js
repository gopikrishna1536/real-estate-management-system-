/**
 * Rent Late Fee Scheduler & Grace Period Rule Enforcer
 */
export class LateFeeScheduler {
  static calculateLateFee(monthlyRent, paymentDay, gracePeriodDays = 5, flatFee = 50.0, dailyRatePercent = 0.5) {
    if (paymentDay <= gracePeriodDays) {
      return {
        isLate: false,
        paymentDay,
        gracePeriodDays,
        lateFeeAmount: 0.0
      };
    }

    const overdueDays = paymentDay - gracePeriodDays;
    const dailyAccumulation = monthlyRent * (dailyRatePercent / 100) * overdueDays;
    const totalFee = Number((flatFee + dailyAccumulation).toFixed(2));

    return {
      isLate: true,
      paymentDay,
      overdueDays,
      flatFee,
      dailyAccumulation: Number(dailyAccumulation.toFixed(2)),
      lateFeeAmount: totalFee
    };
  }
}
