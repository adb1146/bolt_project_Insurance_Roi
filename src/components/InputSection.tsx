import React from 'react';
import { Info } from 'lucide-react';
import { CalculatorInputs } from '../types';
import { LOBBenchmarks } from '../utils/benchmarks';

interface InputSectionProps {
  inputs: CalculatorInputs;
  onChange: (name: string, value: string) => void;
  highlightedField: string | null;
  isExampleData: boolean;
  onLOBChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onFieldFocus: (fieldName: string) => void;
}

interface InputFieldProps {
  label: string;
  name: string;
  value: number | string;
  onChange: (name: string, value: string) => void;
  description: string;
  isCurrency?: boolean;
  isGreen?: boolean;
  isHighlighted?: boolean;
  isExampleData?: boolean;
  isPercentage?: boolean;
  onFieldFocus: (fieldName: string) => void;
}

function InputField({ 
  label, 
  name, 
  value, 
  onChange, 
  description, 
  isCurrency = false, 
  isGreen = false,
  isHighlighted = false,
  isExampleData = false,
  isPercentage = false,
  onFieldFocus
}: InputFieldProps) {
  const formattedValue = typeof value === 'number' && isCurrency 
    ? value.toLocaleString('en-US', { maximumFractionDigits: 0 })
    : value.toString();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9.-]+/g, '');
    onChange(name, rawValue);
  };

  return (
    <div 
      className={`p-3 sm:p-4 rounded-lg transition-colors duration-300 ${
        isHighlighted 
          ? 'bg-indigo-100 ring-2 ring-indigo-500 shadow-lg' 
          : isGreen 
            ? 'bg-green-50' 
            : 'bg-gray-50'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
        <label htmlFor={name} className={`block text-sm font-medium mb-1 sm:mb-0 ${isHighlighted ? 'text-indigo-700' : 'text-gray-700'}`}>
          {label}
          {isExampleData && <span className="ml-2 text-xs text-indigo-600">(Example)</span>}
        </label>
        <div className="group relative">
          <Info className={`h-4 w-4 ${isHighlighted ? 'text-indigo-400' : 'text-gray-400'} cursor-help`} />
          <div className="invisible group-hover:visible absolute right-0 w-64 p-2 mt-1 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            {description}
          </div>
        </div>
      </div>
      <div className="relative">
        {isCurrency && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
        )}
        {isPercentage && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">%</span>
          </div>
        )}
        <input
          type="text"
          name={name}
          id={name}
          value={formattedValue}
          onChange={handleChange}
          onFocus={() => onFieldFocus(name)}
          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            isCurrency ? 'pl-7' : ''
          } ${
            isPercentage ? 'pr-7' : ''
          } ${
            isHighlighted ? 'border-indigo-300' : ''
          }`}
          placeholder={isExampleData ? "Enter your value" : ""}
        />
      </div>
    </div>
  );
}

