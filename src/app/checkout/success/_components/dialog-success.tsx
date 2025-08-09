'use client'

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DialogSuccess() {
  return (
    <Dialog open={true} onOpenChange={() => { }}>
      <DialogContent className="text-center">
        <Image
          src="/illustration.svg"
          alt="Success"
          width={300}
          height={300}
          className="mx-auto"
        />

        <DialogTitle className="mt-4 text-2xl">
          Pedido efetuado!
        </DialogTitle>

        <DialogDescription className="font-medium">
          Seu pedido foi efetuado com sucesso. Você pode acompanhar o status
          na seção de “Meus Pedidos”.
        </DialogDescription>

        <DialogFooter className="sm:justify-center">
          <Button asChild className="rounded-full cursor-pointer" size="lg">
            <Link href="/my-orders"> Ver meus pedidos </Link>
          </Button>

          <Button
            className="rounded-full cursor-pointer"
            variant="outline"
            size="lg"
            asChild
          >
            <Link href="/"> Página inicial </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
