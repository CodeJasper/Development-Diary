'use server'

import { prisma } from '@/lib/prisma'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'
import { revalidatePath } from 'next/cache'

export async function resendVerification(formData: FormData) {
  const email = formData.get('email') as string

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user || user.isVerified) {
    return { success: true }
  }

  const token = generateVerificationToken()

  await prisma.user.update({
    where: { email },
    data: {
      verificationToken: token,
      tokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60),
    },
  })

  await sendVerificationEmail(email, token)

  return { success: true }
}
