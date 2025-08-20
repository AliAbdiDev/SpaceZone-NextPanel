'use server'
import { CookieKeys } from "@/core/assets/config/cookieKeys";
import { Course, FetchResultSingleItem, FetchResultTotalItems } from "@/core/assets/types";
import { fetchHandler } from "@/core/services/api";
import { CookieHandler } from "@/core/utils/next/cookie-handler";

export async function getAllCourses(): Promise<FetchResultTotalItems<'courses', Course>> {
    try {
        const token = (await CookieHandler.getCookie(CookieKeys.SESSION_TOKEN)) || '';
        const { data } = await fetchHandler({
            endpoint: `/course`,
            token,
            options: { cache: 'no-store' }
        });
        return { data: data || null };
    } catch (error) {
        console.error(`Error fetching course :`, error);
        return null;
    }
}

export async function getSingleCourse(courseId: string): Promise<FetchResultSingleItem<'course', Course>> {
    const sessionToken = await CookieHandler.getCookie(CookieKeys?.SESSION_TOKEN);
    try {
        const { data } = await fetchHandler({
            endpoint: `/course/${courseId}`,
            token: sessionToken,
            options: { cache: 'no-store' }

        });
        return {
            data: data || null,
        };
    } catch {
        return null;
    }
}