export interface User {
  name: string;
  phone: string;
  email: string;
  membership: string;
  purchases: number;
  avatarUrl?: string;
}

export interface Product {
  id: string;
  title: string;
  category: "Apple" | "Case" | "Protector" | "Installment Plan";
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  promo?: string;
  storageOptions: string[];
  colorOptions: string[];
  simOptions: string[];
}

export interface Reward {
  id: string;
  title: string;
  price: number;
  image: string;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: "in" | "out";
}

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  image: string;
  price: number;
  qty: number;
  storage?: string;
  color?: string;
  sim?: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  read: boolean;
  time: string;
}
