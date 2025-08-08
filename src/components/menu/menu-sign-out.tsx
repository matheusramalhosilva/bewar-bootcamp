'use client'

import { LogOutIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

export function MenuSignOut() {
  function handleSignOut() {
    authClient.signOut()
  }

  return (
    <Button
      asChild
      size="icon"
      variant="outline"
      className="cursor-pointer"
      onClick={handleSignOut}
    >
      <LogOutIcon />
    </Button>
  )
}
