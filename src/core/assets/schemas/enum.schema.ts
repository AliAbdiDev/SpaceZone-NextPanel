import z from "zod";
import { SessionType } from "../types/entities/session";
import { UserGender } from "../types";

export const sessionTypeEnum = z.enum(['online', 'offline'] as const satisfies SessionType[], {
    required_error: 'نوع جلسه الزامی است',
});
export const genderTypeEnum = z.enum(['male', 'female'] as const satisfies UserGender[], {
    required_error: 'جنسیت الزامی است',
});
