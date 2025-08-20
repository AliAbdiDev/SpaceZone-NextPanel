import { createOptionsFromLabels } from "@/core/utils/createOptionsFromLabels";
import { GeneralStatus, MediaType, UserGender, UserRoles, UserStatus } from "./types/entities";
import { SessionType } from "./types/entities/session";
import { CourseLevel, DiscountType, PublishingStatus, RegistrationStatus } from "./types/entities/course";


// ------------------ Mapping Roles ------------------
export const MAPPING_ROLES: Record<UserRoles, string> = {
    admin: 'مدیر',
    student: 'دانشپذیر',
    teacher: 'مدرس',
};
export const ARRAY_ROLE = createOptionsFromLabels(MAPPING_ROLES);


// ------------------ Mapping gender ------------------
export const MAPPING_GENDER: Record<UserGender, string> = {
    male: 'مرد',
    female: 'زن',
};
export const ARRAY_GENDER = createOptionsFromLabels(MAPPING_GENDER);


// ------------------ Mapping course session type ------------------
export const MAPPING_SESSION_TYPE: Record<SessionType, string> = {
    online: 'آنلاین',
    offline: 'آفلاین',
};
export const ARRAY_SESSION_TYPE = createOptionsFromLabels(MAPPING_SESSION_TYPE);

// ------------------ Mapping course level ------------------
export const MAPPING_COURSE_LEVEL: Record<CourseLevel, string> = {
    beginner: 'مبتدی',
    intermediate: 'متوسط',
    advanced: 'پیشرفته',
};
export const ARRAY_COURSE_LEVEL = createOptionsFromLabels(MAPPING_COURSE_LEVEL);


// ------------------ Mapping discount type ------------------
export const MAPPING_DISCOUNT_TYPE: Record<DiscountType, string> = {
    percent: 'درصدی',
    amount: 'مقداری',
};
export const ARRAY_DISCOUNT_TYPE = createOptionsFromLabels(MAPPING_DISCOUNT_TYPE);


// ------------------ Mapping publishing status ------------------
export const MAPPING_PUBLISHING_STATUS: Record<PublishingStatus, string> = {
    published: 'منتشر شده',
    unpublished: 'منتشر نشده',
    publishing: 'در حال انتشار',
};
export const ARRAY_PUBLISHING_STATUS = createOptionsFromLabels(MAPPING_PUBLISHING_STATUS);


// ------------------ Mapping register status ------------------
export const MAPPING_REGISTRING_STATUS: Record<RegistrationStatus, string> = {
    closed: 'بسته',
    open: 'باز'
};
export const ARRAY_REGISTRING_STATUS = createOptionsFromLabels(MAPPING_PUBLISHING_STATUS);


// ------------------ Mapping register status ------------------
export const MAPPING_USER_STATUS: Record<UserStatus, string> = {
    active: 'فعال',
    inactive: 'غیر فعال'
};
export const ARRAY_USER_STATUS = createOptionsFromLabels(MAPPING_PUBLISHING_STATUS);


// ------------------ Mapping media Type ------------------
export const MAPPING_MEDIA_TYPE: Record<MediaType, string> = {
    video: 'ویدیو',
    audio: 'صوت',
    image: 'تصویر',
    archive: 'فشرده',
    pdf: 'پی‌دی‌اف'
};
export const ARRAY_MEDIA_TYPE = createOptionsFromLabels(MAPPING_MEDIA_TYPE);



// =================== Mapping general ========================


// ------------------ Mapping general status ------------------
export const MAPPING_GENERAL_STATUS: Record<GeneralStatus, string> = {
    active: 'فعال',
    inactive: 'غیر فعال'
};
export const ARRAY_GENERAL_STATUS = createOptionsFromLabels(MAPPING_GENERAL_STATUS);
