'use client'

import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { authClient } from "@/lib/auth-client"

export default function Header() {
  const { data: session } = authClient.useSession()

  function handleSignOut() {
    authClient.signOut()
  }

  return (
    <header className="flex items-center justify-between p-5">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Bewar Bootcamp Logo"
          width={100}
          height={26.14}
          className="h-10 w-auto"
        />
      </Link>

      <div className="flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader>
              <SheetTitle> Menu </SheetTitle>
            </SheetHeader>

            <div className="px-5">
              {session?.user ? (
                <>
                  <div className="flex justify-between space-y-6">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={session?.user?.image as string | undefined} />

                        <AvatarFallback>
                          {session?.user?.name.split(" ")?.[0]?.[0]}
                          {session?.user?.name.split(" ")?.[1]?.[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-semibold"> {session?.user?.name} </h3>
                        <span className="text-muted-foreground block text-xs"> {session?.user?.email} </span>
                      </div>
                    </div>

                    <Button asChild size="icon" variant="outline" onClick={handleSignOut}>
                      <LogOutIcon />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold"> Olá. Faça seu login! </h2>

                  <Button asChild size="icon" variant="outline">
                    <Link href="/authentication">
                      <LogInIcon />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
