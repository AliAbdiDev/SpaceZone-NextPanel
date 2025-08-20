import { ClipboardList } from "lucide-react"
import { PathGenerator } from "@/core/features/dashboard/assets/types"


export const navMainExercise = ({ pathFn, basePath }: { pathFn: PathGenerator, basePath: string }) => {

    return {
        title: "مدیریت تمرین",
        url: pathFn(basePath),
        secondaryUrl: pathFn(`${basePath}/list`),
        icon: ClipboardList,
        items: [
            {
                title: "ایجاد",
                url: pathFn(`${basePath}/create`),
            },
            {
                title: "لیست",
                url: pathFn(`${basePath}/list`),
            },
        ],
    }
}