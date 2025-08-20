import { cn } from '@/core/utils';

function Label({ children, className = '', ...props }) {
  return (
    <label {...props} className={cn(className, 'text-gray-600  cursor-pointer text-sm')}>
      {children}
    </label>
  );
}

export default Label;
