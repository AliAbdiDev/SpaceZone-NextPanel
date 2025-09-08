'use client';

import { useId } from 'react';
import { OTPInput, SlotProps } from 'input-otp';

import { cn } from '@/core/utils';

export default function OtpField() {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      {/* <Label htmlFor={id}>OTP input (spaced)</Label> */}
      <OTPInput
        id={id}
        containerClassName="flex items-center gap-3 has-disabled:opacity-50"
        maxLength={4}
        render={({ slots }) => (
          <div className="flex gap-3">
            {slots.map((slot, idx) => (
              <Slot key={idx} {...slot} />
            ))}
          </div>
        )}
      />
    </div>
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        'border-input bg-background text-foreground flex size-13 items-center justify-center rounded-md border font-medium shadow-xs transition-[color,box-shadow]',
        { 'border-ring ring-ring/50 z-10 ring-[3px]': props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}
