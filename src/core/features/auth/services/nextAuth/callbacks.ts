import { createUser } from './utils';

export const callbacks = {
  async jwt({ token, user }) {
    if (!user) return token;

    token.userData = createUser(user);
    console.log('🚀 ~ jwt ~ token, user:', { token, user });
    return token;
  },
  async session({ session, token }) {
    if (token.userData) {
      session.user = token.userData;
      console.log('🚀 ~ session ~ session:', session);
    }
    return session;
  },
};