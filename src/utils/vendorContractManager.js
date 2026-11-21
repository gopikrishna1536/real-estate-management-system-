/**
 * Facility Vendor SLA Tracking & Invoice Penalty Deductor
 */
export class VendorContractManager {
  static evaluateVendorInvoice(monthlyInvoiceAmount, expectedResponseHours, workOrders = []) {
    let penaltyPoints = 0;

    for (const w of workOrders) {
      if (w.actualResolutionHours > expectedResponseHours) {
        penaltyPoints += 1;
      }
    }

    // 2% invoice deduction per SLA breach capped at 20%
    const penaltyPercent = Math.min(20, penaltyPoints * 2.0);
    const penaltyAmount = Number((monthlyInvoiceAmount * (penaltyPercent / 100)).toFixed(2));
    const payableAmount = Number((monthlyInvoiceAmount - penaltyAmount).toFixed(2));

    return {
      monthlyInvoiceAmount,
      totalWorkOrders: workOrders.length,
      breachedWorkOrders: penaltyPoints,
      penaltyPercent,
      penaltyAmount,
      payableAmount
    };
  }
}
