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

const signUpFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").trim().min(1, "Nome é obrigatório"),
  email: z.email("Endereço de e-mail inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
  passwordConfirmation: z.string().min(8, "A confirmação da senha é obrigatória")
}).refine((data) => {
  return data.password === data.passwordConfirmation
}, {
  error: "As senhas não coincidem",
  path: ["passwordConfirmation"]
})

type signUpFormSchemaData = z.infer<typeof signUpFormSchema>

export function SignUpForm() {
  const form = useForm<signUpFormSchemaData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  function onSubmit(values: signUpFormSchemaData) {
    console.log(values)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle> Criar conta </CardTitle>
        <CardDescription> Crie sua conta para continuar </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name"> Nome </FormLabel>
                  <FormControl>
                    <Input placeholder="Informe seu nome" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="passwordConfirmation"> Confirmação de senha </FormLabel>
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
        <Button> Criar conta </Button>
      </CardFooter>
    </Card>
  )
}
