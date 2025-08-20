import { PathGenerator } from "@/core/features/dashboard/assets/types"
import { FileBadge } from "lucide-react"


export const navMainCertificate = ({ pathFn, basePath }: { pathFn: PathGenerator, basePath: string }) => {

    return {
        title: "مدیریت گواهینامه",
        url: pathFn(`${basePath}`),
        secondaryUrl: pathFn(`${basePath}/list`),
        icon: FileBadge,
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