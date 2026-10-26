"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const Navbar = () => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          DealAnalyzer
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/analyze" className="hover:text-indigo-600 transition-colors">Calculator</Link>
          <Link href="/compare" className="hover:text-indigo-600 transition-colors">Compare</Link>
          <Link href="/how-it-works" className="hover:text-indigo-600 transition-colors">How It Works</Link>
          <Link href="/about" className="hover:text-indigo-600 transition-colors">About</Link>
        </div>

        <Link href="/analyze">
          <Button variant="primary" className="text-sm">Analyze Property</Button>
        </Link>
      </div>
    </nav>
  );
};
