'use client'

import { authClient } from "@/lib/auth-client"
import { MenuContent, MenuRoot, MenuSignIn, MenuSignOut, MenuUserInfo } from "./index"

export function Menu() {
  const { data: session } = authClient.useSession()

  return (
    <MenuRoot>
      {session?.user ? (
        <MenuContent>
          <MenuUserInfo session={session} />
          <MenuSignOut />
        </MenuContent>
      ) : (
        <MenuSignIn />
      )}
    </MenuRoot>
  )
}
