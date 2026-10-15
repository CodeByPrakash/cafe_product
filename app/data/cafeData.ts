export interface Product {
  id: string;
  name: string;
  subtitle: string;
  desc: string;
  price: number;
  cats: string[];
  image: string;
  badge?: string;
  rating: number;
  calories?: string;
  prepTime?: string;
  ingredients?: string;
  isPopular?: boolean;
}

export interface Category {
  id: string;
  label: string;
  iconName: string;
}

export interface HeroProductConfig {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  heightRatio: number; // relative height share of hero
  xInitial: number;    // start offset share (>1 enters from right)
  yPos: number;        // vertical position ratio (0 - 1)
  speed: number;       // glide speed in px/sec
  depth: number;       // 0.4 to 1.0
  rotation: number;    // subtle tilt degrees
  hasCard: boolean;    // whether floating card is visible
}

export const CONFIG = {
  name: "Brewtoria",
  tagline: "More Than Just Coffee",
  motto: "CRAFTED WITH LOVE · SERVED WITH SOUL",
  phone: "+91 98765 43210",
  phoneDisplay: "+91 98765 43210",
  email: "hello@brewtoria.com",
  address: "742 Evergreen Boulevard, Central District, Bengaluru",
  city: "Bengaluru, India",
  rating: 4.9,
  reviewsCount: "15K+",
  hours: [
    { days: "Monday – Friday", time: "7:30 am – 10:00 pm" },
    { days: "Saturday – Sunday", time: "8:00 am – 11:00 pm" },
  ],
  socials: [
    { name: "Instagram", url: "https://instagram.com" },
    { name: "Facebook", url: "https://facebook.com" },
    { name: "Twitter", url: "https://twitter.com" },
    { name: "LinkedIn", url: "https://linkedin.com" },
  ],
  stats: [
    { value: "100%", label: "Single-Origin Arabica" },
    { value: "15K+", label: "Happy Regulars" },
    { value: "18+", label: "Barista Awards" },
    { value: "4.9★", label: "Average Review" },
  ],
};

export const CATEGORIES: Category[] = [
  { id: "all", label: "All Items", iconName: "Coffee" },
  { id: "coffee", label: "Specialty Coffee", iconName: "Flame" },
  { id: "tea", label: "Tea & Matcha", iconName: "Leaf" },
  { id: "snacks", label: "Bakery & Snacks", iconName: "Croissant" },
  { id: "desserts", label: "Decadent Desserts", iconName: "Cake" },
  { id: "cold", label: "Cold Drinks", iconName: "CupSoda" },
  { id: "seasonal", label: "Seasonal Specials", iconName: "Sparkles" },
];

