import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Analyze Your Rental Property <span className="text-indigo-600">in Seconds</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            Enter the numbers. Understand the cash flow. Decide if the deal makes sense.
            Professional-grade analysis for savvy real estate investors.
          </p>
          <Link href="/analyze">
            <Button variant="primary" className="px-8 py-4 text-lg shadow-xl shadow-indigo-200">
              Analyze a Property
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">What We Analyze</h2>
          <p className="text-slate-600">Everything you need to determine if a property is a winner.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white text-slate-900 border-slate-200">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4 text-2xl">💰</div>
            <h3 className="text-lg font-semibold mb-2">Cash Flow</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Calculate exactly how much money stays in your pocket every month after all expenses and the mortgage.
            </p>
          </Card>

          <Card className="bg-white text-slate-900 border-slate-200">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-4 text-2xl">📈</div>
            <h3 className="text-lg font-semibold mb-2">Rental Yield</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Get gross and net rental yields to compare the property's efficiency against other investments.
            </p>
          </Card>

          <Card className="bg-white text-slate-900 border-slate-200">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mb-4 text-2xl">🎯</div>
            <h3 className="text-lg font-semibold mb-2">Cash-on-Cash Return</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Measure the annual return on the actual cash you invested, including closing and renovation costs.
            </p>
          </Card>

          <Card className="bg-white text-slate-900 border-slate-200">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 text-2xl">🛡️</div>
            <h3 className="text-lg font-semibold mb-2">Break-even Rent</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Find the minimum rent required to cover all costs, providing a safety margin for your investment.
            </p>
          </Card>

          <Card className="bg-white text-slate-900 border-slate-200">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4 text-2xl">⏳</div>
            <h3 className="text-lg font-semibold mb-2">Long-term Projections</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Forecast property value, equity growth, and cumulative cash flow over 5 and 10 years.
            </p>
          </Card>

          <Card className="bg-white text-slate-900 border-slate-200">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center mb-4 text-2xl">⭐</div>
            <h3 className="text-lg font-semibold mb-2">Deal Score</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Our internal scoring model provides a quick snapshot of the deal's overall quality.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-indigo-600 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to find your next great deal?</h2>
          <p className="text-indigo-100 mb-10 text-lg">
            Stop guessing and start calculating. Get professional-grade analysis in seconds.
          </p>
          <Link href="/analyze">
            <Button variant="secondary" className="px-8 py-4 text-lg bg-white text-indigo-600 hover:bg-slate-100 shadow-xl">
              Start Analyzing Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
