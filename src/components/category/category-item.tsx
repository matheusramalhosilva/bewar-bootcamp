import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { categoryTable } from "@/db/schema";

type CategoryItemProps = {
  category: (typeof categoryTable.$inferSelect)
}

export function CategoryItem({ category }: CategoryItemProps) {
  return (
    <Button
      key={category.id}
      variant="ghost"
      className="rounded-full bg-white font-semibold py-6"
      asChild
    >
      <Link href={`/category/${category.slug}`}> {category.name} </Link>
    </Button>
  )
}
