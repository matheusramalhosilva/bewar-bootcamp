import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Header } from "@/components/header";
import SignInForm from "./_components/sign-in-form"
import SignUpForm from "./_components/sign-up-form"

export default function AuthenticationPage() {
  return (
    <>
      <Header />

      <div className="flex w-full flex-col gap-6 p-5">
        <Tabs defaultValue="sign-in">
          <TabsList>
            <TabsTrigger value="sign-in"> Entrar </TabsTrigger>
            <TabsTrigger value="sign-up"> Criar conta </TabsTrigger>
          </TabsList>

          <TabsContent value="sign-in">
            <SignInForm />
          </TabsContent>

          <TabsContent value="sign-up">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
