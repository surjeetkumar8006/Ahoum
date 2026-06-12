export const CategoryEnum = {
  FRUITS_VEGETABLES: "Fruits & Vegetables",
  COOKING_OIL: "Cooking Oil & Ghee",
  MEAT_FISH: "Meat & Fish",
  BAKERY_SNACKS: "Bakery & Snacks",
  DAIRY_EGGS: "Dairy & Eggs",
  BEVERAGES: "Beverages"
} as const;
export type CategoryEnum = typeof CategoryEnum[keyof typeof CategoryEnum];

export const BrandEnum = {
  COCOLA: "Cocola",
  KAZI_FARMS: "Kazi Farms",
  YASMIN: "Yasmin",
  INDIVIDUAL_COLLECTION: "Individual Collection"
} as const;
export type BrandEnum = typeof BrandEnum[keyof typeof BrandEnum];

export const OrderStatus = {
  PENDING: "Pending",
  ACCEPTED: "Accepted",
  FAILED: "Failed"
} as const;
export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string; // e.g. "1kg, Price", "355ml, Price"
  image: string;
  category: CategoryEnum;
  brand: BrandEnum;
  calories: number;
  rating: number;
  isExclusive?: boolean;
  isBestSelling?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  username: string;
  email: string;
  phone?: string;
  zone?: string;
  area?: string;
}
