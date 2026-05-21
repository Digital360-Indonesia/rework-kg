// Typed wrapper around categories.json (the CMS-editable source of truth).
// Components keep importing { categories } / Category from here — no changes needed.
import data from './categories.json';

export type Product = {
  image: string;
  title: string;
  description: string;
};

export type Category = {
  name: string;
  href: string;
  rightImage: string;
  rightEyebrow: string;
  rightTitle: string;
  rightCta: string;
  products: Product[];
};

export const categories = data as Record<'business' | 'community' | 'campus' | 'personal', Category>;
