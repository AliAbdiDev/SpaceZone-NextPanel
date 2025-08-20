import { cn } from '@/core/utils';
import React, { forwardRef, InputHTMLAttributes } from 'react';

export interface InputPrimaryProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;

  errorMessage?: string;
}

const InputPrimary = forwardRef<HTMLInputElement, InputPrimaryProps>(({ className, errorMessage, ...props }, ref) => {
  return (
    <div className="space-y-1.5">
      <input
        ref={ref}
        className={cn(
          'p-4 outline-none bg-background-secondary rounded-xl border border-purple-200 w-full',
          {
            'border-red-600 placeholder:text-red-400': !!errorMessage,
          },
          className
        )}
        {...props}
      />
      {errorMessage && (
        <p className="error-message" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
});

InputPrimary.displayName = 'InputPrimary';

export default InputPrimary;
