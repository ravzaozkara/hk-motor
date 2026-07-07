import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// ── Singletons ────────────────────────────────────────────────────────────
// Each singleton is a folder with exactly one entry, so Sveltia CMS can
// map it to a "files" collection with a fixed filename.

const site = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/site" }),
  schema: z.object({
    businessName: z.string(),
    tagline: z.string(),
    address: z.string(),
    mapEmbedUrl: z.string().url(),
    hoursText: z.string(),
    roadsideAreaText: z.string(),
    phonePrimary: z.string(),
    phonePrimaryTel: z.string(),
    phoneWhatsapp: z.string(),
    phoneSecondary: z.string().optional(),
    phoneSecondaryTel: z.string().optional(),
    instagramUrl: z.string().optional(),
    facebookUrl: z.string().optional(),
    logo: z.string().optional(),
    defaultWhatsappMessage: z.string(),
    stickyCtaLabel: z.string(),
  }),
});

const home = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/home" }),
  schema: z.object({
    heroEyebrow: z.string(),
    heroHeading: z.string(),
    heroSubtext: z.string(),
    primaryCtaLabel: z.string(),
    whatsappCtaLabel: z.string(),
    servicesSectionTitle: z.string(),
    servicesSectionSubtitle: z.string().optional(),
    productsSectionTitle: z.string(),
    productsSectionSubtitle: z.string().optional(),
    reviewsSectionTitle: z.string(),
    closingHeading: z.string(),
    closingSubtext: z.string(),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/about" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
  }),
});

// ── Multi-entry collections ───────────────────────────────────────────────

const services = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/services" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().default(100),
    featured: z.boolean().default(false),
  }),
});

const products = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/products" }),
  schema: z.object({
    name: z.string(),
    category: z.enum(["yedek-parca", "aksesuar", "ikinci-el"]),
    price: z.number().nullish(),
    image: z.string().optional(),
    description: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    // ikinci-el (second-hand) fields — all optional
    brand: z.string().optional(),
    model: z.string().optional(),
    year: z.number().optional(),
    km: z.number().optional(),
    engineCc: z.number().optional(),
    condition: z.string().optional(),
  }),
});

const gallery = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/gallery" }),
  schema: z.object({
    image: z.string(),
    caption: z.string().optional(),
    order: z.number().default(100),
  }),
});

const reviews = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/reviews" }),
  schema: z.object({
    author: z.string(),
    rating: z.number().min(1).max(5),
    text: z.string(),
    date: z.coerce.date(),
    featured: z.boolean().default(false),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/faq" }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    order: z.number().default(100),
  }),
});

export const collections = {
  site,
  home,
  about,
  services,
  products,
  gallery,
  reviews,
  faq,
};
