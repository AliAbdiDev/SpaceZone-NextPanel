/**
 * Removes leading zeros from hours, minutes, and seconds in a time string.
 * Supports input formats like "HH:mm" or "HH:mm:ss" and returns a simplified format like "H:m" or "H:m:s".
 *
 * @param time - The input time string in the format "HH:mm" or "HH:mm:ss".
 * @returns A formatted time string with leading zeros removed from hours, minutes, and seconds (e.g., "8:5" or "1:45:0").
 * @throws Error if the input time string does not match the expected format.
 * @example
 * ```typescript
 * console.log(zeroOfTimeCleaner("08:05")); // Returns "8:5"
 * console.log(zeroOfTimeCleaner("01:45:00")); // Returns "1:45:0"
 * console.log(zeroOfTimeCleaner("14:30")); // Returns "14:30"
 * ```
 */
export function trimTimeZeros(time: string) {
    // Ensure input is a string and trim any whitespace
    if (typeof time !== "string" || !time.trim()) {
        throw new Error("Invalid input: Time must be a non-empty string");
    }

    // Regex to match HH:mm or HH:mm:ss
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(?::([0-5][0-9]))?$/;

    if (!timeRegex.test(time.trim())) {
        throw new Error("Invalid time format. Expected HH:mm or HH:mm:ss");
    }

    // Split the time string and remove leading zeros
    const [hours, minutes, seconds] = time.trim().split(":");
    const formattedHours = parseInt(hours, 10).toString();
    const formattedMinutes = parseInt(minutes, 10).toString();
    const formattedSeconds = seconds ? `:${parseInt(seconds, 10).toString()}` : "";

    return {
        fullTime: `${formattedHours}:${formattedMinutes}:${formattedSeconds}`,
        onlyHoursAndSeconds: `${formattedHours}:${formattedMinutes}:`,
        onlyHours: formattedHours,
        onlyMinutes: formattedMinutes,
        onlySeconds: formattedSeconds
    };
}