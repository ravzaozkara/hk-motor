// Non-content helpers: static nav array and a WhatsApp URL builder.
// All editable content (business info, hero text, etc.) lives in
// `src/content/*` and is read via getEntry("site", "site").

export const nav = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/urunler", label: "Ürünler" },
  { href: "/galeri", label: "Galeri" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/sss", label: "SSS" },
  { href: "/yorumlar", label: "Yorumlar" },
  { href: "/iletisim", label: "İletişim" },
] as const;

export function waLink(waNumber: string, message?: string): string {
  const base = `https://wa.me/${waNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
