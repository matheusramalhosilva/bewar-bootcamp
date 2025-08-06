'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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

const signInFormSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres")
})

type signInFormSchemaData = z.infer<typeof signInFormSchema>

export function SignInForm() {
  const form = useForm<signInFormSchemaData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  function onSubmit(values: signInFormSchemaData) {
    console.log(values)
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
        </form>
      </Form>

      <CardFooter>
        <Button> Entrar </Button>
      </CardFooter>
    </Card>
  )
}
