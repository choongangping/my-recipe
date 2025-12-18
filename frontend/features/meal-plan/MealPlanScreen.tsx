import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Modal,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight, Plus, X, Utensils, Pencil, Trash2 } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

/** =========================
 *  타입 정의
 *  ========================= */
type MealSlot = 'breakfast' | 'lunch' | 'dinner' | 'snack';

type MealItem =
  | {
      type: 'text';
      id: string;
      text: string;
    }
  | {
      type: 'recipe';
      id: string;
      recipeId: number;
      title: string;
      imageUrl?: string;
      cookTime?: string;
    };

interface DayMealData {
  breakfast: MealItem[];
  lunch: MealItem[];
  dinner: MealItem[];
  snack: MealItem[];
}

interface MealPlanScreenProps {
  onBack?: () => void;
  /** 레시피 카드 클릭 시 상세로 이동 */
  onOpenRecipe?: (recipeId: number) => void;
}

/** =========================
 *  레시피 더미 데이터 (나중에 API로 교체)
 *  ========================= */
const recipeCatalog = [
  {
    recipeId: 101,
    title: '계란말이',
    cookTime: '15분',
    imageUrl: 'https://images.unsplash.com/photo-1607457750542-d7cded66e5bc?w=400',
  },
  {
    recipeId: 102,
    title: '김치찌개',
    cookTime: '25분',
    imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc500f?w=400',
  },
  {
    recipeId: 103,
    title: '파스타',
    cookTime: '20분',
    imageUrl: 'https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?w=400',
  },
  {
    recipeId: 104,
    title: '샐러드',
    cookTime: '10분',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
  },
];

const makeEmptyDay = (): DayMealData => ({
  breakfast: [],
  lunch: [],
  dinner: [],
  snack: [],
});

const slotLabel: Record<MealSlot, string> = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
  snack: '간식',
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CALENDAR_PADDING = 32; // 16 * 2
const CELL_GAP = 4;
const CELL_SIZE = (SCREEN_WIDTH - CALENDAR_PADDING - CELL_GAP * 6) / 7;

