/**
 * Tenant Screening & Credit Risk Scoring Engine
 */
export class TenantScreeningScore {
  static evaluateApplicant(monthlyIncome, proposedRent, creditScore, evictionHistoryCount, bankruptcyHistoryCount) {
    if (monthlyIncome <= 0 || proposedRent <= 0) {
      throw new Error('Income and rent must be positive');
    }

    const rentToIncomeRatio = Number(((proposedRent / monthlyIncome) * 100).toFixed(1));
    let score = 0;

    // Credit score weighting (max 40 pts)
    if (creditScore >= 750) score += 40;
    else if (creditScore >= 700) score += 32;
    else if (creditScore >= 650) score += 20;
    else score += 5;

    // Rent to income weighting (max 40 pts, ideal <= 30%)
    if (rentToIncomeRatio <= 28) score += 40;
    else if (rentToIncomeRatio <= 33) score += 30;
    else if (rentToIncomeRatio <= 40) score += 15;
    else score += 0;

    // Background records weighting (max 20 pts)
    let recordPoints = 20;
    recordPoints -= evictionHistoryCount * 15;
    recordPoints -= bankruptcyHistoryCount * 10;
    score += Math.max(0, recordPoints);

    const approved = score >= 70 && evictionHistoryCount === 0;

    return {
      creditScore,
      rentToIncomeRatioPercent: rentToIncomeRatio,
      screeningScore: score,
      maxScore: 100,
      approved,
      riskRating: score >= 80 ? 'Low Risk' : (score >= 60 ? 'Moderate Risk' : 'High Risk')
    };
  }
}
