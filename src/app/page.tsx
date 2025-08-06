import { desc } from "drizzle-orm";
import Image from "next/image";

import BrandList from "@/components/common/brand-list";
import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

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

  const brands = [
    { name: "Nike", image: "/nike.svg" },
    { name: "Adidas", image: "/adidas.svg" },
    { name: "Puma", image: "/puma.svg" },
    { name: "New Balance", image: "/new-balance.svg" },
    { name: "Converse", image: "/converse.svg" },
    { name: "Zara", image: "/zara.svg" },
    { name: "Polo", image: "/ralph-lauren.svg" },
  ];

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

        <BrandList title="Marcas parceiras" brands={brands} />

        <ProductList title="Mais vendidos" products={products} />

        <div className="px-5">
          <CategorySelector categories={categories} />
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

        <ProductList title="Novos produtos" products={newlyCreatedProducts} />

        <Footer />
      </div>
    </>
  );
}
