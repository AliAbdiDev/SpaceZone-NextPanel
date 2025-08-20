
export interface FetchProps {
    endpoint: string;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    payload?: any;
    queryParams?: Record<string, any>;
    token?: string;
    options?: HeadersInit | null;
    customErrorMessage?: string;
    typeRequest?: 'json' | 'formData';
}
type Error = {
    message: string | null;
    status: number | null;
    type: string | null;
    details: string | object | null;
}

export interface FetchResult {
    data: any;
    error: Error | string | null;
    response?: Response | null
    loading?: boolean;
}