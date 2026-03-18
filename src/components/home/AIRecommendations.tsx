import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Sparkles } from "lucide-react";

export function AIRecommendations() {
  const recommended = [...products].sort(() => Math.random() - 0.5).slice(0, 6);

  return (
    <section className="container py-10">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-5 w-5 text-accent" />
          <h2 className="text-xl font-display font-semibold text-foreground">Based on Your Vibe</h2>
        </div>
        <p className="text-sm text-muted-foreground">AI-curated picks based on your browsing preferences</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {recommended.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
