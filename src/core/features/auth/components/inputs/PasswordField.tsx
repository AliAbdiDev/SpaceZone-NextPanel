'use client';

import { ButtonIcon } from '@/core/components/custom/ui/Buttons';
import { cn } from '@/core/utils';
import { EyeClosedIcon, EyeIcon } from 'lucide-react';
import { forwardRef, useState, MouseEventHandler } from 'react';

export interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(({ errorMessage, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDown: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
  };

  return (
    <div className="space-y-1.5">
      <div
        className={cn('max-w-96 w-full flex items-center rounded-xl bg-background-secondary border border-purple-200')}
      >
        <input
          ref={ref}
          {...props}
          type={showPassword ? 'text' : 'password'}
          className="flex-1 p-4 outline-none bg-transparent"
        />
        <ButtonIcon
          onClick={() => setShowPassword((prev) => !prev)}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseDown}
          className="p-2 bg-transparent border-none shadow-none hover:bg-transparent"
        >
          {showPassword ? <EyeClosedIcon size={30} className="w-8 h-8" /> : <EyeIcon size={30} className="w-8 h-8" />}
        </ButtonIcon>
      </div>
      {errorMessage && (
        <p className="error-message" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
});

PasswordField.displayName = 'PasswordField-auth';

export default PasswordField;
