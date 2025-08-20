import { PathGenerator } from "@/core/features/dashboard/assets/types"
import { IconsEntityCourse } from "@/core/assets/icons/entityIcons"

export const navMainCourse = ({ pathFn, basePath }: { pathFn: PathGenerator, basePath: string }) => {

    return {
        title: "مدیریت دوره",
        url: pathFn(basePath),
        secondaryUrl: pathFn(`${basePath}/main/list`),
        icon: IconsEntityCourse.default,
        items: [
            {
                title: "لیست دوره ها",
                url: pathFn(`${basePath}/main/list`),
            },
            {
                title: "ایجاد دوره",
                url: pathFn(`${basePath}/main/create`),
            },
            {
                menuItemDisabled: true,
                title: "ویرایش دوره",
                url: pathFn(`${basePath}/main/edit`),
            },
            {
                menuItemDisabled: true,
                title: 'پروفایل دوره',
                url: pathFn(`${basePath}/main/profile`),
            },
            {
                title: "مدیریت دروس",
                url: pathFn(`${basePath}/lessons/main/list`),
                menuItemDisabled: true,
                items: [
                    {
                        title: "ایجاد درس جدید",
                        url: pathFn(`${basePath}/lessons/main/create`),
                    },
                    {
                        title: "لیست دروس",
                        url: pathFn(`${basePath}/lessons/main/list`),
                    },
                    {
                        menuItemDisabled: true,
                        title: "ویرایش درس",
                        url: pathFn(`${basePath}/lessons/main/edit`),
                    },
                    {
                        title: "مدیریت جلسات",
                        url: pathFn(`${basePath}/lessons/sessions/list`),
                        menuItemDisabled: true,
                        items: [
                            {
                                title: "ایجاد جلسه جدید",
                                url: pathFn(`${basePath}/lessons/sessions/create`),
                            },
                            {
                                title: "لیست جلسات",
                                url: pathFn(`${basePath}/lessons/sessions/list`),
                            },
                            {
                                menuItemDisabled: true,
                                title: "ویرایش جلسه",
                                url: pathFn(`${basePath}/lessons/sessions/edit`),
                            },
                        ],
                    },
                ],
            },

            {
                title: "اساتید",
                url: pathFn(`${basePath}/teachers`),
                menuItemDisabled: true,
                items: [
                    {
                        title: "لیست اساتید",
                        url: pathFn(`${basePath}/teachers/list`),
                    },
                    {
                        title: "ایجاد استاد",
                        url: pathFn(`${basePath}/teachers/create`),
                    },
                    {
                        title: "ویرایش استاد",
                        url: pathFn(`${basePath}/teachers/edit`),
                    },
                ]
            },
        ],
    }
} 