import { RoleSwitcherItem } from "../types"

export const navRoles = () => {

    return ([
        {
            name: 'دانشپذیر',
            image: '/common/avatar/maleUser.png',
            hrefLink: '/dashboard/student'
        },
        {
            name: 'استاد',
            image: '/common/avatar/femaleAdmin.png',
            hrefLink: '/dashboard/teacher'
        },
        {
            name: 'ادمین',
            image: '/common/avatar/maleAdmin.png',
            hrefLink: '/dashboard/admin'
        },
    ] as RoleSwitcherItem[])
}