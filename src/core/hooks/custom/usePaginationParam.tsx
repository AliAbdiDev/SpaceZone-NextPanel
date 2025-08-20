'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export interface SetPaginationParams {
  page?: number;
  per_page?: number;
  extraParams?: Record<string, any>;
}

/**
 * Custom hook to set pagination parameters (page and per_page) in the URL.
 * Ensures safe updates and preserves existing query parameters to minimize errors.
 * @returns A function to set pagination parameters in the URL
 */
export function useSetPaginationParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setPaginationParams = useCallback(
    ({ page, per_page, extraParams = {} }: SetPaginationParams) => {
      // Create a new URLSearchParams instance from current search params
      const params = new URLSearchParams(searchParams?.toString() || '');

      // Validate and set page
      if (page !== undefined && Number.isFinite(page) && page > 0) {
        params.set('page', String(page));
      } else if (page === undefined) {
        params.delete('page');
      }

      // Validate and set per_page
      if (per_page !== undefined && Number.isFinite(per_page) && per_page > 0) {
        params.set('per_page', String(per_page));
      } else if (per_page === undefined) {
        params.delete('per_page');
      }

      // Add extra query parameters
      Object.entries(extraParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.set(key, String(value));
        } else {
          params.delete(key);
        }
      });

      // Update the URL without reloading the page
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return setPaginationParams;
}

//----------------------------- GetPaginationParams -----------------------------//
export interface PaginationParamsOptions {
  defaultPage?: number;
  defaultPerPage?: number;
  pageParamKey?: string;
  perPageParamKey?: string;
}

export interface PaginationParamsResult {
  page: number;
  per_page: number;
}

/**
 * Custom hook to extract pagination parameters (page and per_page) from URL search params.
 * Ensures safe parsing and fallback to default values to minimize errors.
 * @param options - Optional configuration for default page, perPage, and additional query parameters
 * @returns Object containing parsed currentPage, itemsPerPage, and merged extraQueryParams
 */
export function useGetPaginationParams(options: PaginationParamsOptions = {}): PaginationParamsResult {
  const { defaultPage = 1, defaultPerPage = 10, pageParamKey, perPageParamKey } = options;

  const validatedDefaultPage = Number.isFinite(defaultPage) && defaultPage > 0 ? defaultPage : 1;
  const validatedDefaultPerPage = Number.isFinite(defaultPerPage) && defaultPerPage > 0 ? defaultPerPage : 10;

  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams?.get(pageParamKey || 'page') || String(validatedDefaultPage), 10);
  const itemsPerPage = parseInt(
    searchParams?.get(perPageParamKey || 'per_page') || String(validatedDefaultPerPage),
    10
  );

  return {
    page: Number.isNaN(currentPage) ? validatedDefaultPage : currentPage,
    per_page: Number.isNaN(itemsPerPage) ? validatedDefaultPerPage : itemsPerPage,
  };
}
