import { z } from "zod";

const PERSIAN_AND_SPACE_RE = /^[\u0600-\u06FF\s]+$/;
const nameField = (fieldName) => {
  return z
    .string()
    .min(1, `${fieldName} را وارد کنید`)
    .max(50, `${fieldName} نمی‌تواند بیش از ۵۰ کاراکتر باشد`)
    .refine(
      (value) => PERSIAN_AND_SPACE_RE.test(value),
      `${fieldName} باید به زبان فارسی باشد`
    );
};
export const registrationSchema = z.object({
  first_name: nameField("نام"),
  last_name: nameField("نام خانوادگی"),
  father_name: nameField("نام پدر"),
  birth_date: z.preprocess((val) => {
    if (typeof val === "string" || val instanceof Date) {
      const d = new Date(val);
      return isNaN(d.getTime()) ? undefined : val;
    }
    return undefined;
  }, z.string().nonempty("تاریخ تولد را وارد کنید")),
  national_code: z
    .string()
    .min(1, "شماره ملی را وارد کنید")
    .regex(/^[0-9]{10}$/, "شماره ملی باید 10 رقم باشد"),
  mobile_number: z
    .string()
    .min(1, "شماره تلفن را وارد کنید")
    .regex(/^[0-9]{11}$/, "شماره تلفن باید 11 رقم باشد"),
  address: z.string().optional(),
  gender: z.enum(["male", "female"], { message: "جنسیت باید مرد یا زن باشد" }),
  skill: z.string().max(250, "مهارت حداکثر 250 کاراکتر است"),
  about_me: z.string().max(500, "درباره من حداکثر 500 کاراکتر است"),
});
