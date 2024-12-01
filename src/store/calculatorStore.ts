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

interface CalculatorState {
  inputs: CalculatorInputs;
  currentField: string | null;
  completedSteps: number;
  hasUserInput: boolean;
  isExampleData: boolean;
  shouldOfferReview: boolean;
  setField: (field: string, value: string | number) => void;
  setCurrentField: (field: string | null) => void;
  resetToExample: () => void;
  resetToEmpty: () => void;
  markAsExample: () => void;
  markAsUserInput: () => void;
  canProceed: boolean;
}

export const useCalculatorStore = create<CalculatorState>((set) => ({
  inputs: initialInputs,
  currentField: 'selectedLOB',
  completedSteps: 0,
  hasUserInput: false,
  isExampleData: false,
  shouldOfferReview: false,
  canProceed: false,

  setField: (field: string, value: string | number) => 
    set((state) => {
      const newInputs = { ...state.inputs };
      
      if (field === 'selectedLOB') {
        newInputs[field] = value as string;
        return {
          inputs: newInputs,
          hasUserInput: true,
          isExampleData: false,
          completedSteps: value ? Math.max(state.completedSteps, 1) : 0,
          canProceed: Boolean(value),
          shouldOfferReview: false
        };
      }

      // Block setting other fields if LOB is not selected
      if (!state.inputs.selectedLOB) {
        return state;
      }

      const numValue = typeof value === 'string' ? parseFloat(value) : value;
      newInputs[field as keyof CalculatorInputs] = numValue || 0;

      const newCompletedSteps = numValue > 0 ? Math.min(state.completedSteps + 1, 13) : state.completedSteps;
      const shouldOfferReview = newCompletedSteps === 13 && !state.isExampleData;

      return {
        inputs: newInputs,
        hasUserInput: true,
        isExampleData: false,
        completedSteps: newCompletedSteps,
        canProceed: Boolean(state.inputs.selectedLOB),
        shouldOfferReview
      };
    }),

  setCurrentField: (field: string | null) => set((state) => ({
    ...state,
    currentField: !state.inputs.selectedLOB ? 'selectedLOB' : field
  })),

  resetToExample: () => set({
    inputs: exampleInputs,
    isExampleData: true,
    currentField: 'selectedLOB',
    completedSteps: 13,
    hasUserInput: false,
    canProceed: true,
    shouldOfferReview: false
  }),

  resetToEmpty: () => set({
    inputs: initialInputs,
    isExampleData: false,
    currentField: 'selectedLOB',
    completedSteps: 0,
    hasUserInput: false,
    canProceed: false,
    shouldOfferReview: false
  }),

  markAsExample: () => set({ isExampleData: true, hasUserInput: false, shouldOfferReview: false }),
  markAsUserInput: () => set({ isExampleData: false, hasUserInput: true })
}));