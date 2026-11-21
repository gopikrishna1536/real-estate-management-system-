/**
 * Security Deposit Itemized Deductions & Statutory Interest Refund
 */
export class SecurityDepositRefund {
  static calculateRefund(initialDeposit, interestRatePercent, tenancyMonths, deductions = []) {
    if (initialDeposit <= 0) throw new Error('Deposit must be positive');

    const totalDeductions = deductions.reduce((acc, d) => acc + d.amount, 0);
    // Simple interest: Deposit * (Rate/100) * (Months / 12)
    const accruedInterest = Number((initialDeposit * (interestRatePercent / 100) * (tenancyMonths / 12)).toFixed(2));

    const netRefund = Number((initialDeposit + accruedInterest - totalDeductions).toFixed(2));

    return {
      initialDeposit,
      accruedInterest,
      totalDeductions,
      netRefundAmount: Math.max(0, netRefund),
      tenantOwesDeficit: netRefund < 0 ? Math.abs(netRefund) : 0,
      deductionBreakdown: deductions
    };
  }
}
