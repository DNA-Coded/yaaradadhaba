import { useCallback, useEffect, useState } from 'react';

const KEY = 'ydd-theme';
const current = () => document.documentElement.getAttribute('data-theme') || 'light';

function apply(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#1c120b' : '#ffffff');
}

// Light / dark theme. Follows the phone's setting until the visitor picks one.
export default function useTheme() {
  const [theme, setTheme] = useState(current);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => {
      let saved = null;
      try {
        saved = localStorage.getItem(KEY);
      } catch {
        /* ignore */
      }
      if (saved) return;
      const next = e.matches ? 'dark' : 'light';
      apply(next);
      setTheme(next);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    const next = current() === 'dark' ? 'light' : 'dark';
    apply(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* ignore */
    }
    setTheme(next);
  }, []);

  return [theme, toggle];
}
