import { Link } from "react-router-dom";
import { categories } from "@/data/products";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-secondary/30 mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display font-semibold text-foreground mb-3">
              <span className="text-primary">Luxe</span>Cart
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-enhanced shopping for a smarter, more delightful experience.
            </p>
          </div>
          <div>
            <h4 className="font-display font-medium text-foreground mb-3 text-sm">Shop</h4>
            <ul className="space-y-2">
              {categories.slice(0, 5).map((c) => (
                <li key={c.slug}>
                  <Link to={`/category/${c.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-medium text-foreground mb-3 text-sm">Help</h4>
            <ul className="space-y-2">
              {["FAQs", "Shipping", "Returns", "Contact Us"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-medium text-foreground mb-3 text-sm">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-3">Get updates on deals & new arrivals.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-1.5 rounded-lg bg-secondary/60 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border/30 text-center text-xs text-muted-foreground">
          © 2026 LuxeCart. All rights reserved. 💳 Visa • Mastercard • UPI • PayPal
        </div>
      </div>
    </footer>
  );
}
