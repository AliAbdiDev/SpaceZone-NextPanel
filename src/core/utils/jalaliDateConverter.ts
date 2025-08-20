import { format, parse } from 'date-fns-jalali';
import { faIR } from 'date-fns-jalali/locale';

/**
 * Converts a Gregorian date to a Jalali date string (yyyy/MM/dd).
 * @param date - The Gregorian date to convert.
 * @returns A string in Jalali format (e.g., '1404/05/12').
 */
export const toJalali = (date: Date) => {
    return format(date, 'yyyy/MM/dd', { locale: faIR });
};

/**
 * Converts a Jalali date string (yyyy/MM/dd) to a Gregorian date.
 * @param str - The Jalali date string to convert.
 * @returns A Gregorian Date object.
 */
export const toGregorian = (str: string) => {
    return parse(str, 'yyyy/MM/dd', new Date(), { locale: faIR });
};