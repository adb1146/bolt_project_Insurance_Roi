import React, { useState } from 'react';
import { Info, ChevronDown, ChevronRight, LineChart, Target, Clock, TrendingUp, CheckCircle } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

function AccordionItem({ title, icon, children }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="w-full flex items-center justify-between py-4 px-4 hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-semibold text-gray-900">{title}</span>
        </div>
        {isOpen ? <ChevronDown className="h-5 w-5 text-gray-500" /> : <ChevronRight className="h-5 w-5 text-gray-500" />}
      </button>
      {isOpen && <div className="px-4 pb-4 text-gray-600">{children}</div>}
    </div>
  );
}

export default function ContextSection() {
  return (
    <div className="bg-white rounded-xl shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Info className="h-6 w-6 text-indigo-600" />
          <h2 className="text-2xl font-semibold text-gray-800">Understanding the Calculator</h2>
        </div>
        <p className="text-gray-600">
          This calculator demonstrates the financial impact of optimizing your submission review and underwriting 
          processes through automation and enhanced risk selection. We'll show you how operational improvements 
          directly translate to increased underwriting profit.
        </p>
      </div>

      <div className="divide-y divide-gray-200">
        <AccordionItem 
          title="How It Works" 
          icon={<LineChart className="h-5 w-5 text-indigo-600" />}
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">1. Growth Requirements</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Start with your current premium ($1.37B in example)</li>
                <li>Factor in desired growth rate (8%)</li>
                <li>Account for retention (75%) and rate increases (7%)</li>
                <li>Calculate required new business ($381.5M in example)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">2. Process Efficiency</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Examines your submission funnel</li>
                <li>Percentage of submissions quoted (25% default)</li>
                <li>Quote-to-bind ratio (50% default)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">3. Process Improvement Impact</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Quote rate increase: 25% → 30%</li>
                <li>Hit ratio improvement: 50% → 55%</li>
                <li>Shows premium impact ($503.6M vs $381.5M)</li>
              </ul>
            </div>
          </div>
        </AccordionItem>

        <AccordionItem 
          title="Industry Benchmarks (2023)" 
          icon={<Target className="h-5 w-5 text-indigo-600" />}
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Expense Ratios</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Small Regional Carriers: 32-36%</li>
                <li>Mid-size Carriers: 28-32%</li>
                <li>Large Nationals: 25-29%</li>
                <li>Calculator Default: 25.7%</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Loss Ratios</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Industry Average: 61-65%</li>
                <li>Top Quartile: 58-61%</li>
                <li>Bottom Quartile: 65-68%</li>
                <li>Calculator Default: 63.8%</li>
              </ul>
            </div>
          </div>
        </AccordionItem>

        <AccordionItem 
          title="Typical Improvement Ranges" 
          icon={<TrendingUp className="h-5 w-5 text-indigo-600" />}
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Submission Review Rate</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Typical: 25-30%</li>
                <li>Good: 35-40%</li>
                <li>Best-in-class: 45%+</li>
                <li>Default Improvement: +5%</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Financial Metrics</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Expense Ratio: 1-2 points typical improvement</li>
                <li>Loss Ratio: 1-3 points typical improvement</li>
              </ul>
            </div>
          </div>
        </AccordionItem>

        <AccordionItem 
          title="Key Success Factors" 
          icon={<CheckCircle className="h-5 w-5 text-indigo-600" />}
        >
          <ul className="list-disc list-inside space-y-2">
            <li>Technology implementation must include process redesign</li>
            <li>Underwriter adoption and feedback is crucial</li>
            <li>Gradual improvement outperforms big-bang changes</li>
            <li>Regular measurement and parameter adjustment</li>
            <li>Balance efficiency with effectiveness</li>
          </ul>
        </AccordionItem>
      </div>

      <div className="p-4 bg-amber-50 rounded-b-xl">
        <p className="text-sm text-amber-800">
          <strong>Note:</strong> Calculator defaults are intentionally conservative, showing basic process enhancement. 
          Many carriers achieve 2-3x these improvements with comprehensive modernization.
        </p>
      </div>
    </div>
  );
}