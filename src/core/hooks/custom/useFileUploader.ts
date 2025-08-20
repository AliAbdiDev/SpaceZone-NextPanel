// hooks/useFileUploader.ts
'use client';

import { getTokenOfFile, getTokensOfTotalFiles } from '@/core/services/api';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

type UseFileUploaderOptions = {
    sessionToken: string;
    enableToaster?: boolean;
};

export function useFileUploader({ sessionToken, enableToaster = true }: UseFileUploaderOptions) {
    const [loading, setLoading] = useState<boolean>(false);
    const [uploadingCount, setUploadingCount] = useState<number>(0);
    const [lastToken, setLastToken] = useState<string | null>(null);
    const [tokens, setTokens] = useState<(string | null)[]>([]);

    const uploadFile = useCallback(
        async (file: File, opts?: { showToaster?: boolean }): Promise<string | null> => {
            const show = opts?.showToaster ?? true;
            setLoading(true);
            try {
                const promise = (async () => {
                    const token = await getTokenOfFile({ file, sessionToken });
                    setLastToken(token);
                    return token;
                })();

                if (enableToaster && show) {
                    toast.promise(promise, {
                        loading: 'در حال آپلود فایل...',
                        success: 'آپلود با موفقیت انجام شد.',
                        error: 'خطایی رخ داد. لطفاً دوباره تلاش کنید.',
                    });
                }

                const token = await promise;
                setTokens((prev) => [...prev, token]);
                return token;
            } catch {
                if (enableToaster && opts?.showToaster !== false) {
                    toast.error('خطایی رخ داد. لطفاً دوباره تلاش کنید.');
                }
                return null;
            } finally {
                setLoading(false);
            }
        },
        [sessionToken, enableToaster]
    );

    const uploadFiles = useCallback(
        async (files: File[], opts?: { showToaster?: boolean; delay?: number }): Promise<(string | null)[]> => {
            const show = opts?.showToaster ?? true;
            if (!Array.isArray(files) || files.length === 0) return [];

            setUploadingCount(files.length);
            setLoading(true);

            try {
                const promise = getTokensOfTotalFiles({
                    files,
                    sessionToken,
                    delay: opts?.delay ?? 1500,
                });

                if (enableToaster && show) {
                    toast.promise(promise, {
                        loading: `در حال آپلود ${files.length} فایل...`,
                        success: 'تمام فایل‌ها با موفقیت آپلود شدند.',
                        error: 'خطایی رخ داد. لطفاً دوباره تلاش کنید.',
                    });
                }

                const res = await promise;
                setTokens((prev) => [...prev, ...res]);
                return res;
            } catch {
                if (enableToaster && show) {
                    toast.error('خطایی رخ داد. لطفاً دوباره تلاش کنید.');
                }
                return files.map(() => null);
            } finally {
                setUploadingCount(0);
                setLoading(false);
            }
        },
        [sessionToken, enableToaster]
    );

    const reset = useCallback(() => {
        setLastToken(null);
        setTokens([]);
        setUploadingCount(0);
        setLoading(false);
    }, []);

    return {
        uploadFile,
        uploadFiles,
        loading,
        uploadingCount,
        lastToken,
        tokens,
        reset,
    } as const;
}
