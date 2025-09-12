"use client";

import { useSearchParams } from "next/navigation";

export type RegistrationFormProps = {
	userName: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export type RegistrationPayloadProps = Omit<
	RegistrationFormProps,
	"confirmPassword"
>;

export default function RegisterSuccessful() {
	const searchParams = useSearchParams();
	const email = searchParams.get("email");

	return (
		<div className="max-lg:max-w-sm max-lg:w-9/10 max-lg:absolute max-lg:-top-40 max-lg:left-1/2 max-lg:-translate-x-1/2 bg-white mx-auto lg:w-md max-lg:p-10 max-lg:rounded max-lg:shadow-2xl max-lg:shadow-black/50">
			<h1 className="mb-4 text-center text-xl">Registro exitoso</h1>
			<div className="flex flex-col items-center gap-10">
				<p className="text-center">
					Se ha enviado un link de confirmación al correo {email}
				</p>
				<a href="/login/" className="w-auto btn btn-lg btn-primary">
					Iniciar sesión
				</a>
			</div>
		</div>
	);
}
