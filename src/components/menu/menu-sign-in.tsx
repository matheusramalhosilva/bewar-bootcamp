import { LogInIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export function MenuSignIn() {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-semibold"> Olá. Faça seu login! </h2>

      <Button asChild size="icon" variant="outline">
        <Link href="/authentication">
          <LogInIcon />
        </Link>
      </Button>
    </div>
  )
}
