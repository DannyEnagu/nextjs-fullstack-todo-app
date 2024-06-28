import type { NextAuthConfig } from 'next-auth'; 
export const authConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/auth',
    error: "/auth",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = auth?.user?.id;
      const isHome = nextUrl.pathname === '/';
      if (isHome) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }
      return true;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
    },
    async signIn() {
      return true
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;