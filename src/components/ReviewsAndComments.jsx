import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ThumbsUp, ThumbsDown, Flag, User } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import StarRating from './StarRating';

const ReviewsAndComments = ({ 
  recipeId, 
  reviews = [], 
  onAddReview = null,
  averageRating = 0,
  totalReviews = 0 
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: '',
    comment: '',
    author: '',
    email: ''
  });
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');

  // Sample reviews data if none provided
  const sampleReviews = reviews.length > 0 ? reviews : [
    {
      id: 1,
      author: "Sarah Chen",
      rating: 5,
      title: "Absolutely delicious!",
      comment: "This recipe exceeded my expectations. The flavors are perfectly balanced and the texture is amazing. My whole family loved it!",
      date: "2024-11-15",
      helpful: 12,
      verified: true,
      images: []
    },
    {
      id: 2,
      author: "Mike Rodriguez",
      rating: 4,
      title: "Great recipe with minor tweaks",
      comment: "Really good recipe! I added a bit more spice and it was perfect. The instructions were clear and easy to follow.",
      date: "2024-11-10",
      helpful: 8,
      verified: true,
      images: []
    },
    {
      id: 3,
      author: "Emma Thompson",
      rating: 5,
      title: "Perfect for meal prep",
      comment: "Made this for my weekly meal prep and it's been a game changer. Healthy, filling, and tastes great even after reheating.",
      date: "2024-11-08",
      helpful: 15,
      verified: false,
      images: []
    },
    {
      id: 4,
      author: "David Kim",
      rating: 4,
      title: "Kids approved!",
      comment: "My picky eaters actually finished their plates. That's a win in my book! Will definitely make this again.",
      date: "2024-11-05",
      helpful: 6,
      verified: true,
      images: []
    }
  ];

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReview.rating === 0 || !newReview.comment.trim()) {
      return;
    }

    const review = {
      id: Date.now(),
      ...newReview,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      verified: false,
      images: []
    };

    if (onAddReview) {
      onAddReview(review);
    }

    setNewReview({
      rating: 0,
      title: '',
      comment: '',
      author: '',
      email: ''
    });
    setShowReviewForm(false);
  };

  const sortedReviews = [...sampleReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const filteredReviews = sortedReviews.filter(review => {
    if (filterBy === 'all') return true;
    if (filterBy === 'verified') return review.verified;
    if (filterBy === '5star') return review.rating === 5;
    if (filterBy === '4star') return review.rating === 4;
    if (filterBy === '3star') return review.rating === 3;
    if (filterBy === '2star') return review.rating === 2;
    if (filterBy === '1star') return review.rating === 1;
    return true;
  });

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: sampleReviews.filter(review => review.rating === rating).length,
    percentage: (sampleReviews.filter(review => review.rating === rating).length / sampleReviews.length) * 100
  }));

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <Card className="glass-effect">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-primary" />
              Reviews & Ratings
            </h3>
            <Button 
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-primary hover:bg-primary/90"
            >
              Write a Review
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {averageRating || 4.5}
              </div>
              <StarRating rating={averageRating || 4.5} size={24} />
              <p className="text-muted-foreground mt-2">
                Based on {totalReviews || sampleReviews.length} reviews
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm w-8">{rating}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review Form */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass-effect">
              <CardHeader>
                <h4 className="text-xl font-semibold">Write Your Review</h4>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Rating</label>
                    <StarRating 
                      rating={newReview.rating}
                      interactive={true}
                      onRatingChange={(rating) => setNewReview(prev => ({ ...prev, rating }))}
                      size={28}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Your Name</label>
                      <Input
                        value={newReview.author}
                        onChange={(e) => setNewReview(prev => ({ ...prev, author: e.target.value }))}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email (optional)</label>
                      <Input
                        type="email"
                        value={newReview.email}
                        onChange={(e) => setNewReview(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Review Title</label>
                    <Input
                      value={newReview.title}
                      onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Summarize your experience"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Your Review</label>
                    <Textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                      placeholder="Share your thoughts about this recipe..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="bg-primary hover:bg-primary/90">
                      Submit Review
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowReviewForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters and Sorting */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
            <option value="helpful">Most Helpful</option>
          </select>

          <select 
            value={filterBy} 
            onChange={(e) => setFilterBy(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="all">All Reviews</option>
            <option value="verified">Verified Only</option>
            <option value="5star">5 Stars</option>
            <option value="4star">4 Stars</option>
            <option value="3star">3 Stars</option>
            <option value="2star">2 Stars</option>
            <option value="1star">1 Star</option>
          </select>
        </div>

        <p className="text-sm text-muted-foreground">
          Showing {filteredReviews.length} of {sampleReviews.length} reviews
        </p>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass-effect hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-semibold">{review.author}</h5>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <StarRating rating={review.rating} size={16} showValue={false} />
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>

                {review.title && (
                  <h6 className="font-medium mb-2">{review.title}</h6>
                )}

                <p className="text-muted-foreground mb-4">{review.comment}</p>

                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Helpful ({review.helpful})
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    Not Helpful
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-8">
          <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No reviews match your current filters.</p>
        </div>
      )}
    </div>
  );
};

export default ReviewsAndComments;

