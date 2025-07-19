import { registerUser } from "@/app/register/actions";

export default function RegisterForm() {
  return (
    <div className="h-full flex flex-col lg:flex-row-reverse">
      <div className="h-1/3 lg:h-full lg:w-1/2 xl:grow">
        <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1462642109801-4ac2971a3a51?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
      </div>

      <div className="relative max-lg:bg-gray-100 grow shadow-2xl shadow-black/50 z-99 pt-20 lg:w-1/2 xl:w-1/3">
        <div className="max-lg:absolute max-lg:-top-40 max-lg:left-1/2 max-lg:-translate-x-1/2 bg-white mx-auto lg:w-md max-lg:p-10 max-lg:rounded max-lg:shadow-2xl max-lg:shadow-black/50">
          <h1 className="mb-4 text-center text-xl">Registrarse</h1>
          <form action={registerUser} className="flex flex-col gap-4">
            <div className="form-control">
              <label htmlFor="username" className="form-label">Nombre de usuario</label>
              <input id="username" className="form-field" type="text" name="username" required />
            </div>
            <div className="form-control">
              <label htmlFor="name" className="form-label">Email:</label>
              <input id="name" className="form-field" type="email" name="email" required />
            </div>

            <div className="form-control">
              <label htmlFor="password" className="form-label">Contraseña:</label>
              <input id="password" className="form-field" type="password" name="password" required />
            </div>

            <div className="form-control">
              <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña:</label>
              <input id="confirmPassword" className="form-field" type="password" name="confirm_password" required />
            </div>
            <button className="btn btn-lg btn-primary" type="submit">Registrarse</button>
          </form>
        </div>
      </div>
    </div>
  )
}
