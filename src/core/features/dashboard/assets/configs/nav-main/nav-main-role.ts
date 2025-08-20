import { PathGenerator } from "@/core/features/dashboard/assets/types"
import { UserCog2 } from "lucide-react"

export const navMainRole = ({ pathFn, basePath }: { pathFn: PathGenerator, basePath: string }) => {

    return {
        title: "مدیریت نقش",
        url: pathFn(`${basePath}`),
        secondaryUrl: pathFn(`${basePath}/list`),
        icon: UserCog2,
        items: [
            {
                title: "لیست",
                url: pathFn(`${basePath}/list`),
            },
        ],
    }
}