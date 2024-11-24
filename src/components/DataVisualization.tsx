import React from 'react';
import { CalculatorResults } from '../types';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

interface DataVisualizationProps {
  results: CalculatorResults;
}

export default function DataVisualization({ results }: DataVisualizationProps) {
  const ratioData = [
    {
      name: 'Current',
      'Expense Ratio': results.expenseRatio,
      'Loss Ratio': results.lossRatio,
    },
    {
      name: 'Improved',
      'Expense Ratio': results.expenseRatioImproved,
      'Loss Ratio': results.lossRatioImproved,
    },
  ];

  const incomeData = [
    {
      name: 'Current',
      'Underwriting Income': results.underwritingIncome / 1000000,
    },
    {
      name: 'Improved',
      'Underwriting Income': results.underwritingIncomeImproved / 1000000,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Ratio Comparison</h3>
        <div className="h-60 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ratioData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="Expense Ratio" fill="#4f46e5" />
              <Bar dataKey="Loss Ratio" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
          Underwriting Income (Millions)
        </h3>
        <div className="h-60 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={incomeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="Underwriting Income" fill="#059669" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}