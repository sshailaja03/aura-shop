import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useStore } from "@/store/useStore";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useState } from "react";
import { User as UserIcon, Package, MapPin, Heart, Settings, LogOut } from "lucide-react";

type Tab = "profile" | "orders" | "addresses" | "wishlist" | "settings";

const AccountPage = () => {
  const { user, setUser, wishlist, toggleTheme, theme } = useStore();
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [editName, setEditName] = useState(user?.name || "");
  const [editEmail, setEditEmail] = useState(user?.email || "");
  const [editPhone, setEditPhone] = useState(user?.phone || "");

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "profile", label: "Profile", icon: <UserIcon className="h-4 w-4" /> },
    { key: "orders", label: "Orders", icon: <Package className="h-4 w-4" /> },
    { key: "addresses", label: "Addresses", icon: <MapPin className="h-4 w-4" /> },
    { key: "wishlist", label: "Wishlist", icon: <Heart className="h-4 w-4" /> },
    { key: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
  ];

  const mockOrders = [
    { id: "ORD-A1B2C3", date: "Mar 12, 2026", total: 2498, status: "Delivered", items: 3 },
    { id: "ORD-D4E5F6", date: "Mar 5, 2026", total: 1299, status: "Shipped", items: 1 },
    { id: "ORD-G7H8I9", date: "Feb 28, 2026", total: 4998, status: "Processing", items: 2 },
  ];

  const statusColor: Record<string, string> = {
    Delivered: "bg-primary/10 text-primary",
    Shipped: "bg-accent/10 text-accent",
    Processing: "bg-amber-500/10 text-amber-600",
    Cancelled: "bg-destructive/10 text-destructive",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <h1 className="text-2xl font-display font-bold text-foreground mb-6">My Account</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar tabs */}
          <div className="md:w-48 shrink-0">
            <nav className="glass-card flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeTab === t.key ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"}`}
                >
                  {t.icon} {t.label}
                </button>
              ))}
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-destructive/70 hover:text-destructive hover:bg-destructive/5 transition-colors mt-2">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === "profile" && (
              <div className="glass-card max-w-md space-y-4">
                <h3 className="font-display font-semibold text-foreground">Profile</h3>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl">👤</div>
                {[
                  { label: "Name", value: editName, set: setEditName },
                  { label: "Email", value: editEmail, set: setEditEmail },
                  { label: "Phone", value: editPhone, set: setEditPhone },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-sm font-medium text-foreground block mb-1">{f.label}</label>
                    <input value={f.value} onChange={(e) => f.set(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-secondary/60 border border-border/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                ))}
                <button
                  onClick={() => setUser({ name: editName, email: editEmail, phone: editPhone, avatar: "" })}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
                >
                  Save Changes
                </button>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-3">
                {mockOrders.map((order) => (
                  <div key={order.id} className="glass-card flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.date} · {order.items} items</p>
                    </div>
                    <div className="text-right">
                      <span className={`pill text-xs ${statusColor[order.status] || ""}`}>{order.status}</span>
                      <p className="text-sm font-bold text-foreground mt-1">₹{order.total.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="glass-card max-w-md">
                <h3 className="font-display font-semibold text-foreground mb-3">Saved Addresses</h3>
                <div className="p-3 rounded-lg bg-secondary/40 border border-border/30">
                  <p className="text-sm font-medium text-foreground">Home</p>
                  <p className="text-xs text-muted-foreground mt-1">123 MG Road, Indiranagar, Bangalore - 560038</p>
                </div>
                <button className="mt-3 text-sm text-primary font-medium hover:underline">+ Add new address</button>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div>
                {wishlistProducts.length === 0 ? (
                  <p className="text-muted-foreground">Your wishlist is empty.</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {wishlistProducts.map((p, i) => (
                      <ProductCard key={p.id} product={p} index={i} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="glass-card max-w-md space-y-4">
                <h3 className="font-display font-semibold text-foreground">Settings</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Theme</span>
                  <button onClick={toggleTheme} className="pill bg-secondary/80 text-foreground text-sm hover:bg-secondary transition">
                    {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Email Notifications</span>
                  <button className="pill bg-primary/10 text-primary text-sm">On</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountPage;
