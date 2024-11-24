import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X } from 'lucide-react';
import { CalculatorInputs, CalculatorResults } from '../types';
import { getChatCompletion } from '../lib/openai';
import { useChatStore } from '../store/chatStore';
import { LOBBenchmarks } from '../utils/benchmarks';

interface ChatBotProps {
  inputs: CalculatorInputs;
  results: CalculatorResults;
  onUpdateInputs: (name: string, value: string) => void;
  currentField: string | null;
  setCurrentField: (field: string | null) => void;
}

const fieldLabels: Record<string, string> = {
  selectedLOB: "Line of Business",
  premium2023: "Previous Full Year Premium",
  growthRate: "Growth Rate Target",
  retentionRate: "Retention Rate",
  yearlyRateIncrease: "Rate Increase",
  avgPremiumPerPolicy: "Average Premium per Policy",
  submissionQuoted: "Submissions Quoted",
  quoteToBind: "Quote to Bind Ratio",
  quoteSubmissionRatio: "New Quote Rate",
  hitRatio: "New Hit Ratio",
  expenseRatio: "Current Expense Ratio",
  lossRatio: "Current Loss Ratio",
  expenseRatioImprovement: "Expense Ratio Improvement",
  lossRatioImprovement: "Loss Ratio Improvement"
};

export default function ChatBot({ 
  inputs, 
  results, 
  onUpdateInputs,
  currentField,
  setCurrentField 
}: ChatBotProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    tabStates,
    currentTab,
    addMessage,
    setIsOpen,
    initializeTab
  } = useChatStore();

  const messages = tabStates[currentTab]?.messages || [];
  const isOpen = tabStates[currentTab]?.isOpen ?? true;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!tabStates[currentTab]) {
      initializeTab(currentTab);
    }
  }, [currentTab, initializeTab, tabStates]);

  useEffect(() => {
    if (!isLoading && chatInputRef.current) {
      chatInputRef.current.focus();
    }
  }, [isLoading]);

  const moveToNextField = (currentFieldName: string) => {
    if (currentFieldName !== 'selectedLOB') {
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
      
      const currentIndex = fields.indexOf(currentFieldName);
      if (currentIndex < fields.length - 1) {
        const nextField = fields[currentIndex + 1];
        setCurrentField(nextField);
      }
    }
  };

  const extractNumber = (text: string): string | null => {
    const patterns = [
      /\$([0-9,.]+)\s*(?:million|m)/i,
      /([0-9,.]+)\s*(?:million|m)/i,
      /\$([0-9,]+\.?[0-9]*)/,
      /([0-9,]+\.?[0-9]*)%/,
      /([0-9,]+\.?[0-9]*)/
    ];

    for (const pattern of patterns) {
      const matches = text.match(pattern);
      if (matches && matches[1]) {
        const cleanNumber = matches[1].replace(/,/g, '');
        
        if (pattern.source.includes('million')) {
          return (parseFloat(cleanNumber) * 1000000).toString();
        }
        
        return cleanNumber;
      }
    }

    return null;
  };

  const handleUserInput = (userInput: string) => {
    if (!currentField) return;

    const fieldLabel = fieldLabels[currentField];

    // Special handling for Line of Business field
    if (currentField === 'selectedLOB') {
      if (userInput.toLowerCase() === 'next') {
        onUpdateInputs('selectedLOB', 'General Liability');
        moveToNextField('selectedLOB');
        
        // Provide guidance for the next field
        const nextFieldLabel = fieldLabels['premium2023'];
        addMessage(currentTab, 
          `Great! I've set your Line of Business to General Liability. Now, let's enter your ${nextFieldLabel}. You can enter it as a number, with dollar signs, or use 'm' for millions (e.g., '10m' or '$10 million').`, 
          'assistant'
        );
      }
      return;
    }

    // Handle numerical inputs for other fields
    const number = extractNumber(userInput);
    if (number) {
      const numValue = parseFloat(number);
      if (!isNaN(numValue)) {
        let validatedValue = number;
        
        switch (currentField) {
          case 'premium2023':
            validatedValue = Math.max(0, numValue).toString();
            break;
          case 'growthRate':
          case 'retentionRate':
          case 'yearlyRateIncrease':
          case 'submissionQuoted':
          case 'quoteToBind':
          case 'quoteSubmissionRatio':
          case 'hitRatio':
          case 'expenseRatio':
          case 'lossRatio':
          case 'expenseRatioImprovement':
          case 'lossRatioImprovement':
            validatedValue = Math.min(100, Math.max(0, numValue)).toString();
            break;
          case 'avgPremiumPerPolicy':
            validatedValue = Math.max(0, numValue).toString();
            break;
        }
        
        onUpdateInputs(currentField, validatedValue);
        moveToNextField(currentField);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userInput = input.trim();
    addMessage(currentTab, userInput, 'user');
    setInput('');
    setIsLoading(true);

    try {
      const context = `Current field: ${currentField ? fieldLabels[currentField] : 'None'}
        Line of Business: ${inputs.selectedLOB || 'Not selected'}
        
        IMPORTANT:
        - If on Line of Business field, only proceed on "Next" command
        - Keep focus on Line of Business until user types "Next" or selects from dropdown
        - For other fields, validate numerical inputs before moving on
        - Always refer to fields by their display labels
        - Maintain field context throughout the conversation`;

      const chatMessages = [
        ...messages,
        { role: 'user', content: userInput, id: Date.now().toString() }
      ].map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }));

      chatMessages.unshift({
        role: 'system',
        content: context
      });

      const response = await getChatCompletion(chatMessages);

      if (response) {
        addMessage(currentTab, response, 'assistant');
        handleUserInput(userInput);
      }
    } catch (error) {
      console.error('Error in chat:', error);
      addMessage(currentTab, 'I apologize, but I encountered an error. Please try again or contact support if the issue persists.', 'assistant');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(currentTab, true)}
        className="fixed bottom-4 right-4 bg-indigo-600 text-white rounded-full p-3 shadow-lg hover:bg-indigo-700"
      >
        <Bot className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl border border-gray-200">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center">
          <Bot className="h-5 w-5 text-indigo-600 mr-2" />
          <span className="font-medium text-gray-700">Insurance Advisor</span>
        </div>
        <button
          onClick={() => setIsOpen(currentTab, false)}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="h-96 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.role === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                message.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-center text-gray-500">
            <div className="animate-pulse">Thinking...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isLoading}
            ref={chatInputRef}
          />
          <button
            type="submit"
            className={`bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}