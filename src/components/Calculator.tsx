import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Clock, Target, TrendingUp, AlertCircle } from 'lucide-react';

interface ROIMetrics {
  annualSavings: number;
  threeYearROI: number;
  paybackPeriod: number;
  netPresentValue: number;
}

export default function ROICalculator() {
  const [inputs, setInputs] = useState({
    submissionsPerMonth: 100,
    avgPremiumValue: 5000,
    currentProcessingTime: 4,
    expectedProcessingTime: 1,
    errorRate: 15,
    expectedErrorRate: 3,
    employeeCost: 35,
    implementationCost: 50000,
  });

  const [metrics, setMetrics] = useState<ROIMetrics>({
    annualSavings: 0,
    threeYearROI: 0,
    paybackPeriod: 0,
    netPresentValue: 0,
  });

  useEffect(() => {
    calculateROI();
  }, [inputs]);

  const calculateROI = () => {
    // Time savings calculation
    const hoursPerMonth = (inputs.submissionsPerMonth * (inputs.currentProcessingTime - inputs.expectedProcessingTime));
    const annualTimeSavings = hoursPerMonth * 12 * inputs.employeeCost;

    // Error reduction savings
    const errorReduction = (inputs.errorRate - inputs.expectedErrorRate) / 100;
    const annualErrorSavings = inputs.submissionsPerMonth * 12 * inputs.avgPremiumValue * errorReduction * 0.05;

    // Revenue growth from increased capacity
    const additionalCapacity = Math.floor((hoursPerMonth * 0.7) / inputs.expectedProcessingTime);
    const annualRevenueGrowth = additionalCapacity * 12 * inputs.avgPremiumValue * 0.1;

    const totalAnnualSavings = annualTimeSavings + annualErrorSavings + annualRevenueGrowth;
    
    // ROI Calculations
    const threeYearSavings = totalAnnualSavings * 3;
    const threeYearROI = ((threeYearSavings - inputs.implementationCost) / inputs.implementationCost) * 100;
    const paybackPeriod = inputs.implementationCost / totalAnnualSavings;
    
    // NPV Calculation (assuming 10% discount rate)
    const discountRate = 0.1;
    const npv = -inputs.implementationCost +
      totalAnnualSavings / (1 + discountRate) +
      totalAnnualSavings / Math.pow(1 + discountRate, 2) +
      totalAnnualSavings / Math.pow(1 + discountRate, 3);

    setMetrics({
      annualSavings: totalAnnualSavings,
      threeYearROI: threeYearROI,
      paybackPeriod: paybackPeriod,
      netPresentValue: npv,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Calculator className="h-10 w-10 text-indigo-600" />
            Salesforce ROI Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Measure the financial impact of Salesforce on your insurance submission process
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Input Parameters</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Submissions
                </label>
                <input
                  type="number"
                  name="submissionsPerMonth"
                  value={inputs.submissionsPerMonth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Average Premium Value ($)
                </label>
                <input
                  type="number"
                  name="avgPremiumValue"
                  value={inputs.avgPremiumValue}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Processing Time (hours)
                  </label>
                  <input
                    type="number"
                    name="currentProcessingTime"
                    value={inputs.currentProcessingTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expected Processing Time (hours)
                  </label>
                  <input
                    type="number"
                    name="expectedProcessingTime"
                    value={inputs.expectedProcessingTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Error Rate (%)
                  </label>
                  <input
                    type="number"
                    name="errorRate"
                    value={inputs.errorRate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expected Error Rate (%)
                  </label>
                  <input
                    type="number"
                    name="expectedErrorRate"
                    value={inputs.expectedErrorRate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employee Hourly Cost ($)
                </label>
                <input
                  type="number"
                  name="employeeCost"
                  value={inputs.employeeCost}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Implementation Cost ($)
                </label>
                <input
                  type="number"
                  name="implementationCost"
                  value={inputs.implementationCost}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">ROI Analysis</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-indigo-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <DollarSign className="h-6 w-6 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Annual Savings</h3>
                </div>
                <p className="text-3xl font-bold text-indigo-600">
                  ${metrics.annualSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-800">3-Year ROI</h3>
                </div>
                <p className="text-3xl font-bold text-green-600">
                  {metrics.threeYearROI.toFixed(1)}%
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Payback Period</h3>
                </div>
                <p className="text-3xl font-bold text-blue-600">
                  {metrics.paybackPeriod.toFixed(1)} years
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="h-6 w-6 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Net Present Value</h3>
                </div>
                <p className="text-3xl font-bold text-purple-600">
                  ${metrics.netPresentValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>

            <div className="mt-8 bg-amber-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Insights</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Process efficiency improvement: {((inputs.currentProcessingTime - inputs.expectedProcessingTime) / inputs.currentProcessingTime * 100).toFixed(1)}%</li>
                    <li>Error rate reduction: {(inputs.errorRate - inputs.expectedErrorRate).toFixed(1)} percentage points</li>
                    <li>Additional monthly capacity: {Math.floor((inputs.submissionsPerMonth * (inputs.currentProcessingTime - inputs.expectedProcessingTime) * 0.7) / inputs.expectedProcessingTime)} submissions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}