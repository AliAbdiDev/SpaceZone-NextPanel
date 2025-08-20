import { FetchResultSingleItem, User } from "@/core/assets/types";
import * as customHookReactQuery from "@/core/hooks/custom"

export const getUserProfile = () => {
    return customHookReactQuery.useApiQuery<FetchResultSingleItem<'profile', User>>({
        endpoint: '/profile',
    });
}

export const updateUserProfile = () => {
    return customHookReactQuery.useApiMutation({
        endpoint: `/profile`,
        method: 'POST',
    });

}

