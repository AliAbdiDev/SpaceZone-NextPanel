
import { validateNonEmptyArray } from "@/core/utils";
import { BASE_API, fetchHandler } from "./fetch-handler";

export async function getTokenOfFile({ file, sessionToken }: { file: File, fileName?: string, sessionToken: string }): Promise<string | null> {
    try {
        const formData = new FormData();
        if (!(file instanceof File)) throw new Error('Invalid file');
        formData.append('file', file);
        const result = await fetchHandler({
            endpoint: '/upload-file',
            method: 'POST',
            payload: formData,
            typeRequest: 'formData',
            token: sessionToken
        });

        return result?.data?.file_token || null;
    } catch {
        throw new Error('something went wrong.');

    }
}

interface GetTokensOptions {
    files: File[];
    sessionToken: string;
    delay?: number
}

export function getTokensOfTotalFiles({
    files,
    sessionToken,
    delay = 1500
}: GetTokensOptions): Promise<(string | null)[]> {
    if (!validateNonEmptyArray(files)) {
        return Promise.resolve([]);
    }

    return new Promise<(string | null)[]>((resolve) => {
        setTimeout(() => {
            const promises: Promise<string | null>[] = files.map((file) => {
                const formData = new FormData();
                formData.append("file", file);

                return fetchHandler({
                    endpoint: "/upload-file",
                    method: "POST",
                    payload: formData,
                    typeRequest: "formData",
                    token: sessionToken,
                })
                    .then((result) => {
                        if (result && typeof result?.data?.file_token === "string") {
                            return result?.data?.file_token;
                        }
                        console.warn(" upload succeeded but no token:", result);
                        return null;
                    })
                    .catch((err) => {
                        console.error(` Error uploading ${file.name}:`, err);
                        return null;
                    });
            });

            Promise.all(promises).then(resolve);
        }, delay);
    });
}

export function getFileOfToken(token: string, baseUrl?: string): string {

    return `${BASE_API || baseUrl}/api/download-file/${token ?? ''}`;
}