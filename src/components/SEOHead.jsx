import React from 'react';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  recipe = null,
  category = null,
  reviews = null,
  breadcrumbs = null
}) => {
  const siteTitle = "Rice Cake Recipes";
  const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} - Delicious Low-Cal, High-Protein Rice Cake Ideas`;
  const defaultDescription = "Discover amazing rice cake recipes from around the world. From savory Korean tteokbokki to sweet tropical desserts, find low-cal, high-protein recipes perfect for healthy eating.";
  const defaultImage = "/src/assets/images/korean_spicy_cheese_tteokbokki.jpg";
  const baseUrl = "https://ricecakerecipes.com";

  // Website structured data
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteTitle,
    "url": baseUrl,
    "description": defaultDescription,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  // Organization structured data
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteTitle,
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "description": defaultDescription,
    "sameAs": [
      "https://facebook.com/ricecakerecipes",
      "https://instagram.com/ricecakerecipes",
      "https://twitter.com/ricecakerecipes"
    ]
  };

  // Breadcrumb structured data
  const breadcrumbStructuredData = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${baseUrl}${crumb.url}`
    }))
  } : null;

  // Recipe structured data with enhanced schema
  const recipeStructuredData = recipe ? {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipe.title,
    "description": recipe.description,
    "image": {
      "@type": "ImageObject",
      "url": recipe.image,
      "width": 1200,
      "height": 800
    },
    "author": {
      "@type": "Organization",
      "name": "Rice Cake Recipes",
      "url": baseUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "Rice Cake Recipes",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`,
        "width": 200,
        "height": 60
      }
    },
    "datePublished": "2024-01-01",
    "dateModified": "2024-12-01",
    "prepTime": `PT${recipe.prepTime.replace(/\D/g, '')}M`,
    "cookTime": `PT${recipe.cookTime.replace(/\D/g, '')}M`,
    "totalTime": `PT${recipe.totalTime.replace(/\D/g, '')}M`,
    "recipeYield": recipe.servings,
    "recipeCategory": recipe.category,
    "recipeCuisine": recipe.tags.includes('Korean') ? 'Korean' : 
                     recipe.tags.includes('Japanese') ? 'Japanese' :
                     recipe.tags.includes('Filipino') ? 'Filipino' : 'International',
    "keywords": recipe.tags.join(', '),
    "nutrition": {
      "@type": "NutritionInformation",
      "calories": `${recipe.calories} calories`,
      "proteinContent": recipe.protein,
      "carbohydrateContent": recipe.nutrition?.carbohydrates || "45g",
      "fatContent": recipe.nutrition?.fat || "8g",
      "fiberContent": recipe.nutrition?.fiber || "2g",
      "sodiumContent": recipe.nutrition?.sodium || "890mg"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": recipe.rating,
      "reviewCount": recipe.reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    },
    "recipeIngredient": recipe.ingredients,
    "recipeInstructions": recipe.instructions.map((instruction, index) => ({
      "@type": "HowToStep",
      "name": `Step ${index + 1}`,
      "text": instruction,
      "url": `${baseUrl}/recipe/${recipe.id}#step-${index + 1}`
    })),
    "video": recipe.videoUrl ? {
      "@type": "VideoObject",
      "name": `How to make ${recipe.title}`,
      "description": `Step-by-step video guide for ${recipe.title}`,
      "thumbnailUrl": recipe.image,
      "contentUrl": recipe.videoUrl,
      "uploadDate": "2024-01-01"
    } : undefined,
    "review": reviews ? reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": review.comment,
      "datePublished": review.date
    })) : undefined
  } : null;

  // Category page structured data
  const categoryStructuredData = category ? {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category.name} Rice Cake Recipes`,
    "description": category.description,
    "url": `${baseUrl}/category/${category.id}`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": category.recipeCount,
      "itemListElement": category.recipes?.map((recipe, index) => ({
        "@type": "Recipe",
        "position": index + 1,
        "name": recipe.title,
        "url": `${baseUrl}/recipe/${recipe.id}`,
        "image": recipe.image,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": recipe.rating,
          "reviewCount": recipe.reviewCount
        }
      })) || []
    }
  } : null;

  // Use useEffect to update document head
  React.useEffect(() => {
    // Update title
    document.title = fullTitle;
    
    // Update meta tags
    const updateMetaTag = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description || defaultDescription);
    if (keywords) updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'Rice Cake Recipes');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', 'en');
    updateMetaTag('revisit-after', '7 days');

    // Open Graph tags
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description || defaultDescription, true);
    updateMetaTag('og:image', image || defaultImage, true);
    updateMetaTag('og:url', url || baseUrl, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', siteTitle, true);
    updateMetaTag('og:locale', 'en_US', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description || defaultDescription);
    updateMetaTag('twitter:image', image || defaultImage);
    updateMetaTag('twitter:site', '@ricecakerecipes');

    // Recipe-specific meta tags
    if (recipe) {
      updateMetaTag('recipe:author', 'Rice Cake Recipes');
      updateMetaTag('recipe:published_time', '2024-01-01');
      updateMetaTag('recipe:prep_time', recipe.prepTime);
      updateMetaTag('recipe:cook_time', recipe.cookTime);
      updateMetaTag('recipe:total_time', recipe.totalTime);
      updateMetaTag('recipe:serves', recipe.servings);
    }

    // Add structured data
    const addStructuredData = (data, id) => {
      let script = document.getElementById(id);
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = id;
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data, null, 2);
    };

    // Add all structured data
    addStructuredData(websiteStructuredData, 'website-structured-data');
    addStructuredData(organizationStructuredData, 'organization-structured-data');
    
    if (breadcrumbStructuredData) {
      addStructuredData(breadcrumbStructuredData, 'breadcrumb-structured-data');
    }
    
    if (recipeStructuredData) {
      addStructuredData(recipeStructuredData, 'recipe-structured-data');
    } else {
      // Remove recipe structured data if not needed
      const existingRecipeScript = document.getElementById('recipe-structured-data');
      if (existingRecipeScript) {
        existingRecipeScript.remove();
      }
    }

    if (categoryStructuredData) {
      addStructuredData(categoryStructuredData, 'category-structured-data');
    } else {
      // Remove category structured data if not needed
      const existingCategoryScript = document.getElementById('category-structured-data');
      if (existingCategoryScript) {
        existingCategoryScript.remove();
      }
    }

    // Cleanup function
    return () => {
      // Optional: Clean up meta tags when component unmounts
    };
  }, [title, description, keywords, image, url, type, recipe, category, reviews, breadcrumbs]);

  return null; // This component doesn't render anything
};

export default SEOHead;

