import { type Product, CategoryEnum, BrandEnum } from "../types";

export interface CategoryInfo {
  id: CategoryEnum;
  name: string;
  image: string;
  bgColor: string; // Tailwind class
  borderColor: string; // Tailwind class
  textColor: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: CategoryEnum.FRUITS_VEGETABLES,
    name: "Fresh Fruits & Vegetable",
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&auto=format&fit=crop&q=80",
    bgColor: "bg-[#EEF7F1]",
    borderColor: "border-[#53B175]/30",
    textColor: "text-[#53B175]",
  },
  {
    id: CategoryEnum.COOKING_OIL,
    name: "Cooking Oil & Ghee",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop&q=80",
    bgColor: "bg-[#FFF9EE]",
    borderColor: "border-[#F8A44C]/30",
    textColor: "text-[#F8A44C]",
  },
  {
    id: CategoryEnum.MEAT_FISH,
    name: "Meat & Fish",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80",
    bgColor: "bg-[#FFF2F2]",
    borderColor: "border-[#F7A59E]/30",
    textColor: "text-[#F7A59E]",
  },
  {
    id: CategoryEnum.BAKERY_SNACKS,
    name: "Bakery & Snacks",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80",
    bgColor: "bg-[#F9EFFF]",
    borderColor: "border-[#D3B0E0]/30",
    textColor: "text-[#D3B0E0]",
  },
  {
    id: CategoryEnum.DAIRY_EGGS,
    name: "Dairy & Eggs",
    image: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=400&auto=format&fit=crop&q=80",
    bgColor: "bg-[#FFFDF0]",
    borderColor: "border-[#FDE598]/30",
    textColor: "text-[#E8C245]",
  },
  {
    id: CategoryEnum.BEVERAGES,
    name: "Beverages",
    image: "https://images.unsplash.com/photo-1527960656366-ee2a999e3286?w=400&auto=format&fit=crop&q=80",
    bgColor: "bg-[#EDF7FC]",
    borderColor: "border-[#B7DFF5]/30",
    textColor: "text-[#579BFF]",
  }
];

