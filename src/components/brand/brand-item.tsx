import Image from "next/image"

type BrandItemProps = {
  brand: {
    name: string;
    image: string;
  }
}

export function BrandItem({ brand }: BrandItemProps) {
  return (
    <div className="min-w-40 max-w-40 flex flex-col gap-4">
      <div className="w-full h-20 border-2 border-accent rounded-xl flex items-center justify-center">
        <Image
          src={brand.image}
          alt={brand.name}
          width={50}
          height={0}
          className="h-auto max-h-16"
        />
      </div>

      <div className="flex flex-col gap-1 max-w-40 text-center">
        <p className="truncate text-base font-semibold"> {brand.name} </p>
      </div>
    </div>
  )
}
