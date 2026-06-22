export interface DBCategory {
  id: number;
  name: string;
  slug: string;
  icon: string;
}

export interface DBProduct {
  id: string;
  name: string;
  price: number;
  product_link: string;
  review: string;
  featured: boolean;
  video_link: string | null;
  category_id: number;
  category_name?: string;
  statBoost?: string;
  statBoostLevel?: number;
  image_url?: string | null;
  iconType?: string;
}
