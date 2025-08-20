import z from "zod";

export const hourOnlySchema = z
    .string()
    .regex(/^([01]\d|2[0-3])$/, {
        message: 'ساعت بین ۰۰ تا ۲۳ باشد',
    });

export const hourMinuteSchema = z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'مثلاً ۰۸:۳۰ وارد کنید',
    });

export const hourMinuteSecondSchema = z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: 'مثلاً ۱۴:۲۳:۴۵ وارد کنید',
    });
