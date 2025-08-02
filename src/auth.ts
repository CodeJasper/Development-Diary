
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import { compare } from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/account/login',
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { email, password } = credentials;
        const existingUser = await prisma.user.findUnique({where: { email: email as string }});

        if(!existingUser || !existingUser?.isVerified) {
          return null
        }

        const isCorrectPassword = await compare(password as string, existingUser.password)

        if(!isCorrectPassword) {
          return null
        }

        return {
          id: existingUser.id,
          email: existingUser.email,
          userName: existingUser.userName
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })],
    callbacks: {
      async signIn(data) {
        const { account } = data;
        if (account.provider === 'google') {
          const { profile: { email, family_name, given_name }} = data;
          const existingUser = await prisma.user.findUnique({ where: { email }})

          if(existingUser) {
            return true
          }

          await prisma.user.create({
            data: {
              email,
              userName: email,
              lastName: family_name,
              isVerified: true,
              name: given_name,
            }
          })

          return true
        }

        return true;
      }
    },
})