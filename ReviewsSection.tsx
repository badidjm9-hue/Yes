'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  Calendar,
  Flag,
  Camera,
  CheckCircle,
  MoreVertical
} from 'lucide-react'

interface Review {
  id: string
  rating: number
  comment: string
  images?: string[]
  createdAt: string
  isVerified: boolean
  user: {
    id: string
    name: string
    image?: string
  }
  helpful: number
  notHelpful: number
}

interface ReviewsSectionProps {
  hotelId: string
  initialReviews: Review[]
}

// Mock reviews data - in real app, this would come from API
const mockReviews: Review[] = [
  {
    id: '1',
    rating: 5,
    comment: 'Absolutely fantastic experience! The staff was incredibly welcoming and the facilities exceeded my expectations. The room was spotless and the view was breathtaking. The location is perfect for exploring the city.',
    images: ['/api/placeholder/300/200', '/api/placeholder/300/200'],
    createdAt: '2025-11-15T10:30:00Z',
    isVerified: true,
    user: {
      id: '1',
      name: 'Ahmed Benali',
      image: '/api/placeholder/40/40'
    },
    helpful: 12,
    notHelpful: 1
  },
  {
    id: '2',
    rating: 4,
    comment: 'Great hotel with excellent service. The restaurant was amazing and the spa treatments were very relaxing. Only minor issue was the WiFi speed in the evening, but overall a wonderful stay.',
    images: ['/api/placeholder/300/200'],
    createdAt: '2025-11-12T15:45:00Z',
    isVerified: true,
    user: {
      id: '2',
      name: 'Fatima Zidane',
      image: '/api/placeholder/40/40'
    },
    helpful: 8,
    notHelpful: 0
  },
  {
    id: '3',
    rating: 5,
    comment: 'Perfect for business trips! The conference facilities are top-notch and the business center has everything you need. The breakfast buffet was extensive and delicious.',
    createdAt: '2025-11-10T09:15:00Z',
    isVerified: true,
    user: {
      id: '3',
      name: 'Omar Kaddour',
      image: '/api/placeholder/40/40'
    },
    helpful: 15,
    notHelpful: 2
  },
  {
    id: '4',
    rating: 3,
    comment: 'The hotel was okay but could use some improvements. The room was clean but the furniture looked a bit dated. The location is convenient but the noise from the street was noticeable.',
    createdAt: '2025-11-08T14:20:00Z',
    isVerified: true,
    user: {
      id: '4',
      name: 'Khadija Berrabah',
      image: '/api/placeholder/40/40'
    },
    helpful: 3,
    notHelpful: 5
  },
  {
    id: '5',
    rating: 4,
    comment: 'Good value for money. The staff was friendly and helpful. The pool area was beautiful and well-maintained. Would definitely recommend for families.',
    createdAt: '2025-11-05T16:30:00Z',
    isVerified: true,
    user: {
      id: '5',
      name: 'Yacine Mansouri',
      image: '/api/placeholder/40/40'
    },
    helpful: 7,
    notHelpful: 1
  }
]

export default function ReviewsSection({ hotelId, initialReviews }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    images: [] as string[]
  })

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
  }))

  const renderStars = (rating: number, size: 'sm' | 'md' = 'md') => {
    const starSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${starSize} ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-400'
        }`}
      />
    ))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleSubmitReview = async () => {
    // In a real app, this would submit to the API
    console.log('Submitting review:', newReview)
    setShowReviewForm(false)
    setNewReview({ rating: 5, comment: '', images: [] })
  }

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-4 lg:mb-0">
            <h2 className="text-2xl font-bold text-white mb-2">Guest Reviews</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {renderStars(averageRating)}
                </div>
                <span className="text-white font-semibold text-lg">{averageRating.toFixed(1)}</span>
              </div>
              <span className="text-gray-400">({reviews.length} reviews)</span>
            </div>
          </div>

          <Button 
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Write a Review
          </Button>
        </div>
      </Card>

      {/* Review Form */}
      {showReviewForm && (
        <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Share Your Experience</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-white mb-2 block">Rating</label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setNewReview({...newReview, rating})}
                    className={`p-1 rounded ${
                      newReview.rating >= rating ? 'text-yellow-400' : 'text-gray-400'
                    }`}
                  >
                    <Star className="w-8 h-8 fill-current" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-white mb-2 block">Your Review</label>
              <Textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                placeholder="Tell us about your experience..."
                className="bg-white/10 border-white/20 text-white resize-none"
                rows={4}
              />
            </div>

            <div>
              <label className="text-white mb-2 block">Photos (Optional)</label>
              <div className="flex items-center space-x-2">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Camera className="w-4 h-4 mr-2" />
                  Add Photos
                </Button>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button 
                variant="outline"
                onClick={() => setShowReviewForm(false)}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitReview}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={!newReview.comment.trim()}
              >
                Submit Review
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Rating Distribution */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Rating Breakdown</h3>
        <div className="space-y-3">
          {ratingDistribution.map((item) => (
            <div key={item.rating} className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 w-20">
                <span className="text-white text-sm">{item.rating}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
              </div>
              <div className="flex-1 bg-white/10 rounded-full h-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="text-gray-400 text-sm w-8">{item.count}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id} className="bg-white/10 backdrop-blur-md border-white/20 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={review.user.image} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    {review.user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-white">{review.user.name}</h4>
                    {review.isVerified && (
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified Stay
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex">
                      {renderStars(review.rating, 'sm')}
                    </div>
                    <span className="text-gray-400 text-sm">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-gray-300 mb-4 leading-relaxed">
              {review.comment}
            </p>

            {review.images && review.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {review.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Review photo ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Helpful ({review.helpful})
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ThumbsDown className="w-4 h-4 mr-2" />
                </Button>
              </div>

              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Flag className="w-4 h-4 mr-2" />
                Report
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button 
          variant="outline" 
          className="border-white/20 text-white hover:bg-white/10"
        >
          Load More Reviews
        </Button>
      </div>
    </div>
  )
}