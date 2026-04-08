import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jakslab.work'

  // These are the unique paths from your project structure
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
    '/login',
    '/signup',
    '/workhub',
    '/ai-doc-analysis',
    '/chat-doc',
    '/citation-generator',
    '/literature-planner',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }))
}
