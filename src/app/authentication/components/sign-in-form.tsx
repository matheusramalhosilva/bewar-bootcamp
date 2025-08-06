'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"

const signInFormSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres")
})

type signInFormSchemaData = z.infer<typeof signInFormSchema>

export default function SignInForm() {
  const router = useRouter()

  const form = useForm<signInFormSchemaData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  async function onSubmit(values: signInFormSchemaData) {
    await authClient.signIn.email({
      email: values.email,
      password: values.password,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Login realizado com sucesso!")
          router.push('/')
        },
        onError: (ctx) => {
          if (ctx.error.code === 'USER_NOT_FOUND' || ctx.error.code === 'INVALID_EMAIL_OR_PASSWORD') {
            toast.error("E-mail ou senha inválidos")

            form.setError("email", { message: "E-mail ou senha inválidos" })
            form.setError("password", { message: "E-mail ou senha inválidos" })

            return
          }

          toast.error(ctx.error.message)
        }
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle> Entrar </CardTitle>
        <CardDescription> Faça o login para continuar </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email"> E-mail </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@email.com" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password"> Senha </FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button className="cursor-pointer" type="submit"> Entrar </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
