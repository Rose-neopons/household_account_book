import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const FONT_BODY = 'MemomentKkukkukk';
const FONT_TITLE = 'MemomentKkukkukk';

type MaterialIconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

const parsedItems: Array<{
  icon: MaterialIconName;
  label: string;
  value: string;
}> = [
  { icon: 'food-drumstick-outline', label: '소비 이름', value: '삼겹살 모임' },
  { icon: 'map-marker-outline', label: '장소', value: '강남' },
  { icon: 'calendar-blank-outline', label: '날짜', value: '어제 저녁' },
  { icon: 'credit-card-outline', label: '결제 수단', value: '카드 추정' },
  { icon: 'tag-outline', label: '카테고리', value: '외식 / 친구 모임' },
];

function AnalysisMascot() {
  const wobble = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(wobble, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(wobble, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    loop.start();
    return () => loop.stop();
  }, [wobble]);

  const rotate = wobble.interpolate({
    inputRange: [0, 1],
    outputRange: ['-4deg', '4deg'],
  });

  return (
    <View style={styles.mascotZone}>
      <Animated.View style={[styles.mascotBall, { transform: [{ rotate }] }]}>
        <Text style={styles.mascotFace}>૮ ˶ᵔ ᵕ ᵔ˶ ა</Text>
        <Text style={styles.mascotCaption}>분석 완료!</Text>
      </Animated.View>
      <View style={styles.mascotHandLeft} />
      <View style={styles.mascotHandRight} />
    </View>
  );
}

