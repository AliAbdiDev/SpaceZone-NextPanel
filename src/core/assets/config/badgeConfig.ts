import { BadgeMap } from "@/core/components/custom/ui/BadgeCustom";

const BADGE_CONFIG_COURSE_PUBLISH: BadgeMap = {
    published: {
        label: 'منتشر شده',
        variant: 'default',
    },
    unpublished: {
        label: 'منتشر نشده',
        variant: 'secondary',
    },
    publishing: {
        label: 'در حال انتشار',
        variant: 'outline',
    },
};

const BADGE_CONFIG_COURSE_REGISTRATION: BadgeMap = {
    open: {
        label: 'باز',
        variant: 'default',
    },
    closed: {
        label: 'بسته',
        variant: 'secondary',
    },
};

export {
    BADGE_CONFIG_COURSE_PUBLISH,
    BADGE_CONFIG_COURSE_REGISTRATION
}