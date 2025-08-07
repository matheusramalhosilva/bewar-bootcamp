import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

import { Avatar } from "@/components/ui/avatar"
import { authClient } from "@/lib/auth-client"

type MenuUserInfoProps = {
  session?: ReturnType<typeof authClient.useSession>['data']
}

export function MenuUserInfo({ session }: MenuUserInfoProps) {
  return (
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
  )
}
