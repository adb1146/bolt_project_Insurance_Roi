import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { CalculatorResults } from '../types';

interface EmailResultsProps {
  results: CalculatorResults;
}

export default function EmailResults({ results }: EmailResultsProps) {
  const [emailForm, setEmailForm] = useState({
    name: '',
    email: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically integrate with your email service
    // For now, we'll just show a success message
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="bg-indigo-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Send className="h-5 w-5" />
          Email These Results
        </h3>
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={emailForm.name}
              onChange={(e) => setEmailForm(prev => ({ ...prev, name: e.target.value }))}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={emailForm.email}
              onChange={(e) => setEmailForm(prev => ({ ...prev, email: e.target.value }))}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSubmitted ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Sent!
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Results
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}