export const PRODUCTS: Product[] = [
  {
    id: "latte",
    name: "Iced Caramel Latte",
    subtitle: "Rich espresso · Creamy milk · Caramel drizzle",
    desc: "A double shot of specialty roasted Arabica espresso gently poured over chilled velvety whole milk and artisanal slow-simmered butterscotch caramel, crowned with cloud-like cold foam.",
    price: 160,
    cats: ["coffee", "cold"],
    image: "/items/Caramel Coffee Splash with Whipped Cream.png",
    badge: "Bestseller",
    rating: 4.95,
    calories: "230 kcal",
    prepTime: "3 mins",
    ingredients: "Double Arabica Espresso, Fresh Milk, House Salted Caramel, Cloud Cold Foam, Crystal Ice",
    isPopular: true,
  },
  {
    id: "cup",
    name: "Steaming Cappuccino",
    subtitle: "Velvety foam · Silk rosetta latte art",
    desc: "Equal harmonies of dark-roasted espresso, textured microfoam, and steamed milk with precision hand-poured latte art. Delivers a thick, decadent froth with every sip.",
    price: 140,
    cats: ["coffee"],
    image: "/items/Steaming Latte with Coffee Splash.png",
    badge: "Barista Signature",
    rating: 4.92,
    calories: "135 kcal",
    prepTime: "4 mins",
    ingredients: "Single-Origin Espresso, Steamed Milk, Thick Dense Microfoam",
    isPopular: true,
  },
  {
    id: "brownie",
    name: "Decadent Choco Brownie",
    subtitle: "Fudgy dark chocolate · Roasted hazelnuts",
    desc: "Warm 70% Belgian dark chocolate brownie layered with molten fudge, roasted Piedmont hazelnut clusters, and finished with delicate flaky sea salt.",
    price: 120,
    cats: ["desserts", "snacks"],
    image: "/items/Decadent Chocolate Brownie Explosion.png",
    badge: "Fresh From Oven",
    rating: 4.96,
    calories: "320 kcal",
    prepTime: "Ready to serve",
    ingredients: "70% Belgian Dark Chocolate, French Creamery Butter, Hazelnut Chunks, Sea Salt",
    isPopular: true,
  },
  {
    id: "croissant",
    name: "Golden Butter Croissant",
    subtitle: "Normandy butter · Honeycomb flake layers",
    desc: "Folded and rolled across 72 airy layers of sweet French churned butter. Baked crisp and flaky on the exterior with a fragrant, melt-in-mouth honeycomb crumb inside.",
    price: 90,
    cats: ["snacks"],
    image: "/items/Golden Flaky Croissant with Floating Crumbs.png",
    badge: "Baked at 6 AM",
    rating: 4.88,
    calories: "250 kcal",
    prepTime: "Ready to serve",
    ingredients: "Pure Normandy Butter, Organic Flour, Slow-Fermented Poolish",
    isPopular: true,
  },
  {
    id: "straw",
    name: "Strawberry Cream Latte",
    subtitle: "Wild strawberry compote · Silky sweet cream",
    desc: "Fresh wild organic strawberries macerated with Tahitian vanilla bean, layered over chilled whole milk, light blossom tea, and crowned with freeze-dried strawberry dust.",
    price: 150,
    cats: ["cold", "seasonal"],
    image: "/items/Strawberry Milkshake Splash Delight.png",
    badge: "Seasonal Favorite",
    rating: 4.87,
    calories: "195 kcal",
    prepTime: "3 mins",
    ingredients: "Wild Strawberry Puree, Sweet Cream, White Tea Blossom, Crushed Ice",
    isPopular: true,
  },
  {
    id: "oreo",
    name: "Cookie Mocha Frappe",
    subtitle: "Crushed chocolate cookie · Espresso cream",
    desc: "Rich espresso blended with dark Dutch cocoa, artisanal chocolate biscuits, whipped cream swirl, and chocolate fudge drizzle for an unmissable treat.",
    price: 180,
    cats: ["coffee", "cold", "desserts", "seasonal"],
    image: "/items/Chocolate Frappe Splash with Coffee Beans.png",
    badge: "Indulgence",
    rating: 4.94,
    calories: "360 kcal",
    prepTime: "4 mins",
    ingredients: "Double Espresso, Dutch Cocoa, Dark Cookie Crumbles, Whipped Cream, Fudge",
    isPopular: true,
  },
  {
    id: "matcha",
    name: "Ceremonial Matcha Frappe",
    subtitle: "Kyoto first-harvest matcha · Sweet vanilla",
    desc: "Authentic first-flush stone-ground matcha from Uji, Kyoto. Whisked with chilled creamy oat milk, a touch of wild honey, and crowned with airy Madagascar vanilla foam.",
    price: 170,
    cats: ["tea", "cold"],
    image: "/items/Dynamic Matcha Frappé Splash.png",
    badge: "Ceremonial Grade",
    rating: 4.91,
    calories: "190 kcal",
    prepTime: "3 mins",
    ingredients: "Uji Ceremonial Matcha, Organic Oat Milk, Raw Honey, Vanilla Foam",
    isPopular: false,
  },
  {
    id: "croissant_crumb",
    name: "Almond Crunch Croissant",
    subtitle: "Frangipane almond cream · Toasted flakes",
    desc: "Golden butter croissant filled with almond cream, topped with roasted sliced almonds and dusted with powdered confectioner sugar.",
    price: 130,
    cats: ["snacks", "desserts"],
    image: "/items/Golden Croissant Crumb Explosion.png",
    badge: "Chef Creation",
    rating: 4.93,
    calories: "340 kcal",
    prepTime: "Ready to serve",
    ingredients: "Butter Croissant, Almond Frangipane, Toasted Almond Flakes, Vanilla",
    isPopular: false,
  },
];

