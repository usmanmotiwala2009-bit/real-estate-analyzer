import React from 'react';
import { Card } from '@/components/ui/Card';

export default function HowItWorksPage() {
  const steps = [
    {
      title: "Enter Property Information",
      desc: "Provide the purchase price, down payment, and expected monthly rent. This sets the baseline for the investment's scale.",
      icon: "1️⃣"
    },
    {
      title: "Enter Financing Details",
      desc: "Input your mortgage interest rate and term. This allows us to calculate your debt service and equity build-up.",
      icon: "2️⃣"
    },
    {
      title: "Add Operating Expenses",
      desc: "Be realistic about taxes, insurance, maintenance, and management. These are the 'silent killers' of cash flow.",
      icon: "3️⃣"
    },
    {
      title: "Review Cash Flow and Returns",
      desc: "Check your monthly cash flow, Cap Rate, and Cash-on-Cash return to see the immediate profitability.",
      icon: "4️⃣"
    },
    {
      title: "Compare Against Other Deals",
      desc: "Use the comparison tool to see which property provides the best risk-adjusted return.",
      icon: "5️⃣"
    }
  ];

  const metrics = [
    {
      term: "Cash Flow",
      def: "The amount of money remaining each month after all operating expenses and mortgage payments are paid.",
      importance: "The most critical metric for monthly survival and wealth building.",
      formula: "Rent - Expenses - Mortgage"
    },
    {
      term: "Cash-on-Cash Return (CoC)",
      def: "Your annual pre-tax cash flow divided by the total cash invested (down payment + closing costs + renos).",
      importance: "Shows the actual yield on the cash you've locked into the property.",
      formula: "Annual Cash Flow / Total Cash Invested"
    },
    {
      term: "Cap Rate (Capitalization Rate)",
      def: "Net Operating Income (NOI) divided by the property purchase price. It ignores financing.",
      importance: "Helps compare properties regardless of how they are financed.",
      formula: "NOI / Purchase Price"
    },
    {
      term: "NOI (Net Operating Income)",
      def: "Annual rental income minus all operating expenses (excluding mortgage payments).",
      importance: "The core income-generating power of the property itself.",
      formula: "Gross Income - Operating Expenses"
    },
    {
      term: "Break-even Rent",
      def: "The minimum monthly rent required to cover all operating expenses and mortgage payments.",
      importance: "Provides a safety margin; if rent drops below this, you are losing money.",
      formula: "(Expenses + Mortgage) / (1 - Vacancy Rate)"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">How It Works</h1>
          <p className="text-slate-400 text-lg">Master the numbers behind your next real estate investment.</p>
        </div>

        <div className="space-y-20">
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-white flex items-center gap-2">
              <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
              The Analysis Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl border border-slate-700 bg-slate-800 hover:border-indigo-500 transition-all shadow-sm">
                  <span className="text-2xl">{step.icon}</span>
                  <div>
                    <h3 className="font-medium text-white">{step.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 text-white flex items-center gap-2">
              <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
              Key Metrics Deep Dive
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {metrics.map((m, idx) => (
                <Card key={idx} className="bg-slate-800 border-slate-700 text-white hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-indigo-400">{m.term}</h3>
                    <span className="text-[10px] font-mono bg-slate-700 text-slate-400 px-2 py-1 rounded uppercase tracking-wider">Formula</span>
                  </div>
                  <p className="text-slate-300 text-sm mb-3">{m.def}</p>
                  <div className="bg-slate-900 p-2 rounded border border-slate-700 mb-3 font-mono text-xs text-slate-400 text-center">
                    {m.formula}
                  </div>
                  <p className="text-xs text-slate-500 italic">Why it matters: {m.importance}</p>
                </Card>
              ))}
            </div>
          </section>

          <section className="bg-slate-800 border border-slate-700 p-8 rounded-3xl shadow-xl">
            <h2 className="text-2xl font-bold mb-8 text-center text-white">Investor's Guide to Better Deals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <span className="text-indigo-400">💡</span> Pro Tips
                </h3>
                <ul className="space-y-4 text-slate-300 text-sm">
                  <li className="flex gap-3">
                    <span className="text-indigo-400 font-bold">✓</span>
                    <span><strong className="text-white">The 1% Rule:</strong> A rough benchmark where monthly rent should be ~1% of the purchase price for high cash flow.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-indigo-400 font-bold">✓</span>
                    <span><strong className="text-white">Focus on NOI:</strong> When comparing two properties, look at NOI first to see which asset is fundamentally more profitable.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-indigo-400 font-bold">✓</span>
                    <span><strong className="text-white">Equity Growth:</strong> Don't just look at cash flow; consider mortgage paydown and appreciation over 10 years.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <span className="text-rose-400">⚠️</span> Common Pitfalls
                </h3>
                <ul className="space-y-4 text-slate-300 text-sm">
                  <li className="flex gap-3">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span><strong className="text-white">Underestimating Maintenance:</strong> Always budget at least 5-10% of rent for long-term repairs (roof, HVAC).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span><strong className="text-white">Ignoring Vacancy:</strong> No property is occupied 365 days a year. Budgetting 5% vacancy is a safe professional standard.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span><strong className="text-white">"Hope-based" Investing:</strong> Never assume rent will increase significantly just to make a deal "work."</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
