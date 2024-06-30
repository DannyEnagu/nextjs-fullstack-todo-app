import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from '../../auth.config';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { User } from './types';
const bcrypt = require('bcrypt');
 
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        authorize: async (credentials) => {
          // Validate the credentials
          const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
          
          if (parsedCredentials.success) {
            // Get the user
            const { email, password } = parsedCredentials.data;
            const user = await getUser(email);
            
            if (!user) {
              // If the user is not found, return null
              return null;
            };

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (isValidPassword) {
              // If the credentials are valid, return the user
              return user;
            }
          }
          // If the credentials are invalid, return null
          return null;
        },
  }),],
  
});