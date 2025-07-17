import { registerUser } from "@/app/register/actions";

export default function RegisterForm() {
  return (
    <form action={registerUser}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  )
}
