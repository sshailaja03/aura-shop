import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ProductCard";
import { searchProducts, categories } from "@/data/products";
import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [query, setQuery] = useState(q);
  const navigate = useNavigate();
  const results = searchProducts(q);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        {/* Search bar */}
        <form onSubmit={handleSearch} className="max-w-xl mb-8">
          <div className="relative glass-strong rounded-full">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-12 pr-4 py-3 rounded-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        </form>

        {q && (
          <p className="text-sm text-muted-foreground mb-4">
            {results.length} results for "<span className="text-foreground font-medium">{q}</span>"
          </p>
        )}

        {/* Category chips */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {categories.slice(0, 6).map((cat) => (
            <Link key={cat.slug} to={`/category/${cat.slug}`} className="pill bg-secondary/80 text-foreground text-xs hover:bg-secondary transition">
              {cat.icon} {cat.name}
            </Link>
          ))}
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        ) : q ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found. Try a different search term.</p>
          </div>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
