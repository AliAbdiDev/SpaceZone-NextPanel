'use client';

import { toSafeString } from '@/core/utils';
import { useEffect, useMemo } from 'react';

export interface CsvExportOptions {
    errorText: string;
    successText: string;
    encoding?: 'utf-8' | 'windows-1256'; // پشتیبانی از رمزگذاری‌های مختلف
    filename?: string;
    formatValue?: (value: unknown) => string;
    useBOM?: boolean; // گزینه برای افزودن BOM
}

export interface Header<T> {
    key: keyof T;
    label: string | React.ReactNode;
}

/**
 * Hook for generating a CSV blob URL with proper encoding for Persian characters.
 * The blobUrl is intended to be used with an external link or button component.
 *
 * @param rows Array of data objects (each object represents one row)
 * @param headers Array of headers with keys and labels (labels can be strings or React components)
 * @param options Custom error and success messages, encoding, and optional value formatter
 * @returns
 *   - blobUrl: A temporary URL for the generated CSV blob
 *   - handleDownload: Function that validates blob availability and returns { message, isError }
 *   - filename: Suggested filename for the download
 */
export function useCsvExport<TData>(
    rows: TData[],
    headers: Header<TData>[],
    options: CsvExportOptions
) {
    const {
        successText,
        encoding = 'utf-8',
        filename = 'export.csv',
        formatValue,
        useBOM = true, // به‌طور پیش‌فرض BOM فعال است
    } = options;

    // Generate CSV content
    const csvContent = useMemo(() => {
        if (!headers.length || !rows.length) {
            return '';
        }

        // Build CSV lines: header row + data rows
        const lines = [
            headers
                .map(h => toSafeString(h.label, { preventCsvInjection: true, stripHtml: true }))
                .join(','),
            ...rows.map(row =>
                headers
                    .map(h => toSafeString(row[h.key], { preventCsvInjection: true, stripHtml: true, formatValue }))
                    .join(',')
            ),
        ];

        const content = lines.join('\r\n');
        // افزودن BOM برای UTF-8
        return encoding === 'utf-8' && useBOM ? `\uFEFF${content}` : content;
    }, [rows, headers, formatValue, encoding, useBOM]);

    // Create Blob URL
    const blobUrl = useMemo(() => {
        if (!csvContent) {
            return '';
        }
        const blob = new Blob([csvContent], { type: `text/csv;charset=${encoding};` });
        return URL.createObjectURL(blob);
    }, [csvContent, encoding]);

    // Clean up Blob URL
    useEffect(() => {
        return () => {
            if (blobUrl) {
                URL.revokeObjectURL(blobUrl);
            }
        };
    }, [blobUrl]);

    /**
     * Validates if the CSV can be downloaded and returns the appropriate message.
     */
    const handleDownload = (): { message: string; isError: boolean } => {
        if (!blobUrl) {
            return {
                message: !headers.length
                    ? 'هیچ ستونی تعریف نشده است'
                    : 'هیچ داده‌ای برای export وجود ندارد',
                isError: true,
            };
        }
        return { message: successText, isError: false };
    };

    return { blobUrl, handleDownload, filename };
}