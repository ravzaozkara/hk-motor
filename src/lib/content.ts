import { getEntry, getCollection } from "astro:content";

// Singleton lookups. Each singleton file is stored under its own directory
// with a fixed id equal to the collection name (e.g. src/content/site/site.md).
export async function getSite() {
  const entry = await getEntry("site", "site");
  if (!entry) throw new Error("Missing content: src/content/site/site.md");
  return entry.data;
}

export async function getHome() {
  const entry = await getEntry("home", "home");
  if (!entry) throw new Error("Missing content: src/content/home/home.md");
  return entry.data;
}

export async function getAbout() {
  const entry = await getEntry("about", "about");
  if (!entry) throw new Error("Missing content: src/content/about/about.md");
  return entry;
}

// Sorted collection helpers.
export async function getServices() {
  const items = await getCollection("services");
  return items.sort((a, b) => a.data.order - b.data.order);
}

export async function getProducts() {
  const items = await getCollection("products");
  return items.sort((a, b) => a.data.order - b.data.order);
}

export async function getGallery() {
  const items = await getCollection("gallery");
  return items.sort((a, b) => a.data.order - b.data.order);
}

export async function getFaq() {
  const items = await getCollection("faq");
  return items.sort((a, b) => a.data.order - b.data.order);
}

export async function getReviews() {
  const items = await getCollection("reviews");
  return items.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

// Product category labels (used in filter UI + product cards).
export const PRODUCT_CATEGORIES = [
  { value: "yedek-parca", label: "Yedek Parça" },
  { value: "aksesuar", label: "Aksesuar" },
  { value: "ikinci-el", label: "2. El Motosiklet" },
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]["value"];

export function categoryLabel(cat: ProductCategory): string {
  return PRODUCT_CATEGORIES.find((c) => c.value === cat)?.label ?? cat;
}

// Pricing rule: number → "₺x.xxx", empty → "Fiyat için WhatsApp'tan sor".
export function formatPrice(price: number | null | undefined): string {
  if (price == null) return "Fiyat için WhatsApp'tan sor";
  const nf = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  });
  return nf.format(price);
}

export function productWhatsappMessage(name: string): string {
  return `Merhaba, "${name}" hakkında bilgi almak istiyorum.`;
}
