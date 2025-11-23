import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  ChefHat,
  Refrigerator,
  Calendar,
  Plus,
  Book,
  ShoppingCart,
  Search,
} from "lucide-react-native";
import { useRouter } from "expo-router";

/* ----------------
   Mock Data
------------------*/
const bannerRecipes = [
  {
    id: 1,
    title: "한국식 비빔밥",
    description: "건강하고 맛있는 한식",
    time: "30분",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1590301157890-48cbab697f0e?q=80&w=1080",
  },
  {
    id: 2,
    title: "이탈리안 파스타",
    description: "크리미한 파스타 요리",
    time: "25분",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=1080",
  },
];

const recommendedRecipes = [
  {
    id: 1,
    title: "닭가슴살 샐러드",
    description: "다이어트용 고단백 샐러드",
    time: "15분",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1080",
  },
  {
    id: 2,
    title: "토마토 계란볶음",
    description: "간단한 한 끼 식사",
    time: "10분",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1080",
  },
];

const popularRecipes = [
  { id: 1, title: "치즈 김치볶음밥", time: "20분" },
  { id: 2, title: "간장계란밥", time: "5분" },
  { id: 3, title: "크림카레우동", time: "25분" },
];

const categories = ["전체", "한식", "양식", "중식", "일식", "다이어트"];

/* ----------------
   Main Screen
------------------*/
export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.helloText}>오늘 뭐 먹을까?</Text>
            <Text style={styles.userText}>준님의 냉장고를 분석했어요</Text>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconCircle}
            onPress={() => router.push("/myrefriger")}>
              <Refrigerator size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCircle}>
              <ChefHat size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <TouchableOpacity style={styles.searchBar}>
          <Search size={18} />
          <Text style={styles.searchPlaceholder}>
            레시피, 재료를 검색해보세요
          </Text>
        </TouchableOpacity>

        {/* Banner Carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.bannerScroll}
        >
          {bannerRecipes.map((item) => (
            <View key={item.id} style={styles.bannerCard}>
              <Image
                source={{ uri: item.image }}
                style={styles.bannerImage}
                resizeMode="cover"
              />

              <View style={styles.bannerOverlay}>
                <Text style={styles.bannerTitle}>{item.title}</Text>
                <Text style={styles.bannerDesc}>{item.description}</Text>
                <Text style={styles.bannerMeta}>
                  {item.time} · ⭐ {item.rating}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Category Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
        >
          {categories.map((c, index) => {
            const active = index === 0;
            return (
              <TouchableOpacity
                key={c}
                style={[
                  styles.categoryChip,
                  active && styles.categoryChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    active && styles.categoryTextActive,
                  ]}
                >
                  {c}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Today's Recommendations */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>오늘의 추천 레시피</Text>
          <TouchableOpacity>
            <Text style={styles.sectionMore}>전체 보기</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recommendList}>
          {recommendedRecipes.map((item) => (
            <TouchableOpacity key={item.id} style={styles.recommendCard}>
              <Image
                source={{ uri: item.image }}
                style={styles.recommendImage}
                resizeMode="cover"
              />
              <View style={styles.recommendInfo}>
                <Text style={styles.recommendTitle}>{item.title}</Text>
                <Text style={styles.recommendDesc}>{item.description}</Text>
                <Text style={styles.recommendMeta}>{item.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular Recipes */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>인기 레시피</Text>
        </View>

        <View style={styles.popularList}>
          {popularRecipes.map((item) => (
            <TouchableOpacity key={item.id} style={styles.popularItem}>
              <View>
                <Text style={styles.popularTitle}>{item.title}</Text>
                <Text style={styles.popularMeta}>{item.time}</Text>
              </View>
              <ChefHat size={20} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Buttons */}
        <View style={styles.quickRow}>
          <QuickButton
            color="#ef4444"
            bg="#fee2e2"
            icon={Book}
            label="레시피북"
          />

          <QuickButton
            color="#7c3aed"
            bg="#ede9fe"
            icon={Calendar}
            label="식단표"
          />

          <QuickButton
            color="#f97316"
            bg="#ffedd5"
            icon={ShoppingCart}
            label="장보기"
          />

          <QuickButton color="#16a34a" bg="#dcfce7" icon={Plus} label="새 레시피" />
        </View>
      </ScrollView>
    </View>
  );
}

/* ----------------
   Quick Button Component
------------------*/
function QuickButton({ color, bg, icon: Icon, label }) {
  return (
    <TouchableOpacity style={styles.quickButton}>
      <View style={[styles.quickIconBox, { backgroundColor: bg }]}>
        <Icon size={22} color={color} />
      </View>
      <Text style={styles.quickText}>{label}</Text>
    </TouchableOpacity>
  );
}

/* ----------------
   Styles
------------------*/
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  helloText: {
    fontSize: 18,
    fontWeight: "600",
  },
  userText: {
    marginTop: 4,
    fontSize: 13,
    color: "#6b7280",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 8,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#f3f4f6",
    marginBottom: 16,
  },
  searchPlaceholder: {
    fontSize: 13,
    color: "#9ca3af",
  },
  bannerScroll: {
    paddingVertical: 8,
  },
  bannerCard: {
    width: 280,
    height: 160,
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 12,
    backgroundColor: "#000",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  bannerOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  bannerTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  bannerDesc: {
    color: "#e5e7eb",
    fontSize: 12,
    marginTop: 4,
  },
  bannerMeta: {
    color: "#e5e7eb",
    fontSize: 11,
    marginTop: 4,
  },
  categoryRow: {
    paddingVertical: 12,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },
  categoryText: {
    fontSize: 13,
    color: "#6b7280",
  },
  categoryTextActive: {
    color: "#ffffff",
  },
  sectionHeader: {
    marginTop: 8,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  sectionMore: {
    fontSize: 12,
    color: "#6b7280",
  },
  recommendList: {
    gap: 12,
  },
  recommendCard: {
    flexDirection: "row",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f9fafb",
  },
  recommendImage: {
    width: 110,
    height: 90,
  },
  recommendInfo: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: "space-between",
  },
  recommendTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  recommendDesc: {
    fontSize: 12,
    color: "#6b7280",
  },
  recommendMeta: {
    fontSize: 11,
    color: "#9ca3af",
  },
  popularList: {
    marginTop: 4,
    gap: 10,
  },
  popularItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  popularTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  popularMeta: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 2,
  },
  quickRow: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickButton: {
    flex: 1,
    alignItems: "center",
  },
  quickIconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  quickText: {
    fontSize: 12,
    color: "#4b5563",
  },
});
