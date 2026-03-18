import { useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ProductCard";
import { getProductsByCategory, categories, products } from "@/data/products";
import { useState, useMemo } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type SortKey = "relevance" | "price_asc" | "price_desc" | "popular" | "new";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find((c) => c.slug === slug);
  const [sort, setSort] = useState<SortKey>("relevance");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minRating, setMinRating] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categoryProducts = useMemo(() => {
    let items = slug ? getProductsByCategory(slug) : products;
    if (items.length === 0) items = products; // fallback
    items = items.filter((p) => p.price <= maxPrice && p.rating >= minRating);
    switch (sort) {
      case "price_asc": return [...items].sort((a, b) => a.price - b.price);
      case "price_desc": return [...items].sort((a, b) => b.price - a.price);
      case "popular": return [...items].sort((a, b) => b.reviewsCount - a.reviewsCount);
      default: return items;
    }
  }, [slug, sort, maxPrice, minRating]);

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Price Range</h4>
        <input
          type="range"
          min={100}
          max={5000}
          step={100}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <p className="text-xs text-muted-foreground mt-1">Up to ₹{maxPrice.toLocaleString()}</p>
      </div>
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Min Rating</h4>
        <div className="flex gap-2">
          {[0, 3, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`pill text-xs transition-colors ${minRating === r ? "bg-primary text-primary-foreground" : "bg-secondary/80 text-foreground"}`}
            >
              {r === 0 ? "All" : `${r}★+`}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Brands</h4>
        <div className="space-y-2">
          {["GlowCo", "SoundWave", "LuxeLips", "FitTrack"].map((brand) => (
            <label key={brand} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
              <input type="checkbox" className="rounded accent-primary" />
              {brand}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              {category?.icon} {category?.name || "All Products"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">{categoryProducts.length} products</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="px-3 py-1.5 rounded-lg bg-secondary/60 border border-border/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="relevance">Relevance</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
              <option value="popular">Most Popular</option>
            </select>
            <button
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-secondary/60 text-foreground hover:bg-secondary transition-colors"
              aria-label="Filters"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar filters */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="glass-card sticky top-20">
              <h3 className="font-display font-semibold text-foreground mb-4">Filters</h3>
              <FilterPanel />
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {categoryProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
            {categoryProducts.length === 0 && (
              <p className="col-span-full text-center text-muted-foreground py-12">No products match your filters.</p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter modal */}
      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm lg:hidden"
            onClick={() => setFiltersOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-0 left-0 right-0 glass-strong rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-foreground">Filters</h3>
                <button onClick={() => setFiltersOpen(false)} className="p-1 text-muted-foreground"><X className="h-5 w-5" /></button>
              </div>
              <FilterPanel />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default CategoryPage;
