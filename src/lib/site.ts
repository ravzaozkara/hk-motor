// Global site defaults. In Phase 1 these move to the `site` content collection
// (Sveltia CMS singleton). Keep the shape identical so the swap is trivial.
export const site = {
  businessName: "HK Motors",
  tagline: "Motosiklet Servisi ve 7/24 Yol Yardımı",
  address: "Çırçır Mah. Sezai Karakoç Cad. No:27/29 Eyüpsultan/İstanbul",
  hoursText: "Her gün 09:00 – 21:00",
  roadsideAreaText: "7/24 yol yardımı — İstanbul Avrupa",
  phonePrimary: "+90 537 213 6728",
  phonePrimaryTel: "+905372136728",
  phoneWhatsapp: "905372136728",
  phoneSecondary: "+90 507 061 2860",
  phoneSecondaryTel: "+905070612860",
  mapEmbedUrl:
    "https://www.google.com/maps?q=%C3%87%C4%B1r%C3%A7%C4%B1r%20Mah.%20Sezai%20Karako%C3%A7%20Cad.%20No%3A27%2F29%20Eyupsultan%20Istanbul&output=embed",
  instagramUrl: "",
  facebookUrl: "",
} as const;

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

export function waLink(message?: string): string {
  const base = `https://wa.me/${site.phoneWhatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