export const MOCK_PRODUCTS: Product[] = [
  // Fruits & Veg
  {
    id: "prod-1",
    name: "Organic Bananas",
    description: "Organic bananas are fresh, sweet, and highly nutritious. They are rich in potassium and make the perfect natural snack for any time of the day.",
    price: 4.99,
    unit: "7pcs, Price",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&auto=format&fit=crop&q=80",
    category: CategoryEnum.FRUITS_VEGETABLES,
    brand: BrandEnum.INDIVIDUAL_COLLECTION,
    calories: 105,
    rating: 4.8,
    isExclusive: true,
  },
  {
    id: "prod-2",
    name: "Red Apple",
    description: "Apples are nutritious, sweet and crisp. They are rich in fiber and antioxidants, helping support overall health.",
    price: 4.99,
    unit: "1kg, Price",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&auto=format&fit=crop&q=80",
    category: CategoryEnum.FRUITS_VEGETABLES,
    brand: BrandEnum.INDIVIDUAL_COLLECTION,
    calories: 95,
    rating: 4.5,
    isExclusive: true,
  },
  {
    id: "prod-3",
    name: "Bell Pepper Red",
    description: "Crisp red bell peppers are sweet and loaded with Vitamin C. Great for stir-fry, salads, or grilling.",
    price: 4.99,
    unit: "1kg, Price",
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=400&auto=format&fit=crop&q=80",
    category: CategoryEnum.FRUITS_VEGETABLES,
    brand: BrandEnum.YASMIN,
    calories: 31,
    rating: 4.6,
    isBestSelling: true,
  },
  {
    id: "prod-4",
    name: "Ginger",
    description: "Fresh ginger root provides a zesty flavor profile and has strong anti-inflammatory properties, perfect for cooking or tea.",
    price: 2.99,
    unit: "250g, Price",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&auto=format&fit=crop&q=80",
    category: CategoryEnum.FRUITS_VEGETABLES,
    brand: BrandEnum.YASMIN,
    calories: 20,
    rating: 4.7,
    isBestSelling: true,
  },
  
  // Meat & Fish
  {
    id: "prod-5",
    name: "Beef Bone-in",
    description: "Premium cuts of grass-fed beef bone-in. Rich in flavor and gelatin, ideal for making rich, healthy bone broth or slow stews.",
    price: 9.99,
    unit: "1kg, Price",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop&q=80",
    category: CategoryEnum.MEAT_FISH,
    brand: BrandEnum.KAZI_FARMS,
    calories: 250,
    rating: 4.9,
  },
  {
    id: "prod-6",
    name: "Broiler Chicken",
    description: "Fresh whole broiler chicken, cleaned and ready for roasting or currying. Tender, juicy, and farm-raised.",
    price: 4.99,
    unit: "1kg, Price",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&auto=format&fit=crop&q=80",
    category: CategoryEnum.MEAT_FISH,
    brand: BrandEnum.KAZI_FARMS,
    calories: 215,
    rating: 4.4,
  },

  // Beverages
  {
    id: "prod-7",
    name: "Diet Coke Can",
    description: "Sugar-free and calorie-free. Refreshing and crisp Diet Coke taste to keep you cool and energized.",
    price: 1.99,
    unit: "355ml, Price",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&auto=format&fit=crop&q=80",
    category: CategoryEnum.BEVERAGES,
    brand: BrandEnum.COCOLA,
    calories: 0,
    rating: 4.2,
  },
  {
    id: "prod-8",
    name: "Sprite Can",
    description: "Lemon-lime flavored carbonated soft drink. 100% natural flavors with no caffeine.",
    price: 1.50,
    unit: "325ml, Price",
    image: "https://images.unsplash.com/photo-1626379616459-b2ce1d9decbc?w=400&auto=format&fit=crop&q=80",
    category: CategoryEnum.BEVERAGES,
    brand: BrandEnum.COCOLA,
    calories: 140,
    rating: 4.3,
  },
  {
    id: "prod-9",
    name: "Apple & Grape Juice",
    description: "Pure juice blend of apple and black grapes. No added sugar or artificial preservatives.",
    price: 15.99,
    unit: "2L, Price",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&auto=format&fit=crop&q=80",
    category: CategoryEnum.BEVERAGES,
    brand: BrandEnum.INDIVIDUAL_COLLECTION,
    calories: 220,
    rating: 4.8,
  },
  {
    id: "prod-10",
    name: "Orange Juice",
    description: "100% premium freshly squeezed orange juice, rich in Vitamin C. Never from concentrate.",
    price: 15.99,
    unit: "2L, Price",
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&auto=format&fit=crop&q=80",
    category: CategoryEnum.BEVERAGES,
    brand: BrandEnum.INDIVIDUAL_COLLECTION,
    calories: 210,
    rating: 4.7,
  },
  {
    id: "prod-11",
    name: "Coca Cola Can",
    description: "The classic carbonated soft drink that has been loved for generations. Best served ice cold.",
    price: 1.99,
    unit: "355ml, Price",
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&auto=format&fit=crop&q=80",
    category: CategoryEnum.BEVERAGES,
    brand: BrandEnum.COCOLA,
    calories: 140,
    rating: 4.5,
  },
  {
    id: "prod-12",
    name: "Pepsi Can",
    description: "Bold, robust, and sweet carbonated beverage. The perfect accompaniment to any meal.",
    price: 1.89,
    unit: "355ml, Price",
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&auto=format&fit=crop&q=80",
    category: CategoryEnum.BEVERAGES,
    brand: BrandEnum.COCOLA,
    calories: 150,
    rating: 4.1,
  },
  
  // Cooking oil
  {
    id: "prod-13",
    name: "Pure Olive Oil",
    description: "Extra virgin cold-pressed olive oil, imported. Ideal for salad dressings and cooking.",
    price: 12.49,
    unit: "1L, Price",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop&q=80",
    category: CategoryEnum.COOKING_OIL,
    brand: BrandEnum.INDIVIDUAL_COLLECTION,
    calories: 120,
    rating: 4.7,
  },
  
  // Bakery
  {
    id: "prod-14",
    name: "Chocolate Cookies",
    description: "Chunky double chocolate cookies baked fresh daily. Soft on the inside, crunchy on the edge.",
    price: 3.49,
    unit: "250g, Price",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80",
    category: CategoryEnum.BAKERY_SNACKS,
    brand: BrandEnum.COCOLA,
    calories: 190,
    rating: 4.6,
  },

  // Dairy & Eggs
  {
    id: "prod-15",
    name: "Egg Box White",
    description: "Fresh farm eggs, grade A large. Cleaned and selected for premium quality.",
    price: 1.50,
    unit: "12pcs, Price",
    image: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=400&auto=format&fit=crop&q=80",
    category: CategoryEnum.DAIRY_EGGS,
    brand: BrandEnum.KAZI_FARMS,
    calories: 70,
    rating: 4.8,
  },
  {
    id: "prod-16",
    name: "Organic Milk",
    description: "Whole organic cow milk, pasteurized and homogenized. Rich in calcium and Vitamin D.",
    price: 2.99,
    unit: "1L, Price",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop&q=80",
    category: CategoryEnum.DAIRY_EGGS,
    brand: BrandEnum.KAZI_FARMS,
    calories: 150,
    rating: 4.7,
  }
];

export const MOCK_ZONES = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi"];
export const MOCK_AREAS: Record<string, string[]> = {
  "Dhaka": ["Banasree", "Dhanmondi", "Gulshan", "Uttara", "Mirpur"],
  "Chittagong": ["Halishahar", "Panchlaish", "Nasirabad", "Agrabad"],
  "Sylhet": ["Zindabazar", "Ambarkhana", "Upashahar"],
  "Rajshahi": ["Motihar", "Boalia", "Kazihata"]
};
