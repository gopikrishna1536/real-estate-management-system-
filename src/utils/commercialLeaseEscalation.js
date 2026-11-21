/**
 * Triple Net (NNN) Commercial Lease Annual Escalation Engine
 */
export class CommercialLeaseEscalation {
  static calculateEscalationSchedule(initialAnnualRent, termYears, escalationType, ratePercent) {
    if (initialAnnualRent <= 0 || termYears <= 0) {
      throw new Error('Rent and term must be positive');
    }

    const schedule = [];
    let currentRent = initialAnnualRent;

    for (let yr = 1; yr <= termYears; yr++) {
      schedule.push({
        year: yr,
        annualRent: Number(currentRent.toFixed(2)),
        monthlyRent: Number((currentRent / 12).toFixed(2))
      });

      if (escalationType === 'compound') {
        currentRent *= (1 + ratePercent / 100);
      } else {
        currentRent += (initialAnnualRent * (ratePercent / 100));
      }
    }

    const totalLeaseValue = schedule.reduce((acc, s) => acc + s.annualRent, 0);

    return {
      initialAnnualRent,
      termYears,
      escalationType,
      ratePercent,
      totalLeaseValue: Number(totalLeaseValue.toFixed(2)),
      schedule
    };
  }
}
