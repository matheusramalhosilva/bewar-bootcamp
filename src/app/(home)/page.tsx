import { desc } from "drizzle-orm";
import Image from "next/image";

import { BrandItem, BrandList, BrandRoot, BrandTitle } from "@/components/brand";
import { CategoryItem, CategoryRoot } from "@/components/category";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProductItem, ProductList,ProductRoot } from "@/components/product";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { BRANDS_MOCK } from "@/mocks/brand-mock";

export default async function Home() {
  const categories = await db.query.categoryTable.findMany({});

  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  })

  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  })

  return (
    <>
      <Header />

      <div className="space-y-6">
        <div className="px-5">
          <Image
            src="/banner-01.png"
            alt="Leve uma vida com estilo"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>

        <BrandRoot>
          <BrandTitle> Marcas parceiras </BrandTitle>

          <BrandList>
            {BRANDS_MOCK?.map((brand) => (
              <BrandItem key={brand.name} brand={brand} />
            ))}
          </BrandList>
        </BrandRoot>

        <ProductRoot title="Mais vendidos">
          <ProductList>
            {products.length > 0 && products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </ProductList>
        </ProductRoot>

        <div className="px-5">
          <CategoryRoot>
            {categories?.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </CategoryRoot>
        </div>

        <div className="px-5">
          <Image
            src="/banner-02.png"
            alt="Leve uma vida com estilo"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>

        <ProductRoot title="Novos produtos">
          <ProductList>
            {newlyCreatedProducts.length > 0 && newlyCreatedProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </ProductList>
        </ProductRoot>

        <Footer />
      </div>
    </>
  );
}
