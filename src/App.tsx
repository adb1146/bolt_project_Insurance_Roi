import React, { useState, useEffect } from 'react';
import { Calculator as CalculatorIcon, FileText, Info } from 'lucide-react';
import Calculator from './components/Calculator';
import ChatBot from './components/ChatBot';
import Logo from './components/Logo';
import ProgressBar from './components/ProgressBar';
import InputSection from './components/InputSection';
import ResultsSection from './components/ResultsSection';
import StorySection from './components/StorySection';
import ContextSection from './components/ContextSection';
import NarrativeSection from './components/NarrativeSection';
import DataVisualization from './components/DataVisualization';
import ScenarioManager from './components/ScenarioManager';
import { useCalculatorStore } from './store/calculatorStore';
import { useChatStore } from './store/chatStore';
import { calculateResults } from './utils/calculations';
import { getFieldSuggestion } from './utils/suggestions';
import { Scenario } from './types';

function App() {
  const [currentTab, setCurrentTab] = useState('calculator');
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const {
    inputs,
    setField,
    currentField,
    setCurrentField,
    completedSteps,
    hasUserInput,
    isExampleData,
    resetToExample,
    resetToEmpty,
  } = useCalculatorStore();

  const { handleExampleDataLoaded, handleDataReset, setCurrentTab: setChatTab, addMessage } = useChatStore();

  useEffect(() => {
    setChatTab(currentTab);
  }, [currentTab, setChatTab]);

  const handleResetToExample = () => {
    resetToExample();
    handleExampleDataLoaded();
  };

  const handleResetToEmpty = () => {
    resetToEmpty();
    handleDataReset();
  };

  const results = calculateResults(inputs);

  const handleInputChange = (name: string, value: string) => {
    setField(name, value);
  };

  const handleLOBChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLOB = e.target.value;
    setField('selectedLOB', newLOB);
  };

  const handleFieldFocus = (fieldName: string) => {
    setCurrentField(fieldName);
    const suggestion = getFieldSuggestion(fieldName, inputs.selectedLOB);
    if (suggestion) {
      addMessage('calculator', suggestion, 'assistant');
    }
  };

  const handleSaveScenario = (name: string) => {
    const newScenario: Scenario = {
      inputs: { ...inputs, scenarioName: name },
      results,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setScenarios([...scenarios, newScenario]);
  };

  const handleLoadScenario = (scenario: Scenario) => {
    Object.entries(scenario.inputs).forEach(([key, value]) => {
      if (key !== 'scenarioName') {
        setField(key, value.toString());
      }
    });
  };

  const handleDeleteScenario = (id: string) => {
    setScenarios(scenarios.filter(s => s.id !== id));
  };

  const handleDuplicateScenario = (scenario: Scenario) => {
    const newScenario: Scenario = {
      ...scenario,
      inputs: { ...scenario.inputs, scenarioName: `${scenario.inputs.scenarioName} (Copy)` },
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setScenarios([...scenarios, newScenario]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Logo />
            <nav className="flex space-x-4">
              <button
                onClick={() => setCurrentTab('calculator')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentTab === 'calculator'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <CalculatorIcon className="h-5 w-5 inline-block mr-1" />
                Calculator
              </button>
              <button
                onClick={() => setCurrentTab('narrative')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentTab === 'narrative'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FileText className="h-5 w-5 inline-block mr-1" />
                Narrative
              </button>
              <button
                onClick={() => setCurrentTab('context')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentTab === 'context'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Info className="h-5 w-5 inline-block mr-1" />
                Context
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <button
              onClick={handleResetToEmpty}
              className="mr-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Reset
            </button>
            <button
              onClick={handleResetToExample}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Load Example Data
            </button>
          </div>
        </div>

        {currentTab === 'calculator' && (
          <div className="space-y-8">
            <ProgressBar
              totalSteps={13}
              completedSteps={completedSteps}
              currentStep={completedSteps + 1}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <InputSection
                  inputs={inputs}
                  onChange={handleInputChange}
                  highlightedField={currentField}
                  isExampleData={isExampleData}
                  onLOBChange={handleLOBChange}
                  onFieldFocus={handleFieldFocus}
                />
                <ScenarioManager
                  currentInputs={inputs}
                  currentResults={results}
                  scenarios={scenarios}
                  onSaveScenario={handleSaveScenario}
                  onLoadScenario={handleLoadScenario}
                  onDeleteScenario={handleDeleteScenario}
                  onDuplicateScenario={handleDuplicateScenario}
                />
              </div>
              <div className="space-y-8">
                <ResultsSection results={results} />
                <DataVisualization results={results} />
              </div>
            </div>
          </div>
        )}

        {currentTab === 'narrative' && (
          <div className="space-y-8">
            <NarrativeSection inputs={inputs} results={results} />
            <StorySection results={results} onChange={handleInputChange} />
          </div>
        )}

        {currentTab === 'context' && <ContextSection />}

        <ChatBot
          inputs={inputs}
          results={results}
          onUpdateInputs={handleInputChange}
          currentField={currentField}
          setCurrentField={setCurrentField}
        />
      </main>
    </div>
  );
}

export default App;