export default function ReviewScreen() {
  const { prompt } = useLocalSearchParams<{ prompt?: string }>();
  const rawPrompt =
    typeof prompt === 'string'
      ? prompt
      : '어제 친구랑 강남에서 삼겹살 먹고 5만 2천원 긁었어';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topGlowPink} />
        <View style={styles.topGlowMint} />

        <View style={styles.heroCard}>
          <AnalysisMascot />
          <Text style={styles.eyebrow}>AI 확인 카드</Text>
          <Text style={styles.title}>내가 이렇게 이해했어요</Text>
          <Text style={styles.subtitle}>
            저장 전에 한 번만 봐줘요. 어색하면 바로 수정할 수 있어요.
          </Text>
        </View>

        <View style={styles.promptCard}>
          <Text style={styles.promptLabel}>사용자가 말한 소비</Text>
          <Text style={styles.promptText}>{rawPrompt}</Text>
        </View>

        <View style={styles.resultCard}>
          <View style={styles.resultTopRow}>
            <View style={styles.resultBadge}>
              <View style={styles.resultBadgeRow}>
                <MaterialCommunityIcons
                  color="#8A6B00"
                  name="silverware-fork-knife"
                  size={14}
                />
                <Text style={styles.resultBadgeText}>외식</Text>
              </View>
            </View>
            <Text style={styles.resultAmount}>-52,000원</Text>
          </View>

          <Text style={styles.resultTitle}>친구랑 삼겹살 모임</Text>
          <Text style={styles.resultSubtitle}>
            “즐거운 모임 소비”로 읽었어요. 과소비 신호는 아직 없어요.
          </Text>

          <View style={styles.sparkleCard}>
            <Text style={styles.sparkleTitle}>반짝 분석</Text>
            <Text style={styles.sparkleText}>
              이번 달 외식 예산의 18%예요. 지금 흐름이면 아직 미소 지을 수
              있어요.
            </Text>
          </View>

          <View style={styles.detailList}>
            {parsedItems.map((item) => (
              <View key={item.label} style={styles.detailRow}>
                <View style={styles.detailLeft}>
                  <MaterialCommunityIcons
                    color="#8A79B0"
                    name={item.icon}
                    size={18}
                  />
                  <Text style={styles.detailLabel}>{item.label}</Text>
                </View>
                <Text style={styles.detailValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.futureCard}>
          <Text style={styles.futureTitle}>미래 예측 시뮬레이터</Text>
          <Text style={styles.futureText}>
            커피 5번만 참아도 이번 주말엔 택시 대신 귀여운 자동차 저금통이
            생겨요.
          </Text>
          <View style={styles.futureIcons}>
            <View style={styles.futureCoffeeRow}>
              {Array.from({ length: 5 }).map((_, index) => (
                <MaterialCommunityIcons
                  key={`coffee-${index}`}
                  color="#7F60A6"
                  name="coffee-outline"
                  size={19}
                />
              ))}
            </View>
            <MaterialCommunityIcons
              color="#3E6F6A"
              name="arrow-right-thin"
              size={24}
            />
            <View style={styles.futureRewardRow}>
              <MaterialCommunityIcons
                color="#3E6F6A"
                name="car-convertible"
                size={24}
              />
              <MaterialCommunityIcons
                color="#FF8FB8"
                name="star-four-points"
                size={16}
              />
            </View>
          </View>
        </View>

        <View style={styles.actionRow}>
          <Pressable onPress={router.back} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>다시 말해볼래요</Text>
          </Pressable>
          <Pressable style={styles.primaryButton}>
            <View style={styles.primaryButtonContent}>
              <Text style={styles.primaryButtonText}>확인했어요!</Text>
              <MaterialCommunityIcons
                color="#FFFFFF"
                name="star-four-points-circle-outline"
                size={18}
              />
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF8FC',
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 36,
    paddingTop: 20,
  },
  topGlowPink: {
    position: 'absolute',
    top: 40,
    left: -30,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#FFE0EC',
  },
  topGlowMint: {
    position: 'absolute',
    top: 210,
    right: -30,
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#DCFCE7',
  },
  heroCard: {
    alignItems: 'center',
    borderRadius: 34,
    backgroundColor: '#FFFDFB',
    paddingHorizontal: 22,
    paddingBottom: 24,
    paddingTop: 18,
  },
  mascotZone: {
    width: 150,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  mascotBall: {
    width: 108,
    height: 108,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF1F7',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    zIndex: 2,
  },
  mascotFace: {
    fontSize: 24,
    color: '#6650A4',
    fontFamily: FONT_TITLE,
  },
  mascotCaption: {
    marginTop: 8,
    color: '#FF7DA8',
    fontSize: 12,
    fontFamily: FONT_TITLE,
  },
  mascotHandLeft: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    width: 36,
    height: 18,
    borderRadius: 12,
    backgroundColor: '#FFD4E5',
    transform: [{ rotate: '-18deg' }],
  },
  mascotHandRight: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 36,
    height: 18,
    borderRadius: 12,
    backgroundColor: '#FFD4E5',
    transform: [{ rotate: '18deg' }],
  },
  eyebrow: {
    color: '#FF7DA8',
    fontSize: 13,
    fontFamily: FONT_TITLE,
    letterSpacing: 1.2,
  },
  title: {
    color: '#3B315E',
    fontSize: 31,
    fontFamily: FONT_TITLE,
    lineHeight: 38,
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: '#736A91',
    fontSize: 15,
    fontFamily: FONT_BODY,
    lineHeight: 22,
    marginTop: 10,
    textAlign: 'center',
  },
  promptCard: {
    marginTop: 16,
    borderRadius: 28,
    backgroundColor: '#E8F7FF',
    padding: 18,
  },
  promptLabel: {
    color: '#2C7DA0',
    fontSize: 12,
    fontFamily: FONT_TITLE,
    letterSpacing: 1,
  },
  promptText: {
    color: '#274C5E',
    fontSize: 18,
    fontFamily: FONT_TITLE,
    lineHeight: 26,
    marginTop: 10,
  },
  resultCard: {
    marginTop: 16,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    padding: 20,
    shadowColor: '#E7B5CB',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.16,
    shadowRadius: 22,
  },
  resultTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  resultBadge: {
    borderRadius: 999,
    backgroundColor: '#FFF6BF',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  resultBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  resultBadgeText: {
    color: '#8A6B00',
    fontSize: 12,
    fontFamily: FONT_TITLE,
  },
  resultAmount: {
    color: '#FF7DA8',
    fontSize: 24,
    fontFamily: FONT_TITLE,
  },
  resultTitle: {
    color: '#403561',
    fontSize: 27,
    fontFamily: FONT_TITLE,
    marginTop: 14,
  },
  resultSubtitle: {
    color: '#766C95',
    fontSize: 14,
    fontFamily: FONT_BODY,
    lineHeight: 22,
    marginTop: 8,
  },
  sparkleCard: {
    marginTop: 18,
    borderRadius: 24,
    backgroundColor: '#FFF0F7',
    padding: 16,
  },
  sparkleTitle: {
    color: '#FF5D94',
    fontSize: 13,
    fontFamily: FONT_TITLE,
  },
  sparkleText: {
    color: '#7A5E77',
    fontSize: 14,
    fontFamily: FONT_BODY,
    lineHeight: 21,
    marginTop: 8,
  },
  detailList: {
    marginTop: 14,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2ECFA',
  },
  detailLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  detailLabel: {
    color: '#756C93',
    fontSize: 14,
    fontFamily: FONT_TITLE,
  },
  detailValue: {
    color: '#3E355F',
    fontSize: 14,
    fontFamily: FONT_TITLE,
    marginLeft: 16,
  },
  futureCard: {
    marginTop: 16,
    borderRadius: 30,
    backgroundColor: '#EAFBF4',
    padding: 20,
  },
  futureTitle: {
    color: '#295C59',
    fontSize: 18,
    fontFamily: FONT_TITLE,
  },
  futureText: {
    color: '#4C7A76',
    fontSize: 14,
    fontFamily: FONT_BODY,
    lineHeight: 21,
    marginTop: 8,
  },
  futureIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  futureCoffeeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  futureRewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },
  secondaryButton: {
    flex: 1,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#685B87',
    fontSize: 15,
    fontFamily: FONT_TITLE,
  },
  primaryButton: {
    flex: 1,
    borderRadius: 22,
    backgroundColor: '#FF8FB8',
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF8FB8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
  },
  primaryButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: FONT_TITLE,
  },
});
