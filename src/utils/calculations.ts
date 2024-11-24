import { CalculatorInputs, CalculatorResults } from '../types';

// Utility function for precise number calculations
const calculatePreciseNumber = (value: number): number => {
  return Number(value.toFixed(1));
};

export function calculateResults(inputs: CalculatorInputs): CalculatorResults {
  // Target Premium calculation
  const targetPremium = inputs.premium2023 * (1 + inputs.growthRate / 100);
  
  // Renewal Premium calculation
  const renewalPremium = inputs.premium2023 * inputs.retentionRate / 100 * (1 + inputs.yearlyRateIncrease / 100);
  
  // New Business Requirement
  const newBusinessRequirement = targetPremium - renewalPremium;
  
  // New Policies Needed
  const newPoliciesNeeded = newBusinessRequirement / inputs.avgPremiumPerPolicy;
  
  // Submission Requirements - Current Process
  const submissionRequirements = newPoliciesNeeded / (inputs.submissionQuoted / 100 * inputs.quoteToBind / 100);
  
  // New Business - New Process
  const newProcessSubmissions = submissionRequirements;
  const newProcessNewBusiness = newProcessSubmissions * inputs.avgPremiumPerPolicy * 
    (inputs.quoteSubmissionRatio / 100) * (inputs.hitRatio / 100);

  // Validate and calculate ratios with precision
  const expenseRatio = calculatePreciseNumber(Math.max(0, Math.min(100, inputs.expenseRatio)));
  const lossRatio = calculatePreciseNumber(Math.max(0, Math.min(100, inputs.lossRatio)));
  const combinedRatio = calculatePreciseNumber(expenseRatio + lossRatio);

  // Calculate improvements with validation
  const expenseRatioImprovement = calculatePreciseNumber(Math.min(expenseRatio, inputs.expenseRatioImprovement));
  const lossRatioImprovement = calculatePreciseNumber(Math.min(lossRatio, inputs.lossRatioImprovement));

  // Calculate improved ratios
  const expenseRatioImproved = calculatePreciseNumber(expenseRatio - expenseRatioImprovement);
  const lossRatioImproved = calculatePreciseNumber(lossRatio - lossRatioImprovement);
  const combinedRatioImproved = calculatePreciseNumber(expenseRatioImproved + lossRatioImproved);

  // Financial calculations
  const expenses = newBusinessRequirement * (expenseRatio / 100);
  const loss = newBusinessRequirement * (lossRatio / 100);
  const underwritingIncome = newBusinessRequirement * (1 - expenseRatio/100 - lossRatio/100);

  // Improved process financial results
  const expensesImproved = newProcessNewBusiness * (expenseRatioImproved / 100);
  const lossImproved = newProcessNewBusiness * (lossRatioImproved / 100);
  const underwritingIncomeImproved = newProcessNewBusiness * (1 - expenseRatioImproved/100 - lossRatioImproved/100);

  // Net improvement
  const netImprovement = underwritingIncomeImproved - underwritingIncome;

  return {
    targetPremium,
    renewalPremium,
    newBusinessRequirement,
    newPoliciesNeeded,
    submissionRequirements,
    expenseRatio,
    lossRatio,
    combinedRatio,
    expenseRatioImproved,
    lossRatioImproved,
    combinedRatioImproved,
    expenses,
    loss,
    underwritingIncome,
    expensesImproved,
    lossImproved,
    underwritingIncomeImproved,
    netImprovement,
    selectedLOB: inputs.selectedLOB
  };
}