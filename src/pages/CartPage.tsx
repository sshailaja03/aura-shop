import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useStore } from "@/store/useStore";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", pincode: "", payment: "card" });

  const total = cartTotal();
  const shipping = total > 999 ? 0 : 49;
  const tax = Math.round(total * 0.18);

  const handlePlaceOrder = () => {
    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
    clearCart();
    navigate(`/order-confirmation/${orderId}`);
  };

  if (cart.length === 0 && step === "cart") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="text-xl font-display font-semibold text-foreground mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some products to get started!</p>
          <Link to="/" className="pill bg-primary text-primary-foreground hover:opacity-90 transition">Browse Products</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <h1 className="text-2xl font-display font-bold text-foreground mb-6">
          {step === "cart" ? "Shopping Cart" : "Checkout"}
        </h1>

        {step === "cart" ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-3">
              {cart.map((item, i) => (
                <motion.div
                  key={`${item.product.id}-${item.variant}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card flex gap-4"
                >
                  <Link to={`/product/${item.product.id}`} className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                    <img src={item.product.images[0]} alt={item.product.title} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.product.id}`} className="text-sm font-medium text-foreground hover:text-primary transition line-clamp-1">{item.product.title}</Link>
                    <p className="text-xs text-muted-foreground">{item.variant} · {item.product.brand}</p>
                    <p className="text-sm font-bold text-foreground mt-1">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeFromCart(item.product.id, item.variant)} className="p-1 text-muted-foreground hover:text-destructive transition" aria-label="Remove">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.product.id, item.variant, item.quantity - 1)} className="p-1 rounded bg-secondary/60 text-foreground"><Minus className="h-3 w-3" /></button>
                      <span className="text-sm font-medium text-foreground w-5 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.variant, item.quantity + 1)} className="p-1 rounded bg-secondary/60 text-foreground"><Plus className="h-3 w-3" /></button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="glass-card h-fit lg:sticky lg:top-20 space-y-3">
              <h3 className="font-display font-semibold text-foreground">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-foreground"><span>Subtotal</span><span>₹{total.toLocaleString()}</span></div>
                <div className="flex justify-between text-foreground"><span>Shipping</span><span>{shipping === 0 ? "Free" : `₹${shipping}`}</span></div>
                <div className="flex justify-between text-foreground"><span>Estimated Tax</span><span>₹{tax.toLocaleString()}</span></div>
                <div className="border-t border-border/30 pt-2 flex justify-between font-bold text-foreground">
                  <span>Total</span><span>₹{(total + shipping + tax).toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={() => setStep("checkout")}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition mt-4"
              >
                Checkout <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-lg mx-auto space-y-6">
            {/* Shipping form */}
            <div className="glass-card space-y-4">
              <h3 className="font-display font-semibold text-foreground">Shipping Details</h3>
              {(["name", "phone", "address", "pincode"] as const).map((field) => (
                <div key={field}>
                  <label className="text-sm font-medium text-foreground capitalize block mb-1">{field}</label>
                  <input
                    value={formData[field]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-secondary/60 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder={field === "pincode" ? "6-digit pincode" : `Enter ${field}`}
                  />
                </div>
              ))}
            </div>

            {/* Payment */}
            <div className="glass-card space-y-3">
              <h3 className="font-display font-semibold text-foreground">Payment Method</h3>
              {[
                { key: "card", label: "💳 Credit/Debit Card" },
                { key: "upi", label: "📱 UPI" },
                { key: "netbanking", label: "🏦 Netbanking" },
                { key: "cod", label: "💵 Cash on Delivery" },
              ].map((m) => (
                <label key={m.key} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${formData.payment === m.key ? "bg-primary/10 border border-primary/30" : "bg-secondary/40 border border-transparent hover:bg-secondary/60"}`}>
                  <input type="radio" name="payment" value={m.key} checked={formData.payment === m.key} onChange={(e) => setFormData({ ...formData, payment: e.target.value })} className="accent-primary" />
                  <span className="text-sm text-foreground">{m.label}</span>
                </label>
              ))}
            </div>

            {/* Order total */}
            <div className="glass-card">
              <div className="flex justify-between font-bold text-foreground">
                <span>Total</span><span>₹{(total + shipping + tax).toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep("cart")} className="flex-1 py-3 rounded-xl bg-secondary/80 text-foreground font-medium hover:bg-secondary transition">
                Back
              </button>
              <button onClick={handlePlaceOrder} className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition">
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
