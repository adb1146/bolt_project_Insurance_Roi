import React from 'react';
import { AlertCircle } from 'lucide-react';
import { CalculatorResults } from '../types';

interface ResultsSectionProps {
  results: CalculatorResults;
}

export default function ResultsSection({ results }: ResultsSectionProps) {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const formatPercent = (value: number) => {
    return value.toFixed(1) + '%';
  };

  const getRatioColor = (value: number) => {
    if (value < 85) return 'text-green-600';
    if (value < 95) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
      <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Results</h2>

      <div className="mb-6 sm:mb-8 overflow-x-auto">
        <table className="w-full min-w-[300px]">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-2"></th>
              <th className="text-right py-2 px-2 sm:px-4">Today's System</th>
              <th className="text-right py-2 px-2 sm:px-4">Improved Process</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-2">Expense Ratio</td>
              <td className="text-right px-2 sm:px-4" data-testid="expense-ratio">
                {formatPercent(results.expenseRatio)}
              </td>
              <td className="text-right px-2 sm:px-4" data-testid="expense-ratio-improved">
                {formatPercent(results.expenseRatioImproved)}
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2">Loss Ratio</td>
              <td className="text-right px-2 sm:px-4" data-testid="loss-ratio">
                {formatPercent(results.lossRatio)}
              </td>
              <td className="text-right px-2 sm:px-4" data-testid="loss-ratio-improved">
                {formatPercent(results.lossRatioImproved)}
              </td>
            </tr>
            <tr className="border-b border-gray-100 bg-gray-50">
              <td className="py-2 font-semibold">Combined Ratio</td>
              <td className="text-right px-2 sm:px-4 font-semibold" data-testid="combined-ratio">
                <span className={getRatioColor(results.combinedRatio)}>
                  {formatPercent(results.combinedRatio)}
                </span>
              </td>
              <td className="text-right px-2 sm:px-4 font-semibold" data-testid="combined-ratio-improved">
                <span className={getRatioColor(results.combinedRatioImproved)}>
                  {formatPercent(results.combinedRatioImproved)}
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-4 flex items-start gap-2 text-sm text-gray-600">
          <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <p>
            Combined Ratio below 85% is excellent, 85-95% is good, and above 95% needs attention.
          </p>
        </div>
      </div>

      <div className="mb-6 sm:mb-8">
        <h3 className="text-base sm:text-lg font-semibold mb-4">Underwriting Income on New Business</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[300px]">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2"></th>
                <th className="text-right py-2 px-2 sm:px-4">Today's System</th>
                <th className="text-right py-2 px-2 sm:px-4">Improved Process</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2">Expenses</td>
                <td className="text-right px-2 sm:px-4">{formatCurrency(results.expenses)}</td>
                <td className="text-right px-2 sm:px-4">{formatCurrency(results.expensesImproved)}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2">Loss</td>
                <td className="text-right px-2 sm:px-4">{formatCurrency(results.loss)}</td>
                <td className="text-right px-2 sm:px-4">{formatCurrency(results.lossImproved)}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 font-semibold">Underwriting Income</td>
                <td className="text-right px-2 sm:px-4 font-semibold">{formatCurrency(results.underwritingIncome)}</td>
                <td className="text-right px-2 sm:px-4 font-semibold">{formatCurrency(results.underwritingIncomeImproved)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold mb-2">Net Improvement</h3>
        <p className="text-2xl sm:text-3xl font-bold text-green-600">
          {formatCurrency(results.netImprovement)}
        </p>
      </div>
    </div>
  );
}