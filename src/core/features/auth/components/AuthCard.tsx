import { cn } from '@/core/utils';
import { ReactNode } from 'react';

function AuthCard({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'py-10 px-12 rounded-2xl md:shadow-md bg-card border border-ring w-full max-md:max-w-md mx-auto',
        className
      )}
    >
      <h1 className="text-primary mb-14 text-4xl w-full text-center">{title}</h1>
      {children}
    </div>
  );
}

export default AuthCard;