export function MealPlanScreen({ onBack, onOpenRecipe }: MealPlanScreenProps) {
  /** =========================
   *  달력/선택 상태
   *  ========================= */
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  /** =========================
   *  식단 데이터 (key: YYYY-MM-DD)
   *  ========================= */
  const [mealData, setMealData] = useState<Record<string, DayMealData>>({
    '2025-12-01': {
      breakfast: [
        { type: 'text', id: 't-1', text: '토스트, 우유, 계란프라이' },
        { type: 'recipe', id: 'r-1', recipeId: 101, title: '계란말이', cookTime: '15분', imageUrl: recipeCatalog[0].imageUrl },
      ],
      lunch: [{ type: 'text', id: 't-2', text: '김치찌개, 공기밥, 깍두기' }],
      dinner: [{ type: 'text', id: 't-3', text: '삼겹살구이, 상추쌈, 된장찌개' }],
      snack: [{ type: 'text', id: 't-4', text: '사탕, 초콜릿' }],
    },
    '2025-12-10': {
      breakfast: [{ type: 'text', id: 't-5', text: '샌드위치, 오렌지주스' }],
      lunch: [{ type: 'recipe', id: 'r-2', recipeId: 102, title: '김치찌개', cookTime: '25분', imageUrl: recipeCatalog[1].imageUrl }],
      dinner: [{ type: 'text', id: 't-6', text: '치킨, 피클, 콜라' }],
      snack: [{ type: 'text', id: 't-7', text: '과자, 사탕' }],
    },
  });

  /** =========================
   *  모달 상태: 직접 입력 / 레시피 연결
   *  ========================= */
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addMode, setAddMode] = useState<'text' | 'recipe'>('text');
  const [targetSlot, setTargetSlot] = useState<MealSlot>('breakfast');

  // 직접 입력용
  const [textDraft, setTextDraft] = useState('');

  // 레시피 선택용
  const [recipeQuery, setRecipeQuery] = useState('');

  // 텍스트 아이템 수정용
  const [editTextModalVisible, setEditTextModalVisible] = useState(false);
  const [editing, setEditing] = useState<{ slot: MealSlot; itemId: string } | null>(null);
  const [editDraft, setEditDraft] = useState('');

  /** =========================
   *  달력 계산
   *  ========================= */
  const getMonthInfo = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return { firstDay, lastDay, year, month };
  };

  const { firstDay, lastDay, year, month } = getMonthInfo();

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
  };

  const generateCalendarDays = () => {
    const days: Array<number | null> = [];
    const startDay = firstDay.getDay(); // 0~6
    for (let i = 0; i < startDay; i++) days.push(null);
    for (let i = 1; i <= lastDay.getDate(); i++) days.push(i);
    return days;
  };

  const calendarDays = generateCalendarDays();

  /** YYYY-MM-DD 키 생성 */
  const getDateKey = (day: number) => {
    const y = currentDate.getFullYear();
    const m = String(currentDate.getMonth() + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  /** 선택한 날짜의 식단 가져오기(없으면 null) */
  const selectedKey = selectedDate !== null ? getDateKey(selectedDate) : null;
  const selectedDayMeal: DayMealData | null = selectedKey ? mealData[selectedKey] ?? null : null;

  /** 요약(달력 칸에 표시) */
  const getMealSummary = (day: number) => {
    const dateKey = getDateKey(day);
    const d = mealData[dateKey];
    if (!d) return '';

    const pickTitle = (item: MealItem) => {
      if (item.type === 'recipe') return item.title;
      return item.text.split(',')[0]?.trim() ?? item.text;
    };

    const parts: string[] = [];
    if (d.breakfast[0]) parts.push(pickTitle(d.breakfast[0]));
    if (d.lunch[0]) parts.push(pickTitle(d.lunch[0]));
    return parts.join('\n');
  };

  /** =========================
   *  핸들러: 날짜 선택
   *  ========================= */
  const handleDateClick = (day: number) => {
    setSelectedDate(day);
  };

  /** =========================
   *  공통: 해당 날짜 데이터 확보(없으면 생성)
   *  ========================= */
  const ensureDayData = (dateKey: string) => {
    setMealData((prev) => {
      if (prev[dateKey]) return prev;
      return { ...prev, [dateKey]: makeEmptyDay() };
    });
  };

  /** =========================
   *  추가 모달 열기
   *  ========================= */
  const openAddModal = (slot: MealSlot, mode: 'text' | 'recipe') => {
    if (!selectedKey) return;

    setTargetSlot(slot);
    setAddMode(mode);
    setTextDraft('');
    setRecipeQuery('');
    ensureDayData(selectedKey);
    setAddModalVisible(true);
  };

  /** =========================
   *  직접 입력 추가
   *  ========================= */
  const addTextItem = () => {
    if (!selectedKey) return;
    if (!textDraft.trim()) {
      Alert.alert('알림', '내용을 입력해주세요.');
      return;
    }

    const newItem: MealItem = {
      type: 'text',
      id: `t-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      text: textDraft.trim(),
    };

    setMealData((prev) => {
      const day = prev[selectedKey] ?? makeEmptyDay();
      return {
        ...prev,
        [selectedKey]: {
          ...day,
          [targetSlot]: [...day[targetSlot], newItem],
        },
      };
    });

    setAddModalVisible(false);
  };

  /** =========================
   *  레시피 연결 추가
   *  ========================= */
  const addRecipeItem = (recipe: (typeof recipeCatalog)[number]) => {
    if (!selectedKey) return;

    const newItem: MealItem = {
      type: 'recipe',
      id: `r-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      recipeId: recipe.recipeId,
      title: recipe.title,
      cookTime: recipe.cookTime,
      imageUrl: recipe.imageUrl,
    };

    setMealData((prev) => {
      const day = prev[selectedKey] ?? makeEmptyDay();
      return {
        ...prev,
        [selectedKey]: {
          ...day,
          [targetSlot]: [...day[targetSlot], newItem],
        },
      };
    });

    setAddModalVisible(false);
  };

  /** =========================
   *  아이템 삭제
   *  ========================= */
  const deleteItem = (slot: MealSlot, itemId: string) => {
    if (!selectedKey) return;

    Alert.alert('삭제', '이 항목을 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => {
          setMealData((prev) => {
            const day = prev[selectedKey];
            if (!day) return prev;

            return {
              ...prev,
              [selectedKey]: {
                ...day,
                [slot]: day[slot].filter((x) => x.id !== itemId),
              },
            };
          });
        },
      },
    ]);
  };

  /** =========================
   *  텍스트 아이템 수정
   *  ========================= */
  const openEditText = (slot: MealSlot, itemId: string, currentText: string) => {
    setEditing({ slot, itemId });
    setEditDraft(currentText);
    setEditTextModalVisible(true);
  };

  const saveEditText = () => {
    if (!selectedKey || !editing) return;
    if (!editDraft.trim()) {
      Alert.alert('알림', '내용을 입력해주세요.');
      return;
    }

    setMealData((prev) => {
      const day = prev[selectedKey];
      if (!day) return prev;

      const { slot, itemId } = editing;
      const updated = day[slot].map((it) => {
        if (it.id !== itemId) return it;
        if (it.type !== 'text') return it;
        return { ...it, text: editDraft.trim() };
      });

      return {
        ...prev,
        [selectedKey]: { ...day, [slot]: updated },
      };
    });

    setEditTextModalVisible(false);
    setEditing(null);
    setEditDraft('');
  };

  /** =========================
   *  날짜 전체 삭제
   *  ========================= */
  const deleteDayMeals = () => {
    if (!selectedKey) return;

    Alert.alert('식단 삭제', '이 날짜의 식단을 모두 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => {
          setMealData((prev) => {
            const next = { ...prev };
            delete next[selectedKey];
            return next;
          });
        },
      },
    ]);
  };

  /** =========================
   *  레시피 검색 필터
   *  ========================= */
  const filteredRecipes = useMemo(() => {
    const q = recipeQuery.trim().toLowerCase();
    if (!q) return recipeCatalog;
    return recipeCatalog.filter((r) => r.title.toLowerCase().includes(q));
  }, [recipeQuery]);

  /** =========================
   *  카드 렌더: MealItem
   *  ========================= */
  const renderItemCard = (slot: MealSlot, item: MealItem) => {
    if (item.type === 'recipe') {
      return (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          activeOpacity={0.85}
          onPress={() => onOpenRecipe?.(item.recipeId)}
        >
          <View style={styles.cardLeft}>
            {item.imageUrl ? (
              <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
            ) : (
              <View style={[styles.cardImage, styles.cardImageFallback]}>
                <Utensils size={18} color="#6b7280" />
              </View>
            )}
            <View style={styles.cardInfo}>
              <View style={styles.badgeRow}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>레시피</Text>
                </View>
                {item.cookTime ? <Text style={styles.metaText}>{item.cookTime}</Text> : null}
              </View>
              <Text style={styles.cardTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.cardHint} numberOfLines={1}>
                탭하면 레시피 상세로 이동
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => deleteItem(slot, item.id)}
            style={styles.cardAction}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Trash2 size={18} color="#9ca3af" />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    }

    // text item
    return (
      <View key={item.id} style={[styles.card, styles.cardText]}>
        <View style={styles.cardLeft}>
          <View style={styles.textIconBox}>
            <Text style={styles.textIcon}>Aa</Text>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {item.text}
            </Text>
          </View>
        </View>

        <View style={styles.cardActionsRow}>
          <TouchableOpacity
            onPress={() => openEditText(slot, item.id, item.text)}
            style={styles.cardAction}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Pencil size={18} color="#9ca3af" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteItem(slot, item.id)}
            style={styles.cardAction}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Trash2 size={18} color="#9ca3af" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  /** =========================
   *  섹션 렌더: 아침/점심/저녁/간식
   *  ========================= */
  const renderMealSection = (slot: MealSlot, day: DayMealData) => {
    const items = day[slot];

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{slotLabel[slot]}</Text>

          <View style={styles.sectionButtons}>
            <TouchableOpacity
              style={[styles.smallBtn, styles.smallBtnSecondary]}
              onPress={() => openAddModal(slot, 'text')}
            >
              <Plus size={16} color="#374151" />
              <Text style={styles.smallBtnText}>직접 입력</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.smallBtn} onPress={() => openAddModal(slot, 'recipe')}>
              <Plus size={16} color="#fff" />
              <Text style={[styles.smallBtnText, styles.textWhite]}>레시피 연결</Text>
            </TouchableOpacity>
          </View>
        </View>

        {items.length === 0 ? (
          <View style={styles.sectionEmpty}>
            <Text style={styles.sectionEmptyText}>아직 등록된 항목이 없어요</Text>
          </View>
        ) : (
          <View style={styles.cardList}>{items.map((it) => renderItemCard(slot, it))}</View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* 헤더 */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {onBack && (
            <TouchableOpacity onPress={onBack} style={styles.iconButton}>
              <ChevronLeft size={24} color="#374151" />
            </TouchableOpacity>
          )}
          <Text style={styles.headerTitle}>식단표</Text>
        </View>

        <View style={styles.monthSelector}>
          <TouchableOpacity onPress={goToPrevMonth} style={styles.iconButton}>
            <ChevronLeft size={20} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.monthText}>
            {year}년 {month + 1}월
          </Text>
          <TouchableOpacity onPress={goToNextMonth} style={styles.iconButton}>
            <ChevronRight size={20} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 캘린더 */}
        <View style={styles.calendarContainer}>
          <View style={styles.weekHeader}>
            {['일', '월', '화', '수', '목', '금', '토'].map((d, idx) => (
              <Text
                key={d}
                style={[
                  styles.weekDayText,
                  idx === 0 ? styles.textRed : idx === 6 ? styles.textBlue : styles.textGray,
                ]}
              >
                {d}
              </Text>
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {calendarDays.map((day, index) => {
              if (day === null) return <View key={`empty-${index}`} style={styles.dayCell} />;

              const dateKey = getDateKey(day);
              const hasMeal = !!mealData[dateKey];
              const summary = getMealSummary(day);
              const isSelected = selectedDate === day;

              return (
                <TouchableOpacity
                  key={`${dateKey}`}
                  onPress={() => handleDateClick(day)}
                  style={[
                    styles.dayCell,
                    isSelected ? styles.dayCellSelected : hasMeal ? styles.dayCellHasMeal : null,
                  ]}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.dayText,
                      isSelected
                        ? styles.textWhite
                        : index % 7 === 0
                        ? styles.textRed
                        : index % 7 === 6
                        ? styles.textBlue
                        : styles.textGray,
                    ]}
                  >
                    {day}
                  </Text>

                  {hasMeal && (
                    <Text
                      style={[styles.daySummary, isSelected ? styles.textGray200 : styles.textGray500]}
                      numberOfLines={2}
                    >
                      {summary}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 선택 날짜 상세 */}
        {selectedDate !== null && (
          <View style={styles.detailContainer}>
            <View style={styles.detailHeader}>
              <Text style={styles.detailTitle}>
                {month + 1}월 {selectedDate}일 식단
              </Text>

              <TouchableOpacity onPress={deleteDayMeals} style={styles.deleteDayBtn}>
                <Trash2 size={18} color="#ef4444" />
                <Text style={styles.deleteDayText}>전체삭제</Text>
              </TouchableOpacity>
            </View>

            {selectedDayMeal ? (
              <View style={{ gap: 16 }}>
                {renderMealSection('breakfast', selectedDayMeal)}
                {renderMealSection('lunch', selectedDayMeal)}
                {renderMealSection('dinner', selectedDayMeal)}
                {renderMealSection('snack', selectedDayMeal)}
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.sectionEmptyText}>아직 이 날짜에 식단이 없어요</Text>
                <Button
                  onPress={() => {
                    if (!selectedKey) return;
                    ensureDayData(selectedKey);
                  }}
                  style={{ marginTop: 12 }}
                >
                  식단 만들기
                </Button>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* =========================
          추가 모달 (직접 입력 / 레시피 연결)
         ========================= */}
      <Modal visible={addModalVisible} transparent animationType="fade" onRequestClose={() => setAddModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {slotLabel[targetSlot]} {addMode === 'text' ? '직접 입력' : '레시피 연결'}
              </Text>
              <TouchableOpacity onPress={() => setAddModalVisible(false)}>
                <X size={22} color="#4b5563" />
              </TouchableOpacity>
            </View>

            {addMode === 'text' ? (
              <View style={{ gap: 12 }}>
                <Input
                  label="내용"
                  placeholder="예: 토스트, 우유"
                  value={textDraft}
                  onChangeText={setTextDraft}
                />
                <View style={styles.modalBtnRow}>
                  <Button variant="secondary" style={styles.flex1} onPress={() => setAddModalVisible(false)}>
                    취소
                  </Button>
                  <Button style={styles.flex1} onPress={addTextItem}>
                    추가
                  </Button>
                </View>
              </View>
            ) : (
              <View style={{ gap: 12 }}>
                <Input label="레시피 검색" placeholder="레시피 제목 검색" value={recipeQuery} onChangeText={setRecipeQuery} />

                <FlatList
                  data={filteredRecipes}
                  keyExtractor={(item) => String(item.recipeId)}
                  style={{ maxHeight: 320 }}
                  contentContainerStyle={{ gap: 10, paddingVertical: 4 }}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.recipePickCard} activeOpacity={0.85} onPress={() => addRecipeItem(item)}>
                      {item.imageUrl ? (
                        <Image source={{ uri: item.imageUrl }} style={styles.recipePickImage} />
                      ) : (
                        <View style={[styles.recipePickImage, styles.cardImageFallback]}>
                          <Utensils size={18} color="#6b7280" />
                        </View>
                      )}
                      <View style={{ flex: 1 }}>
                        <Text style={styles.recipePickTitle} numberOfLines={1}>
                          {item.title}
                        </Text>
                        <Text style={styles.recipePickMeta}>{item.cookTime ?? ''}</Text>
                      </View>
                      <View style={styles.recipePickAdd}>
                        <Plus size={18} color="#111827" />
                      </View>
                    </TouchableOpacity>
                  )}
                />

                <Button variant="secondary" onPress={() => setAddModalVisible(false)}>
                  닫기
                </Button>
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* =========================
          텍스트 수정 모달
         ========================= */}
      <Modal
        visible={editTextModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setEditTextModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>항목 수정</Text>
              <TouchableOpacity onPress={() => setEditTextModalVisible(false)}>
                <X size={22} color="#4b5563" />
              </TouchableOpacity>
            </View>

            <View style={{ gap: 12 }}>
              <Input label="내용" placeholder="내용 수정" value={editDraft} onChangeText={setEditDraft} />
              <View style={styles.modalBtnRow}>
                <Button
                  variant="secondary"
                  style={styles.flex1}
                  onPress={() => {
                    setEditTextModalVisible(false);
                    setEditing(null);
                    setEditDraft('');
                  }}
                >
                  취소
                </Button>
                <Button style={styles.flex1} onPress={saveEditText}>
                  저장
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

/** =========================
 *  스타일
 *  ========================= */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    gap: 16,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },

  monthSelector: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  monthText: { fontSize: 18, fontWeight: '500', color: '#000' },

  iconButton: { padding: 8, borderRadius: 8 },

  scrollContent: { paddingBottom: 60 },

  calendarContainer: { padding: 16 },
  weekHeader: { flexDirection: 'row', marginBottom: 8 },
  weekDayText: { width: CELL_SIZE, textAlign: 'center', fontSize: 14, marginRight: CELL_GAP },

  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: CELL_GAP },

  dayCell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    padding: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dayCellHasMeal: { borderColor: '#d1d5db', backgroundColor: '#f9fafb' },
  dayCellSelected: { backgroundColor: '#18181b', borderColor: '#18181b' },

  dayText: { fontSize: 14, marginBottom: 2 },
  daySummary: { fontSize: 8, textAlign: 'center' },

  textRed: { color: '#ef4444' },
  textBlue: { color: '#3b82f6' },
  textGray: { color: '#4b5563' },
  textWhite: { color: '#fff' },
  textGray200: { color: '#e5e7eb' },
  textGray500: { color: '#6b7280' },

  detailContainer: { padding: 16, borderTopWidth: 1, borderTopColor: '#e5e7eb' },
  detailHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  detailTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  deleteDayBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 8 },
  deleteDayText: { color: '#ef4444', fontWeight: '600', fontSize: 13 },

  section: { gap: 10 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#111827' },
  sectionButtons: { flexDirection: 'row', gap: 8 },

  smallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#111827',
  },
  smallBtnSecondary: { backgroundColor: '#f3f4f6' },
  smallBtnText: { fontSize: 12, fontWeight: '700', color: '#111827' },

  sectionEmpty: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  sectionEmptyText: { color: '#6b7280', fontSize: 13 },

  cardList: { gap: 10 },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  cardText: { backgroundColor: '#fafafa' },

  cardLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  cardImage: { width: 52, height: 52, borderRadius: 12, backgroundColor: '#f3f4f6' },
  cardImageFallback: { justifyContent: 'center', alignItems: 'center' },

  cardInfo: { flex: 1, gap: 4 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#111827',
  },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '800' },
  metaText: { color: '#6b7280', fontSize: 12, fontWeight: '600' },

  cardTitle: { color: '#111827', fontSize: 14, fontWeight: '800' },
  cardHint: { color: '#6b7280', fontSize: 12 },

  cardAction: { padding: 8 },
  cardActionsRow: { flexDirection: 'row', gap: 2 },

  textIconBox: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textIcon: { fontWeight: '900', color: '#111827' },

  emptyState: {
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    padding: 16,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  modalTitle: { fontSize: 16, fontWeight: '900', color: '#111827' },
  modalBtnRow: { flexDirection: 'row', gap: 8, marginTop: 4 },

  flex1: { flex: 1 },

  recipePickCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  recipePickImage: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#f3f4f6' },
  recipePickTitle: { fontSize: 14, fontWeight: '800', color: '#111827' },
  recipePickMeta: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  recipePickAdd: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
