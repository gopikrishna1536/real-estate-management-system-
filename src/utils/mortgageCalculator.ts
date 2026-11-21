/**
 * Mortgage & EMI Amortization Calculation Engine for Real Estate Transactions.
 */

export interface MortgageInput {
  propertyPrice: number;
  downPaymentPercent: number; // e.g. 20 for 20%
  annualInterestRate: number; // e.g. 6.5 for 6.5%
  loanTenureYears: number; // e.g. 30
}

export interface AmortizationYear {
  year: number;
  principalPaid: number;
  interestPaid: number;
  totalPaid: number;
  remainingBalance: number;
}

export interface MortgageResult {
  loanAmount: number;
  downPaymentAmount: number;
  monthlyEMI: number;
  totalInterestPaid: number;
  totalPayment: number;
  interestToPrincipalRatio: number;
  schedule: AmortizationYear[];
}

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const { propertyPrice, downPaymentPercent, annualInterestRate, loanTenureYears } = input;

  if (propertyPrice <= 0) throw new Error('Property price must be positive.');
  if (downPaymentPercent < 0 || downPaymentPercent >= 100) throw new Error('Down payment percent must be between 0 and 99.');
  if (annualInterestRate <= 0) throw new Error('Interest rate must be positive.');
  if (loanTenureYears <= 0) throw new Error('Loan tenure must be positive.');

  const downPaymentAmount = Math.round(propertyPrice * (downPaymentPercent / 100) * 100) / 100;
  const loanAmount = propertyPrice - downPaymentAmount;

  const monthlyRate = annualInterestRate / 12 / 100;
  const totalMonths = loanTenureYears * 12;

  // EMI = [P * r * (1+r)^n] / [(1+r)^n - 1]
  const factor = Math.pow(1 + monthlyRate, totalMonths);
  const monthlyEMI = Math.round((loanAmount * monthlyRate * factor) / (factor - 1) * 100) / 100;

  let balance = loanAmount;
  let totalInterestPaid = 0;
  const schedule: AmortizationYear[] = [];

  for (let y = 1; y <= loanTenureYears; y++) {
    let yearPrincipal = 0;
    let yearInterest = 0;

    for (let m = 1; m <= 12; m++) {
      if (balance <= 0) break;
      const monthInterest = balance * monthlyRate;
      const monthPrincipal = Math.min(balance, monthlyEMI - monthInterest);

      yearInterest += monthInterest;
      yearPrincipal += monthPrincipal;
      balance -= monthPrincipal;
    }

    totalInterestPaid += yearInterest;
    schedule.push({
      year: y,
      principalPaid: Math.round(yearPrincipal * 100) / 100,
      interestPaid: Math.round(yearInterest * 100) / 100,
      totalPaid: Math.round((yearPrincipal + yearInterest) * 100) / 100,
      remainingBalance: Math.max(0, Math.round(balance * 100) / 100)
    });
  }

  const roundedTotalInterest = Math.round(totalInterestPaid * 100) / 100;
  const roundedTotalPayment = Math.round((loanAmount + roundedTotalInterest) * 100) / 100;
  const ratio = Math.round((roundedTotalInterest / loanAmount) * 100) / 100;

  return {
    loanAmount,
    downPaymentAmount,
    monthlyEMI,
    totalInterestPaid: roundedTotalInterest,
    totalPayment: roundedTotalPayment,
    interestToPrincipalRatio: ratio,
    schedule
  };
}