// Configuration for the Hero 3D gliding showcase
export const HERO_PRODUCTS: HeroProductConfig[] = [
  {
    id: "latte",
    name: "Iced Caramel Latte",
    subtitle: "Rich espresso · Creamy milk",
    price: 160,
    image: "/items/Caramel Coffee Splash with Whipped Cream.png",
    heightRatio: 0.88,
    xInitial: 0.58,
    yPos: 0.5,
    speed: 20,
    depth: 1.0,
    rotation: -4,
    hasCard: true,
  },
  {
    id: "brownie",
    name: "Choco Brownie",
    subtitle: "Fudgy · Roasted hazelnut",
    price: 120,
    image: "/items/Decadent Chocolate Brownie Explosion.png",
    heightRatio: 0.36,
    xInitial: 0.84,
    yPos: 0.28,
    speed: 28,
    depth: 0.72,
    rotation: 6,
    hasCard: true,
  },
  {
    id: "croissant",
    name: "Butter Croissant",
    subtitle: "Fresh flaky layers",
    price: 90,
    image: "/items/Golden Flaky Croissant with Floating Crumbs.png",
    heightRatio: 0.34,
    xInitial: 0.98,
    yPos: 0.72,
    speed: 34,
    depth: 0.65,
    rotation: -10,
    hasCard: true,
  },
  {
    id: "oreo",
    name: "Cookie Mocha Shake",
    subtitle: "Dark chocolate · Cookie crumb",
    price: 180,
    image: "/items/Chocolate Frappe Splash with Coffee Beans.png",
    heightRatio: 0.44,
    xInitial: 1.12,
    yPos: 0.34,
    speed: 26,
    depth: 0.8,
    rotation: 5,
    hasCard: false,
  },
  {
    id: "cup",
    name: "Steaming Cappuccino",
    subtitle: "Velvety foam · Latte art",
    price: 140,
    image: "/items/Steaming Latte with Coffee Splash.png",
    heightRatio: 0.38,
    xInitial: 1.24,
    yPos: 0.74,
    speed: 30,
    depth: 0.75,
    rotation: -3,
    hasCard: true,
  },
  {
    id: "straw",
    name: "Strawberry Latte",
    subtitle: "Wild strawberry · Cream",
    price: 150,
    image: "/items/Strawberry Milkshake Splash Delight.png",
    heightRatio: 0.4,
    xInitial: 1.38,
    yPos: 0.29,
    speed: 32,
    depth: 0.82,
    rotation: 8,
    hasCard: true,
  },
  {
    id: "matcha",
    name: "Matcha Frappe",
    subtitle: "Ceremonial matcha · Oat cream",
    price: 170,
    image: "/items/Dynamic Matcha Frappé Splash.png",
    heightRatio: 0.38,
    xInitial: 1.5,
    yPos: 0.65,
    speed: 28,
    depth: 0.68,
    rotation: -6,
    hasCard: false,
  },
];

export const PROMOS = [
  {
    id: "brews",
    title: "Signature Brews",
    description: "Explore our handpicked specialty coffees, roasted in small batches to preserve nuanced aromas.",
    actionText: "View Collection →",
    categoryTarget: "coffee",
    image: "/images/signature-brews.jpg",
  },
  {
    id: "bakery",
    title: "Freshly Baked",
    description: "Delicious buttery bites, flaky croissants, and treats baked fresh each dawn to complement your cup.",
    actionText: "Explore Bakery →",
    categoryTarget: "snacks",
    image: "/images/fresh-bakery.jpg",
  },
  {
    id: "space",
    title: "A Cozy Space for Everyone",
    description: "Work, meet friends, or simply immerse yourself in warm ambient jazz and natural sunlight.",
    actionText: "Visit Us →",
    anchorTarget: "#visit",
    image: "/bgs/Golden Brewtoria Café Ambiance.png",
  },
];

export const REVIEWS = [
  {
    id: "r1",
    name: "Ananya Sharma",
    role: "Food & Coffee Critic",
    rating: 5,
    text: "The Iced Caramel Latte is genuinely the best I've tasted in the city. The balance of espresso intensity and buttery sweetness is sublime, and the atmosphere makes you want to stay for hours.",
    date: "2 days ago",
  },
  {
    id: "r2",
    name: "Marcus Vance",
    role: "Architect & Regular",
    rating: 5,
    text: "The warm lighting, wooden textures, and smell of morning bakes make Brewtoria my daily creative workspace. The croissants are straight out of a Parisian boulangerie.",
    date: "1 week ago",
  },
  {
    id: "r3",
    name: "Rohan & Priya",
    role: "Weekend Coffee Lovers",
    rating: 5,
    text: "Our mandatory Sunday morning ritual. The Cappuccino rosetta art is always pristine, and the Hazelnut Brownie is heavenly. Staff are extraordinarily warm and attentive.",
    date: "2 weeks ago",
  },
];
