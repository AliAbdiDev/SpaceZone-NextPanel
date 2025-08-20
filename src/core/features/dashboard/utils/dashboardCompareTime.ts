import { CompareResult, compareTimes } from "@/core/utils";
import { toast } from "sonner";

/**
 * Compare two session times and display appropriate error messages via toast.
 *
 * @param params.startTime           - The session start time (Date or string in supported formats).
 * @param params.endTime             - The session end time.
 * @param params.startTimeFieldName  - The display name for the start time field.
 * @param params.endTimeFieldName    - The display name for the end time field.
 * @returns                          - pureResult from compareTimes and a flag indicating if validation failed.
 */
export function dashboardCompareTime({
    startTime,
    endTime,
    startTimeFieldName,
    endTimeFieldName,
}: {
    startTime: string | Date;
    endTime: string | Date;
    startTimeFieldName: string;
    endTimeFieldName: string;
}): { timeResult: CompareResult; isFailed: boolean } {
    const timeResult = compareTimes(startTime, endTime);
    let isFailed = false;

    if (timeResult.isEqual) {
        toast.error(`ساعت ${startTimeFieldName} نباید با ساعت ${endTimeFieldName} برابر باشد`);
        isFailed = true;
    }
    console.log(timeResult.lesserValue === endTimeFieldName);

    if (!timeResult.isLess && !timeResult?.isEqual) {
        toast.error(`ساعت ${endTimeFieldName} نباید از ساعت ${startTimeFieldName} کمتر باشد`);
        isFailed = true;
    }

    return { timeResult, isFailed };
}
