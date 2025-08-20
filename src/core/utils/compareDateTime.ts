/**
 * Common output type for comparison operations.
 */
export type CompareResult = {
    /** True if the first value is greater than the second */
    isGreater: boolean;
    /** True if the first value is less than the second */
    isLess: boolean;
    /** True if both values are equal */
    isEqual: boolean;
    /** 'greater' | 'less' | 'equal' indicating the comparison result */
    value: 'greater' | 'less' | 'equal';
    /** The greater value between the two inputs */
    greaterValue: Date | string;
    /** The lesser value between the two inputs */
    lesserValue: Date | string;
};

/**
 * Compare two dates (year/month/day) ignoring the time portion.
 *
 * @param startDate - The start date as a Date object or an ISO string (e.g., "2025-07-28").
 * @param endDate   - The end date as a Date object or an ISO string.
 * @returns         - A CompareResult object with boolean flags and a value indicating the comparison.
 */
export function compareDates(
    startDate: Date | string,
    endDate: Date | string
): CompareResult {
    const s = typeof startDate === 'string' ? new Date(startDate) : startDate;
    const e = typeof endDate === 'string' ? new Date(endDate) : endDate;

    const sToken = s.getFullYear() * 10000 + (s.getMonth() + 1) * 100 + s.getDate();
    const eToken = e.getFullYear() * 10000 + (e.getMonth() + 1) * 100 + e.getDate();

    let result: 'greater' | 'less' | 'equal';
    let greaterValue: Date | string;
    let lesserValue: Date | string;

    if (sToken > eToken) {
        result = 'greater';
        greaterValue = startDate;
        lesserValue = endDate;
    } else if (sToken < eToken) {
        result = 'less';
        greaterValue = endDate;
        lesserValue = startDate;
    } else {
        result = 'equal';
        greaterValue = startDate;
        lesserValue = endDate;
    }

    return {
        isGreater: result === 'greater',
        isLess: result === 'less',
        isEqual: result === 'equal',
        value: result,
        greaterValue,
        lesserValue,
    };
}

/**
 * Compare two times of day (hours:minutes:seconds) ignoring the date.
 * Supported formats:
 *   - "HH"          (hours only)
 *   - "HH:mm"       (hours and minutes)
 *   - "HH:mm:ss"    (hours, minutes, and seconds)
 *
 * @param startTime - The start time as a Date object or a string in one of the supported formats.
 * @param endTime   - The end time as a Date object or a string in one of the supported formats.
 * @returns         - A CompareResult object with boolean flags and a value indicating the comparison.
 */
export function compareTimes(
    startTime: Date | string,
    endTime: Date | string
): CompareResult {
    function toSeconds(time: Date | string): number {
        if (typeof time === 'string') {
            const parts = time.split(':');
            if (parts.length < 1 || parts.length > 3) {
                throw new Error('Time must be in "HH", "HH:mm", or "HH:mm:ss" format.');
            }
            const hours = Number(parts[0]);
            const minutes = parts.length >= 2 ? Number(parts[1]) : 0;
            const seconds = parts.length === 3 ? Number(parts[2]) : 0;
            if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
                throw new Error('Invalid time values. Please provide valid numbers.');
            }
            return hours * 3600 + minutes * 60 + seconds;
        } else {
            return time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
        }
    }

    const sSec = toSeconds(startTime);
    const eSec = toSeconds(endTime);

    let result: 'greater' | 'less' | 'equal';
    let greaterValue: Date | string;
    let lesserValue: Date | string;

    if (sSec > eSec) {
        result = 'greater';
        greaterValue = startTime;
        lesserValue = endTime;
    } else if (sSec < eSec) {
        result = 'less';
        greaterValue = endTime;
        lesserValue = startTime;
    } else {
        result = 'equal';
        greaterValue = startTime;
        lesserValue = endTime;
    }

    return {
        isGreater: result === 'greater',
        isLess: result === 'less',
        isEqual: result === 'equal',
        value: result,
        greaterValue,
        lesserValue,
    };
}