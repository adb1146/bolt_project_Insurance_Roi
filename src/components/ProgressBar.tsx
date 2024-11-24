import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  totalSteps: number;
  completedSteps: number;
  currentStep: number;
}

export default function ProgressBar({ totalSteps, completedSteps, currentStep }: ProgressBarProps) {
  const progress = Math.min((completedSteps / totalSteps) * 100, 100);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Progress</span>
        <span className="text-sm font-medium text-indigo-600">{Math.round(progress)}% Complete</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-indigo-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="flex items-center">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
            completedSteps > 0 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
          }`}>
            {completedSteps > 0 ? <Check className="w-4 h-4" /> : '1'}
          </div>
          <span className="ml-2 text-sm text-gray-600">Basic Info</span>
        </div>
        <div className="flex items-center">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
            completedSteps > 4 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
          }`}>
            {completedSteps > 4 ? <Check className="w-4 h-4" /> : '2'}
          </div>
          <span className="ml-2 text-sm text-gray-600">Process Metrics</span>
        </div>
        <div className="flex items-center">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
            completedSteps > 8 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
          }`}>
            {completedSteps > 8 ? <Check className="w-4 h-4" /> : '3'}
          </div>
          <span className="ml-2 text-sm text-gray-600">Financial Impact</span>
        </div>
      </div>
    </div>
  );
}