import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { CalculatorInputs, CalculatorResults } from '../types';
import { Download } from 'lucide-react';
import PDFLogo from './PDFLogo';

interface NarrativeSectionProps {
  inputs: CalculatorInputs;
  results: CalculatorResults;
}

// Utility functions
const formatNumber = (value: number | undefined): string => {
  if (typeof value !== 'number' || isNaN(value)) return '0';
  return value.toLocaleString('en-US');
};

const formatCurrency = (value: number | undefined): string => {
  if (typeof value !== 'number' || isNaN(value)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const formatPercent = (value: number | undefined): string => {
  if (typeof value !== 'number' || isNaN(value)) return '0.0%';
  return value.toFixed(1) + '%';
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica'
  },
  header: {
    marginBottom: 20
  },
  logo: {
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1F2937'
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'medium',
    marginBottom: 15,
    color: '#1F2937'
  },
  section: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 8
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'medium',
    marginBottom: 10,
    color: '#1F2937'
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
    color: '#4B5563',
    marginBottom: 10
  },
  list: {
    marginTop: 10
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  label: {
    fontSize: 12,
    color: '#4B5563'
  },
  value: {
    fontSize: 12,
    fontWeight: 'medium',
    color: '#1F2937'
  },
  footer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#F9FAFB',
    borderRadius: 8
  },
  footerTitle: {
    fontSize: 14,
    fontWeight: 'medium',
    marginBottom: 10,
    color: '#1F2937'
  },
  footerText: {
    fontSize: 10,
    color: '#4B5563',
    marginBottom: 5
  },
  footerGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  footerColumn: {
    flex: 1
  },
  storySection: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 8
  },
  storyText: {
    fontSize: 12,
    lineHeight: 1.5,
    color: '#4B5563',
    marginBottom: 8
  }
});

