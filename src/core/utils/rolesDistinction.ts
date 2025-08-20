// src/utils/roles.ts

// Enum for user roles
export enum UserRoles {
    Admin = 'admin',
    Student = 'student',
    Teacher = 'teacher',
}

// Flags for role checks
export type RolesFlags = {
    isAdmin: boolean;
    isStudent: boolean;
    isTeacher: boolean;
};

// Result type with roles and flags
export type RolesResult = {
    roles: UserRoles[];
    flags: RolesFlags;
};

/**
 * Split input string into lowercase tokens
 * Example: "someAdminRole!" -> ["some", "admin", "role"]
 */
const tokenize = (input: string): string[] => {
    if (!input) return [];
    return input
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Split camelCase
        .replace(/[^a-zA-Z]+/g, ' ') // Replace non-letters with space
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean);
};

/**
 * Extract valid roles from input
 * Input: Array of strings or UserRoles
 * Output: Unique array of valid UserRoles
 */
export const normalizeRoles = (rolesInput: Array<string | UserRoles> = []): UserRoles[] => {
    const found: UserRoles[] = [];

    for (const role of rolesInput) {
        const str = String(role ?? '').trim();
        if (!str) continue;

        const tokens = tokenize(str);
        const roles = Object.values(UserRoles);

        // Check for exact token match
        for (const r of roles) {
            if (tokens.includes(r) && !found.includes(r)) {
                found.push(r);
            }
        }

        // Fallback: Check for substring match if no tokens matched
        if (!found.length) {
            const lowered = str.toLowerCase();
            for (const r of roles) {
                if (lowered.includes(r) && !found.includes(r)) {
                    found.push(r);
                }
            }
        }
    }

    return found;
};

/**
 * Return roles and their flags
 * Input: Array of strings or UserRoles
 * Output: Object with roles array and boolean flags
 */
export const rolesDistinction = (rolesInput: Array<string | UserRoles> = []): RolesResult => {
    const roles = normalizeRoles(rolesInput);
    return {
        roles,
        flags: {
            isAdmin: roles.includes(UserRoles.Admin),
            isStudent: roles.includes(UserRoles.Student),
            isTeacher: roles.includes(UserRoles.Teacher),
        },
    };
};