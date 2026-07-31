"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import type { Product } from "@/lib/mock-data/products";

interface ProductGalleryCardProps {
  product: Product;
}

/**
 * "GALLERY + PRODUCT INFO": main image + thumbnail strip, title, and full description.
 *
 * The mock catalog only ships one photo per product (see `public/assets/images/products`),
 * so unlike the Figma reference — which shows four distinct gallery photos — every thumbnail
 * here points at the same `product.imageUrl`. The thumbnail buttons are still fully wired
 * (clicking one sets `activeThumbnail` and re-renders the main image from that selection);
 * they just can't visually differ until more product photography is added to the mock set.
 */
export function ProductGalleryCard({ product }: ProductGalleryCardProps) {
  const thumbnails = [0, 1, 2, 3];
  const [activeThumbnail, setActiveThumbnail] = useState(0);

  return (
    <Card className="w-full overflow-hidden p-[18px]">
      <div className="flex h-[320px] w-full items-center justify-center overflow-hidden rounded-[10px] border border-border bg-surface-tint">
        <div className="relative h-full w-full">
          <Image
            key={activeThumbnail}
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="mt-2.5 flex items-start gap-2.5">
        {thumbnails.map((index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveThumbnail(index)}
            aria-label={`Show product photo ${index + 1}`}
            aria-pressed={activeThumbnail === index}
            className={`relative size-[72px] shrink-0 overflow-hidden rounded-lg border-2 bg-surface-tint p-0.5 ${
              activeThumbnail === index ? "border-primary" : "border-transparent"
            }`}
          >
            <Image src={product.imageUrl} alt="" fill sizes="72px" className="rounded-md object-cover" />
          </button>
        ))}
      </div>

      <div className="mt-1.5 flex flex-col gap-1.5">
        <h2 className="break-words text-xl font-extrabold tracking-[-0.6px] text-ink">{product.name}</h2>
        <p className="break-words text-[13.5px] leading-[1.6] text-gray-500">{product.description}</p>
      </div>
    </Card>
  );
}
