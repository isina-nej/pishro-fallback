'use client';

import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { motion } from 'framer-motion';

interface StatusCheckerProps {
  statusCode: string;
}

export default function StatusChecker({ statusCode }: StatusCheckerProps) {
  const [isChecking, setIsChecking] = useState(false);
  const [checkMessage, setCheckMessage] = useState<string | null>(null);
  const [autoCheckEnabled, setAutoCheckEnabled] = useState(true);

  const isServerError = parseInt(statusCode) >= 500;

  const checkStatus = async () => {
    setIsChecking(true);
    setCheckMessage(null);

    try {
      const response = await fetch(window.location.origin, {
        method: 'HEAD',
        cache: 'no-cache',
        mode: 'no-cors',
      });

      // If we get any response (even in no-cors mode), service is back
      if (response.ok || response.status === 0) {
        setCheckMessage('✅ سایت به‌طور مجدد فعال شد | Service Restored!');
        setTimeout(() => {
          window.location.href = window.location.origin;
        }, 1500);
      } else {
        setCheckMessage('⏳ سایت هنوز در دست تعمیر است | Still under maintenance...');
      }
    } catch (error) {
      setCheckMessage('⏳ سایت هنوز در دست تعمیر است | Still under maintenance...');
    } finally {
      setIsChecking(false);
    }
  };

  // Auto-check every 10 seconds if server error and enabled
  useEffect(() => {
    if (!isServerError || !autoCheckEnabled) return;

    const interval = setInterval(() => {
      checkStatus();
    }, 10000);

    return () => clearInterval(interval);
  }, [isServerError, autoCheckEnabled]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.4 },
    },
  };

  return (
    <motion.div
      className="mt-8 space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Primary Action Button */}
      <button
        onClick={checkStatus}
        disabled={isChecking}
        className={`w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all ${
          isChecking ? 'animate-pulse' : ''
        }`}
      >
        {isChecking ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⟳</span>
            بررسی وضعیت... | Checking Status...
          </span>
        ) : (
          <span>🔄 بررسی وضعیت سایت | Check Status</span>
        )}
      </button>

      {/* Check Message */}
      {checkMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-4 rounded-lg text-center font-semibold ${
            checkMessage.includes('✅')
              ? 'bg-green-500/20 border border-green-500/50 text-green-200'
              : 'bg-yellow-500/20 border border-yellow-500/50 text-yellow-200'
          }`}
        >
          {checkMessage}
        </motion.div>
      )}

      {/* Auto-check Toggle (for 5xx errors only) */}
      {isServerError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-3 text-sm text-pishroSlate/70"
        >
          <input
            type="checkbox"
            id="auto-check"
            checked={autoCheckEnabled}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setAutoCheckEnabled(e.target.checked)}
            className="cursor-pointer"
          />
          <label htmlFor="auto-check" className="cursor-pointer">
            🔄 بررسی خودکار هر ۱۰ ثانیه | Auto-check every 10s
          </label>
        </motion.div>
      )}

      {/* Alternative Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col md:flex-row gap-3 justify-center pt-4"
      >
        <button
          onClick={() => window.location.href = '/'}
          className="btn-secondary text-sm flex-1"
        >
          🏠 صفحه اصلی | Homepage
        </button>
        <button
          onClick={() => window.history.back()}
          className="btn-secondary text-sm flex-1"
        >
          ⬅️ بازگشت | Go Back
        </button>
      </motion.div>

      {/* Footer Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-xs text-pishroSlate/50 pt-4 border-t border-white/10"
      >
        <p>
          اگر این مشکل ادامه دارد، لطفاً با پشتیبانی تماس بگیرید.
        </p>
        <p className="text-xs mt-1">
          If this issue persists, please contact our support team.
        </p>
      </motion.div>
    </motion.div>
  );
}
