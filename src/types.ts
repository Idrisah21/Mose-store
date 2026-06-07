/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  priceTZS: number;
  priceUSD: number;
  category: string;
  images: string[];
  rating: number;
  ratingCount: number;
  stock: number;
  description: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  details: string[];
  sku: string;
  brand?: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  title: string;
  text: string;
  date: string;
  verified: boolean;
  replied?: string;
}

export interface StrategySection {
  id: string;
  title: string;
  icon: string;
  goal: string;
  overview: string;
  details: {
    title: string;
    description: string;
    content?: string[];
    bullets?: string[];
    codeBlock?: string;
    table?: { headers: string[]; rows: string[][] };
  }[];
}

export interface BackInStockEntry {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  email: string;
  selectedSize: string;
  selectedColor: string;
  date: string;
  timestamp: string;
}

