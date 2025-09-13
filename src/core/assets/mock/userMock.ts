import { User, UserGender, UserStatus, UserRoles } from '@/core/assets/types/entities';

const roles: UserRoles[] = ['admin'];
const statuses: UserStatus[] = ['active', 'inactive'];
const genders: UserGender[] = ['male', 'female'];
const firstNames = ['علی', 'محمد', 'زهرا', 'فاطمه', 'حسین', 'مریم', 'رضا', 'نرگس'];
const lastNames = ['احمدی', 'رضایی', 'محمدی', 'حسینی', 'کریمی', 'رحیمی', 'علیزاده', 'موسوی'];

function generateRandomNumber(length: number): string {
    return Math.floor(Math.random() * Math.pow(10, length))
        .toString()
        .padStart(length, '0');
}

function generateMockUser(id: number): Partial<User> {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return {
        id,
        first_name: firstName,
        last_name: lastName,
        role: roles[Math.floor(Math.random() * roles.length)],
        national_code: generateRandomNumber(10),
        mobile: `09${generateRandomNumber(9)}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
        gender: genders[Math.floor(Math.random() * genders.length)],
    };
}

export function generateMockUsers(count: number): Partial<User>[] {
    if (count <= 0) {
        console.error('تعداد کاربران باید یک عدد مثبت باشد.');
        return [];
    }

    const mockUsers = Array.from({ length: count }, (_, index) => generateMockUser(index + 1));
    console.log(`دیتای ماک با ${count} کاربر تولید شد.`);
    return mockUsers;
}