const MyDocument = ({ inputs, results }: NarrativeSectionProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <PDFLogo />
        </View>
        <Text style={styles.title}>Growth Analysis Report</Text>
      </View>

      <View style={[styles.section, { backgroundColor: '#F9FAFB' }]}>
        <Text style={styles.subtitle}>
          Unlocking Growth and Profitability Through Advanced Submission and Underwriting Processes
        </Text>
        <Text style={styles.text}>
          At PS Advisory, we understand that meeting growth objectives while maintaining profitability is a constant 
          challenge for insurance carriers and MGAs. To help you achieve your goals, we've developed a dynamic 
          submission value calculator that identifies key areas for improvement and quantifies the financial impact 
          of enhanced operational processes.
        </Text>
      </View>

      <View style={[styles.storySection, { backgroundColor: '#EFF6FF' }]}>
        <Text style={styles.sectionTitle}>Your Growth Story</Text>
        <Text style={styles.storyText}>
          To achieve your target premium of {formatCurrency(results.targetPremium)}, 
          you'll need to write {formatCurrency(results.newBusinessRequirement)} in new business 
          after accounting for renewals.
        </Text>
        <Text style={styles.storyText}>
          With your current process, you need to review {formatNumber(results.submissionRequirements)} submissions 
          to achieve your new business goal. The improved process could help you write more business 
          from the same number of submissions.
        </Text>
        <Text style={styles.storyText}>
          By improving your submission process and reducing both expense and loss ratios, 
          you could increase your underwriting income by {formatCurrency(results.netImprovement)} annually.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: '#EFF6FF' }]}>
        <Text style={styles.sectionTitle}>Growth Analysis</Text>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text style={styles.label}>Current Premium Base:</Text>
            <Text style={styles.value}>{formatCurrency(inputs.premium2023)}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.label}>Target Growth Rate:</Text>
            <Text style={styles.value}>{formatPercent(inputs.growthRate)}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.label}>Required New Business:</Text>
            <Text style={styles.value}>{formatCurrency(results.newBusinessRequirement)}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: '#ECFDF5' }]}>
        <Text style={styles.sectionTitle}>Process Improvements</Text>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text style={styles.label}>Submissions Quoted:</Text>
            <Text style={styles.value}>
              {formatPercent(inputs.submissionQuoted)} → {formatPercent(inputs.quoteSubmissionRatio)}
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.label}>Quote-to-Bind Ratio:</Text>
            <Text style={styles.value}>
              {formatPercent(inputs.quoteToBind)} → {formatPercent(inputs.hitRatio)}
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.label}>Monthly Submissions:</Text>
            <Text style={styles.value}>{formatNumber(Math.round(results.submissionRequirements / 12))}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: '#EEF2FF' }]}>
        <Text style={styles.sectionTitle}>Financial Impact</Text>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text style={styles.label}>Expense Ratio:</Text>
            <Text style={styles.value}>
              {formatPercent(results.expenseRatio)} → {formatPercent(results.expenseRatioImproved)}
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.label}>Loss Ratio:</Text>
            <Text style={styles.value}>
              {formatPercent(results.lossRatio)} → {formatPercent(results.lossRatioImproved)}
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.label}>Combined Ratio:</Text>
            <Text style={styles.value}>
              {formatPercent(results.combinedRatio)} → {formatPercent(results.combinedRatioImproved)}
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: '#F5F3FF' }]}>
        <Text style={styles.sectionTitle}>Bottom Line Results</Text>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text style={styles.label}>Additional Premium:</Text>
            <Text style={styles.value}>{formatCurrency(results.newBusinessRequirement)}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.label}>Net Income Improvement:</Text>
            <Text style={styles.value}>{formatCurrency(results.netImprovement)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerTitle}>About PS Advisory</Text>
        <Text style={styles.text}>
          PS Advisory specializes in helping insurance carriers and MGAs maximize the value of their Salesforce investments. 
          With deep expertise in the insurance industry, we provide tailored solutions that optimize workflows, enhance 
          underwriting efficiency, and improve profitability.
        </Text>
        <View style={styles.footerGrid}>
          <View style={styles.footerColumn}>
            <Text style={styles.footerText}>Email: ContactUs@PSAdvisory.com</Text>
            <Text style={styles.footerText}>Website: www.psadvisory.com</Text>
          </View>
          <View style={styles.footerColumn}>
            <Text style={[styles.footerText, { textAlign: 'right' }]}>
              Let's build the future of insurance together!
            </Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default function NarrativeSection({ inputs, results }: NarrativeSectionProps) {
  const generatePDF = async () => {
    const blob = await pdf(<MyDocument inputs={inputs} results={results} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'insurance-growth-analysis.pdf';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Growth Analysis Report</h2>
        <button
          onClick={generatePDF}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Unlocking Growth and Profitability Through Advanced Submission and Underwriting Processes
          </h3>
          <p className="text-gray-600 mb-4">
            At PS Advisory, we understand that meeting growth objectives while maintaining profitability is a constant 
            challenge for insurance carriers and MGAs. To help you achieve your goals, we've developed a dynamic 
            submission value calculator that identifies key areas for improvement and quantifies the financial impact 
            of enhanced operational processes.
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Growth Story</h3>
          <div className="space-y-4">
            <p className="text-gray-600">
              To achieve your target premium of {formatCurrency(results.targetPremium)}, 
              you'll need to write {formatCurrency(results.newBusinessRequirement)} in new business 
              after accounting for renewals.
            </p>
            <p className="text-gray-600">
              With your current process, you need to review {formatNumber(results.submissionRequirements)} submissions 
              to achieve your new business goal. The improved process could help you write more business 
              from the same number of submissions.
            </p>
            <p className="text-gray-600">
              By improving your submission process and reducing both expense and loss ratios, 
              you could increase your underwriting income by {formatCurrency(results.netImprovement)} annually.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Growth Analysis</h4>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-600">Current Premium Base:</span>
                <span className="font-medium">{formatCurrency(inputs.premium2023)}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Target Growth Rate:</span>
                <span className="font-medium">{formatPercent(inputs.growthRate)}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Required New Business:</span>
                <span className="font-medium">{formatCurrency(results.newBusinessRequirement)}</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Process Improvements</h4>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-600">Submissions Quoted:</span>
                <span className="font-medium">
                  {formatPercent(inputs.submissionQuoted)} → {formatPercent(inputs.quoteSubmissionRatio)}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Quote-to-Bind Ratio:</span>
                <span className="font-medium">
                  {formatPercent(inputs.quoteToBind)} → {formatPercent(inputs.hitRatio)}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Monthly Submissions:</span>
                <span className="font-medium">{formatNumber(Math.round(results.submissionRequirements / 12))}</span>
              </li>
            </ul>
          </div>

          <div className="bg-indigo-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Financial Impact</h4>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-600">Expense Ratio:</span>
                <span className="font-medium">
                  {formatPercent(results.expenseRatio)} → {formatPercent(results.expenseRatioImproved)}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Loss Ratio:</span>
                <span className="font-medium">
                  {formatPercent(results.lossRatio)} → {formatPercent(results.lossRatioImproved)}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Combined Ratio:</span>
                <span className="font-medium">
                  {formatPercent(results.combinedRatio)} → {formatPercent(results.combinedRatioImproved)}
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-purple-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Bottom Line Results</h4>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-600">Additional Premium:</span>
                <span className="font-medium">{formatCurrency(results.newBusinessRequirement)}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Net Income Improvement:</span>
                <span className="font-medium">{formatCurrency(results.netImprovement)}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">About PS Advisory</h4>
          <p className="text-gray-600 mb-4">
            PS Advisory specializes in helping insurance carriers and MGAs maximize the value of their Salesforce investments. 
            With deep expertise in the insurance industry, we provide tailored solutions that optimize workflows, enhance 
            underwriting efficiency, and improve profitability.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p>Email: ContactUs@PSAdvisory.com</p>
              <p>Website: www.psadvisory.com</p>
            </div>
            <div className="text-right">
              <p>Let's build the future of insurance together!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}