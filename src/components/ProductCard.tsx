import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star, Truck } from "lucide-react";
import { Product } from "@/data/products";
import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: Props) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wishlisted = isWishlisted(product.id);
  const [imgIdx, setImgIdx] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className="glass-card group relative flex flex-col"
      onMouseEnter={() => product.images.length > 1 && setImgIdx(1)}
      onMouseLeave={() => setImgIdx(0)}
    >
      {/* Discount badge */}
      {product.discount > 0 && (
        <span className="absolute top-3 left-3 z-10 pill bg-accent text-accent-foreground text-xs">
          {product.discount}% OFF
        </span>
      )}

      {/* Wishlist */}
      <button
        onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
        className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-colors"
        aria-label="Toggle wishlist"
      >
        <Heart className={`h-4 w-4 transition-colors ${wishlisted ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden rounded-xl mb-3">
        <img
          src={product.images[imgIdx]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </Link>

      {/* Info */}
      <div className="flex-1 flex flex-col gap-1.5">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{product.brand}</p>
        <Link to={`/product/${product.id}`} className="text-sm font-medium text-foreground leading-snug line-clamp-2 hover:text-primary transition-colors">
          {product.title}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium text-foreground">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviewsCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-base font-bold text-foreground">₹{product.price.toLocaleString()}</span>
          {product.mrp > product.price && (
            <span className="text-xs text-muted-foreground line-through">₹{product.mrp.toLocaleString()}</span>
          )}
        </div>

        {/* Delivery */}
        {product.delivery.eligible && (
          <div className="flex items-center gap-1 mt-1">
            <Truck className="h-3 w-3 text-primary" />
            <span className="text-xs text-primary font-medium">{product.delivery.time}</span>
          </div>
        )}
      </div>

      {/* Add to cart */}
      <button
        onClick={() => addToCart(product, product.variants[0]?.label || "default")}
        className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-150"
      >
        <ShoppingCart className="h-4 w-4" />
        Add to Cart
      </button>
    </motion.div>
  );
}
