import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ items = [] }) => {
  const defaultItems = [
    { name: 'Home', url: '/' }
  ];

  const breadcrumbItems = [...defaultItems, ...items];

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />
            )}
            {index === 0 && (
              <Home className="h-4 w-4 text-muted-foreground mr-2" />
            )}
            {index === breadcrumbItems.length - 1 ? (
              <span className="text-muted-foreground font-medium">
                {item.name}
              </span>
            ) : (
              <Link 
                to={item.url} 
                className="text-primary hover:text-primary/80 transition-colors"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

