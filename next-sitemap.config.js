/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.outdoornuble.cl',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      `${process.env.SITE_URL || 'https://www.outdoornuble.cl'}/sitemap.xml`,
    ],
  },
  exclude: ['/api/*', '/admin/*'],
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    // Custom priority for specific pages
    const customPriority = {
      '/': 1.0,
      '/#contacto': 0.9,
    };

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: customPriority[path] || config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
