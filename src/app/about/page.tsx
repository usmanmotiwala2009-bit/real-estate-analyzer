import React from 'react';
import { Card } from '@/components/ui/Card';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            About DealAnalyzer
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Empowering real estate investors with professional-grade analytical tools to
            turn complex numbers into confident decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-20">
          <div className="md:col-span-7 space-y-6">
            <h2 className="text-2xl font-bold text-white">Our Story</h2>
            <p className="text-slate-300 leading-relaxed text-lg">
              Investing in rental properties can be overwhelming. Many investors rely on "gut feeling" or
              incomplete spreadsheets, which often leads to costly mistakes and missed opportunities.
            </p>
            <p className="text-slate-300 leading-relaxed text-lg">
              We built DealAnalyzer to bridge the gap between amateur guesswork and professional
              institutional analysis. Our goal is to make the critical metrics of real estate—like
              Cash-on-Cash return and Cap Rates—accessible to everyone.
            </p>
          </div>

          <div className="md:col-span-5">
            <Card className="bg-indigo-50 text-black border border-indigo-100 shadow-xl shadow-indigo-900/10">
              <h3 className="text-xl font-bold mb-4 text-indigo-900">Our Mission</h3>
              <p className="text-slate-700 leading-relaxed italic">
                "To simplify the property analysis process and provide clear, transparent financial metrics
                that help investors identify high-yield opportunities while managing risk."
              </p>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700 shadow-sm text-center">
            <div className="text-3xl mb-3">🎯</div>
            <h4 className="font-bold text-white mb-2">Precision</h4>
            <p className="text-sm text-slate-400">Mathematically accurate formulas for every key rental metric.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700 shadow-sm text-center">
            <div className="text-3xl mb-3">⚡</div>
            <h4 className="font-bold text-white mb-2">Speed</h4>
            <p className="text-sm text-slate-400">Go from a raw property listing to a full analysis in seconds.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700 shadow-sm text-center">
            <div className="text-3xl mb-3">🎓</div>
            <h4 className="font-bold text-white mb-2">Education</h4>
            <p className="text-sm text-slate-400">Learn the 'why' behind the numbers with our built-in guides.</p>
          </div>
        </div>

        <div className="bg-amber-900/20 border border-amber-500/30 p-8 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="text-2xl">⚠️</div>
            <div>
              <h4 className="font-bold text-amber-400 mb-2">A Note on Accuracy</h4>
              <p className="text-sm text-amber-100/80 leading-relaxed">
                Real estate investing is inherently complex. While our tools provide high-precision estimates,
                actual results will always vary based on local market dynamics, specific property conditions,
                and individual financing terms. We provide the data, but you provide the due diligence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
