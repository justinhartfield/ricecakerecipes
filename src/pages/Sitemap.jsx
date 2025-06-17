import React from 'react';
import { recipes, categories } from '../data/recipes';

const Sitemap = () => {
  const sitemapData = [
    {
      title: "Main Pages",
      links: [
        { name: "Home", url: "/" },
        { name: "About", url: "/about" }
      ]
    },
    {
      title: "Recipe Categories",
      links: categories.map(category => ({
        name: category.name,
        url: `/recipes/${category.slug}`
      }))
    },
    {
      title: "All Recipes",
      links: recipes.map(recipe => ({
        name: recipe.title,
        url: `/recipe/${recipe.slug}`
      }))
    }
  ];

  // Generate XML sitemap content
  const generateXMLSitemap = () => {
    const baseUrl = "https://ricecakerecipes.com";
    const currentDate = new Date().toISOString().split('T')[0];
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    sitemapData.forEach(section => {
      section.links.forEach(link => {
        const priority = link.url === "/" ? "1.0" : 
                        link.url.includes("/recipe/") ? "0.8" :
                        link.url.includes("/recipes/") ? "0.7" : "0.6";
        
        xml += `
  <url>
    <loc>${baseUrl}${link.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
      });
    });

    xml += `
</urlset>`;

    return xml;
  };

  const downloadSitemap = () => {
    const xmlContent = generateXMLSitemap();
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Site <span className="gradient-text">Map</span>
          </h1>
          
          <div className="mb-8 text-center">
            <button
              onClick={downloadSitemap}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Download XML Sitemap
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sitemapData.map((section, index) => (
              <div key={index} className="bg-card rounded-lg p-6 border">
                <h2 className="text-xl font-bold mb-4 text-primary">
                  {section.title}
                </h2>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.url}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center text-muted-foreground">
            <p>
              This sitemap contains all the main pages and recipes on Rice Cake Recipes. 
              For search engines, please use the XML sitemap available for download above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;

