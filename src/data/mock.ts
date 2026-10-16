import type {
  Banner,
  Branch,
  Notification,
  Product,
  Reward,
  Transaction,
} from "../types";

export const products: Product[] = [
  {
    id: "p1",
    title: "iPhone 17 Pro Max",
    category: "Apple",
    price: 6500000,
    originalPrice: 6950000,
    image: "/images/product-iphone17promax.svg",
    promo: "Save 450,000",
    description:
      "iPhone 17 Pro Max delivers a pro-level camera system, the A19 Pro chip, and all-day battery life in a premium titanium design.",
    storageOptions: ["256GB", "512GB", "1TB"],
    colorOptions: ["Natural Titanium", "Desert Titanium", "Blue"],
    simOptions: ["eSIM", "Nano-SIM"],
  },
  {
    id: "p2",
    title: "iPhone 17 Pro",
    category: "Apple",
    price: 6500000,
    image: "/images/product-iphone17pro.svg",
    description:
      "iPhone 17 Pro brings pro camera capabilities and the A19 Pro chip to a lighter 6.3-inch design.",
    storageOptions: ["256GB", "512GB", "1TB"],
    colorOptions: ["Silver", "Blue", "Black"],
    simOptions: ["eSIM", "Nano-SIM"],
  },
  {
    id: "p3",
    title: "iPhone Air",
    category: "Apple",
    price: 4500000,
    originalPrice: 4900000,
    image: "/images/product-iphoneair.svg",
    promo: "Hot",
    description:
      "iPhone Air is the thinnest iPhone ever, weighing only 165g with an A19 chip inside.",
    storageOptions: ["256GB", "512GB"],
    colorOptions: ["Sky Blue", "Starlight", "Midnight"],
    simOptions: ["eSIM"],
  },
  {
    id: "p4",
    title: "iPhone 16",
    category: "Apple",
    price: 4500000,
    image: "/images/product-iphone16.svg",
    description:
      "iPhone 16 features the A18 chip, an advanced dual-camera system, and Action button.",
    storageOptions: ["128GB", "256GB", "512GB"],
    colorOptions: ["Pink", "Teal", "Ultramarine"],
    simOptions: ["eSIM", "Nano-SIM"],
  },
  {
    id: "p5",
    title: "Apple Original Adapter",
    category: "Apple",
    price: 100000,
    image: "/images/product-adapter.svg",
    description:
      "Apple Original 35W Dual USB-C Port Power Adapter with compact, fast-charging design.",
    storageOptions: [],
    colorOptions: ["White"],
    simOptions: [],
  },
  {
    id: "p6",
    title: "Premium Phone Case",
    category: "Case",
    price: 85000,
    originalPrice: 120000,
    image: "/images/product-case.svg",
    promo: "-29%",
    description:
      "Premium silicone MagSafe case with microfiber lining and enhanced drop protection.",
    storageOptions: [],
    colorOptions: ["Black", "Blue", "Clear"],
    simOptions: [],
  },
  {
    id: "p7",
    title: "Screen Protector",
    category: "Protector",
    price: 45000,
    image: "/images/product-protector.svg",
    description:
      "Tempered glass screen protector, anti-fingerprint, 9H hardness, easy installation kit included.",
    storageOptions: [],
    colorOptions: ["Clear"],
    simOptions: [],
  },
  {
    id: "p8",
    title: "MagSafe Charger",
    category: "Installment Plan",
    price: 180000,
    image: "/images/product-charger.svg",
    promo: "0% Plan",
    description:
      "MagSafe wireless charger, 15W fast charging, perfectly aligned magnetic snap.",
    storageOptions: [],
    colorOptions: ["White", "Black"],
    simOptions: [],
  },
  {
    id: "p9",
    title: "iPhone 18 Pro Max",
    category: "Apple",
    price: 7500000,
    originalPrice: 7990000,
    image: "/images/product-iphone18promax.svg",
    promo: "New",
    description:
      "iPhone 18 Pro Max with the next-gen A20 Pro chip, advanced periscope zoom, and 48MP ProRAW system.",
    storageOptions: ["256GB", "512GB", "1TB", "2TB"],
    colorOptions: ["Cosmic Titanium", "Deep Blue", "Silver"],
    simOptions: ["eSIM", "Nano-SIM"],
  },
  {
    id: "p10",
    title: "iPhone 18",
    category: "Apple",
    price: 5000000,
    image: "/images/product-iphone18.svg",
    description:
      "iPhone 18 with the A20 chip, bright 120Hz display, and all-day battery life in a fresh design.",
    storageOptions: ["128GB", "256GB", "512GB"],
    colorOptions: ["Pink", "Sky Blue", "Starlight"],
    simOptions: ["eSIM", "Nano-SIM"],
  },
  {
    id: "p11",
    title: 'MacBook Pro 16"',
    category: "Apple",
    price: 4800000,
    originalPrice: 5200000,
    image: "/images/product-macbookpro.svg",
    promo: "-8%",
    description:
      "MacBook Pro 16-inch powered by Apple silicon, Liquid Retina XDR display, and up to 22 hours of battery life.",
    storageOptions: ["512GB", "1TB", "2TB"],
    colorOptions: ["Space Black", "Silver"],
    simOptions: [],
  },
  {
    id: "p12",
    title: 'iMac 24"',
    category: "Apple",
    price: 5500000,
    image: "/images/product-imac.svg",
    description:
      "iMac 24-inch all-in-one with vibrant 4.5K Retina display, Apple silicon, and stunning color options.",
    storageOptions: ["512GB", "1TB", "2TB"],
    colorOptions: ["Blue", "Green", "Pink"],
    simOptions: [],
  },
];

