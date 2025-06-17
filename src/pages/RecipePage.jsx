import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, Clock, Users, ChefHat, Heart, Share2, Printer, 
  CheckCircle, Circle, Timer, Flame, Utensils, BookOpen 
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { recipes, getRecipeBySlug } from '../data/recipes';
import SEOHead from '../components/SEOHead';
import StarRating from '../components/StarRating';
import ReviewsAndComments from '../components/ReviewsAndComments';
import Breadcrumbs from '../components/Breadcrumbs';

const RecipePage = () => {
  const { recipeSlug, recipeId } = useParams();
  
  // Support both new slug-based URLs and legacy ID-based URLs
  const recipe = recipeSlug 
    ? getRecipeBySlug(recipeSlug)
    : recipes.find(r => r.id === parseInt(recipeId));
    
  const [checkedIngredients, setCheckedIngredients] = useState(new Set());
  const [checkedInstructions, setCheckedInstructions] = useState(new Set());
  const [userRating, setUserRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-muted-foreground">Recipe not found</h1>
      </div>
    );
  }

  const toggleIngredient = (index) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedIngredients(newChecked);
  };

  const toggleInstruction = (index) => {
    const newChecked = new Set(checkedInstructions);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedInstructions(newChecked);
  };

  const handleAddReview = (newReview) => {
    setReviews(prev => [newReview, ...prev]);
  };

  const relatedRecipes = recipes
    .filter(r => r.category === recipe.category && r.id !== recipe.id)
    .slice(0, 3);

  // Breadcrumb items
  const breadcrumbItems = [
    { name: 'Recipes', url: '/recipes' },
    { name: recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1), url: `/category/${recipe.category}` },
    { name: recipe.title, url: `/recipe/${recipe.id}` }
  ];

  // Sample reviews for schema markup
  const sampleReviews = [
    {
      author: "Sarah Chen",
      rating: 5,
      comment: "This recipe exceeded my expectations. The flavors are perfectly balanced and the texture is amazing. My whole family loved it!",
      date: "2024-11-15"
    },
    {
      author: "Mike Rodriguez", 
      rating: 4,
      comment: "Really good recipe! I added a bit more spice and it was perfect. The instructions were clear and easy to follow.",
      date: "2024-11-10"
    },
    {
      author: "Emma Thompson",
      rating: 5,
      comment: "Made this for my weekly meal prep and it's been a game changer. Healthy, filling, and tastes great even after reheating.",
      date: "2024-11-08"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={recipe.title}
        description={recipe.description}
        keywords={`${recipe.title}, ${recipe.tags.join(', ')}, rice cake recipe, ${recipe.category} recipe, ${recipe.difficulty.toLowerCase()} recipe`}
        url={`https://ricecakerecipes.com/recipe/${recipe.id}`}
        image={recipe.image}
        type="article"
        recipe={recipe}
        reviews={sampleReviews}
        breadcrumbs={breadcrumbItems}
      />
      
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems.slice(0, -1)} />
        
        {/* Recipe Header */}
        <section className="hero-gradient py-12 rounded-2xl mb-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{recipe.category}</Badge>
                <Badge variant="outline">{recipe.difficulty}</Badge>
                {recipe.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {recipe.title}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
                {recipe.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center space-x-2">
                  <StarRating rating={recipe.rating} size={20} />
                  <span className="text-muted-foreground">({recipe.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{recipe.totalTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{recipe.servings} servings</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Flame className="h-4 w-4 text-muted-foreground" />
                  <span>{recipe.calories} calories</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recipe Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-2xl"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button size="icon" variant="secondary" className="glass-effect">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="glass-effect">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="glass-effect">
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            {/* Ingredients */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass-effect border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Utensils className="h-5 w-5 text-primary" />
                    <span>Ingredients</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="flex items-center space-x-3 group cursor-pointer"
                        onClick={() => toggleIngredient(index)}
                        id={`ingredient-${index + 1}`}
                      >
                        {checkedIngredients.has(index) ? (
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                        )}
                        <span className={`${
                          checkedIngredients.has(index) 
                            ? 'line-through text-muted-foreground' 
                            : 'text-foreground'
                        } transition-all duration-200`}>
                          {ingredient}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="glass-effect border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ChefHat className="h-5 w-5 text-primary" />
                    <span>Instructions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-6">
                    {recipe.instructions.map((instruction, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex space-x-4 group cursor-pointer"
                        onClick={() => toggleInstruction(index)}
                        id={`step-${index + 1}`}
                      >
                        <div className="flex-shrink-0">
                          {checkedInstructions.has(index) ? (
                            <CheckCircle className="h-6 w-6 text-primary mt-1" />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mt-1 group-hover:scale-110 transition-transform">
                              {index + 1}
                            </div>
                          )}
                        </div>
                        <p className={`${
                          checkedInstructions.has(index) 
                            ? 'line-through text-muted-foreground' 
                            : 'text-foreground'
                        } transition-all duration-200 leading-relaxed`}>
                          {instruction}
                        </p>
                      </motion.li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </motion.div>

            {/* Chef's Tips */}
            {recipe.tips && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card className="glass-effect border-0 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <ChefHat className="h-5 w-5 text-primary" />
                      <span>Chef's Tips</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {recipe.tips.map((tip, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Reviews and Comments Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <ReviewsAndComments 
                recipeId={recipe.id}
                reviews={reviews}
                onAddReview={handleAddReview}
                averageRating={recipe.rating}
                totalReviews={recipe.reviewCount}
              />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recipe Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="glass-effect border-0 sticky top-6">
                <CardHeader>
                  <CardTitle>Recipe Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <Timer className="h-6 w-6 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Prep Time</p>
                      <p className="font-semibold">{recipe.prepTime}</p>
                    </div>
                    <div className="text-center">
                      <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Cook Time</p>
                      <p className="font-semibold">{recipe.cookTime}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Servings</span>
                      <span className="font-semibold">{recipe.servings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Calories</span>
                      <span className="font-semibold">{recipe.calories}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Protein</span>
                      <span className="font-semibold">{recipe.protein}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Difficulty</span>
                      <Badge variant="outline">{recipe.difficulty}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Nutrition Facts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="glass-effect border-0">
                <CardHeader>
                  <CardTitle>Nutrition Facts</CardTitle>
                  <p className="text-sm text-muted-foreground">Per serving</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Calories</span>
                    <span className="font-semibold">{recipe.calories}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Protein</span>
                    <span className="font-semibold">{recipe.protein}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Carbohydrates</span>
                    <span className="font-semibold">{recipe.nutrition?.carbohydrates || "45g"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Fat</span>
                    <span className="font-semibold">{recipe.nutrition?.fat || "8g"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Fiber</span>
                    <span className="font-semibold">{recipe.nutrition?.fiber || "2g"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Sodium</span>
                    <span className="font-semibold">{recipe.nutrition?.sodium || "890mg"}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Related Recipes */}
            {relatedRecipes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="glass-effect border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <span>Related Recipes</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {relatedRecipes.map((relatedRecipe) => (
                      <motion.div
                        key={relatedRecipe.id}
                        whileHover={{ scale: 1.02 }}
                        className="group cursor-pointer"
                        onClick={() => window.location.href = `/recipe/${relatedRecipe.id}`}
                      >
                        <div className="flex space-x-3">
                          <img
                            src={relatedRecipe.image}
                            alt={relatedRecipe.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                              {relatedRecipe.title}
                            </h4>
                            <div className="flex items-center space-x-1 mt-1">
                              <StarRating rating={relatedRecipe.rating} size={14} showValue={false} />
                              <span className="text-xs text-muted-foreground">
                                ({relatedRecipe.reviewCount})
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {relatedRecipe.totalTime} • {relatedRecipe.difficulty}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;

