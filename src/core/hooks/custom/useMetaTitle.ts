'use client'
import { useEffect } from 'react';

/**
 * A React hook to dynamically set the document's title on the client side.
 *
 * @usage
 * ```tsx
 * useMetaTitle({ title: "Dashboard", defaultTitle: "My App" });
 * ```
 *
 * @param {Object} params - Parameters object.
 * @param {string} params.title - The desired title to set for the document. Required.
 * @param {string} [params.defaultTitle] - A fallback title if the main title is not available. Optional.
 *
 * @remarks
 * This hook only works in client components and updates `document.title` inside a `useEffect`.
 *
 * @example
 * useMetaTitle({ title: "Profile Page" });
 */

export function useMetaTitle({
    title,
    defaultTitle
}: {
    title: string
    defaultTitle?: string
}) {

    useEffect(() => {
        if (!title) return;
        document.title = title || defaultTitle || '';
    }, [title, defaultTitle]);
}