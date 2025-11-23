import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Plus,
  Minus,
  RefreshCw,
  Camera,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react-native";

/* ----------------
   Types & Mock Data
------------------*/

type Ingredient = {
  name: string;
  quantity: string;
  expiryDate: string | null; // "2025.09.19" 또는 null
};

type Recipe = {
  id: number;
  name: string;
};

const ingredients: Ingredient[] = [
  { name: "당근", quantity: "3개", expiryDate: null },
  { name: "사과", quantity: "500g", expiryDate: null },
  { name: "낫또", quantity: "2팩", expiryDate: "2025.09.19" },
  { name: "양파", quantity: "1개", expiryDate: "2025.09.15" },
  { name: "바나나", quantity: "5개", expiryDate: null },
  { name: "우유", quantity: "1L", expiryDate: "2025.09.12" },
];

const recommendedRecipes: Recipe[] = [
  { id: 1, name: "우유로 만드는 프렌치토스트" },
  { id: 2, name: "당근 라페 샐러드" },
  { id: 3, name: "양파 스테이크 소스" },
  { id: 4, name: "바나나 팬케이크" },
];

/* ----------------
   Helper Logic
------------------*/

type ExpiryStatus = "none" | "fresh" | "expiring" | "expired";

const today = new Date("2025-09-12");

function getExpiryStatus(expiryDate: string | null): ExpiryStatus {
  if (!expiryDate) return "none";

  const normalized = expiryDate.replace(/\./g, "-"); // "2025.09.19" → "2025-09-19"
  const expiry = new Date(normalized);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "expired";
  if (diffDays <= 3) return "expiring";
  return "fresh";
}

const totalCount = ingredients.length;
const expiringCount = ingredients.filter(
  (i) => getExpiryStatus(i.expiryDate) === "expiring"
).length;
const expiredCount = ingredients.filter(
  (i) => getExpiryStatus(i.expiryDate) === "expired"
).length;

/* ----------------
   Sub Components
------------------*/

type StatCardProps = {
  label: string;
  value: number;
};

function StatCard({ label, value }: StatCardProps) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

type StatusBadgeProps = {
  status: ExpiryStatus;
  expiryDate: string | null;
};

function StatusBadge({ status, expiryDate }: StatusBadgeProps) {
  if (status === "none") {
    return (
      <View style={[styles.badge, styles.badgeNone]}>
        <Text style={styles.badgeNoneText}>유통기한 없음</Text>
      </View>
    );
  }

  if (status === "expired") {
    return (
      <View style={[styles.badge, styles.badgeExpired]}>
        <AlertTriangle size={14} color="#b91c1c" />
        <Text style={styles.badgeExpiredText}>
          만료됨 {expiryDate ?? ""}
        </Text>
      </View>
    );
  }

  if (status === "expiring") {
    return (
      <View style={[styles.badge, styles.badgeExpiring]}>
        <AlertTriangle size={14} color="#92400e" />
        <Text style={styles.badgeExpiringText}>
          곧 만료 {expiryDate ?? ""}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.badge, styles.badgeFresh]}>
      <CheckCircle2 size={14} color="#15803d" />
      <Text style={styles.badgeFreshText}>
        신선 {expiryDate ?? ""}
      </Text>
    </View>
  );
}

/* ----------------
   Main Screen
------------------*/

