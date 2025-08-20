import { GraduationCap } from "lucide-react"
import { PathGenerator } from "@/core/features/dashboard/assets/types"

export const navMainStudent = ({ pathFn, basePath }: { pathFn: PathGenerator, basePath: string }) => {
    return {
        title: "مدیریت دانشجو",
        url: pathFn(`${basePath}`),
        secondaryUrl: pathFn(`${basePath}/list`),
        icon: GraduationCap,
        items: [
            {
                title: "ایجاد",
                url: pathFn(`${basePath}/enroll-course`),
            },
            {
                title: "لیست",
                url: pathFn(`${basePath}/list`),
            },
        ],
    }
}