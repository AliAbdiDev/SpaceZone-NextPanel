import { Permission } from "./permission";

export type Role = {
    id: number;
    title: string;
    description: string;
    permissions: Permission[];
};
