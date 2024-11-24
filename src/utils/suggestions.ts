import { LOBBenchmarks } from './benchmarks';

export const getFieldSuggestion = (field: string, selectedLOB: string): string => {
  const benchmarks = LOBBenchmarks[selectedLOB as keyof typeof LOBBenchmarks];
  
  if (!benchmarks) return '';

  const fieldLabels: Record<string, string> = {
    selectedLOB: "Line of Business",
    premium2023: "Previous Full Year Premium",
    growthRate: "Growth Rate Target",
    retentionRate: "Retention Rate",
    yearlyRateIncrease: "Rate Increase",
    avgPremiumPerPolicy: "Average Premium per Policy",
    submissionQuoted: "Submissions Quoted",
    quoteToBind: "Quote to Bind Ratio",
    quoteSubmissionRatio: "New Quote Rate",
    hitRatio: "New Hit Ratio",
    expenseRatio: "Current Expense Ratio",
    lossRatio: "Current Loss Ratio",
    expenseRatioImprovement: "Expense Ratio Improvement",
    lossRatioImprovement: "Loss Ratio Improvement"
  };

  const fieldLabel = fieldLabels[field] || field;

  const suggestions: Record<string, string> = {
    selectedLOB: "I can help you understand the benchmarks and performance metrics for different lines of business. Would you like to explore the options?",
    premium2023: `Based on your line of business, I can help you enter your Previous Full Year Premium. You can use formats like "$1,000,000", "1m", or "1 million". What was your premium?`,
    growthRate: `For ${selectedLOB}, typical Growth Rate Targets range from 5-10%. What's your target growth rate for this year?`,
    retentionRate: `Top performers in ${selectedLOB} typically achieve 80-85% Retention Rate. What's your current retention rate?`,
    yearlyRateIncrease: `Market conditions for ${selectedLOB} suggest Rate Increases of 3-8%. What rate increase do you expect?`,
    avgPremiumPerPolicy: `For ${selectedLOB}, Average Premium per Policy typically ranges from $8,000 to $15,000. What's your average?`,
    submissionQuoted: `The industry average for Submissions Quoted in ${selectedLOB} is ${benchmarks.median.quoteToBind}. What percentage of your submissions receive quotes?`,
    quoteToBind: `Top performers achieve a Quote to Bind Ratio of ${benchmarks.topQuartile.quoteToBind}. What's your current ratio?`,
    quoteSubmissionRatio: `With process improvements, you could target a New Quote Rate of ${benchmarks.topQuartile.quoteToBind}. What's your target?`,
    hitRatio: `Best-in-class carriers achieve a New Hit Ratio 5-10% above median (${benchmarks.median.quoteToBind}). What's your target?`,
    expenseRatio: `Current median Expense Ratio is ${benchmarks.median.expenseRatio}, top quartile is ${benchmarks.topQuartile.expenseRatio}. What's yours?`,
    lossRatio: `Industry median Loss Ratio is ${benchmarks.median.lossRatio}, top quartile is ${benchmarks.topQuartile.lossRatio}. What's yours?`,
    expenseRatioImprovement: "Most carriers target 1-2 points of Expense Ratio Improvement. What improvement do you expect?",
    lossRatioImprovement: "Process improvements typically yield 1-3 points of Loss Ratio Improvement. What's your target?"
  };

  return suggestions[field] || '';
};