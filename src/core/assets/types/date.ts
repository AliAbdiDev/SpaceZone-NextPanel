export type DatePickerMode = 'single' | 'multiple' | 'range';


export type DateValue = Date | Date[] | { from: Date; to: Date };

export interface FormatDateFn {
    (value: DateValue | undefined, mode: DatePickerMode): string;
}

export interface ParseDateFn {
    (value: string, mode: DatePickerMode): DateValue | undefined;
}