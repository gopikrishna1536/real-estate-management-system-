/**
 * Statutory Lease Breach & Eviction Cure-or-Quit Notice Timeline Tracker
 */
export class EvictionNoticeTimeline {
  static JURISDICTION_RULES = {
    standard_nonpayment: { noticeDays: 3, excludesWeekends: true },
    cure_or_quit_lease_violation: { noticeDays: 10, excludesWeekends: false },
    unconditional_quit: { noticeDays: 3, excludesWeekends: false }
  };

  static calculateCureDeadline(servedDateStr, violationType) {
    const rule = EvictionNoticeTimeline.JURISDICTION_RULES[violationType];
    if (!rule) throw new Error(`Unknown violation type: ${violationType}`);

    const servedDate = new Date(servedDateStr);
    let daysAdded = 0;
    const curr = new Date(servedDate);

    while (daysAdded < rule.noticeDays) {
      curr.setDate(curr.getDate() + 1);
      const dayOfWeek = curr.getDay(); // 0 = Sun, 6 = Sat
      if (rule.excludesWeekends && (dayOfWeek === 0 || dayOfWeek === 6)) {
        continue;
      }
      daysAdded++;
    }

    return {
      servedDate: servedDate.toISOString().slice(0, 10),
      violationType,
      statutoryDays: rule.noticeDays,
      deadlineDate: curr.toISOString().slice(0, 10)
    };
  }
}
