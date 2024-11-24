import React from 'react';

interface QuickStartProps {
  onApply: (preset: string) => void;
}

const presets = {
  small: {
    name: 'Small Regional Carrier',
    premium2023: 250000000,
    growthRate: 6,
    retentionRate: 78,
    yearlyRateIncrease: 5,
    avgPremiumPerPolicy: 8000,
    submissionQuoted: 20,
    quoteToBind: 45,
    quoteSubmissionRatio: 25,
    hitRatio: 50,
    expenseRatio: 32,
    lossRatio: 65,
    expenseRatioImprovement: 1,
    lossRatioImprovement: 1
  },
  mid: {
    name: 'Mid-Size Carrier',
    premium2023: 750000000,
    growthRate: 8,
    retentionRate: 82,
    yearlyRateIncrease: 6,
    avgPremiumPerPolicy: 12000,
    submissionQuoted: 25,
    quoteToBind: 50,
    quoteSubmissionRatio: 30,
    hitRatio: 55,
    expenseRatio: 28,
    lossRatio: 63,
    expenseRatioImprovement: 1.5,
    lossRatioImprovement: 1.5
  },
  large: {
    name: 'Large National Carrier',
    premium2023: 2000000000,
    growthRate: 10,
    retentionRate: 85,
    yearlyRateIncrease: 7,
    avgPremiumPerPolicy: 15000,
    submissionQuoted: 30,
    quoteToBind: 55,
    quoteSubmissionRatio: 35,
    hitRatio: 60,
    expenseRatio: 25,
    lossRatio: 61,
    expenseRatioImprovement: 2,
    lossRatioImprovement: 2
  }
};

export default function QuickStart({ onApply }: QuickStartProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Object.entries(presets).map(([key, preset]) => (
        <button
          key={key}
          onClick={() => onApply(key)}
          className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-md transition-all"
        >
          <h4 className="font-semibold text-gray-900 mb-2">{preset.name}</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Premium: ${(preset.premium2023 / 1000000).toFixed(0)}M</li>
            <li>Growth: {preset.growthRate}%</li>
            <li>Combined: {preset.expenseRatio + preset.lossRatio}%</li>
          </ul>
        </button>
      ))}
    </div>
  );
}