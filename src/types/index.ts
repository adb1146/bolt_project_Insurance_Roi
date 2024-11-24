export interface CalculatorInputs {
  premium2023: number;
  growthRate: number;
  retentionRate: number;
  yearlyRateIncrease: number;
  avgPremiumPerPolicy: number;
  submissionQuoted: number;     
  quoteToBind: number;          
  quoteSubmissionRatio: number;
  hitRatio: number;
  expenseRatio: number;
  lossRatio: number;
  expenseRatioImprovement: number;
  lossRatioImprovement: number;
  selectedLOB: string;
  scenarioName?: string;
}

export interface CalculatorResults {
  targetPremium: number;
  renewalPremium: number;
  newBusinessRequirement: number;
  newPoliciesNeeded: number;
  submissionRequirements: number;
  expenseRatio: number;
  lossRatio: number;
  combinedRatio: number;
  expenseRatioImproved: number;
  lossRatioImproved: number;
  combinedRatioImproved: number;
  expenses: number;
  loss: number;
  underwritingIncome: number;
  expensesImproved: number;
  lossImproved: number;
  underwritingIncomeImproved: number;
  netImprovement: number;
  selectedLOB: string;
  scenarioName?: string;
}

export interface Scenario {
  inputs: CalculatorInputs;
  results: CalculatorResults;
  id: string;
  createdAt: Date;
}

export interface LOBBenchmarks {
  [key: string]: {
    combinedRatio: number;
    topQuartile: {
      lossRatio: string;
      expenseRatio: string;
      quoteToBind: string;
    };
    median: {
      lossRatio: string;
      expenseRatio: string;
      quoteToBind: string;
    };
  };
}