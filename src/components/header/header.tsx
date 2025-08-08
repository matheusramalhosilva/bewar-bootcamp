import Image from "next/image"
import Link from "next/link"

import { Cart } from "@/components/cart/cart"
import { Menu } from "@/components/menu/menu"

export function Header() {
  return (
    <header className="flex items-center justify-between p-5">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Bewear Bootcamp Logo"
          width={100}
          height={26.14}
          className="h-10 w-auto"
        />
      </Link>

      <div className="flex items-center gap-2">
        <Menu />
        <Cart />
      </div>
    </header>
  )
}
