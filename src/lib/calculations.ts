/**
 * Financial calculations for Real Estate Investment Analysis
 */

export interface PropertyInputs {
  propertyName: string;
  purchasePrice: number;
  downPayment: number;
  monthlyRent: number;
  closingCosts: number;
  renovationCosts: number;
  mortgageInterestRate: number; // Annual rate in % (e.g. 6.5)
  mortgageTerm: number; // Years
  amortizationPeriod: number; // Years
  propertyTax: number; // Monthly
  insurance: number; // Monthly
  maintenance: number; // Monthly
  propertyManagement: number; // Monthly
  utilities: number; // Monthly
  hoaFees: number; // Monthly
  otherExpenses: number; // Monthly
  vacancyRate: number; // Percentage (e.g. 5)
  appreciationRate: number; // Annual percentage (e.g. 3)
}

export interface CalculationResults {
  mortgagePrincipal: number;
  monthlyMortgagePayment: number;
  effectiveRentalIncome: number;
  totalMonthlyOperatingExpenses: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  grossRentalYield: number;
  netRentalYield: number;
  cashOnCashReturn: number;
  totalInitialInvestment: number;
  breakEvenRent: number;
  capRate: number;
  annualDebtService: number;
  dealScore: number;
  scoreBreakdown: {
    cashFlow: { earned: number; max: number };
    cocReturn: { earned: number; max: number };
    netYield: { earned: number; max: number };
    grossYield: { earned: number; max: number };
    breakEvenMargin: { earned: number; max: number };
  };
  improvementSuggestions: {
    rentIncreaseNeeded: number;
    priceReductionNeeded: number;
    downPaymentIncreaseNeeded: number;
    interestRateReductionNeeded: number;
  };
}

/**
 * Calculates the monthly mortgage payment
 * Formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
 */
export function calculateMortgagePayment(principal: number, annualRate: number, termYears: number): number {
  if (principal <= 0) return 0;
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = termYears * 12;

  if (monthlyRate === 0) return principal / numberOfPayments;

  const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  return payment;
}

