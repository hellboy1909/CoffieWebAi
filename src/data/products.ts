export interface Product {
  id: number;
  name: string;
  origin: string;
  category: string;
  roast: string;
  price: number;
  weight: string;
  description: string;
  notes: string[];
  image: string;
  rating: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    origin: "Ethiopia",
    category: "Single Origin",
    roast: "Light Roast",
    price: 18.50,
    weight: "250g",
    description: "A bright and complex coffee from the birthplace of coffee. Grown at elevations above 1,800m, this lot delivers an extraordinary cup with floral aromatics and citrus clarity.",
    notes: ["Blueberry", "Jasmine", "Bergamot", "Honey"],
    image: "🫘",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Colombian Supremo",
    origin: "Colombia",
    category: "Single Origin",
    roast: "Medium Roast",
    price: 16.00,
    weight: "250g",
    description: "From the lush highlands of Huila, this Supremo grade bean offers a perfectly balanced cup. Smooth body with rich sweetness and a clean, lingering finish.",
    notes: ["Caramel", "Red Apple", "Milk Chocolate", "Walnut"],
    image: "☕",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Sumatra Mandheling",
    origin: "Indonesia",
    category: "Single Origin",
    roast: "Dark Roast",
    price: 17.25,
    weight: "250g",
    description: "A bold, full-bodied coffee from the volcanic soils of North Sumatra. Wet-hulled processing gives this coffee its signature earthy depth and syrupy texture.",
    notes: ["Dark Chocolate", "Cedar", "Tobacco", "Brown Sugar"],
    image: "🌋",
    rating: 4.6,
  },
  {
    id: 4,
    name: "Morning Ritual Blend",
    origin: "Multi-Origin",
    category: "Blend",
    roast: "Medium Roast",
    price: 14.50,
    weight: "250g",
    description: "Our signature house blend crafted for your daily ritual. A harmonious marriage of Brazilian and Central American beans that delivers consistency and comfort in every cup.",
    notes: ["Hazelnut", "Toffee", "Cocoa", "Vanilla"],
    image: "🌅",
    rating: 4.8,
  },
  {
    id: 5,
    name: "Kenyan AA Peaberry",
    origin: "Kenya",
    category: "Single Origin",
    roast: "Light Roast",
    price: 21.00,
    weight: "200g",
    description: "An exceptional peaberry lot from Kenya's central highlands. These rare single-round beans concentrate flavor into an intense, wine-like cup with sparkling acidity.",
    notes: ["Blackcurrant", "Grapefruit", "Tomato", "Raw Honey"],
    image: "🍇",
    rating: 4.9,
  },
  {
    id: 6,
    name: "Espresso Noir",
    origin: "Multi-Origin",
    category: "Blend",
    roast: "Dark Roast",
    price: 15.75,
    weight: "250g",
    description: "Purpose-built for espresso extraction. This blend of Brazilian, Indian, and Robusta beans creates a thick, crema-rich shot with bittersweet chocolate intensity.",
    notes: ["Dark Chocolate", "Roasted Almond", "Molasses", "Spice"],
    image: "⚡",
    rating: 4.5,
  },
];

export const categories = ["All", "Single Origin", "Blend"];
export const roasts = ["All", "Light Roast", "Medium Roast", "Dark Roast"];
