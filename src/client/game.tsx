import './index.css';

import { useCallback, useEffect, useState } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { clueText } from '../shared/puzzle';
import type { Clue, Content } from '../shared/puzzle';

type Init = {
  day: string;
  username: string;
  streak: number;
  solvedToday: boolean;
  startedAt: number;
  flasks: number;
  contents: Content[];
  clues: Clue[];
};

type Result = { won: boolean; streak: number; elapsedMs: number };

const EMOJI: Record<Content, string> = {
  water: '💧',
  wine: '🍷',
  oil: '🛢️',
  honey: '🍯',
  poison: '☠️',
};

const App = () => {
  const [init, setInit] = useState<Init | null>(null);
  const [assignment, setAssignment] = useState<(Content | '')[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/init');
      const data = await res.json();
      if (data.status === 'error') throw new Error(data.message);
      setInit(data);
      setAssignment(Array.from({ length: data.flasks }, () => ''));
      setResult(null);
      setSeconds(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'load failed');
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const pour = (flask: number, content: Content) => {
    setAssignment((current) =>
      current.map((v, i) => {
        if (i === flask) return content;
        if (v === content) return '';
        return v;
      })
    );
  };

  const submit = async () => {
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignment, startedAt: Date.now() - seconds * 1000 }),
      });
      const data = await res.json();
      if (data.status === 'error') throw new Error(data.message);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'submit failed');
    }
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#141a26] text-[#d7e3f4]">
        <p>{error}</p>
      </div>
    );
  }
  if (!init) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#141a26] text-[#7d90b5]">
        <p className="animate-pulse">Stoking the lamps…</p>
      </div>
    );
  }

  const filled = assignment.filter((v) => v !== '').length;
  const clock = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  return (
    <div className="flex min-h-screen flex-col items-center gap-4 bg-[#141a26] px-4 py-6 text-[#d7e3f4]">
      <header className="flex w-full max-w-md items-center justify-between">
        <h1 className="text-xl font-black tracking-[0.3em] text-[#8fd0ff]">CAVE</h1>
        <div className="text-sm font-semibold text-[#7d90b5]">
          <span className="mr-3">{clock}</span>
          <span>🔥 {result ? result.streak : init.streak}</span>
        </div>
      </header>
      <p className="max-w-md text-center text-[13px] leading-snug text-[#7d90b5]">
        Tonight's alchemist left five unlabeled flasks. Use the ledger to pour each liquid
        into the right flask — every liquid exactly once.
      </p>
      <div className="flex w-full max-w-md justify-between rounded-2xl border-2 border-[#26314b] bg-[#1a2234] p-4">
        {Array.from({ length: init.flasks }, (_, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <div className="flex h-20 w-10 items-end justify-center rounded-b-full border-2 border-[#26314b] bg-[#1a2234] text-xl">
              {assignment[i] ? EMOJI[assignment[i] as Content] : ''}
            </div>
            <span className="text-[11px] font-bold text-[#7d90b5]">{i + 1}</span>
          </div>
        ))}
      </div>
      <div className="flex w-full max-w-md flex-wrap justify-center gap-1.5">
        {init.contents.map((content) => (
          <div key={content} className="flex items-center gap-1 rounded-full border-2 border-[#26314b] bg-[#1a2234] px-2 py-1">
            <span>{EMOJI[content]}</span>
            {Array.from({ length: init.flasks }, (_, flask) => (
              <button
                key={flask}
                onClick={() => pour(flask, content)}
                className="h-6 w-6 rounded border border-[#26314b] text-[10px] font-bold text-[#8fd0ff]"
                aria-label={`pour ${content} in flask ${flask + 1}`}
              >
                {flask + 1}
              </button>
            ))}
          </div>
        ))}
      </div>
      <ul className="w-full max-w-md space-y-1.5 rounded-xl border-2 border-[#26314b] bg-[#1a2234] p-4 text-[13px]">
        {init.clues.map((clue, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#8fd0ff] mt-1.5" />
            {clueText(clue)}
          </li>
        ))}
      </ul>
      {!result ? (
        <button
          onClick={() => void submit()}
          disabled={filled < init.flasks}
          className="w-full max-w-md rounded-full bg-[#8fd0ff] py-3 text-base font-black uppercase tracking-widest text-[#141a26] transition-transform active:scale-[0.98] disabled:opacity-40"
        >
          Cap the rack ({filled}/{init.flasks})
        </button>
      ) : (
        <div className="flex w-full max-w-md flex-col items-center gap-3 rounded-xl border-2 border-[#26314b] bg-[#1a2234] p-5 text-center">
          <p className="text-2xl font-black tracking-widest">
            {result.won ? 'RACK COMPLETE' : 'TOXIC MIX'}
          </p>
          <p className="text-sm text-[#7d90b5]">
            {result.won
              ? `Corked in ${clock} — streak 🔥 ${result.streak}. A new cellar tomorrow.`
              : 'One liquid landed in the wrong flask. Re-pour and try again.'}
          </p>
          <button
            onClick={() => setResult(null)}
            className="rounded-full border-2 border-[#8fd0ff] px-6 py-2 text-sm font-bold uppercase tracking-widest text-[#8fd0ff]"
          >
            Back to the cellar
          </button>
        </div>
      )}
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
