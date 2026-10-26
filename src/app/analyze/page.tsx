"use client";

import React, { useState, useMemo } from 'react';
import { analyzeDeal, calculateProjections, PropertyInputs, CalculationResults } from '@/lib/calculations';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { MetricDisplay } from '@/components/ui/MetricDisplay';

const DEFAULT_INPUTS: PropertyInputs = {
  purchasePrice: 250000,
  downPayment: 50000,
  monthlyRent: 2000,
  closingCosts: 5000,
  renovationCosts: 10000,
  mortgageInterestRate: 6.5,
  mortgageTerm: 30,
  amortizationPeriod: 30,
  propertyTax: 200,
  insurance: 100,
  maintenance: 150,
  propertyManagement: 200,
  utilities: 100,
  hoaFees: 0,
  otherExpenses: 50,
  vacancyRate: 5,
  appreciationRate: 3,
};

export default function AnalyzePage() {
  const [inputs, setInputs] = useState<PropertyInputs>(DEFAULT_INPUTS);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (field: keyof PropertyInputs, value: string) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0,
    }));
  };

  const results = useMemo(() => analyzeDeal(inputs), [inputs]);
  const projections = useMemo(() => calculateProjections(inputs, results), [inputs, results]);

  if (showResults) {
    return (
      <div className="min-h-screen bg-slate-900 text-white max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Deal Analysis</h1>
          <Button variant="outline" onClick={() => setShowResults(false)}>Edit Inputs</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-l-4 border-l-indigo-500">
            <MetricDisplay
              label="Monthly Cash Flow"
              value={`$${results.monthlyCashFlow.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
              trend={results.monthlyCashFlow > 0 ? 'positive' : 'negative'}
            />
          </Card>
          <Card className="border-l-4 border-l-emerald-500">
            <MetricDisplay
              label="Annual Cash Flow"
              value={`$${results.annualCashFlow.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
              trend={results.annualCashFlow > 0 ? 'positive' : 'negative'}
            />
          </Card>
          <Card className="border-l-4 border-l-amber-500">
            <MetricDisplay
              label="Cash-on-Cash Return"
              value={`${results.cashOnCashReturn.toFixed(2)}%`}
              trend={results.cashOnCashReturn > 8 ? 'positive' : 'neutral'}
            />
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-800 border-slate-700 text-white">
              <h2 className="text-xl font-semibold mb-6 text-white">Detailed Metrics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <MetricDisplay label="Gross Rental Yield" value={`${results.grossRentalYield.toFixed(2)}%`} />
                <MetricDisplay label="Net Rental Yield" value={`${results.netRentalYield.toFixed(2)}%`} />
                <MetricDisplay label="Cap Rate" value={`${results.capRate.toFixed(2)}%`} />
                <MetricDisplay label="Break-Even Rent" value={`$${results.breakEvenRent.toLocaleString(undefined, { maximumFractionDigits: 2 })}/mo`} />
                <MetricDisplay label="Total Initial Investment" value={`$${results.totalInitialInvestment.toLocaleString()}`} />
                <MetricDisplay label="Monthly Mortgage" value={`$${results.monthlyMortgagePayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} />
              </div>
            </Card>

            <Card className="bg-slate-800 border-slate-700 text-white">
              <h2 className="text-xl font-semibold mb-4 text-white">Analysis Summary</h2>
              <p className="text-slate-300 leading-relaxed">
                This property produces a monthly cash flow of <span className={results.monthlyCashFlow > 0 ? 'text-emerald-400 font-medium' : 'text-rose-400 font-medium'}>
                  ${results.monthlyCashFlow.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span> after all operating expenses and mortgage payments.
                The cash-on-cash return is {results.cashOnCashReturn.toFixed(2)}%, meaning you earn back {results.cashOnCashReturn.toFixed(1)}% of your initial investment annually through cash flow.
              </p>
            </Card>

            <Card className="bg-slate-800 border-slate-700 text-white">
              <h2 className="text-xl font-semibold mb-6 text-white">Long-term Projections</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-700 text-slate-300">
                    <tr>
                      <th className="p-3 font-semibold border-b border-slate-600">Year</th>
                      <th className="p-3 font-semibold border-b border-slate-600">Estimated Value</th>
                      <th className="p-3 font-semibold border-b border-slate-600">Mortgage Balance</th>
                      <th className="p-3 font-semibold border-b border-slate-600">Estimated Equity</th>
                      <th className="p-3 font-semibold border-b border-slate-600">Cumulative Cash Flow</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {projections.map((proj) => (
                      <tr key={proj.year}>
                        <td className="p-3 font-medium">{proj.year}</td>
                        <td className="p-3">${proj.estimatedValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                        <td className="p-3">${proj.mortgageBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                        <td className="p-3 text-emerald-400 font-semibold">${proj.equity.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                        <td className="p-3">${proj.cumulativeCashFlow.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-slate-500 italic">
                * Projections based on an annual appreciation rate of {inputs.appreciationRate}%. Future values are estimates.
              </p>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-indigo-50 border-indigo-100">
              <h2 className="text-xl font-semibold mb-2 text-indigo-900">Deal Score</h2>
              <div className="text-5xl font-black text-indigo-600 mb-4">
                {results.dealScore}<span className="text-2xl text-indigo-400">/100</span>
              </div>
              <div className="space-y-2 mb-6">
                {Object.entries(results.scoreBreakdown).map(([key, val]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-indigo-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="font-bold text-indigo-900">{val} pts</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-indigo-500 italic">
                * Internal scoring model based on cash flow, yield, and safety margins. Not financial advice.
              </p>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Analyze Your Property</h1>
        <p className="text-slate-400">Enter the numbers to see if this rental deal makes sense.</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); setShowResults(true); }} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-slate-800 border-slate-700 text-white">
            <h3 className="text-lg font-semibold mb-4 text-white border-b border-slate-700 pb-2">Property Information</h3>
            <div className="space-y-4">
              <Input
                label="Purchase Price"
                type="number"
                value={inputs.purchasePrice}
                onChange={e => handleInputChange('purchasePrice', e.target.value)}
              />
              <Input
                label="Down Payment"
                type="number"
                value={inputs.downPayment}
                onChange={e => handleInputChange('downPayment', e.target.value)}
              />
              <Input
                label="Monthly Rent"
                type="number"
                value={inputs.monthlyRent}
                onChange={e => handleInputChange('monthlyRent', e.target.value)}
              />
              <Input
                label="Closing Costs"
                type="number"
                value={inputs.closingCosts}
                onChange={e => handleInputChange('closingCosts', e.target.value)}
              />
              <Input
                label="Renovation Costs"
                type="number"
                value={inputs.renovationCosts}
                onChange={e => handleInputChange('renovationCosts', e.target.value)}
              />
            </div>
          </Card>

          <Card className="bg-slate-800 border-slate-700 text-white">
            <h3 className="text-lg font-semibold mb-4 text-white border-b border-slate-700 pb-2">Financing & Market</h3>
            <div className="space-y-4">
              <Input
                label="Interest Rate (%)"
                type="number"
                step="0.1"
                value={inputs.mortgageInterestRate}
                onChange={e => handleInputChange('mortgageInterestRate', e.target.value)}
              />
              <Input
                label="Mortgage Term (Years)"
                type="number"
                value={inputs.mortgageTerm}
                onChange={e => handleInputChange('mortgageTerm', e.target.value)}
              />
              <Input
                label="Amortization Period (Years)"
                type="number"
                value={inputs.amortizationPeriod}
                onChange={e => handleInputChange('amortizationPeriod', e.target.value)}
              />
              <Input
                label="Annual Appreciation Rate (%)"
                type="number"
                step="0.1"
                value={inputs.appreciationRate}
                onChange={e => handleInputChange('appreciationRate', e.target.value)}
              />
            </div>
          </Card>
        </div>

        <Card className="bg-slate-800 border-slate-700 text-white">
          <h3 className="text-lg font-semibold mb-4 text-white border-b border-slate-700 pb-2">Monthly Operating Expenses</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Input label="Property Tax" type="number" value={inputs.propertyTax} onChange={e => handleInputChange('propertyTax', e.target.value)} />
            <Input label="Insurance" type="number" value={inputs.insurance} onChange={e => handleInputChange('insurance', e.target.value)} />
            <Input label="Maintenance" type="number" value={inputs.maintenance} onChange={e => handleInputChange('maintenance', e.target.value)} />
            <Input label="Management" type="number" value={inputs.propertyManagement} onChange={e => handleInputChange('propertyManagement', e.target.value)} />
            <Input label="Utilities" type="number" value={inputs.utilities} onChange={e => handleInputChange('utilities', e.target.value)} />
            <Input label="HOA/Condo Fees" type="number" value={inputs.hoaFees} onChange={e => handleInputChange('hoaFees', e.target.value)} />
            <Input label="Other" type="number" value={inputs.otherExpenses} onChange={e => handleInputChange('otherExpenses', e.target.value)} />
            <Input label="Vacancy Rate (%)" type="number" value={inputs.vacancyRate} onChange={e => handleInputChange('vacancyRate', e.target.value)} />
          </div>
        </Card>

        <div className="flex justify-center pt-6">
          <Button type="submit" className="px-12 py-4 text-lg shadow-lg shadow-indigo-200">
            Analyze Deal →
          </Button>
        </div>
      </form>
    </div>
  );
}
