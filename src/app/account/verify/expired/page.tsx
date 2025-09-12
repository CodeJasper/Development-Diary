"use client";

import { useState } from "react";
import { resendVerification } from "@/app/account/verify/actions";

export default function ExpiredPage() {
	const [email, setEmail] = useState("");
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (formData: FormData) => {
		setLoading(true);
		const res = await resendVerification(formData);
		setSuccess(res.success);
		setLoading(false);
	};

	return (
		<div className="max-w-md mx-auto p-6 border rounded-xl shadow mt-20">
			{success ? (
				<p className="text-green-600">
					📧 Te enviamos un nuevo correo de verificación.
				</p>
			) : (
				<form action={handleSubmit} className="flex flex-col gap-4">
					<p className="text-sm text-gray-600">
						Tu token ha expirado. Ingresa tu correo para enviarte un nuevo
						enlace de verificación.
					</p>
					<input
						type="email"
						name="email"
						required
						className="border px-3 py-2 rounded"
						placeholder="tucorreo@example.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<button
						type="submit"
						className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
						disabled={loading}
					>
						{loading ? "Enviando..." : "Reenviar verificación"}
					</button>
				</form>
			)}
		</div>
	);
}
