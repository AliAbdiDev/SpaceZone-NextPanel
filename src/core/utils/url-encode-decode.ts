/**
 * Encodes data for safe use in a URL.
 * @param data The data to be encoded (any data type convertible to a string)
 * @returns The encoded string suitable for URL usage
 */
function encodeDataForUrl<T>(data: T): string {
    try {
        const stringData = typeof data === 'string' ? data : JSON.stringify(data);
        return encodeURIComponent(stringData);
    } catch (error) {
        console.error('Error encoding data:', error);
        return '';
    }
}

/**
 * Decodes encoded data from a URL.
 * @param encodedData The encoded string from a URL
 * @returns The original data or null if an error occurs
 */
function decodeDataFromUrl<T>(encodedData: string, noJsonParse: boolean = false): T | null {
    try {
        const decodedString = decodeURIComponent(encodedData);
        return noJsonParse ? decodedString as unknown as T : JSON.parse(decodedString);
    } catch (error) {
        console.error('Error decoding data:', error);
        return null;
    }
}

export { encodeDataForUrl, decodeDataFromUrl };