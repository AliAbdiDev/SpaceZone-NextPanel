import { useEffect, useState } from "react";

export type BrowserDetectUnion = 'chromium' | 'firefox' | 'other';
export function useBrowserDetect() {
    const [browser, setBrowser] = useState<BrowserDetectUnion>('other');

    useEffect(() => {
        const userAgent = navigator?.userAgent?.toLowerCase()

        if (userAgent.includes('chrome') || userAgent.includes('chromium') || userAgent.includes('edg/')) {
            setBrowser('chromium')
        } else if (userAgent?.includes('firefox')) {
            setBrowser('firefox')
        } else {
            setBrowser('other')
        }
    }, [])

    return browser;
}
