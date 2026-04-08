import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Using your specific www URL
  const baseUrl = 'https://www.jakslab.work'

  // Unique page routes extracted from your code
  const routes = [
    '',
    '/about',
    '/services',
    '/products',
    '/portfolio',
    '/order',
    '/contact',
    '/terms',
    '/privacy',
    '/refund',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }))
}
