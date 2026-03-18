import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle, Package, Download } from "lucide-react";
import { motion } from "framer-motion";

const OrderConfirmationPage = () => {
  const { orderId } = useParams<{ orderId: string }>();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-16 text-center max-w-lg mx-auto">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}>
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">Order Confirmed! 🎉</h1>
          <p className="text-muted-foreground mb-6">Your order has been placed successfully.</p>

          <div className="glass-card text-left space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-medium text-foreground font-mono">{orderId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Estimated Delivery</span>
              <span className="font-medium text-foreground flex items-center gap-1"><Package className="h-3.5 w-3.5 text-primary" /> 3-5 business days</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="pill bg-primary text-primary-foreground hover:opacity-90 transition text-center">
              Continue Shopping
            </Link>
            <button className="pill bg-secondary/80 text-foreground hover:bg-secondary transition flex items-center justify-center gap-1.5">
              <Download className="h-3.5 w-3.5" /> Download Invoice
            </button>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
