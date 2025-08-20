import { z } from "zod";

export const loginShema = z.object({
  phoneNumber: z.string().length(11, "شماره موبایل باید 11 رقم باشد"),
  password: z
    .string()
    .min(1, "رمز عبور الزامی است")
    .max(12, "رمزعبور حداکثر 12 کاراکتر است"),
});
