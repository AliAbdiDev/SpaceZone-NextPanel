import { format, parse } from 'date-fns-jalali';
import { faIR } from 'date-fns-jalali/locale';
import type { FormatDateFn, ParseDateFn } from '@/core/assets/types/date';

export const formatDate: FormatDateFn = (value, mode) => {
  if (!value) return '';

  if (mode === 'single') {
    const date = typeof value === 'string' ? new Date(value) : value instanceof Date ? value : new Date();
    if (isNaN(date.getTime())) return '';
    return format(date, 'yyyy/MM/dd', { locale: faIR });
  }

  if (mode === 'multiple' && Array.isArray(value)) {
    return value
      .map((d) => {
        const date = typeof d === 'string' ? new Date(d) : d instanceof Date ? d : new Date();
        if (isNaN(date.getTime())) return '';
        return format(date, 'yyyy/MM/dd', { locale: faIR });
      })
      .filter(Boolean)
      .join(', ');
  }

  if (
    mode === 'range' &&
    typeof value === 'object' &&
    'from' in value &&
    'to' in value
  ) {
    const fromDate = typeof value.from === 'string' ? new Date(value.from) : value.from;
    const toDate = typeof value.to === 'string' ? new Date(value.to) : value.to;
    const from = fromDate && !isNaN(fromDate.getTime()) ? format(fromDate, 'yyyy/MM/dd', { locale: faIR }) : '';
    const to = toDate && !isNaN(toDate.getTime()) ? format(toDate, 'yyyy/MM/dd', { locale: faIR }) : '';
    return `${from} - ${to}`;
  }

  return '';
};

export const parseDate: ParseDateFn = (value, mode) => {
  if (!value) return undefined;

  if (mode === 'single') {
    try {
      const parsedDate = parse(value, 'yyyy/MM/dd', new Date(), { locale: faIR });
      if (isNaN(parsedDate.getTime())) return undefined;
      return parsedDate; // Return Date object
    } catch {
      return undefined;
    }
  }

  if (mode === 'multiple') {
    try {
      return value
        .split(', ')
        .map((str) => parse(str, 'yyyy/MM/dd', new Date(), { locale: faIR }))
        .filter((d) => d instanceof Date && !isNaN(d.getTime()));
    } catch {
      return [];
    }
  }

  if (mode === 'range') {
    try {
      const [fromStr, toStr] = value.split(' - ');
      const from = parse(fromStr, 'yyyy/MM/dd', new Date(), { locale: faIR });
      const to = parse(toStr, 'yyyy/MM/dd', new Date(), { locale: faIR });
      if (!isNaN(from.getTime()) && !isNaN(to.getTime())) {
        return { from, to };
      }
      return undefined;
    } catch {
      return undefined;
    }
  }

  return undefined;
};