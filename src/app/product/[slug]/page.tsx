import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import ProductList from "@/components/common/product-list";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatPriceInCentsToBRL } from "@/utils/price-format";

import { removeKeysString } from "@/utils/remove-keys-string";
import ProductActions from "./_components/product-actions";
import VariantSelector from "./_components/variant-selector";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });

  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });

  const productImageUrl = removeKeysString({ str: productVariant.imageUrl });

  return (
    <>
      <Header />

      <div className="flex flex-col space-y-6">
        <Image
          src={productImageUrl}
          alt={productVariant.name}
          sizes="100vw"
          height={0}
          width={0}
          className="h-auto w-full object-cover"
        />

        <div className="px-5">
          <VariantSelector
            selectedVariantSlug={productVariant.slug}
            variants={productVariant.product.variants}
          />
        </div>

        <div className="px-5">
          <h2 className="text-lg font-semibold">
            {productVariant.product.name}
          </h2>

          <h3 className="text-muted-foreground text-sm">
            {productVariant.name}
          </h3>

          <h3 className="text-lg font-semibold">
            {formatPriceInCentsToBRL({ priceInCents: productVariant.priceInCents })}
          </h3>
        </div>

        <ProductActions productVariantId={productVariant.id} />

        <div className="px-5">
          <p className="text-shadow-amber-600">
            {productVariant.product.description}
          </p>
        </div>

        <ProductList title="Talvez você goste" products={likelyProducts} />

        <Footer />
      </div>
    </>
  );
};
