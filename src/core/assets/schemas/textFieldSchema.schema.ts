import z from "zod";

export const textFieldDefault = z.string().min(3, 'حداقل ۳ کاراکتر مجاز است').max(255, 'حداکثر ۲۵۵ کاراکتر مجاز است') 