export function analyzeDeal(inputs: PropertyInputs): CalculationResults {
  const {
    purchasePrice,
    downPayment,
    monthlyRent,
    closingCosts,
    renovationCosts,
    mortgageInterestRate,
    mortgageTerm,
    propertyTax,
    insurance,
    maintenance,
    propertyManagement,
    utilities,
    hoaFees,
    otherExpenses,
    vacancyRate,
  } = inputs;

  const mortgagePrincipal = purchasePrice - downPayment;
  const monthlyMortgagePayment = calculateMortgagePayment(mortgagePrincipal, mortgageInterestRate, mortgageTerm);

  const effectiveRentalIncome = monthlyRent * (1 - (vacancyRate / 100));

  const totalMonthlyOperatingExpenses =
    propertyTax +
    insurance +
    maintenance +
    propertyManagement +
    utilities +
    hoaFees +
    otherExpenses;

  const monthlyCashFlow = effectiveRentalIncome - totalMonthlyOperatingExpenses - monthlyMortgagePayment;
  const annualCashFlow = monthlyCashFlow * 12;

  const totalInitialInvestment = downPayment + closingCosts + renovationCosts;

  const annualGrossRent = monthlyRent * 12;
  const grossRentalYield = (annualGrossRent / purchasePrice) * 100;

  const annualNOI = (effectiveRentalIncome - totalMonthlyOperatingExpenses) * 12;
  const netRentalYield = (annualNOI / purchasePrice) * 100;

  const cashOnCashReturn = (annualCashFlow / totalInitialInvestment) * 100;

  const breakEvenRent = (totalMonthlyOperatingExpenses + monthlyMortgagePayment) / (1 - (vacancyRate / 100));

  const capRate = (annualNOI / purchasePrice) * 100;
  const annualDebtService = monthlyMortgagePayment * 12;

  // Deal Score Calculation (0-100)
  const cashFlowScore = Math.min(30, Math.max(0, (monthlyCashFlow / 500) * 30));
  const cocScore = Math.min(25, Math.max(0, (cashOnCashReturn / 10) * 25));
  const netYieldScore = Math.min(20, Math.max(0, (netRentalYield / 5) * 20));
  const grossYieldScore = Math.min(15, Math.max(0, (grossRentalYield / 8) * 15));
  const safetyMargin = (monthlyRent - breakEvenRent) / monthlyRent;
  const breakEvenScore = Math.min(10, Math.max(0, (safetyMargin / 0.2) * 10));

  const dealScore = Math.round(cashFlowScore + cocScore + netYieldScore + grossYieldScore + breakEvenScore);

  // Improvement Scenarios (calculate what is needed to reach $0 monthly cash flow)
  const rentIncreaseNeeded = Math.max(0, breakEvenRent - monthlyRent);

  // For purchase price reduction: Target a price where mortgage payment + expenses = rent
  const targetMortgagePayment = effectiveRentalIncome - totalMonthlyOperatingExpenses;
  let priceReductionNeeded = 0;
  if (targetMortgagePayment < 0) {
    const monthlyRate = mortgageInterestRate / 100 / 12;
    const n = mortgageTerm * 12;
    const targetPrincipal = targetMortgagePayment / (monthlyRate * Math.pow(1 + monthlyRate, n) / (Math.pow(1 + monthlyRate, n) - 1));
    priceReductionNeeded = Math.max(0, mortgagePrincipal - targetPrincipal);
  }

  const downPaymentIncreaseNeeded = Math.max(0, -monthlyCashFlow * (1 / (mortgageInterestRate / 100 / 12)));

  const interestRateReductionNeeded = Math.max(0, (monthlyMortgagePayment - targetMortgagePayment) / (mortgagePrincipal * 0.01));

  return {
    mortgagePrincipal,
    monthlyMortgagePayment,
    effectiveRentalIncome,
    totalMonthlyOperatingExpenses,
    monthlyCashFlow,
    annualCashFlow,
    grossRentalYield,
    netRentalYield,
    cashOnCashReturn,
    totalInitialInvestment,
    breakEvenRent,
    capRate,
    annualDebtService,
    dealScore,
    scoreBreakdown: {
      cashFlow: { earned: Math.round(cashFlowScore), max: 30 },
      cocReturn: { earned: Math.round(cocScore), max: 25 },
      netYield: { earned: Math.round(netYieldScore), max: 20 },
      grossYield: { earned: Math.round(grossYieldScore), max: 15 },
      breakEvenMargin: { earned: Math.round(breakEvenScore), max: 10 },
    },
    improvementSuggestions: {
      rentIncreaseNeeded,
      priceReductionNeeded,
      downPaymentIncreaseNeeded,
      interestRateReductionNeeded,
    }
  };
}

/**
 * Generates projections for 5 and 10 years
 */
export function calculateProjections(inputs: PropertyInputs, results: CalculationResults) {
  const projections = [];
  const years = [5, 10];

  const { purchasePrice, appreciationRate } = inputs;
  const { monthlyMortgagePayment } = results;

  const principal = results.mortgagePrincipal;
  const monthlyRate = inputs.mortgageInterestRate / 100 / 12;

  let currentBalance = principal;
  let cumulativeCashFlow = 0;

  for (let year = 1; year <= 10; year++) {
    for (let month = 1; month <= 12; month++) {
      const interestPayment = currentBalance * monthlyRate;
      const principalPayment = monthlyMortgagePayment - interestPayment;
      currentBalance -= principalPayment;
      cumulativeCashFlow += results.monthlyCashFlow;
    }

    const futureValue = purchasePrice * Math.pow(1 + (appreciationRate / 100), year);
    const equity = futureValue - currentBalance;

    if (years.includes(year)) {
      projections.push({
        year,
        estimatedValue: futureValue,
        mortgageBalance: currentBalance,
        equity: equity,
        annualCashFlow: results.annualCashFlow,
        cumulativeCashFlow: cumulativeCashFlow,
      });
    }
  }

  return projections;
}
