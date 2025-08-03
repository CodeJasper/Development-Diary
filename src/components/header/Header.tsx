'use server'

import { auth } from "@/auth"
import LogoutNavItem from "./LogoutNavItem";

const UNAUTHORIZED_ITEMS = [
  {
    text: 'Ingresar',
    route: '/account/login'
  },
  {
    text: 'Registrarse',
    route: '/account/register'
  }
]

const AUTHORIZED_ITEMS = [
  {
    text: 'Perfil',
    route: '/account/profile'
  },
]

export default async function Header() {
  const session = await auth();
  console.log(session)

  const getItem = (route: string, text: string) => {
    return (
      <div className="p-4" key={text}>
        <a className="block p-0 rounded focus:outline-none focus:ring-2 focus:ring-secondary" href={route}>{text}</a>
      </div>
    )
  }

  return (
    <header>
      <nav className="max-w-7xl mx-auto flex justify-end gap-2">
        {getItem("/", "Inicio")}
        {!session && UNAUTHORIZED_ITEMS.map((item) => {
          return (
            getItem(item.route, item.text)
          )
        })}
        {session && AUTHORIZED_ITEMS.map((item) => {
          return (
            getItem(item.route, item.text)
          )
        })}
        {session &&
          <LogoutNavItem />
        }
      </nav>
    </header>
  )
}