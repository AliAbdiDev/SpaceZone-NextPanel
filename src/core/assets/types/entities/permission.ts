export interface Permission {
    id: number;
    title: string;
    title_fa: string;
    description: string;
    pivot: {
        role_id: number;
        permission_id: number;
    };
};
