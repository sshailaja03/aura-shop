import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { Timer } from "lucide-react";

function Countdown({ endsAt }: { endsAt: string }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const update = () => {
      const diff = new Date(endsAt).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft("Ended"); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${h}h ${m}m ${s}s`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [endsAt]);

  return (
    <span className="inline-flex items-center gap-1 pill bg-destructive/10 text-destructive text-xs">
      <Timer className="h-3 w-3" />
      {timeLeft}
    </span>
  );
}

export function DealsGrid() {
  const deals = products.filter((p) => p.flashDeal);

  if (deals.length === 0) return null;

  return (
    <section className="container py-10">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-display font-semibold text-foreground">⚡ Flash Deals</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {deals.map((p, i) => (
          <div key={p.id} className="relative">
            {p.flashDeal && (
              <div className="mb-2">
                <Countdown endsAt={p.flashDeal.endsAt} />
              </div>
            )}
            <ProductCard product={p} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
