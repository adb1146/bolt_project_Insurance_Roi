import React, { useState } from 'react';
import { Save, Trash2, Copy, BarChart2 } from 'lucide-react';
import { Scenario, CalculatorInputs, CalculatorResults } from '../types';

interface ScenarioManagerProps {
  currentInputs: CalculatorInputs;
  currentResults: CalculatorResults;
  scenarios: Scenario[];
  onSaveScenario: (name: string) => void;
  onLoadScenario: (scenario: Scenario) => void;
  onDeleteScenario: (id: string) => void;
  onDuplicateScenario: (scenario: Scenario) => void;
}

export default function ScenarioManager({
  currentInputs,
  currentResults,
  scenarios,
  onSaveScenario,
  onLoadScenario,
  onDeleteScenario,
  onDuplicateScenario
}: ScenarioManagerProps) {
  const [newScenarioName, setNewScenarioName] = useState('');
  const [showComparison, setShowComparison] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (newScenarioName.trim()) {
      onSaveScenario(newScenarioName.trim());
      setNewScenarioName('');
    }
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Saved Scenarios</h3>
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <BarChart2 className="h-4 w-4 mr-2" />
          {showComparison ? 'Hide Comparison' : 'Compare Scenarios'}
        </button>
      </div>

      <form onSubmit={handleSave} className="flex gap-2">
        <input
          type="text"
          value={newScenarioName}
          onChange={(e) => setNewScenarioName(e.target.value)}
          placeholder="Enter scenario name"
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Current
        </button>
      </form>

      {showComparison && scenarios.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Scenario</th>
                <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Net Improvement</th>
                <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Combined Ratio</th>
                <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {scenarios.map((scenario) => (
                <tr key={scenario.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-900">{scenario.inputs.scenarioName}</td>
                  <td className="px-4 py-2 text-sm text-right text-gray-900">
                    {formatCurrency(scenario.results.netImprovement)}
                  </td>
                  <td className="px-4 py-2 text-sm text-right text-gray-900">
                    {scenario.results.combinedRatioImproved.toFixed(1)}%
                  </td>
                  <td className="px-4 py-2 text-sm text-right text-gray-500">
                    {new Date(scenario.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="space-y-2">
        {scenarios.map((scenario) => (
          <div
            key={scenario.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100"
          >
            <div>
              <h4 className="font-medium text-gray-900">{scenario.inputs.scenarioName}</h4>
              <p className="text-sm text-gray-500">
                Net Improvement: {formatCurrency(scenario.results.netImprovement)}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onLoadScenario(scenario)}
                className="p-1.5 text-gray-500 hover:text-indigo-600"
              >
                Load
              </button>
              <button
                onClick={() => onDuplicateScenario(scenario)}
                className="p-1.5 text-gray-500 hover:text-indigo-600"
              >
                <Copy className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDeleteScenario(scenario.id)}
                className="p-1.5 text-gray-500 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}