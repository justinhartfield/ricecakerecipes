import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, Users, Filter, Grid, List, ChefHat } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { recipes, categories } from '../data/recipes';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import StarRating from '../components/StarRating';
import Breadcrumbs from '../components/Breadcrumbs';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState('grid');
  const [filterBy, setFilterBy] = useState('all');

  const category = categories.find(cat => cat.id === categoryId);
  const categoryRecipes = recipes.filter(recipe => recipe.category === categoryId);

  // Sort recipes
  const sortedRecipes = [...categoryRecipes].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'time':
        return parseInt(a.totalTime) - parseInt(b.totalTime);
      case 'calories':
        return a.calories - b.calories;
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // Filter recipes
  const filteredRecipes = sortedRecipes.filter(recipe => {
    if (filterBy === 'all') return true;
    if (filterBy === 'quick') return parseInt(recipe.totalTime) <= 30;
    if (filterBy === 'low-cal') return recipe.calories <= 200;
    if (filterBy === 'high-protein') return parseInt(recipe.protein) >= 10;
    return true;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-muted-foreground">Category not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={`${category.name} Rice Cake Recipes`}
        description={`${category.description} Browse our collection of ${category.count} delicious ${category.name.toLowerCase()} rice cake recipes.`}
        keywords={`${category.name.toLowerCase()} rice cakes, ${category.name.toLowerCase()} recipes, rice cake ${category.name.toLowerCase()}, healthy ${category.name.toLowerCase()} recipes`}
        url={`https://ricecakerecipes.com/category/${categoryId}`}
      />
      
      {/* Category Hero */}
      <section className="hero-gradient py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`w-20 h-20 ${category.color} rounded-full flex items-center justify-center mx-auto mb-6`}
            >
              <ChefHat className="h-10 w-10 text-white" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">{category.name}</span> Rice Cakes
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6">
              {category.description}
            </p>
            
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {category.count} delicious recipes
            </Badge>
          </motion.div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 bg-muted/30 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filter:</span>
                <Select value={filterBy} onValueChange={setFilterBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Recipes</SelectItem>
                    <SelectItem value="quick">Quick (≤30 min)</SelectItem>
                    <SelectItem value="low-cal">Low-Cal (≤200 cal)</SelectItem>
                    <SelectItem value="high-protein">High-Protein (≥10g)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="time">Cooking Time</SelectItem>
                    <SelectItem value="calories">Calories</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">View:</span>
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recipes Grid/List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={
              viewMode === 'grid'
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-6"
            }
          >
            {filteredRecipes.map((recipe) => (
              <motion.div key={recipe.id} variants={itemVariants}>
                <Link to={`/recipe/${recipe.id}`}>
                  {viewMode === 'grid' ? (
                    <Card className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 glass-effect">
                      <div className="relative overflow-hidden">
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          className="absolute bottom-4 left-4 right-4 text-white"
                        >
                          <Badge className="bg-primary/90 text-primary-foreground mb-2">
                            {recipe.difficulty}
                          </Badge>
                        </motion.div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {recipe.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {recipe.description}
                        </p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{recipe.totalTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{recipe.servings} servings</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{recipe.rating}</span>
                            <span className="text-muted-foreground">({recipe.reviewCount})</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {recipe.calories} cal
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="group hover:shadow-xl transition-all duration-300 glass-effect border-0">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="md:w-48 flex-shrink-0">
                            <motion.img
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.3 }}
                              src={recipe.image}
                              alt={recipe.title}
                              className="w-full h-32 md:h-24 object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                              <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors duration-300">
                                {recipe.title}
                              </h3>
                              <div className="flex items-center space-x-1 mb-2 md:mb-0">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{recipe.rating}</span>
                                <span className="text-muted-foreground">({recipe.reviewCount})</span>
                              </div>
                            </div>
                            <p className="text-muted-foreground mb-4 line-clamp-2">
                              {recipe.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{recipe.totalTime}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="h-4 w-4" />
                                <span>{recipe.servings} servings</span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {recipe.calories} cal
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {recipe.protein} protein
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {recipe.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {filteredRecipes.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <ChefHat className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No recipes found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters to see more recipes.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;