export const rewards: Reward[] = [
  { id: "r1", title: "YKKO", price: 12000, image: "/images/reward-yokko.svg" },
  {
    id: "r2",
    title: "NOVA Max Coffee",
    price: 5000,
    image: "/images/reward-coffee.svg",
  },
  {
    id: "r3",
    title: "Concert Ticket",
    price: 50000,
    image: "/images/reward-ticket.svg",
  },
  {
    id: "r4",
    title: "Premium Gift",
    price: 20000,
    image: "/images/reward-gift.svg",
  },
];

export const transactions: Transaction[] = [
  {
    id: "t1",
    title: "Reward Wallet",
    amount: 50000,
    date: "Today · 09:24",
    type: "in",
  },
  {
    id: "t2",
    title: "iPhone 17 Pro Max",
    amount: -6650000,
    date: "Yesterday · 18:02",
    type: "out",
  },
  {
    id: "t3",
    title: "NOVA Max Coffee",
    amount: -5000,
    date: "Oct 2 · 11:40",
    type: "out",
  },
  {
    id: "t4",
    title: "Cashback Bonus",
    amount: 12000,
    date: "Oct 1 · 08:15",
    type: "in",
  },
];

export const banners: Banner[] = [
  {
    id: "b1",
    title: "BUNNY ON THE MOON CONCERT",
    subtitle: "Live in Yangon · Cashback & Rewards",
    image: "/images/banner-concert.svg",
  },
  {
    id: "b2",
    title: "NEW IPHONE 17 SERIES",
    subtitle: "Pre-order now · 0% installment",
    image: "/images/product-iphone17promax.svg",
  },
];

export const branches: Branch[] = [
  {
    id: "br1",
    name: "M STUDIO — Junction City",
    address: "Junction City Mall, Bogyoke Aung San Rd, Yangon",
    hours: "10:00 AM – 9:00 PM",
    phone: "+95 9 xxx xxx 001",
  },
  {
    id: "br2",
    name: "M STUDIO — Onestop",
    address: "Onestop Shopping Mall, Hledan, Yangon",
    hours: "10:00 AM – 10:00 PM",
    phone: "+95 9 xxx xxx 002",
  },
  {
    id: "br3",
    name: "M STUDIO — Mandalay Central",
    address: "78th Street, Chan Aye Tharzan, Mandalay",
    hours: "9:30 AM – 9:30 PM",
    phone: "+95 9 xxx xxx 003",
  },
];

export const notifications: Notification[] = [
  {
    id: "n1",
    title: "Reward Wallet credited",
    body: "You received +50,000 MMK from Reward Wallet.",
    read: false,
    time: "Today · 09:24",
  },
  {
    id: "n2",
    title: "New reward available",
    body: "Concert Ticket is now redeemable in the Rewards tab.",
    read: false,
    time: "Today · 08:10",
  },
  {
    id: "n3",
    title: "Your order has been confirmed",
    body: "iPhone 17 Pro Max is being prepared for delivery.",
    read: true,
    time: "Yesterday",
  },
  {
    id: "n4",
    title: "Silver membership progress updated",
    body: "You are 2,866 MMK away from Gold membership.",
    read: false,
    time: "Yesterday",
  },
  {
    id: "n5",
    title: "New promotion available",
    body: "Bunny on the Moon Concert tokens are live now.",
    read: true,
    time: "Oct 3",
  },
];
