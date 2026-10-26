"use client";

import React, { useState } from 'react';
import { analyzeDeal, PropertyInputs, CalculationResults } from '@/lib/calculations';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { MetricDisplay } from '@/components/ui/MetricDisplay';

interface ComparedProperty extends PropertyInputs {
  id: string;
  name: string;
  results: CalculationResults;
}

export default function ComparePage() {
  const [properties, setProperties] = useState<ComparedProperty[]>([]);
  const [currentInput, setCurrentInput] = useState<PropertyInputs>({
    propertyName: "Property",
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
  });
  const [propName, setPropName] = useState("");

  const addProperty = () => {
    if (properties.length >= 3) {
      alert("You can compare up to 3 properties.");
      return;
    }
    const results = analyzeDeal(currentInput);
    const newProp: ComparedProperty = {
      ...currentInput,
      id: Math.random().toString(36).substr(2, 9),
      name: propName || `Property ${properties.length + 1}`,
      results,
    };
    setProperties([...properties, newProp]);
    setPropName("");
  };

  const removeProperty = (id: string) => {
    setProperties(properties.filter(p => p.id !== id));
  };

  const getBestValue = (key: keyof CalculationResults, type: 'max' | 'min') => {
    if (properties.length === 0) return null;
    const values = properties.map(p => p.results[key] as number);
    return type === 'max' ? Math.max(...values) : Math.min(...values);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">Compare Properties</h1>

      {properties.length < 3 && (
        <Card className="mb-12 p-8">
          <h2 className="text-xl font-semibold mb-6">Add Property to Compare</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="Property Name"
              placeholder="e.g. Main St Apartment"
              value={propName}
              onChange={e => setPropName(e.target.value)}
            />
            <Input
              label="Purchase Price"
              type="number"
              value={currentInput.purchasePrice}
              onChange={e => setCurrentInput({...currentInput, purchasePrice: parseFloat(e.target.value) || 0})}
            />
            <Input
              label="Monthly Rent"
              type="number"
              value={currentInput.monthlyRent}
              onChange={e => setCurrentInput({...currentInput, monthlyRent: parseFloat(e.target.value) || 0})}
            />
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={addProperty}>Add to Comparison</Button>
          </div>
        </Card>
      )}

      {properties.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-white rounded-xl shadow-sm overflow-hidden">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="p-4 font-semibold text-slate-700">Metric</th>
                {properties.map(p => (
                  <th key={p.id} className="p-4 font-semibold text-slate-700 text-center relative">
                    {p.name}
                    <button
                      onClick={() => removeProperty(p.id)}
                      className="absolute top-2 right-2 text-slate-400 hover:text-red-500 text-xs"
                    >
                      Remove
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="p-4 font-medium text-slate-600">Purchase Price</td>
                {properties.map(p => (
                  <td key={p.id} className="p-4 text-center font-semibold">${p.purchasePrice.toLocaleString()}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-600">Monthly Rent</td>
                {properties.map(p => (
                  <td key={p.id} className="p-4 text-center font-semibold">${p.monthlyRent.toLocaleString()}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-600">Monthly Cash Flow</td>
                {properties.map(p => (
                  <td key={p.id} className={`p-4 text-center font-bold ${p.results.monthlyCashFlow > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    ${p.results.monthlyCashFlow.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-600">Annual Cash Flow</td>
                {properties.map(p => (
                  <td key={p.id} className="p-4 text-center font-semibold">${p.results.annualCashFlow.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-600">Gross Yield</td>
                {properties.map(p => (
                  <td key={p.id} className="p-4 text-center font-semibold">{p.results.grossRentalYield.toFixed(2)}%</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-600">Net Yield</td>
                {properties.map(p => (
                  <td key={p.id} className="p-4 text-center font-semibold">{p.results.netRentalYield.toFixed(2)}%</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-600">Cash-on-Cash</td>
                {properties.map(p => (
                  <td key={p.id} className="p-4 text-center font-semibold">{p.results.cashOnCashReturn.toFixed(2)}%</td>
                ))}
              </tr>
              <tr className="bg-indigo-50">
                <td className="p-4 font-bold text-indigo-900">Deal Score</td>
                {properties.map(p => (
                  <td key={p.id} className="p-4 text-center font-black text-indigo-600 text-xl">{p.results.dealScore}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
