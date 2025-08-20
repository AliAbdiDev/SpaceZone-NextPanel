import { Role, User } from "./entities";

export interface AuthResponse {
    user: User;
    token: string | null;
    roles: Role[];
}