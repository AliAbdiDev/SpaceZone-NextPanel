/**
 * Checks whether the character count of the input value meets or exceeds the specified maximum length.
 * 
 * @param value - The input string to check.
 * @param maxLength - The maximum allowed number of characters.
 * @returns An object containing:
 *   - `isMaxReached`: A boolean indicating whether the character count equals or exceeds `maxLength`.
 *   - `value`: The input string, sanitized to ensure it is a valid string.
 * 
 * @example
 * ```ts
 * const result = restrictCharCount("Hello World", 10);
 * console.log(result); // { isMaxReached: true, value: "Hello World" }
 * 
 * const result2 = restrictCharCount("Hi", 10);
 * console.log(result2); // { isMaxReached: false, value: "Hi" }
 * ```
 */
export function restrictCharCount(value: string, maxLength: number): { isMaxReached: boolean; value: string } {
    const safeValue = typeof value === 'string' ? value : '';
    const charCount = safeValue.length;
    const isMaxReached = charCount >= maxLength;

    return {
        isMaxReached,
        value: safeValue,
    };
}