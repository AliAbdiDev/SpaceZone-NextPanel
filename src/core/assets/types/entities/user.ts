
export type UserRoles = 'student' | 'admin' | 'teacher';
export type UserGender = 'male' | 'female';
export type UserStatus = 'active' | 'inactive';

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    father_name: string;
    birth_date: string;
    national_code: string;
    mobile: string;
    about_me: string;
    skills: string;
    address: string;
    gender: UserGender;
    avatar: string;
    status: UserStatus;
    status_description: string;
    role: UserRoles;
}