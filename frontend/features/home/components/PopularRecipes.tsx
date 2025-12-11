import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Clock, Heart, MessageCircle, Star, Bookmark } from 'lucide-react-native';

interface PopularRecipesProps {
  onRecipeClick?: (recipeId: number) => void;
  onViewAllClick?: () => void;
}

interface Recipe {
  id: number;
  title: string;
  description: string;
  cookTime: string;
  rating: number;
  imageUrl: string;
  author: string;
  likes: number;
  comments: number;
}

export function PopularRecipes({ onRecipeClick, onViewAllClick }: PopularRecipesProps) {
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<number[]>([]);

  const recipes: Recipe[] = [
    {
      id: 1,
      title: "디저트 케이크",
      description: "부드럽고 달콤한 초콜릿 케이크 만들기",
      cookTime: "45분",
      rating: 4.5,
      imageUrl: "https://images.unsplash.com/photo-1607257882338-70f7dd2ae344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwY2FrZXxlbnwxfHx8fDE3NjUwMDk2MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      author: "베이킹마스터",
      likes: 245,
      comments: 32,
    },
    {
      id: 2,
      title: "스테이크 디너",
      description: "레스토랑 스타일 완벽한 스테이크",
      cookTime: "30분",
      rating: 5.0,
      imageUrl: "https://images.unsplash.com/photo-1706650616334-97875fae8521?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVhayUyMGRpbm5lcnxlbnwxfHx8fDE3NjUwMjU1ODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      author: "쉐프김",
      likes: 389,
      comments: 54,
    },
    {
      id: 3,
      title: "일식 스시",
      description: "집에서 만드는 신선한 스시 롤",
      cookTime: "60분",
      rating: 4.8,
      imageUrl: "https://images.unsplash.com/photo-1730325559618-940c72290ef0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGphcGFuZXNlfGVufDF8fHx8MTc2NTAyODQyOHww&ixlib=rb-4.1.0&q=80&w=1080",
      author: "스시요리사",
      likes: 521,
      comments: 67,
    },
    {
      id: 4,
      title: "한식 비빔밥",
      description: "건강하고 맛있는 영양 가득 비빔밥",
      cookTime: "25분",
      rating: 4.7,
      imageUrl: "https://images.unsplash.com/photo-1626803774007-f92c2c32cbe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBmb29kJTIwcmVjaXBlfGVufDF8fHx8MTc2NTA4MTc1OXww&ixlib=rb-4.1.0&q=80&w=1080",
      author: "한식요리",
      likes: 412,
      comments: 45,
    },
    {
      id: 5,
      title: "크리미 파스타",
      description: "까르보나라 스타일의 크리미한 파스타",
      cookTime: "20분",
      rating: 4.9,
      imageUrl: "https://images.unsplash.com/photo-1611270629569-8b357cb88da9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpc2h8ZW58MXx8fHwxNzY0OTc5NjQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      author: "이탈리안쉐프",
      likes: 678,
      comments: 89,
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            color={star <= rating ? "#facc15" : "#e5e7eb"} // yellow-400 : gray-200
            fill={star <= rating ? "#facc15" : "#e5e7eb"}
          />
        ))}
      </View>
    );
  };

  const toggleBookmark = (recipeId: number) => {
    setBookmarkedRecipes((prev) =>
      prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>최근 업데이트</Text>
        <TouchableOpacity onPress={onViewAllClick}>
             <Text style={styles.headerMore}>더보기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        {recipes.map((recipe) => (
          <TouchableOpacity
            key={recipe.id}
            activeOpacity={0.7}
            onPress={() => onRecipeClick?.(recipe.id)}
            style={styles.card}
          >
            <View style={styles.cardInner}>
              {/* 좌측 이미지 */}
              <Image source={{ uri: recipe.imageUrl }} style={styles.image} />

              {/* 중앙 정보 */}
              <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>{recipe.title}</Text>
                <Text style={styles.description} numberOfLines={1}>{recipe.description}</Text>
                
                <View style={styles.meta}>
                  {renderStars(recipe.rating)}
                  <Text style={styles.ratingText}>{recipe.rating.toFixed(1)}</Text>
                  <View style={styles.timeContainer}>
                    <Clock size={14} color="#4b5563" />
                    <Text style={styles.timeText}>{recipe.cookTime}</Text>
                  </View>
                </View>
              </View>

              {/* 우측 액션 */}
              <View style={styles.actions}>
                <TouchableOpacity
                    onPress={(e) => {
                         // stopPropagation not really needed in RN unless nested touchables
                         toggleBookmark(recipe.id);
                    }}
                >
                    <Bookmark 
                        size={16} 
                        color={bookmarkedRecipes.includes(recipe.id) ? "#facc15" : "#9ca3af"} 
                        fill={bookmarkedRecipes.includes(recipe.id) ? "#facc15" : "none"} 
                    />
                </TouchableOpacity>
                <View style={styles.stats}>
                  <View style={styles.statItem}>
                     <Heart size={16} color="#6b7280" />
                     <Text style={styles.statText}>{recipe.likes}</Text>
                  </View>
                  <View style={styles.statItem}>
                      <MessageCircle size={16} color="#6b7280" />
                      <Text style={styles.statText}>{recipe.comments}</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    paddingBottom: 96, // pb-24
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937', // gray-800
  },
  headerMore: {
    fontSize: 14,
    color: '#6b7280', // gray-500
  },
  list: {
    gap: 12,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb', // gray-200
    padding: 12,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardInner: {
    flexDirection: 'row',
    gap: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#6b7280', // gray-500
    marginBottom: 8,
  },
  meta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
  },
  starsContainer: {
      flexDirection: 'row',
      gap: 2,
  },
  ratingText: {
      fontSize: 12,
      fontWeight: '500',
      color: '#d97706', // yellow-600
  },
  timeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
  },
  timeText: {
      fontSize: 12,
      color: '#4b5563',
  },
  actions: {
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      paddingVertical: 4,
  },
  stats: {
      gap: 4,
  },
  statItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
  },
  statText: {
      fontSize: 12,
      color: '#6b7280',
  }
});
