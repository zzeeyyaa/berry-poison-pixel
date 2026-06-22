export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  statBoost: string;
  statBoostLevel?: number;
  dialogText: string;
  shopeeLink: string;
  iconType: string;
  imageUrl?: string | null;
  videoLink?: string | null;
}
