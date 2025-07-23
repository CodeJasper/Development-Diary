
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import { compare } from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        const existingUser = await prisma.user.findUnique({where: { email: email as string }});

        if(!existingUser) {
          return null;
        }

        const hashedPassword = existingUser.password;
        const isCorrectPassword = await compare(hashedPassword, password as string)

        if(isCorrectPassword) {
          return existingUser;
        }

        return null
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })],
    callbacks: {
      async signIn(data) {
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
    },
})