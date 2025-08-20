
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';


interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  maxAge?: number;
  path?: string;
  domain?: string;
}

/**
 * CookieHandler Usage:
 * 
 * 1. Set a cookie with custom expiration in days:
 * ```typescript
 * await CookieHandler.setCookieWithDays('user_token', 'abc123', 3, { path: '/dashboard' });
 * ```
 * 
 * 2. Set a cookie with custom maxAge:
 * ```typescript
 * await CookieHandler.setCookie('session', 'xyz789', { maxAge: 60 * 60 * 24 });
 * ```
 * 
 * 3. Get a cookie:
 * ```typescript
 * const token = await CookieHandler.getCookie('user_token');
 * console.log(token); // 'abc123'
 * ```
 * 
 * 4. Delete a cookie:
 * ```typescript
 * await CookieHandler.deleteCookie('user_token');
 * ```
 * 
 * 5. Set multiple cookies:
 * ```typescript
 * await CookieHandler.setMultipleCookies([
 *   { name: 'user', value: 'john', options: { maxAge: 60 * 60 } },
 *   { name: 'role', value: 'admin' }
 * ]);
 * ```
 * 
 * 6. Get all cookies:
 * ```typescript
 * const allCookies = await CookieHandler.getAllCookies();
 * console.log(allCookies); // { user_token: 'abc123', session: 'xyz789' }
 * ```
 * 
 * 7. Check if a cookie exists:
 * ```typescript
 * const exists = await CookieHandler.hasCookie('user_token');
 * console.log(exists); // true or false
 * ```
 * 
 * 8. Set a cookie in an API response:
 * ```typescript
 * import { NextResponse } from 'next/server';
 * export async function GET() {
 *   const response = NextResponse.json({ message: 'Success' });
 *   return await CookieHandler.setCookieInResponse(response, 'session', 'xyz789', { secure: true });
 * }
 * ```
 */
export class CookieHandler {
  private static defaultOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days default
  };

  /**
   * Set a cookie with the specified name and value
   * @param name Cookie name
   * @param value Cookie value
   * @param options Additional cookie options
   */
  static async setCookie(name: string, value: string, options: CookieOptions = {}) {
    const cookieOptions = { ...this.defaultOptions, ...options };
    const cookieStore = await cookies();
    cookieStore.set(name, value, cookieOptions);
  }

  /**
   * Set a cookie with expiration based on days
   * @param name Cookie name
   * @param value Cookie value
   * @param days Number of days until expiration
   * @param options Additional cookie options
   */
  static async setCookieWithDays(name: string, value: string, days: number, options: CookieOptions = {}) {
    const maxAge = days * 24 * 60 * 60; // Convert days to seconds
    const cookieOptions = { ...this.defaultOptions, ...options, maxAge };
    const cookieStore = await cookies();
    cookieStore.set(name, value, cookieOptions);
  }

  /**
   * Get the value of a cookie by name
   * @param name Cookie name
   * @returns Cookie value or undefined
   */
  static async getCookie(name: string): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get(name)?.value;
  }

  /**
   * Delete a cookie by name
   * @param name Cookie name
   */
  static async deleteCookie(name: string) {
    const cookieStore = await cookies();
    cookieStore.delete(name);
  }

  /**
   * Set multiple cookies at once
   * @param cookieArray Array of cookies
   */
  static async setMultipleCookies(cookieArray: { name: string; value: string; options?: CookieOptions }[]) {
    const cookieStore = await cookies();
    for (const { name, value, options } of cookieArray) {
      const cookieOptions = { ...this.defaultOptions, ...options };
      cookieStore.set(name, value, cookieOptions);
    }
  }

  /**
   * Get all cookies
   * @returns All available cookies
   */
  static async getAllCookies(): Promise<Record<string, string>> {
    const cookieStore = await cookies();
    const cookieMap: Record<string, string> = {};

    for (const cookie of cookieStore.getAll()) {
      cookieMap[cookie.name] = cookie.value;
    }

    return cookieMap;
  }

  /**
   * Check if a cookie exists
   * @param name Cookie name
   * @returns true if the cookie exists
   */
  static async hasCookie(name: string): Promise<boolean> {
    const cookieStore = await cookies();
    return cookieStore.has(name);
  }

  /**
   * Set a cookie in an API response
   * @param response Next.js response
   * @param name Cookie name
   * @param value Cookie value
   * @param options Additional cookie options
   * @returns Response with the set cookie
   */
  static async setCookieInResponse(
    response: NextResponse,
    name: string,
    value: string,
    options: CookieOptions = {}
  ): Promise<NextResponse> {
    const cookieOptions = { ...this.defaultOptions, ...options };
    response.cookies.set(name, value, cookieOptions);
    return response;
  }
}