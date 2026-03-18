import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { CategoryStrip } from "@/components/home/CategoryStrip";
import { TrendingCarousel } from "@/components/home/TrendingCarousel";
import { AIRecommendations } from "@/components/home/AIRecommendations";
import { DealsGrid } from "@/components/home/DealsGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <CategoryStrip />
      <TrendingCarousel />
      <DealsGrid />
      <AIRecommendations />
      <Footer />
    </div>
  );
};

export default Index;
