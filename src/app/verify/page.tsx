import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

type Props = {
  searchParams: {
    token?: string
  }
}

export default async function VerifyPage({ searchParams }: Props) {
  const token = searchParams.token

  if (!token) {
    return <p className="text-red-600">❌ Token de verificación no proporcionado.</p>
  }

  const user = await prisma.user.findFirst({
    where: {
      verificationToken: token,
    },
  })

  if (!user) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-600 text-lg font-medium mb-4">❌ Token inválido o ya usado.</p>
        <a
          href="/verify/expired"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Reenviar correo de verificación
        </a>
      </div>
    )
  }

  const now = new Date()
  const expired = user.tokenExpiresAt && user.tokenExpiresAt < now

  if (expired) {
    return (
      <div className="text-center mt-20">
        <p className="text-orange-600 text-lg font-medium mb-4">⚠️ El token ha expirado.</p>
        <a
          href="/verify/expired"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Reenviar correo de verificación
        </a>
      </div>
    )
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      verificationToken: null,
      tokenExpiresAt: null,
    },
  })

  redirect('/login?verified')
}
