"use server"

import { hash } from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) return

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return

  const hashed = await hash(password, 10)

  await prisma.user.create({
    data: {
      email,
      password: hashed,
      name: email.split("@")[0],
      lastName: "Doe",
    },
  })

  redirect("/login")
}