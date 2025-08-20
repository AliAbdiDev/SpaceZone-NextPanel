'use server';

import { CookieKeys } from "@/core/assets/config/cookieKeys";
import { CookieHandler } from "@/core/utils/next/cookie-handler";
import { redirect } from "next/navigation";

export async function logoutHandler(
    { noRedirect = false }: { noRedirect?: boolean } = {}
) {
    const result = { success: false, token: '' };
    try {
        await CookieHandler.deleteCookie(CookieKeys.SESSION_TOKEN);
        await CookieHandler.deleteCookie(CookieKeys.USER_DATA);
        const token = await CookieHandler.getCookie(CookieKeys.SESSION_TOKEN);

        if (!token) {
            result.success = true;
            result.token = token;
        }


    } catch (err) {
        console.error('logoutHandler server error:', err);
    }

    if (result?.success && !noRedirect) {
        redirect('/sign-in');
    }
    return result;
}
