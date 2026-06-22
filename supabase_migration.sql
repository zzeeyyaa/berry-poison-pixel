-- ========================================================
-- 1. FUNGSI TRIGGER UNTUK UPDATED AT OTOMATIS
-- ========================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ========================================================
-- 2. MEMBUAT TABEL KATEGORI (categories)
-- ========================================================
CREATE TABLE public.categories (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL,
    slug text UNIQUE NOT NULL,
    icon text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ========================================================
-- 3. MEMBUAT TABEL PRODUK (products)
-- ========================================================
CREATE TABLE public.products (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    price text NOT NULL,
    product_link text NOT NULL,
    category_id bigint REFERENCES public.categories(id) ON DELETE CASCADE,
    review text NOT NULL,
    featured boolean DEFAULT false NOT NULL,
    video_link text, -- Link video ulasan (opsional)
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ========================================================
-- 4. MEMASANG TRIGGER PADA TABEL
-- ========================================================
CREATE TRIGGER trigger_categories_updated_at
    BEFORE UPDATE ON public.categories
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ========================================================
-- 5. MENGAKTIFKAN ROW LEVEL SECURITY (RLS)
-- ========================================================
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- ========================================================
-- 6. KEBIJAKAN AKSES (POLICIES) UNTUK TABEL KATEGORI
-- ========================================================
-- Publik boleh melihat
CREATE POLICY "Allow public read categories" 
ON public.categories 
FOR SELECT 
USING (true);

-- Hanya admin login yang boleh memodifikasi
CREATE POLICY "Allow authenticated admins to manage categories" 
ON public.categories 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- ========================================================
-- 7. KEBIJAKAN AKSES (POLICIES) UNTUK TABEL PRODUK
-- ========================================================
-- Publik boleh melihat
CREATE POLICY "Allow public read products" 
ON public.products 
FOR SELECT 
USING (true);

-- Hanya admin login yang boleh memodifikasi
CREATE POLICY "Allow authenticated admins to manage products" 
ON public.products 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
