import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function TrendingCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trending = products.slice(0, 6);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
  };

  return (
    <section className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-semibold text-foreground">Trending Now 🔥</h2>
        <div className="flex gap-2">
          <button onClick={() => scroll("left")} className="p-1.5 rounded-full bg-secondary/60 hover:bg-secondary transition-colors text-foreground" aria-label="Scroll left">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={() => scroll("right")} className="p-1.5 rounded-full bg-secondary/60 hover:bg-secondary transition-colors text-foreground" aria-label="Scroll right">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
        {trending.map((p, i) => (
          <div key={p.id} className="min-w-[240px] max-w-[240px] snap-start">
            <ProductCard product={p} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
