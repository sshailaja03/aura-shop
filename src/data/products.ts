export interface ProductVariant {
  id: string;
  label: string;
  sku: string;
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  category: string[];
  images: string[];
  price: number;
  mrp: number;
  currency: string;
  rating: number;
  reviewsCount: number;
  variants: ProductVariant[];
  specs: Record<string, string>;
  delivery: { eligible: boolean; time: string };
  description: string;
  discount: number;
  flashDeal?: { endsAt: string };
}

export interface Category {
  slug: string;
  name: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  { slug: "skincare", name: "Skincare", icon: "✨", color: "from-teal-400 to-cyan-300" },
  { slug: "makeup", name: "Makeup", icon: "💄", color: "from-pink-400 to-rose-300" },
  { slug: "fragrance", name: "Fragrance", icon: "🌸", color: "from-violet-400 to-purple-300" },
  { slug: "haircare", name: "Haircare", icon: "💇", color: "from-amber-400 to-yellow-300" },
  { slug: "wellness", name: "Wellness", icon: "🧘", color: "from-green-400 to-emerald-300" },
  { slug: "electronics", name: "Electronics", icon: "📱", color: "from-blue-400 to-indigo-300" },
  { slug: "fashion", name: "Fashion", icon: "👗", color: "from-fuchsia-400 to-pink-300" },
  { slug: "home", name: "Home & Living", icon: "🏠", color: "from-orange-400 to-amber-300" },
  { slug: "fitness", name: "Fitness", icon: "💪", color: "from-red-400 to-rose-300" },
  { slug: "books", name: "Books", icon: "📚", color: "from-sky-400 to-blue-300" },
];

