"use server"

import { hash } from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"
import * as yup from "yup"
import { RegistrationFormProps } from "./page"

const schema = yup.object({
  userName: yup.string().required("El nombre de usuario es obligatorio").matches(/^[a-zA-Z0-9_]+$/, "El nombre de usuario solo puede contener letras, números y guiones bajos"),
  email: yup.string().email("Correo inválido").required("El correo es obligatorio"),
  password: yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es obligatoria"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
    .required("Confirma tu contraseña"),
})

export type FormState<T> = {
  fieldErrors?: Partial<Record<keyof T, string>>;
  generalErrors?: string[];
  data?: Partial<T>;
  success?: boolean
}

export async function registerUser(_: FormState<RegistrationFormProps>, data: FormData) {
  const password = data.get('password') as string;
  const email = data.get('email') as string;
  const userName = data.get('userName') as string;
  const confirmPassword = data.get('confirmPassword') as string;


  try {
    await schema.validate({ password, email, userName, confirmPassword}, { abortEarly: false });
  } catch (err) {
    const validationErrors = {};
    err.inner.forEach((error) => {
      if (error.path && !validationErrors[error.path]) {
        validationErrors[error.path] = error.message;
      }
    });
    return { fieldErrors: validationErrors, data: { email, userName } };
  }

  if (!email || !password || !userName) return

  const existing = await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { userName },
      ],
    },
  })

  if (existing?.email === email) {
    return { generalErrors: ["Este correo ya está registrado."], data: { email, userName }  }
  }

  if (existing?.userName === userName) {
    return { generalErrors: ["Este nombre de usuario ya está registrado."], data: { email, userName }  }
  }

  const hashed = await hash(password, 10)
  const token = generateVerificationToken();

  await prisma.user.create({
    data: {
      userName,
      email,
      password: hashed,
      verificationToken: token,
    },
  })

  sendVerificationEmail(email, token)
  redirect('/login');
}