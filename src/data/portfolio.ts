export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  description: string;
  image: string;
  width: number;
  height: number;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: '7383',
    title: 'LINKQU & LINKITA',
    slug: 'linkqu-linkita',
    category: 'Kemeja',
    categorySlug: 'kemeja',
    description: 'Kemeja Regular untuk LINKQU & LINKITA',
    image: '/images/portfolio/Full-view-3.jpg',
    width: 1920,
    height: 1080,
  },
  {
    id: '7446',
    title: 'PT Samudera Trans Logistics',
    slug: 'pt-samudera-trans-logistics',
    category: 'Kemeja',
    categorySlug: 'kemeja',
    description: 'Kemeja untuk PT Samudera Trans Logistics',
    image: '/images/portfolio/Full-view-8.jpg',
    width: 1920,
    height: 1080,
  },
  {
    id: '7430',
    title: 'Universitas Airlangga',
    slug: 'universitas-airlangga-4',
    category: 'Kemeja',
    categorySlug: 'kemeja',
    description: 'Kemeja Regular untuk Universitas Airlangga',
    image: '/images/portfolio/Full-view-7.jpg',
    width: 1920,
    height: 1080,
  },
  {
    id: '7407',
    title: 'RS Premiere Surabaya',
    slug: 'rs-premiere-surabaya',
    category: 'Polo',
    categorySlug: 'polo',
    description: 'Polo Regular dengan Bahan Lacoste 24s untuk RS Premiere Surabaya',
    image: '/images/portfolio/Full-view-6.jpg',
    width: 1920,
    height: 1080,
  },
  {
    id: '7408',
    title: 'PT PLN UIP JBTB II',
    slug: 'pt-pln-uip-jbtb-ii',
    category: 'Polo',
    categorySlug: 'polo',
    description: 'Polo Drifit untuk PT PLN UIP JBTB II',
    image: '/images/portfolio/Full-view-5.jpg',
    width: 1920,
    height: 1080,
  },
  {
    id: '7395',
    title: 'PT Bumi Gresik Sukses',
    slug: 'pt-bumi-gresik-sukses',
    category: 'Rompi',
    categorySlug: 'rompi',
    description: 'Rompi premium yang didesain khusus untuk PT Bumi Gresik Sukses',
    image: '/images/portfolio/Full-view-4.jpg',
    width: 1920,
    height: 1080,
  },
];

export const portfolioCategories = [
  { name: 'Semua', slug: 'all' },
  { name: 'Kemeja', slug: 'kemeja' },
  { name: 'Jaket', slug: 'jaket' },
  { name: 'Kaos', slug: 'kaos' },
  { name: 'Polo', slug: 'polo' },
  { name: 'Wearpack', slug: 'wearpack' },
  { name: 'Rompi', slug: 'rompi' },
  { name: 'Topi', slug: 'topi' },
];

export function getPortfolioByCategory(categorySlug: string): PortfolioItem[] {
  if (categorySlug === 'all') {
    return portfolioItems;
  }
  return portfolioItems.filter(item => item.categorySlug === categorySlug);
}

export function getPortfolioBySlug(slug: string): PortfolioItem | undefined {
  return portfolioItems.find(item => item.slug === slug);
}
