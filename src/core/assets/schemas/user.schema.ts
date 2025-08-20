import { z } from "zod";

const avatarSchema = z.string().optional();
const firstNameSchema = z.string().min(1, 'لطفاً نام را وارد کنید.');
const lastNameSchema = z.string().min(1, 'لطفاً نام خانوادگی را وارد کنید.');
const fatherNameSchema = z.string().min(1, 'لطفاً نام پدر را وارد کنید.');
const nationalCodeSchema = z.string().min(10, 'لطفاً کد ملی را وارد کنید.').max(10, 'حداکثر 10 کاراکتر مجاز است.');
const mobileSchema = z.string().min(11, 'لطفاً تلفن همراه را وارد کنید.').max(11, 'حداکثر 11 کاراکتر مجاز است.');
const skillSchema = z.string().min(1, 'لطفاً مهارت را وارد کنید.');
const birthDateSchema = z.string().min(1, 'لطفاً تاریخ تولد را انتخاب کنید.');
const genderSchema = z.string().min(1, 'لطفاً جنسیت را انتخاب کنید.');
const statusSchema = z.string().min(1, 'لطفاً وضعیت را مشخص کنید.');
const passwordSchema = z.string().min(6, 'لطفاً رمز عبور را وارد کنید.').max(100, 'حداکثر طول رمز عبور 100 کاراکتر است.');
const statusDescriptionSchema = z.string();
const aboutMeSchema = z.string();

export {
    avatarSchema,
    firstNameSchema,
    lastNameSchema,
    fatherNameSchema,
    nationalCodeSchema,
    mobileSchema,
    skillSchema,
    birthDateSchema,
    genderSchema,
    statusSchema,
    passwordSchema,
    statusDescriptionSchema,
    aboutMeSchema,
};
