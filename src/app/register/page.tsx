"use client"

import { registerUser, FormState } from "@/app/register/actions";
import * as yup from "yup"
import { useActionState } from "react"

export type RegistrationFormProps = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type RegistrationPayloadProps = Omit<RegistrationFormProps, 'confirmPassword'>


export default function RegisterForm() {
  const [state, formAction, ] = useActionState(registerUser, {})
  const { fieldErrors, data, generalErrors, success } = state as FormState<RegistrationFormProps>;

  return (
    <div className="h-full flex flex-col lg:flex-row-reverse">
      <div className="h-1/3 lg:h-full lg:w-1/2 xl:grow">
        <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1462642109801-4ac2971a3a51?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
      </div>
      <div className="relative max-lg:bg-gray-100 grow shadow-2xl shadow-black/50 z-99 pt-20 lg:w-1/2 xl:w-1/3">
        <div className="max-lg:absolute max-lg:-top-40 max-lg:left-1/2 max-lg:-translate-x-1/2 bg-white mx-auto lg:w-md max-lg:p-10 max-lg:rounded max-lg:shadow-2xl max-lg:shadow-black/50">
          <h1 className="mb-4 text-center text-xl">Registrarse</h1>
          <form
            action={formAction}
            className="flex flex-col gap-4">
            <div className="form-control">
              <label htmlFor="userName" className="form-label">Nombre de usuario</label>
              <input
                name="userName"
                id="userName"
                className="form-field"
                defaultValue={data?.userName}
              />
              {fieldErrors?.userName && <span className="form-error">{fieldErrors.userName}</span>}
            </div>
            <div className="form-control">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                name="email"
                id="email"
                className="form-field"
                defaultValue={data?.email}
              />
              {fieldErrors?.email && <span className="form-error">{fieldErrors.email}</span>}
            </div>

            <div className="form-control">
              <label htmlFor="password" className="form-label">Contraseña:</label>
              <input
                name="password"
                id="password"
                className="form-field"
              />
              {fieldErrors?.password && <span className="form-error">{fieldErrors.password}</span>}
            </div>

            <div className="form-control">
              <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña:</label>
              <input
                name="confirmPassword"
                id="confirmPassword"
                className="form-field"
              />
              {!fieldErrors?.password && fieldErrors?.confirmPassword && <span className="form-error">{fieldErrors.confirmPassword}</span>}
            </div>
            <button className="btn btn-lg btn-primary" type="submit">Registrarse</button>
          </form>
        </div>
      </div>
    </div>
  )
}
