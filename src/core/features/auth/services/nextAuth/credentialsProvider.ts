import { fetchHandler } from '@/core/services/api';
import { createUser } from './utils';
import { CredentialsConfig } from 'next-auth/providers/credentials';

export const credentialsProvider: CredentialsConfig = {
    id: 'credentials',
    name: 'Credentials',
    type: 'credentials',
    credentials: {
        mobile: { label: 'Mobile Number', type: 'tel' },
        password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
        if (!credentials?.mobile || !credentials?.password) {
            console.error('Missing mobile number or password');
            return null;
        }

        console.log('🚀 ~ authorize ~ credentials:', credentials);

        try {
            const formData = new FormData();
            formData.append('mobile', credentials.mobile);
            formData.append('password', credentials.password);
            const { data } = await fetchHandler({
                endpoint: `${process.env.API_BASE_URL}/auth/login`,
                payload: {
                    mobile: credentials.mobile,
                    password: credentials.password,
                },
                method: 'POST',
                typeRequest: 'formData'
            });

            if (!data || !data.data?.access_token) {
                console.error('Invalid response or missing token');
                return null;
            }

            const userData = data.data;
            return createUser({
                id: userData.id,
                access_token: userData.access_token,
                type: userData.type || '',
            });
        } catch (error) {
            console.error('Authorize error:', error.message);
            return null;
        }
    },
};