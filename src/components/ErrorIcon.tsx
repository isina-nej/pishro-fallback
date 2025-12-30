'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ErrorIconProps {
  statusCode: string;
}

export default function ErrorIcon({ statusCode }: ErrorIconProps) {
  const iconMap: Record<string, ReactNode> = {
    '400': <span>❌</span>,
    '401': <span>🔐</span>,
    '403': <span>🚫</span>,
    '404': <span>🔍</span>,
    '408': <span>⏱️</span>,
    '429': <span>⚠️</span>,
    '500': <span>⚡</span>,
    '501': <span>🔨</span>,
    '502': <span>🔗</span>,
    '503': <span>🔄</span>,
    '504': <span>⏳</span>,
    '505': <span>📡</span>,
    '506': <span>⚙️</span>,
    '507': <span>💾</span>,
    '508': <span>🔁</span>,
    '510': <span>🚫</span>,
    '511': <span>🔐</span>,
  };

  const icon = iconMap[statusCode] || iconMap['500'];

  return (
    <motion.div
      animate={{
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        repeat: Infinity,
        duration: 3,
      }}
    >
      {icon}
    </motion.div>
  );
}
