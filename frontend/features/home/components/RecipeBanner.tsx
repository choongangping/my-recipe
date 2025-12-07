import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions, FlatList } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

interface RecipeBannerProps {
  onRecipeClick?: (recipeId: number) => void;
}

interface BannerRecipe {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function RecipeBanner({ onRecipeClick }: RecipeBannerProps) {
  const bannerRecipes: BannerRecipe[] = [
    {
      id: 1,
      title: "한식 특선 요리",
      description: "전통의 맛을 집에서 즐겨보세요",
      imageUrl: "https://images.unsplash.com/photo-1626803774007-f92c2c32cbe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBmb29kJTIwcmVjaXBlfGVufDF8fHx8MTc2NTA4MTc1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 2,
      title: "크리미 파스타",
      description: "집에서 만드는 레스토랑 파스타",
      imageUrl: "https://images.unsplash.com/photo-1611270629569-8b357cb88da9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpc2h8ZW58MXx8fHwxNzY0OTc5NjQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 3,
      title: "건강 샐러드",
      description: "신선하고 건강한 한 끼",
      imageUrl: "https://images.unsplash.com/photo-1649531794884-b8bb1de72e68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxhZCUyMGJvd2wlMjBoZWFsdGh5fGVufDF8fHx8MTc2NDk5ODk3NXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % bannerRecipes.length;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex, bannerRecipes.length]);

  const handlePrev = () => {
    const nextIndex = (currentIndex - 1 + bannerRecipes.length) % bannerRecipes.length;
    setCurrentIndex(nextIndex);
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % bannerRecipes.length;
    setCurrentIndex(nextIndex);
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
  };
  
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
      if (viewableItems.length > 0) {
          setCurrentIndex(viewableItems[0].index || 0);
      }
  }).current;

  return (
    <View style={styles.container}>
      {/* 섹션 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>인기레시피</Text>
        <TouchableOpacity>
           <Text style={styles.headerMore}>더보기</Text>
        </TouchableOpacity>
      </View>

      {/* 배너 슬라이드 */}
      <View style={styles.bannerContainer}>
        <FlatList
            ref={flatListRef}
            data={bannerRecipes}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            renderItem={({ item }) => (
                <TouchableOpacity 
                    activeOpacity={0.9}
                    onPress={() => onRecipeClick?.(item.id)}
                    style={styles.slide}
                >
                    <Image source={{ uri: item.imageUrl }} style={styles.image} />
                    <View style={styles.overlay}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                        <View style={styles.overlayGradient} />
                    </View>
                </TouchableOpacity>
            )}
        />

        {/* 네비게이션 버튼 (Optional for touch, but good for accessibility) */}
        <TouchableOpacity onPress={handlePrev} style={[styles.navButton, styles.leftNav]}>
          <ChevronLeft color="#333" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={[styles.navButton, styles.rightNav]}>
          <ChevronRight color="#333" size={24} />
        </TouchableOpacity>

        {/* 인디케이터 */}
        <View style={styles.indicatorContainer}>
          {bannerRecipes.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === currentIndex ? styles.indicatorActive : styles.indicatorInactive
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937', // gray-800
  },
  headerMore: {
    fontSize: 14,
    color: '#6b7280', // gray-500
  },
  bannerContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    height: 240,
  },
  slide: {
    width: SCREEN_WIDTH - 32, // Parent padding is 16*2
    height: 240,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    justifyContent: 'flex-end',
    zIndex: 10,
  },
  title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 4,
      zIndex: 20,
  },
  description: {
      fontSize: 14,
      color: 'rgba(255, 255, 255, 0.9)',
      zIndex: 20,
  },
  overlayGradient: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.3)',
      top: '50%', // Gradient only on bottom half roughly
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    marginTop: -18,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 6,
    zIndex: 20,
  },
  leftNav: {
    left: 16,
  },
  rightNav: {
    right: 16,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    zIndex: 20,
  },
  indicator: {
    height: 8,
    borderRadius: 4,
  },
  indicatorActive: {
    width: 24,
    backgroundColor: 'white',
  },
  indicatorInactive: {
    width: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});
