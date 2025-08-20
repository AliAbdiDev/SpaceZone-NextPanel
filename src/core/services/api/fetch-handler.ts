import type { FetchProps } from "@/core/assets/types";

export const BASE_API = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const disallowedHeaders = new Set(['Accept', 'Authorization']);

/**
 * Merges additional headers into the request headers, excluding disallowed headers.
 * @param headers - Base headers object
 * @param options - Additional headers to merge
 */
const mergeHeaders = ({ headers, options }: { headers: HeadersInit; options: HeadersInit | null }) => {
    if (options && typeof options === 'object') {
        for (const key in options) {
            if (Object.prototype.hasOwnProperty.call(options, key) && !disallowedHeaders.has(key)) {
                headers[key] = options[key];
            }
        }
    }
};

/**
 * Validates the endpoint to ensure it does not start with http:// or https://.
 * @param endpoint - The API endpoint path
 * @returns Valid endpoint or throws an error
 */
const checkEndpoint = (endpoint: string): string => {
    const regex = /^https?:\/\//;
    if (regex.test(endpoint)) {
        throw new Error('Endpoint should not start with http:// or https://. Example: api/groups');
    }
    return endpoint;
};

/**
 * Converts query parameters to query string.
 * @param queryParams - The query parameters object
 * @returns Query string or empty string if queryParams is null/undefined
 */
const toQueryString = (queryParams: any): string => {
    if (!queryParams || typeof queryParams !== 'object') return '';
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined && value !== null) {
            params.append(key, String(value));
        }
    }
    return params.toString();
};

/**
 * Handles HTTP requests to the API, optimized for React Query.
 * @param endpoint - The endpoint path (e.g., "users")
 * @param method - HTTP method (default: "GET")
 * @param payload - Request body (optional, for POST/PUT/PATCH/DELETE)
 * @param queryParams - Query parameters (optional, for GET)
 * @param token - Authentication token (optional)
 * @param options - Additional headers or settings (optional)
 * @param customErrorMessage - Custom error message (optional)
 * @param typeRequest - Type of request payload ('json' or 'formData')
 * @returns {Promise<any>} - The response data
 * @throws {Error} - On validation, HTTP, or network errors
 */
export const fetchHandler = async ({
    endpoint,
    method = 'GET',
    payload,
    queryParams,
    token,
    options,
    customErrorMessage,
    typeRequest = 'json'
}: FetchProps): Promise<any> => {
    const validatedEndpoint = checkEndpoint(endpoint);
    let url = `${BASE_API}/api${validatedEndpoint}`;

    if (queryParams) {
        const queryString = toQueryString(queryParams);
        if (queryString) {
            url += `?${queryString}`;
        }
    }

    const headers: HeadersInit = {
        ...(token && { Authorization: `Bearer ${token}` })
    };

    if (payload && typeRequest === 'json' && method !== 'GET') {
        headers['Content-Type'] = 'application/json';
    }

    mergeHeaders({ headers, options });

    try {
        const response = await fetch(url, {
            method,
            headers,
            body: method !== 'GET' && payload
                ? typeRequest === 'formData'
                    ? payload
                    : JSON.stringify(payload)
                : undefined
        });

        if (process.env.NODE_ENV === 'development') {
            console.error('response details:', response);
        }

        if (!response.ok) {
            let errorMessage = customErrorMessage || `HTTP error: ${response.status}`;
            try {
                const errorData = await response.json();
                errorMessage = customErrorMessage || errorData.message || errorMessage;
            } catch {
                // Ignore if JSON parsing fails
            }
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Error details:', error);
        }
        throw new Error(customErrorMessage || (error.name === 'TypeError' ? 'Network error' : error.message));
    }
};