'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggleButton() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button variant="outline" onClick={toggleTheme}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={resolvedTheme}
          initial={{ opacity: 0.5, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{
            opacity: 0.5,
            rotate: 45,
            transition: { duration: 0.1, ease: 'easeIn' },
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="flex items-center justify-center"
        >
          {resolvedTheme === 'light' ? <Sun /> : <Moon />}
        </motion.div>
      </AnimatePresence>
      Theme
    </Button>
  );
}

export function ThemeResetButton() {
  const { setTheme } = useTheme();

  return (
    <Button onClick={() => setTheme('system')}>Zresetuj motyw do domyślnego systemowego</Button>
  );
}
