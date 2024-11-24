import { create } from 'zustand';
import { CalculatorInputs } from '../types';

const initialInputs: CalculatorInputs = {
  premium2023: 0,
  growthRate: 0,
  retentionRate: 0,
  yearlyRateIncrease: 0,
  avgPremiumPerPolicy: 0,
  submissionQuoted: 0,
  quoteToBind: 0,
  quoteSubmissionRatio: 0,
  hitRatio: 0,
  expenseRatio: 0,
  lossRatio: 0,
  expenseRatioImprovement: 0,
  lossRatioImprovement: 0,
  selectedLOB: ''
};

const exampleInputs: CalculatorInputs = {
  premium2023: 1374812000,
  growthRate: 8,
  retentionRate: 75,
  yearlyRateIncrease: 7,
  avgPremiumPerPolicy: 10000,
  submissionQuoted: 25,
  quoteToBind: 50,
  quoteSubmissionRatio: 30,
  hitRatio: 55,
  expenseRatio: 25.7,
  lossRatio: 63.8,
  expenseRatioImprovement: 1,
  lossRatioImprovement: 1,
  selectedLOB: 'General Liability'
};

const fields = [
  'selectedLOB',
  'premium2023',
  'growthRate',
  'retentionRate',
  'yearlyRateIncrease',
  'avgPremiumPerPolicy',
  'submissionQuoted',
  'quoteToBind',
  'quoteSubmissionRatio',
  'hitRatio',
  'expenseRatio',
  'lossRatio',
  'expenseRatioImprovement',
  'lossRatioImprovement'
];

export const useCalculatorStore = create<CalculatorState>((set) => ({
  inputs: initialInputs,
  isExampleData: false,
  currentField: 'selectedLOB',
  completedSteps: 0,
  hasUserInput: false,

  setField: (field: string, value: string | number) => 
    set((state) => {
      const newInputs = { ...state.inputs };
      
      if (field === 'selectedLOB') {
        newInputs[field] = value as string;
        return {
          inputs: newInputs,
          currentField: 'premium2023',
          hasUserInput: true,
          isExampleData: false,
          completedSteps: state.completedSteps + 1
        };
      }

      const numValue = typeof value === 'string' ? parseFloat(value) : value;
      newInputs[field as keyof CalculatorInputs] = numValue || 0;

      const currentIndex = fields.indexOf(field);
      const nextField = currentIndex < fields.length - 1 ? fields[currentIndex + 1] : null;

      const newCompletedSteps = numValue > 0 && !state.isExampleData
        ? Math.min(state.completedSteps + 1, fields.length)
        : state.completedSteps;

      return {
        inputs: newInputs,
        currentField: nextField,
        completedSteps: newCompletedSteps,
        hasUserInput: true,
        isExampleData: false
      };
    }),

  setCurrentField: (field: string | null) => set({ currentField: field }),

  resetToExample: () => set({
    inputs: exampleInputs,
    isExampleData: true,
    currentField: 'selectedLOB',
    completedSteps: fields.length,
    hasUserInput: false
  }),

  resetToEmpty: () => set({
    inputs: initialInputs,
    isExampleData: false,
    currentField: 'selectedLOB',
    completedSteps: 0,
    hasUserInput: false
  }),

  markAsExample: () => set({ isExampleData: true, hasUserInput: false }),
  markAsUserInput: () => set({ isExampleData: false, hasUserInput: true })
}));