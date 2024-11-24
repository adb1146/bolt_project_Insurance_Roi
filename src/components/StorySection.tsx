import React from 'react';
import { TrendingUp, Target, DollarSign, BarChart } from 'lucide-react';
import { CalculatorResults } from '../types';
import { LOBBenchmarks } from '../utils/benchmarks';

interface StorySectionProps {
  results: CalculatorResults;
  onChange: (name: string, value: string) => void;
}

export default function StorySection({ results, onChange }: StorySectionProps) {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const formatNumber = (value: number) => {
    return Math.round(value).toLocaleString('en-US');
  };

  // Safely get benchmarks for the selected LOB
  const benchmarks = results.selectedLOB ? LOBBenchmarks[results.selectedLOB as keyof typeof LOBBenchmarks] : null;

  if (!benchmarks) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Growth Story</h2>
        <div className="bg-amber-50 rounded-lg p-4">
          <p className="text-amber-800">
            Please select a Line of Business to view industry benchmarks and analysis.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Growth Story</h2>
      
      <div className="space-y-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <TrendingUp className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Growth Requirements</h3>
              <p className="text-gray-600">
                To achieve your target premium of {formatCurrency(results.targetPremium)}, 
                you'll need to write {formatCurrency(results.newBusinessRequirement)} in new business 
                after accounting for renewals.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Target className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Submission Process</h3>
              <p className="text-gray-600">
                With your current process, you need to review {formatNumber(results.submissionRequirements)} submissions 
                to achieve your new business goal. The improved process could help you write more business 
                from the same number of submissions.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <DollarSign className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Financial Impact</h3>
              <p className="text-gray-600">
                By improving your submission process and reducing both expense and loss ratios, 
                you could increase your underwriting income by {formatCurrency(results.netImprovement)} annually.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <BarChart className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {results.selectedLOB} Industry Benchmarks
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Combined Ratio Comparison</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Your Projected</p>
                      <p className="text-xl font-semibold text-purple-600">{results.combinedRatioImproved.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Industry Average</p>
                      <p className="text-xl font-semibold text-gray-600">{benchmarks.combinedRatio}%</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Top Quartile Benchmarks</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Loss Ratio: {benchmarks.topQuartile.lossRatio}</li>
                      <li>• Expense Ratio: {benchmarks.topQuartile.expenseRatio}</li>
                      <li>• Quote-to-Bind: {benchmarks.topQuartile.quoteToBind}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Industry Medians</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Loss Ratio: {benchmarks.median.lossRatio}</li>
                      <li>• Expense Ratio: {benchmarks.median.expenseRatio}</li>
                      <li>• Quote-to-Bind: {benchmarks.median.quoteToBind}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}