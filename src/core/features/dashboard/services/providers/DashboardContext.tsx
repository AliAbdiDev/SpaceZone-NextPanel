import { createContext, ReactNode } from 'react';
import { DashboardContextValue } from '../../assets/types';
import { useHelperContext } from '@/core/hooks/custom';

interface Props {
  children: ReactNode;
  value: DashboardContextValue;
}

const valueChecker = (value: Props['value']) => {
  if (!value || typeof value !== 'object' || Object.entries(value).length <= 0) {
    console.error('SidebarContext requires a non-empty value object with a valid sidebarConfig property.');
  }
};

export const DashboardContext = createContext<DashboardContextValue>(null);

export function DashboardContextProvider({ children, value = null }: Props) {
  valueChecker(value);
  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export const useDashboardLayout = () => {
  const store = useHelperContext({ context: DashboardContext, contextName: 'DashboardContext' });

  return store;
};
