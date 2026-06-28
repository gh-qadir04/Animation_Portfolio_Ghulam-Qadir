import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SCRAMBLE_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

function scrambleText(text: string, progress: number): string {
  return text
    .split('')
    .map((char, i) => {
      if (char === ' ') return ' ';
      if (i < text.length * progress) return char;
      return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    })
    .join('');
}

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState<'loading' | 'complete' | 'exit'>('loading');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const targetText = 'GHULAM QADIR';

  useEffect(() => {
    let current = 0;
    intervalRef.current = setInterval(() => {
      current += 0.015;
      if (current >= 1) {
        current = 1;
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      setProgress(current);
      setDisplayText(scrambleText(targetText, current));
    }, 30);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (progress >= 1) {
      const t1 = setTimeout(() => setPhase('complete'), 400);
      const t2 = setTimeout(() => setPhase('exit'), 1200);
      const t3 = setTimeout(() => onComplete(), 1800);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="relative">
              <div
                className="font-mono text-3xl md:text-5xl font-bold tracking-[0.2em] text-white"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {displayText}
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 blur-xl rounded-full" />
            </div>

            <div className="loading-bar-container">
              <motion.div
                className="loading-bar"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <div
              className="loading-text"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {phase === 'loading' ? 'INITIALIZING...' : 'WELCOME'}
            </div>
          </motion.div>

          {/* Scanline effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
            <div
              className="w-full h-[2px] bg-white"
              style={{
                animation: 'scanline 2s linear infinite',
              }}
            />
          </div>

          <style>{`
            @keyframes scanline {
              0% { transform: translateY(-100%); }
              100% { transform: translateY(100vh); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
