"use client";

import { useActionState, useId } from "react";
import {
	type FormState,
	registerUser,
} from "@/app/account/(auth)/register/actions";
import Alert from "@/components/alert/Alert";
import GoogleButton from "@/components/google_button/GoogleButton";

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

export default function RegisterForm() {
	const [state, formAction] = useActionState(registerUser, {});
	const userNameInputId = useId();
	const emailInputId = useId();
	const passwordInputId = useId();
	const confirmdInputId = useId();
	const { fieldErrors, data, generalErrors } =
		state as FormState<RegistrationFormProps>;

	return (
		<>
			{generalErrors?.map((error) => {
				return (
					<Alert
						className="mb-10"
						id={`alert_${error}`}
						text={error}
						type="ERROR"
						isDismissible={true}
						key={`alert_${error}`}
					/>
				);
			})}
			<h1 className="mb-4 text-center text-xl">Registrarse</h1>
			<form action={formAction} className="flex flex-col gap-4">
				<div className="form-control">
					<label htmlFor="userName" className="form-label">
						Nombre de usuario
					</label>
					<input
						name="userName"
						id={userNameInputId}
						className="form-field"
						defaultValue={data?.userName}
					/>
					{fieldErrors?.userName && (
						<span className="form-error">{fieldErrors.userName}</span>
					)}
				</div>
				<div className="form-control">
					<label htmlFor="email" className="form-label">
						Email:
					</label>
					<input
						name="email"
						id={emailInputId}
						className="form-field"
						defaultValue={data?.email}
					/>
					{fieldErrors?.email && (
						<span className="form-error">{fieldErrors.email}</span>
					)}
				</div>

				<div className="form-control">
					<label htmlFor="password" className="form-label">
						Contraseña:
					</label>
					<input
						type="password"
						name="password"
						id={passwordInputId}
						className="form-field"
					/>
					{fieldErrors?.password && (
						<span className="form-error">{fieldErrors.password}</span>
					)}
				</div>

				<div className="form-control">
					<label htmlFor="confirmPassword" className="form-label">
						Confirmar contraseña:
					</label>
					<input
						type="password"
						name="confirmPassword"
						id={confirmdInputId}
						className="form-field"
					/>
					{!fieldErrors?.password && fieldErrors?.confirmPassword && (
						<span className="form-error">{fieldErrors.confirmPassword}</span>
					)}
				</div>
				<button className="btn btn-lg btn-primary" type="submit">
					Registrarse
				</button>
			</form>
			<GoogleButton className="mt-4" />
		</>
	);
}
