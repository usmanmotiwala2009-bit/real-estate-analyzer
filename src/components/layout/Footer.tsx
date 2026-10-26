import React from 'react';
import { cookies } from 'next/headers';
import { getCachedYear } from '@/lib/cache/year';

export const Footer = async () => {
  await cookies();
  const year = await getCachedYear();
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="col-span-1">
            <div className="text-xl font-bold text-indigo-600 mb-4">DealAnalyzer</div>
            <p className="text-slate-500 text-sm leading-relaxed">
              The professional tool for real estate investors to analyze rental properties and make data-driven decisions.
            </p>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold text-slate-800 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="/analyze" className="hover:text-indigo-600">Calculator</a></li>
              <li><a href="/compare" className="hover:text-indigo-600">Compare Deals</a></li>
              <li><a href="/how-it-works" className="hover:text-indigo-600">How It Works</a></li>
              <li><a href="/about" className="hover:text-indigo-600">About Us</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold text-slate-800 mb-4">Legal</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              This calculator provides estimates for educational and planning purposes. It is not financial, investment, tax, legal, or real-estate advice. Actual results depend on financing, taxes, insurance, maintenance, vacancy, property value changes, and other factors.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 text-center text-xs text-slate-400">
          © {year} DealAnalyzer. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
