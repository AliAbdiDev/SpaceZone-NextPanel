import { PathGenerator } from "@/core/features/dashboard/assets/types"
import { ClipboardCheck } from "lucide-react"
export const navMainTest = ({ pathFn, basePath }: { pathFn: PathGenerator, basePath: string }) => {

    return {
        title: "مدیریت آزمون",
        url: pathFn(`${basePath}`),
        secondaryUrl: pathFn(`${basePath}/list`),
        icon: ClipboardCheck,
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