export const products: Product[] = [
  {
    id: "p_001",
    title: "Hydrating Face Serum 30ml",
    brand: "GlowCo",
    category: ["skincare", "serum"],
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop",
    ],
    price: 799,
    mrp: 999,
    currency: "INR",
    rating: 4.5,
    reviewsCount: 124,
    variants: [{ id: "v1", label: "30ml", sku: "GLOW-30" }, { id: "v2", label: "50ml", sku: "GLOW-50" }],
    specs: { Usage: "Apply twice daily", Ingredients: "Hyaluronic Acid, Vitamin C, Niacinamide", "Skin Type": "All skin types" },
    delivery: { eligible: true, time: "2-4 days" },
    description: "A lightweight, fast-absorbing serum infused with hyaluronic acid and vitamin C for radiant, hydrated skin all day long.",
    discount: 20,
    flashDeal: { endsAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString() },
  },
  {
    id: "p_002",
    title: "Matte Lipstick — Rosewood",
    brand: "LuxeLips",
    category: ["makeup", "lipstick"],
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=400&h=400&fit=crop",
    ],
    price: 499,
    mrp: 699,
    currency: "INR",
    rating: 4.3,
    reviewsCount: 89,
    variants: [{ id: "v1", label: "Rosewood", sku: "LL-RW" }, { id: "v2", label: "Berry Blush", sku: "LL-BB" }],
    specs: { Finish: "Matte", Duration: "12 hours", Weight: "4.5g" },
    delivery: { eligible: true, time: "1-3 days" },
    description: "Long-lasting matte lipstick with a velvety finish. Enriched with jojoba oil for comfortable wear.",
    discount: 29,
  },
  {
    id: "p_003",
    title: "Wireless Noise-Cancelling Headphones",
    brand: "SoundWave",
    category: ["electronics", "audio"],
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop",
    ],
    price: 2999,
    mrp: 4999,
    currency: "INR",
    rating: 4.7,
    reviewsCount: 312,
    variants: [{ id: "v1", label: "Midnight Black", sku: "SW-BLK" }, { id: "v2", label: "Pearl White", sku: "SW-WHT" }],
    specs: { "Battery Life": "40 hours", Connectivity: "Bluetooth 5.3", "Driver Size": "40mm" },
    delivery: { eligible: true, time: "1-2 days" },
    description: "Premium wireless headphones with active noise cancellation, 40-hour battery life, and crystal-clear audio.",
    discount: 40,
    flashDeal: { endsAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString() },
  },
  {
    id: "p_004",
    title: "Organic Green Tea — 100 Bags",
    brand: "TeaLeaf",
    category: ["wellness", "tea"],
    images: [
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
    ],
    price: 349,
    mrp: 499,
    currency: "INR",
    rating: 4.6,
    reviewsCount: 567,
    variants: [{ id: "v1", label: "100 bags", sku: "TL-100" }],
    specs: { Origin: "Darjeeling", Type: "Organic", Caffeine: "Low" },
    delivery: { eligible: true, time: "2-3 days" },
    description: "Premium organic green tea sourced from Darjeeling hills. Rich in antioxidants for a healthy daily ritual.",
    discount: 30,
  },
  {
    id: "p_005",
    title: "Cotton Linen Blend Kurta",
    brand: "EthnicCraft",
    category: ["fashion", "ethnic"],
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=400&fit=crop",
    ],
    price: 1299,
    mrp: 1999,
    currency: "INR",
    rating: 4.4,
    reviewsCount: 203,
    variants: [{ id: "v1", label: "S", sku: "EC-S" }, { id: "v2", label: "M", sku: "EC-M" }, { id: "v3", label: "L", sku: "EC-L" }],
    specs: { Fabric: "Cotton-Linen Blend", Fit: "Regular", Care: "Machine wash" },
    delivery: { eligible: true, time: "3-5 days" },
    description: "Breathable cotton-linen kurta perfect for everyday elegance. Minimalist design meets traditional comfort.",
    discount: 35,
  },
  {
    id: "p_006",
    title: "Smart Fitness Band Pro",
    brand: "FitTrack",
    category: ["fitness", "wearable"],
    images: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1510017803434-a899b57ff7f6?w=400&h=400&fit=crop",
    ],
    price: 1499,
    mrp: 2499,
    currency: "INR",
    rating: 4.2,
    reviewsCount: 445,
    variants: [{ id: "v1", label: "Black", sku: "FT-BLK" }, { id: "v2", label: "Navy", sku: "FT-NVY" }],
    specs: { Display: "AMOLED 1.1\"", "Water Resistance": "5ATM", Sensors: "SpO2, Heart Rate, GPS" },
    delivery: { eligible: true, time: "1-2 days" },
    description: "Track your health 24/7 with SpO2, heart rate monitoring, GPS tracking and 14-day battery life.",
    discount: 40,
    flashDeal: { endsAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString() },
  },
  {
    id: "p_007",
    title: "Bamboo Desk Organizer Set",
    brand: "NatureNest",
    category: ["home", "office"],
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    ],
    price: 899,
    mrp: 1299,
    currency: "INR",
    rating: 4.1,
    reviewsCount: 78,
    variants: [{ id: "v1", label: "Natural", sku: "NN-NAT" }],
    specs: { Material: "Bamboo", Compartments: "5", Dimensions: "30x20x15 cm" },
    delivery: { eligible: true, time: "3-5 days" },
    description: "Sustainable bamboo desk organizer with 5 compartments. Keep your workspace tidy and eco-friendly.",
    discount: 31,
  },
  {
    id: "p_008",
    title: "Vitamin C Brightening Cream",
    brand: "GlowCo",
    category: ["skincare", "cream"],
    images: [
      "https://images.unsplash.com/photo-1570194065650-d99fb4a38de4?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
    ],
    price: 599,
    mrp: 849,
    currency: "INR",
    rating: 4.4,
    reviewsCount: 198,
    variants: [{ id: "v1", label: "50g", sku: "GC-50" }],
    specs: { "Key Ingredient": "Vitamin C 15%", SPF: "30", "Skin Type": "Normal to Oily" },
    delivery: { eligible: true, time: "2-4 days" },
    description: "Brightening day cream with 15% Vitamin C and SPF 30. Reduces dark spots and evens skin tone.",
    discount: 29,
  },
  {
    id: "p_009",
    title: "Jasmine & Oud Eau de Parfum",
    brand: "ScentHouse",
    category: ["fragrance", "perfume"],
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=400&fit=crop",
    ],
    price: 1899,
    mrp: 2799,
    currency: "INR",
    rating: 4.8,
    reviewsCount: 67,
    variants: [{ id: "v1", label: "50ml", sku: "SH-50" }, { id: "v2", label: "100ml", sku: "SH-100" }],
    specs: { "Top Notes": "Jasmine, Bergamot", "Heart Notes": "Oud, Rose", "Base Notes": "Sandalwood, Musk" },
    delivery: { eligible: true, time: "2-3 days" },
    description: "A luxurious blend of jasmine and oud with sandalwood base notes. Long-lasting sophistication for every occasion.",
    discount: 32,
  },
  {
    id: "p_010",
    title: "Argan Oil Hair Repair Mask",
    brand: "HairBliss",
    category: ["haircare", "treatment"],
    images: [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&h=400&fit=crop",
    ],
    price: 649,
    mrp: 899,
    currency: "INR",
    rating: 4.3,
    reviewsCount: 156,
    variants: [{ id: "v1", label: "200ml", sku: "HB-200" }],
    specs: { "Key Ingredient": "Argan Oil", "Hair Type": "Damaged & Dry", Duration: "Leave on 15 min" },
    delivery: { eligible: true, time: "2-4 days" },
    description: "Deep conditioning hair mask with pure argan oil. Restores shine and strength to damaged, dry hair.",
    discount: 28,
  },
  {
    id: "p_011",
    title: "The Art of Mindful Living",
    brand: "Penguin Books",
    category: ["books", "self-help"],
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop",
    ],
    price: 299,
    mrp: 450,
    currency: "INR",
    rating: 4.6,
    reviewsCount: 892,
    variants: [{ id: "v1", label: "Paperback", sku: "PB-MIND" }],
    specs: { Pages: "280", Language: "English", Format: "Paperback" },
    delivery: { eligible: true, time: "1-2 days" },
    description: "A practical guide to incorporating mindfulness into everyday life. Bestselling author's most acclaimed work.",
    discount: 34,
  },
  {
    id: "p_012",
    title: "Ceramic Pour-Over Coffee Set",
    brand: "BrewCraft",
    category: ["home", "kitchen"],
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&h=400&fit=crop",
    ],
    price: 1199,
    mrp: 1699,
    currency: "INR",
    rating: 4.5,
    reviewsCount: 134,
    variants: [{ id: "v1", label: "Matte Black", sku: "BC-BLK" }, { id: "v2", label: "Cream", sku: "BC-CRM" }],
    specs: { Material: "Ceramic", Capacity: "350ml", Includes: "Dripper, Server, Filters x20" },
    delivery: { eligible: true, time: "3-5 days" },
    description: "Handcrafted ceramic pour-over set for the perfect cup. Includes dripper, server, and 20 paper filters.",
    discount: 29,
  },
];

export const reviews = [
  { id: "r1", productId: "p_001", user: "Priya M.", rating: 5, title: "Amazing results!", comment: "My skin feels so hydrated and glowy after just one week. Absolutely love this serum!", date: "2024-02-15", helpful: 24 },
  { id: "r2", productId: "p_001", user: "Arjun K.", rating: 4, title: "Good but pricey", comment: "Works well for dry skin. Wish it came in a larger size for the price.", date: "2024-01-20", helpful: 12 },
  { id: "r3", productId: "p_001", user: "Sneha R.", rating: 5, title: "Holy grail product", comment: "Been using this for 3 months. Dark spots have visibly reduced. Will repurchase!", date: "2024-03-01", helpful: 45 },
  { id: "r4", productId: "p_003", user: "Rahul S.", rating: 5, title: "Best headphones under 3k", comment: "Noise cancellation is incredible at this price point. Battery lasts forever.", date: "2024-02-28", helpful: 67 },
  { id: "r5", productId: "p_003", user: "Meera V.", rating: 4, title: "Great sound quality", comment: "Comfortable for long listening sessions. ANC could be slightly better.", date: "2024-01-15", helpful: 33 },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category.includes(slug));
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.some((c) => c.includes(q))
  );
}
