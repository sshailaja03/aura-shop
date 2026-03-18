import { Link } from "react-router-dom";
import { categories } from "@/data/products";
import { motion } from "framer-motion";

export function CategoryStrip() {
  return (
    <section className="container py-10">
      <h2 className="text-xl font-display font-semibold text-foreground mb-6">Shop by Category</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: i * 0.04 }}
          >
            <Link
              to={`/category/${cat.slug}`}
              className="flex flex-col items-center gap-2 min-w-[80px] group"
            >
              <div className="w-16 h-16 rounded-full bg-secondary/80 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:shadow-glass transition-all duration-150">
                {cat.icon}
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                {cat.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
