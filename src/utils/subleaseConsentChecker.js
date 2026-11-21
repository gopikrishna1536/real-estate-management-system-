/**
 * Sublease Consent & Lease Covenant Validator
 */
export class SubleaseConsentChecker {
  static validateSublease(masterLeaseAllowsSublet, remainingMonthsOnMasterLease, subtenantCreditScore, securityDepositReceived) {
    const reasons = [];

    if (!masterLeaseAllowsSublet) {
      reasons.append ? reasons.append('Master lease prohibits subletting') : reasons.push('Master lease prohibits subletting');
    }

    if (remainingMonthsOnMasterLease < 3) {
      reasons.push('Minimum 3 months required on master lease to approve sublet');
    }

    if (subtenantCreditScore < 650) {
      reasons.push('Subtenant credit score below 650 minimum');
    }

    if (!securityDepositReceived) {
      reasons.push('Sublease security deposit not on file');
    }

    return {
      isApproved: reasons.length === 0,
      reasons
    };
  }
}
