import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export function Hero() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Mesh gradient bg */}
      <div className="absolute inset-0 mesh-gradient" />
      
      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 right-[15%] w-48 h-48 rounded-full bg-primary/10 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-10 left-[10%] w-64 h-64 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 pill bg-primary/10 text-primary mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Enhanced Shopping
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight max-w-3xl mx-auto">
            Discover products
            <br />
            <span className="text-primary">you'll actually love</span>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto text-base md:text-lg">
            Smart recommendations, real reviews, and deals curated just for you.
          </p>
        </motion.div>

        {/* Search */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          onSubmit={handleSearch}
          className="mt-8 max-w-xl mx-auto"
        >
          <div className="relative glass-strong rounded-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for skincare, headphones, fashion..."
              className="w-full pl-14 pr-32 py-4 rounded-full bg-transparent text-foreground placeholder:text-muted-foreground text-base focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity flex items-center gap-1.5"
            >
              Search
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.form>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex items-center justify-center gap-3 text-sm"
        >
          <button onClick={() => navigate("/category/skincare")} className="pill bg-secondary/80 text-foreground hover:bg-secondary transition-colors">
            Shop Now
          </button>
          <button onClick={() => navigate("/category/electronics")} className="pill border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-colors">
            Explore Deals
          </button>
        </motion.div>
      </div>
    </section>
  );
}
