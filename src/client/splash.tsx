import './index.css';

import { context, requestExpandedMode } from '@devvit/web/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

export const Splash = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#141a26] px-6 text-center text-[#d7e3f4]">
      <div className="text-3xl">⚗️</div>
      <h1 className="text-3xl font-black tracking-[0.3em] text-[#8fd0ff]">CAVE</h1>
      <p className="max-w-[240px] text-[13px] leading-snug text-[#7d90b5]">
        Five flasks, one ledger, no labels. A fresh cellar every day. Hi{' '}
        {context.username ?? 'alchemist'}.
      </p>
      <button
        onClick={(e) => requestExpandedMode(e.nativeEvent, 'game')}
        className="mt-2 rounded-full bg-[#8fd0ff] px-8 py-2.5 text-sm font-black uppercase tracking-widest text-[#141a26] transition-transform active:scale-[0.98]"
      >
        Descend
      </button>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>
);