export default function InputSection({ 
  inputs, 
  onChange, 
  highlightedField, 
  isExampleData, 
  onLOBChange,
  onFieldFocus 
}: InputSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
      <div className="space-y-6 sm:space-y-8">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Line of Business</h3>
          <div className={`p-4 rounded-lg ${highlightedField === 'selectedLOB' ? 'bg-indigo-100 ring-2 ring-indigo-500' : 'bg-gray-50'}`}>
            <label htmlFor="selectedLOB" className="block text-sm font-medium text-gray-700 mb-2">
              Select Line of Business for Benchmarking
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              id="selectedLOB"
              name="selectedLOB"
              value={inputs.selectedLOB}
              onChange={onLOBChange}
              onFocus={() => onFieldFocus('selectedLOB')}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select a Line of Business</option>
              {Object.keys(LOBBenchmarks).map((lob) => (
                <option key={lob} value={lob}>
                  {lob}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Current Business State</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4">Let's start by understanding your current business metrics</p>
          <div className="space-y-4">
            <InputField
              label="Previous Full Year Premium"
              name="premium2023"
              value={inputs.premium2023}
              onChange={onChange}
              onFieldFocus={onFieldFocus}
              description="Total written premium from the previous full year"
              isCurrency={true}
              isHighlighted={highlightedField === 'premium2023'}
              isExampleData={isExampleData}
            />
            <InputField
              label="Growth Rate Target"
              name="growthRate"
              value={inputs.growthRate}
              onChange={onChange}
              onFieldFocus={onFieldFocus}
              description="Target percentage growth for the current year"
              isPercentage={true}
              isHighlighted={highlightedField === 'growthRate'}
              isExampleData={isExampleData}
            />
            <InputField
              label="Retention Rate"
              name="retentionRate"
              value={inputs.retentionRate}
              onChange={onChange}
              onFieldFocus={onFieldFocus}
              description="Expected percentage of policies that will renew"
              isPercentage={true}
              isHighlighted={highlightedField === 'retentionRate'}
              isExampleData={isExampleData}
            />
            <InputField
              label="Rate Increase"
              name="yearlyRateIncrease"
              value={inputs.yearlyRateIncrease}
              onChange={onChange}
              onFieldFocus={onFieldFocus}
              description="Expected rate increase on renewal business"
              isPercentage={true}
              isHighlighted={highlightedField === 'yearlyRateIncrease'}
              isExampleData={isExampleData}
            />
            <InputField
              label="Average Premium per Policy"
              name="avgPremiumPerPolicy"
              value={inputs.avgPremiumPerPolicy}
              onChange={onChange}
              onFieldFocus={onFieldFocus}
              description="Average premium per policy for new business"
              isCurrency={true}
              isHighlighted={highlightedField === 'avgPremiumPerPolicy'}
              isExampleData={isExampleData}
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Current Process Metrics</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4">Help us understand your current submission process</p>
          <div className="space-y-4">
            <InputField
              label="Submissions Quoted"
              name="submissionQuoted"
              value={inputs.submissionQuoted}
              onChange={onChange}
              onFieldFocus={onFieldFocus}
              description="Percentage of submissions that receive a quote"
              isPercentage={true}
              isHighlighted={highlightedField === 'submissionQuoted'}
              isExampleData={isExampleData}
            />
            <InputField
              label="Quote to Bind Ratio"
              name="quoteToBind"
              value={inputs.quoteToBind}
              onChange={onChange}
              onFieldFocus={onFieldFocus}
              description="Percentage of quotes that convert to bound policies"
              isPercentage={true}
              isHighlighted={highlightedField === 'quoteToBind'}
              isExampleData={isExampleData}
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Process Improvements</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4">Expected improvements with enhanced processes</p>
          <div className="space-y-4">
            <InputField
              label="New Quote Rate"
              name="quoteSubmissionRatio"
              value={inputs.quoteSubmissionRatio}
              onChange={onChange}
              onFieldFocus={onFieldFocus}
              description="Target percentage of submissions quoted with improved process"
              isPercentage={true}
              isGreen={true}
              isHighlighted={highlightedField === 'quoteSubmissionRatio'}
              isExampleData={isExampleData}
            />
            <InputField
              label="New Hit Ratio"
              name="hitRatio"
              value={inputs.hitRatio}
              onChange={onChange}
              onFieldFocus={onFieldFocus}
              description="Target quote to bind ratio with improved process"
              isPercentage={true}
              isGreen={true}
              isHighlighted={highlightedField === 'hitRatio'}
              isExampleData={isExampleData}
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Financial Impact</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4">Current ratios and expected improvements</p>
          <div className="space-y-4">
            <InputField
              label="Current Expense Ratio"
              name="expenseRatio"
              value={inputs.expenseRatio}
              onChange={onChange}
              onFieldFocus={onFieldFocus}
              description="Current expense ratio as a percentage of premium"
              isPercentage={true}
              isHighlighted={highlightedField === 'expenseRatio'}
              isExampleData={isExampleData}
            />
            <InputField
              label="Current Loss Ratio"
              name="lossRatio"
              value={inputs.lossRatio}
              onChange={onChange}
              onFieldFocus={onFieldFocus}
              description="Current loss ratio as a percentage of premium"
              isPercentage={true}
              isHighlighted={highlightedField === 'lossRatio'}
              isExampleData={isExampleData}
            />
            <InputField
              label="Expense Ratio Improvement"
              name="expenseRatioImprovement"
              value={inputs.expenseRatioImprovement}
              onChange={onChange}
              onFieldFocus={onFieldFocus}
              description="Expected reduction in expense ratio (percentage points)"
              isPercentage={true}
              isGreen={true}
              isHighlighted={highlightedField === 'expenseRatioImprovement'}
              isExampleData={isExampleData}
            />
            <InputField
              label="Loss Ratio Improvement"
              name="lossRatioImprovement"
              value={inputs.lossRatioImprovement}
              onChange={onChange}
              onFieldFocus={onFieldFocus}
              description="Expected reduction in loss ratio (percentage points)"
              isPercentage={true}
              isGreen={true}
              isHighlighted={highlightedField === 'lossRatioImprovement'}
              isExampleData={isExampleData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}