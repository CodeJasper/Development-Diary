import { signIn } from "next-auth/react";

export type GoogleButtonProps = {
  className?: string;
}

export default function GoogleButton({ className = "" }: GoogleButtonProps) {
  return (
    <button
      className={`${className} btn w-full border  border-dark flex items-center gap-3 justify-center`}
      onClick={() => signIn('google', { redirectTo: '/' })}
    >
      <img src="/google_icon.png" height={24} width={24} />
      Ingresar con Google
    </button>
  )
}