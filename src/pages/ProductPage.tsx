import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getProduct, products, reviews } from "@/data/products";
import { useStore } from "@/store/useStore";
import { useState } from "react";
import { Star, Heart, ShoppingCart, Zap, Truck, Shield, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProduct(id || "");
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews" | "qa">("desc");

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <p className="text-muted-foreground">Product not found.</p>
          <Link to="/" className="text-primary mt-4 inline-block hover:underline">Go home</Link>
        </div>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const productReviews = reviews.filter((r) => r.productId === product.id);
  const related = products.filter((p) => p.id !== product.id && p.category.some((c) => product.category.includes(c))).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image gallery */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <div className="glass-card p-2">
              <div className="aspect-square rounded-xl overflow-hidden relative">
                <img src={product.images[activeImg]} alt={product.title} className="w-full h-full object-cover" />
                {product.images.length > 1 && (
                  <>
                    <button onClick={() => setActiveImg((i) => (i - 1 + product.images.length) % product.images.length)} className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-card/70 backdrop-blur-sm text-foreground hover:bg-card/90 transition" aria-label="Previous image">
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button onClick={() => setActiveImg((i) => (i + 1) % product.images.length)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-card/70 backdrop-blur-sm text-foreground hover:bg-card/90 transition" aria-label="Next image">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
              <div className="flex gap-2 mt-2">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${i === activeImg ? "border-primary" : "border-transparent"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Product info */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="space-y-5">
            <div>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{product.brand}</p>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-1">{product.title}</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 pill bg-primary/10 text-primary">
                <Star className="h-3.5 w-3.5 fill-current" />
                {product.rating}
              </div>
              <span className="text-sm text-muted-foreground">{product.reviewsCount} reviews</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-display font-bold text-foreground">₹{product.price.toLocaleString()}</span>
              {product.mrp > product.price && (
                <>
                  <span className="text-lg text-muted-foreground line-through">₹{product.mrp.toLocaleString()}</span>
                  <span className="pill bg-accent/10 text-accent text-xs font-bold">{product.discount}% OFF</span>
                </>
              )}
            </div>

            {/* Highlights */}
            <div className="flex flex-wrap gap-3">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Shield className="h-3.5 w-3.5 text-primary" /> Free Returns</span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Truck className="h-3.5 w-3.5 text-primary" /> {product.delivery.time} delivery</span>
            </div>

            {/* Variants */}
            {product.variants.length > 1 && (
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Variant</p>
                <div className="flex gap-2">
                  {product.variants.map((v, i) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(i)}
                      className={`pill text-sm transition-colors ${i === selectedVariant ? "bg-primary text-primary-foreground" : "bg-secondary/80 text-foreground hover:bg-secondary"}`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Quantity</p>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1.5 rounded-lg bg-secondary/60 text-foreground hover:bg-secondary transition"><Minus className="h-4 w-4" /></button>
                <span className="text-foreground font-medium w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-1.5 rounded-lg bg-secondary/60 text-foreground hover:bg-secondary transition"><Plus className="h-4 w-4" /></button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => addToCart(product, product.variants[selectedVariant]?.label || "default", quantity)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                <ShoppingCart className="h-5 w-5" /> Add to Cart
              </button>
              <button
                onClick={() => addToCart(product, product.variants[selectedVariant]?.label || "default", quantity)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity"
              >
                <Zap className="h-5 w-5" /> Buy Now
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-xl border transition-colors ${wishlisted ? "bg-destructive/10 border-destructive/30 text-destructive" : "bg-secondary/60 border-border/50 text-muted-foreground hover:text-foreground"}`}
                aria-label="Wishlist"
              >
                <Heart className={`h-5 w-5 ${wishlisted ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Coupon */}
            <div className="glass-card">
              <p className="text-sm font-medium text-foreground mb-2">🎟️ Coupons & Offers</p>
              <div className="flex gap-2">
                <input placeholder="Enter coupon code" className="flex-1 px-3 py-1.5 rounded-lg bg-secondary/60 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <button className="px-4 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition">Apply</button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <div className="flex gap-1 border-b border-border/40 mb-6">
            {([["desc", "Description"], ["specs", "Specifications"], ["reviews", "Reviews"], ["qa", "Q&A"]] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${activeTab === key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                {label}
              </button>
            ))}
          </div>

          {activeTab === "desc" && (
            <div className="max-w-2xl">
              <p className="text-foreground leading-relaxed">{product.description}</p>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="max-w-lg glass-card">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="flex justify-between py-2 border-b border-border/20 last:border-0">
                  <span className="text-sm text-muted-foreground">{key}</span>
                  <span className="text-sm font-medium text-foreground">{val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4 max-w-2xl">
              {productReviews.length === 0 ? (
                <p className="text-muted-foreground">No reviews yet.</p>
              ) : (
                productReviews.map((r) => (
                  <div key={r.id} className="glass-card">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1 pill bg-primary/10 text-primary text-xs">
                        <Star className="h-3 w-3 fill-current" /> {r.rating}
                      </div>
                      <span className="text-sm font-medium text-foreground">{r.user}</span>
                      <span className="text-xs text-muted-foreground">{r.date}</span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{r.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{r.comment}</p>
                    <p className="text-xs text-muted-foreground mt-2">{r.helpful} found helpful</p>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "qa" && (
            <div className="max-w-2xl text-center py-8">
              <p className="text-muted-foreground mb-3">No questions yet. Be the first to ask!</p>
              <button className="pill bg-primary/10 text-primary hover:bg-primary/20 transition">Ask a Question</button>
            </div>
          )}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-display font-semibold text-foreground mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
