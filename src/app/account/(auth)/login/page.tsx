"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { type FormEvent, useId, useState } from "react";
import Alert from "@/components/alert/Alert";
import GoogleButton from "@/components/google_button/GoogleButton";
import Button from "@/components/ui/button/Button";
import { ButtonSizes, ButtonTypes } from "@/components/ui/button/types";

export type LoginFormProps = {
	email: string;
	password: string;
};

export default function LoginForm() {
	const [error, setError] = useState("");
	const searchParams = useSearchParams();
	const router = useRouter();
	const isVerified = searchParams.get("verified");
	const emailInputId = useId();
	const passwordInputId = useId();

	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const response = await signIn("credentials", {
			email,
			password,
			redirect: false,
		});

		if (response.error) {
			setError("Las credenciales no coinciden");
		} else {
			router.push("/");
			router.refresh();
		}
	};

	return (
		<>
			{isVerified && (
				<Alert
					className="mb-10"
					id={`alert_verified`}
					text={"Cuenta verificada satisfactoriamente"}
					type="SUCCESS"
					isDismissible={true}
				/>
			)}
			{error && (
				<Alert
					className="mb-10"
					id={`alert_${error}`}
					text={error}
					type="ERROR"
					isDismissible={true}
				/>
			)}
			<h1 className="mb-4 text-center text-xl">Iniciar sesión</h1>
			<form onSubmit={handleLogin} className="flex flex-col gap-4">
				<div className="form-control">
					<label htmlFor="email" className="form-label">
						Email:
					</label>
					<input name="email" id={emailInputId} className="form-field" />
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
				</div>
				<Button size={ButtonSizes.lg} type={ButtonTypes.submit}>
					Iniciar sesión
				</Button>
			</form>
			<GoogleButton className="mt-4" />
		</>
	);
}
