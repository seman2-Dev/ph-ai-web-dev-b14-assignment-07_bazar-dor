import { categories as demoCategories, products as demoProducts } from "@/lib/products";
import type { Product } from "@/lib/products";

export type Category = { slug: string; name: string; emoji: string; id?: string | number };

type Raw = Record<string, any>;
const API_BASE = (process.env.BAZARDOR_API_BASE_URL || "https://api.api-store.workers.dev/api/bazardor").replace(/\/$/, "");

function unwrap(payload: any): any[] {
  if (Array.isArray(payload)) return payload;
  for (const key of ["data", "products", "categories", "items", "results"]) {
    if (Array.isArray(payload?.[key])) return payload[key];
  }
  if (payload && typeof payload === "object" && payload.data && typeof payload.data === "object") {
    for (const key of ["products", "categories", "items", "results"]) if (Array.isArray(payload.data[key])) return payload.data[key];
  }
  return [];
}

function asNumber(value: unknown, fallback = 0): number {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function normalizeProduct(raw: Raw, index: number): Product {
  const id = asNumber(raw.id, index + 1);
  const name = String(raw.nameBn ?? raw.name ?? raw.title ?? `পণ্য ${id}`);
  const category = String(raw.category ?? raw.categorySlug ?? raw.categoryId ?? "other");
  const categoryName = String(raw.categoryNameBn ?? raw.categoryName ?? raw.categoryBn ?? category);
  const unitRaw = String(raw.unit ?? "kg");
  const unit = unitRaw === "kg" ? "প্রতি কেজি" : unitRaw === "liter" || unitRaw === "litre" || unitRaw === "l" ? "প্রতি লিটার" : unitRaw === "piece" ? "প্রতি পিস" : unitRaw === "dozen" ? "প্রতি ডজন" : unitRaw.startsWith("প্রতি ") ? unitRaw : `প্রতি ${unitRaw}`;
  const price = asNumber(raw.today ?? raw.price ?? raw.currentPrice ?? raw.current_price);
  const changeObj = raw.change && typeof raw.change === "object" ? raw.change : {};
  const change = asNumber(changeObj.pct ?? raw.changePct ?? raw.changePercent ?? raw.change, 0);
  const markets = Array.isArray(raw.markets) ? raw.markets.map((m: Raw) => {
    const min = asNumber(m.min ?? m.minimum ?? m.low);
    const max = asNumber(m.max ?? m.maximum ?? m.high, min);
    return { name: String(m.market ?? m.name ?? m.marketName ?? "স্থানীয় বাজার"), district: String(m.division ?? m.district ?? m.region ?? "বাংলাদেশ"), min, avg: asNumber(m.avg ?? m.average, Math.round((min + max) / 2)), max };
  }) : [];
  const slug = String(raw.slug ?? raw.id ?? name.toLowerCase().replace(/\s+/g, "-"));
  return {
    id, slug, name, category, categoryName,
    emoji: String(raw.categoryIcon ?? raw.image ?? raw.emoji ?? "🛒"),
    unit, price,
    change: changeObj.dir === "down" ? -Math.abs(change) : changeObj.dir === "up" ? Math.abs(change) : changeObj.dir === "flat" ? 0 : change,
    description: String(raw.description ?? `${name}-এর আজকের বাজারদর ও বিভিন্ন বাজারের তুলনা।`),
    markets,
  };
}

async function request(path: string): Promise<any> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 300 },
  });
  if (!response.ok) throw new Error(`BazarDor API request failed (${response.status}): ${path}`);
  return response.json();
}

export async function getProducts(): Promise<Product[]> {
  try {
    const payload = await request("/products");
    const rows = unwrap(payload);
    if (!rows.length) throw new Error("The products endpoint returned no recognizable list.");
    return rows.map(normalizeProduct);
  } catch (error) {
    console.error("Could not load BazarDor products; using local demo data.", error);
    return demoProducts;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const payload = await request("/categories");
    const rows = unwrap(payload);
    if (!rows.length) throw new Error("The categories endpoint returned no recognizable list.");
    return rows.map((raw: Raw, i: number) => ({
      id: raw.id,
      slug: String(raw.slug ?? raw.category ?? raw.id ?? `category-${i + 1}`),
      name: String(raw.nameBn ?? raw.categoryNameBn ?? raw.name ?? raw.title ?? raw.slug ?? "বিভাগ"),
      emoji: String(raw.icon ?? raw.categoryIcon ?? raw.emoji ?? raw.image ?? "🛒"),
    }));
  } catch (error) {
    console.error("Could not load BazarDor categories; using local demo categories.", error);
    return demoCategories;
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const payload = await request(`/products?category=${encodeURIComponent(category)}`);
    const rows = unwrap(payload);
    if (rows.length) return rows.map(normalizeProduct);
    // An empty list is a valid filter result, not an API error.
    return [];
  } catch (error) {
    console.error(`Could not filter BazarDor products for ${category}; using local demo data.`, error);
    return demoProducts.filter((p) => p.category === category);
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const all = await getProducts();
  const found = all.find((p) => p.slug === slug || String(p.id) === slug);
  if (found) {
    // Prefer the dedicated endpoint so a product page gets the full market comparison.
    try {
      const payload = await request(`/products/${encodeURIComponent(String(found.id))}`);
      const candidate = payload?.data ?? payload?.product ?? payload;
      if (candidate && !Array.isArray(candidate) && typeof candidate === "object" && (candidate.id !== undefined || candidate.nameBn || candidate.name)) {
        return normalizeProduct(candidate, found.id - 1);
      }
    } catch (error) {
      console.error(`Could not load BazarDor product ${found.id}; using product list data.`, error);
    }
    return found;
  }
  // Handles a slug/id that can be resolved only by the single-product endpoint.
  try {
    const payload = await request(`/products/${encodeURIComponent(slug)}`);
    const candidate = payload?.data ?? payload?.product ?? payload;
    if (candidate && !Array.isArray(candidate) && typeof candidate === "object" && (candidate.id !== undefined || candidate.nameBn || candidate.name)) return normalizeProduct(candidate, 0);
  } catch (error) {
    console.error(`BazarDor product not found: ${slug}`, error);
  }
  return undefined;
}

export function getPriceChangeLabel(product: Product): string {
  return product.change > 0 ? "up" : product.change < 0 ? "down" : "flat";
}
