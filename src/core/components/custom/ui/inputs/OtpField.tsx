'use client';

import React, { useId, useState, useEffect } from 'react';
import { OTPInput, SlotProps, OTPInputProps } from 'input-otp';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/core/utils';

type Props = Partial<React.Component<OTPInputProps>> & {
  error?: string;
  isNotTrue?: boolean;
  deleteInterval?: number;
  value?: string;
  onChange?: (value: string) => void;
};

const charVariants = {
  initial: { opacity: 0, y: -6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -14 },
};

interface AnimatedSlotProps extends SlotProps {
  idx: number;
  duration?: number; // مدت زمان انیمیشن به ثانیه
  delay?: number; // تاخیر شروع انیمیشن
}

const AnimatedSlot: React.FC<AnimatedSlotProps> = React.memo(
  ({ idx, char, isActive, duration = 0.2, delay = 0 }) => (
    <div
      className={cn(
        'relative size-13 flex items-center justify-center rounded-md border border-input font-medium text-lg',
        { 'border-ring ring-ring/50 z-10 ring-[3px]': isActive }
      )}
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait">
        {char !== null && (
          <motion.div
            key={`char-${idx}-${char}`}
            variants={charVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration,
              delay,
              ease: 'easeInOut',
            }}
            className="leading-none select-none"
          >
            {char}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ),
  (prev, next) => prev.char === next.char && prev.isActive === next.isActive
);

AnimatedSlot.displayName = 'AnimatedSlot';

export default function OtpField({
  isNotTrue,
  error,
  deleteInterval = 120,
  value: externalValue,
  onChange,
  ...props
}: Props) {
  const id = useId();
  const [value, setValue] = useState(externalValue || '');

  useEffect(() => {
    if (externalValue !== undefined) setValue(externalValue);
  }, [externalValue]);

  useEffect(() => {
    if (!isNotTrue || value.length === 0) return;
    const interval = setInterval(() => {
      const newVal = value.slice(0, -1);
      setValue(newVal);
      onChange?.(newVal);
    }, deleteInterval);
    return () => clearInterval(interval);
  }, [isNotTrue, value, deleteInterval, onChange]);

  return (
    <div className="*:not-first:mt-2">
      <OTPInput
        id={id}
        value={value}
        onChange={(v) => {
          setValue(v);
          onChange?.(v);
        }}
        maxLength={4}
        containerClassName="flex items-center gap-3 has-disabled:opacity-50"
        render={({ slots }) => (
          <div className="flex gap-3">
            {slots?.map((slot, idx) => (
              <AnimatedSlot key={idx} idx={idx} {...slot} />
            ))}
          </div>
        )}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