export default function MyrefrigerScreen() {
  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* 상단 타이틀 & 새로고침 */}
        <View style={styles.topRow}>
          <Text style={styles.title}>나의 냉장고</Text>
          <TouchableOpacity style={styles.refreshButton}>
            <RefreshCw size={18} color="#4b5563" />
          </TouchableOpacity>
        </View>

        {/* 통계 카드 3개 */}
        <View style={styles.statRow}>
          <StatCard label="전체" value={totalCount} />
          <StatCard label="곧 만료" value={expiringCount} />
          <StatCard label="만료" value={expiredCount} />
        </View>

        {/* 냉장고 + 버튼 영역 */}
        <View style={styles.fridgeArea}>
          {/* 왼쪽: 냉장고 박스 */}
          <View style={styles.fridgeBox}>
            <View style={styles.fridgeDoorTop} />
            <View style={styles.fridgeDoorBottom} />
            <View style={styles.fridgeHandleTop} />
            <View style={styles.fridgeHandleBottom} />
            <Text style={styles.fridgeLabel}>냉장고 내부</Text>
          </View>

          {/* 오른쪽: + / - / 카메라 버튼 */}
          <View style={styles.fridgeActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Minus size={18} color="#111827" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Plus size={18} color="#111827" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Camera size={18} color="#111827" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 식재료 목록 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>식재료 목록</Text>

          <View style={styles.ingredientList}>
            {ingredients.map((item) => {
              const status = getExpiryStatus(item.expiryDate);

              return (
                <View key={item.name} style={styles.ingredientRow}>
                  <View style={styles.ingredientMain}>
                    <View style={styles.ingredientDot} />
                    <View>
                      <Text style={styles.ingredientName}>{item.name}</Text>
                      <Text style={styles.ingredientQuantity}>
                        {item.quantity}
                      </Text>
                    </View>
                  </View>

                  <StatusBadge
                    status={status}
                    expiryDate={item.expiryDate}
                  />
                </View>
              );
            })}
          </View>
        </View>

        {/* 추천 레시피 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>이 식재료로 만들 수 있는 레시피</Text>
          <View style={styles.recipeGrid}>
            {recommendedRecipes.map((recipe) => (
              <View key={recipe.id} style={styles.recipeCard}>
                <View style={styles.recipeThumb}>
                  <Text style={styles.recipeEmoji}>🍽️</Text>
                </View>
                <Text style={styles.recipeName}>{recipe.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

/* ----------------
   Styles
------------------*/

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#111827",
  },
  refreshButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  statLabel: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 4,
    fontWeight: "500",
  },
  statValue: {
    fontSize: 20,
    color: "#111827",
    fontWeight: "600",
  },
  fridgeArea: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 16,
    alignItems: "center",
  },
  fridgeBox: {
    flex: 1,
    aspectRatio: 3 / 4,
    borderRadius: 16,
    backgroundColor: "#e5e7eb",
    position: "relative",
    padding: 12,
    overflow: "hidden",
  },
  fridgeDoorTop: {
    flex: 1,
    backgroundColor: "#f9fafb",
    borderRadius: 10,
    marginBottom: 4,
  },
  fridgeDoorBottom: {
    flex: 1.1,
    backgroundColor: "#f9fafb",
    borderRadius: 10,
    marginTop: 4,
  },
  fridgeHandleTop: {
    position: "absolute",
    right: 6,
    top: "20%",
    width: 4,
    height: 40,
    borderRadius: 999,
    backgroundColor: "#d1d5db",
  },
  fridgeHandleBottom: {
    position: "absolute",
    right: 6,
    bottom: "20%",
    width: 4,
    height: 40,
    borderRadius: 999,
    backgroundColor: "#d1d5db",
  },
  fridgeLabel: {
    position: "absolute",
    bottom: 10,
    left: 12,
    fontSize: 12,
    color: "#6b7280",
  },
  fridgeActions: {
    width: 48,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    marginTop: 4,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 10,
  },
  ingredientList: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  ingredientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  ingredientMain: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ingredientDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#9ca3af",
  },
  ingredientName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
  ingredientQuantity: {
    fontSize: 12,
    color: "#6b7280",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    gap: 4,
  },
  badgeNone: {
    backgroundColor: "#f3f4f6",
  },
  badgeNoneText: {
    fontSize: 11,
    color: "#6b7280",
  },
  badgeExpired: {
    backgroundColor: "#fee2e2",
  },
  badgeExpiredText: {
    fontSize: 11,
    color: "#b91c1c",
    fontWeight: "500",
  },
  badgeExpiring: {
    backgroundColor: "#fef3c7",
  },
  badgeExpiringText: {
    fontSize: 11,
    color: "#92400e",
    fontWeight: "500",
  },
  badgeFresh: {
    backgroundColor: "#dcfce7",
  },
  badgeFreshText: {
    fontSize: 11,
    color: "#15803d",
    fontWeight: "500",
  },
  recipeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  recipeCard: {
    width: "47%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  recipeThumb: {
    width: "100%",
    aspectRatio: 4 / 3,
    borderRadius: 10,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  recipeEmoji: {
    fontSize: 24,
  },
  recipeName: {
    fontSize: 13,
    color: "#111827",
  },
});
