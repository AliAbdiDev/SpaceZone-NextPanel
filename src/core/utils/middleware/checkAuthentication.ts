import { NextRequest } from 'next/server';

interface AuthResult {
    isAuthenticated: boolean;
    token?: string;
    error?: string;
}

/**
 * Checks if the user is authenticated based on the session-token cookie.
 * @param req The Next.js request object
 * @returns An object containing authentication status and token details
 */
export function checkAuthentication(req: NextRequest): AuthResult {
    const token = req.cookies.get('session-token')?.value;

    if (!token) {
        return { isAuthenticated: false, error: 'No session token found' };
    }

    return { isAuthenticated: true, token };
}