import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Animated,
  Easing,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { create } from 'zustand';

const FONT_BODY = 'MemomentKkukkukk';
const FONT_TITLE = 'MemomentKkukkukk';
const BUDGET_RATIO = 1;
const BOTTLE_STRIPES = ['#86EFAC', '#93C5FD', '#C4B5FD', '#F9A8D4'];
const TRACK_STRIPES = [...BOTTLE_STRIPES].reverse();
const BOTTLE_GLASS_HEIGHT = 144;

type QuickInputState = {
  prompt: string;
  setPrompt: (prompt: string) => void;
};

const useQuickInputStore = create<QuickInputState>((set) => ({
  prompt: '',
  setPrompt: (prompt) => set({ prompt }),
}));

const habitChips = ['외식 18%', '커피 12%', '택시 7%'];

function MascotBubble() {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [floatAnim]);

  return (
    <Animated.View
      style={[styles.mascotShell, { transform: [{ translateY: floatAnim }] }]}
    >
      <View style={styles.mascotGlow} />
      <View style={styles.mascotBody}>
        <Text style={styles.mascotEmoji}>૮ • ﻌ - ა</Text>
        <Text style={styles.mascotMood}>오늘도 지갑 지키는 중</Text>
      </View>
      <View style={styles.mascotSpeech}>
        <Text style={styles.mascotSpeechTitle}>포켓가드 한마디</Text>
        <Text style={styles.mascotSpeechBody}>
          오늘 소비를 말해주면 내가 귀엽게 정리해줄게요.
        </Text>
      </View>
    </Animated.View>
  );
}

function RainbowBottle() {
  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, {
          toValue: -4,
          duration: 1600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: 0,
          duration: 1600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();
    return () => animation.stop();
  }, [waveAnim]);

  const fillPercent = Math.round(BUDGET_RATIO * 100);
  const bottleMood =
    fillPercent >= 80
      ? {
          icon: 'emoticon-excited-outline' as const,
          label: '배불러요! 튼튼해요!',
          badge: '행복',
        }
      : fillPercent >= 30
        ? {
            icon: 'emoticon-neutral-outline' as const,
            label: '아직은 괜찮아요.',
            badge: '보통',
          }
        : {
            icon: 'emoticon-cry-outline' as const,
            label: '배고파요... 지갑이 위험해요!',
            badge: '주의',
          };

  return (
    <View style={styles.bottleWrap}>
      <View style={styles.smartBottleContainer}>
        <View style={styles.smartBottleLabel}>
          <Text style={styles.smartBottleLabelTitle}>
            현재 우유 {fillPercent}% 남음
          </Text>
          <Text style={styles.smartBottleLabelBody}>{bottleMood.label}</Text>
        </View>

        <View style={styles.smartBottleShell}>
          <View style={styles.smartBottleCap} />
          <View style={styles.smartBottle}>
            <View style={styles.smartBottleTicks}>
              {[75, 50, 25].map((tick) => (
                <View
                  key={tick}
                  style={[
                    styles.smartBottleTick,
                    {
                      bottom: `${tick}%`,
                    },
                  ]}
                />
              ))}
            </View>

            <View style={styles.smartBottleGlass}>
              <View style={styles.smartBottleGuide}>
                {BOTTLE_STRIPES.map((color) => (
                  <View
                    key={`guide-${color}`}
                    style={[
                      styles.smartBottleStripe,
                      styles.smartBottleGuideStripe,
                      { backgroundColor: color },
                    ]}
                  />
                ))}
              </View>

              <Animated.View
                style={[
                  styles.smartBottleMilk,
                  {
                    height: `${fillPercent}%`,
                  },
                ]}
              >
                <View style={styles.smartBottleActiveFill}>
                  {BOTTLE_STRIPES.map((color) => (
                    <View
                      key={`active-${color}`}
                      style={[
                        styles.smartBottleStripe,
                        { backgroundColor: color },
                      ]}
                    />
                  ))}
                </View>
                <Animated.View
                  style={[
                    styles.smartBottleWave,
                    fillPercent >= 100 && styles.smartBottleWaveHidden,
                    {
                      transform: [{ translateY: waveAnim }],
                    },
                  ]}
                />
              </Animated.View>

              <View style={styles.smartBottleFace}>
                <MaterialCommunityIcons
                  color="#5E4B91"
                  name={bottleMood.icon}
                  size={26}
                />
              </View>
            </View>
          </View>

          <View style={styles.smartBottleBadge}>
            <Text style={styles.smartBottleBadgeText}>{bottleMood.badge}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const { prompt, setPrompt } = useQuickInputStore();

  const handleAnalyzePress = () => {
    router.push({
      pathname: '/review',
      params: {
        prompt:
          prompt.trim() || '어제 친구랑 강남에서 삼겹살 먹고 5만 2천원 긁었어',
      },
    });
  };

  const handleFuturePress = () => {
    router.push('/future-simulator');
  };

  const handleGuardianPress = () => {
    router.push('/guardian');
  };
  const fillPercent = Math.round(BUDGET_RATIO * 100);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.backgroundBlobPeach} />
        <View style={styles.backgroundBlobMint} />

        <MascotBubble />

        <View style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <View style={styles.heroTextWrap}>
              <Text style={styles.eyebrow}>AI Pocket Guard</Text>
              <Text style={styles.title}>내 포켓 속{'\n'}금융 지키미 ♧</Text>
              <Text style={styles.subtitle}>
                핀테크보다 다정하게. 오늘 소비를 말하면 내가 먼저 챙겨줄게요.
              </Text>
            </View>
            <RainbowBottle />
          </View>

          <View style={styles.metricRow}>
            <View style={styles.metricPill}>
              <Text style={styles.metricLabel}>남은 생활비</Text>
              <Text style={styles.metricValue}>₩420,000</Text>
            </View>
            <View style={styles.metricPill}>
              <Text style={styles.metricLabel}>오늘 기분</Text>
              <Text style={styles.metricValue}>맑음 · 안정적</Text>
            </View>
          </View>
        </View>

        <View style={styles.healthCard}>
          <View style={styles.healthHeader}>
            <View>
              <Text style={styles.sectionTitle}>예산 우유병</Text>
              <Text style={styles.sectionCaption}>
                이번 달 예산의 {fillPercent}%를 포근하게 지키는 중이에요.
              </Text>
            </View>
            <Text style={styles.sectionBadge}>양호</Text>
          </View>

          <View style={styles.healthTrack}>
            <View style={styles.healthTrackBase}>
              {TRACK_STRIPES.map((color) => (
                <View
                  key={`track-base-${color}`}
                  style={[styles.healthTrackStripe, { backgroundColor: color }]}
                />
              ))}
            </View>
            <View
              style={[
                styles.healthTrackMask,
                {
                  left: `${fillPercent}%`,
                },
              ]}
            />
          </View>

          <View style={styles.healthFooter}>
            <Text style={styles.healthHint}>
              외식만 조금 줄이면 잔고 얼굴이 더 웃어요.
            </Text>
            <Text style={styles.healthPercent}>{fillPercent}%</Text>
          </View>
        </View>

        <View style={styles.nudgeCard}>
          <View style={styles.nudgeIcon}>
            <MaterialCommunityIcons
              color="#5B4B8A"
              name="rabbit-variant-outline"
              size={30}
            />
          </View>
          <View style={styles.nudgeBody}>
            <Text style={styles.nudgeTitle}>오늘 어떤 소비를 했나요?</Text>
            <Text style={styles.nudgeText}>
              친구한테 말하듯 적어줘요. 장소, 금액, 기분까지 말해주면 더
              똑똑해져요.
            </Text>
          </View>
        </View>

        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>소비 기록하기</Text>
          <TextInput
            style={styles.input}
            multiline
            onChangeText={setPrompt}
            placeholder="예: 어제 친구랑 강남에서 삼겹살 먹고 5만 2천원 긁었어"
            placeholderTextColor="#8B8BA7"
            value={prompt}
          />

          <View style={styles.chipRow}>
            {habitChips.map((chip) => (
              <View key={chip} style={styles.chip}>
                <Text style={styles.chipText}>{chip}</Text>
              </View>
            ))}
          </View>

          <Pressable onPress={handleAnalyzePress} style={styles.primaryButton}>
            <View style={styles.primaryButtonContent}>
              <Text style={styles.primaryButtonText}>확인 카드 만들기</Text>
              <MaterialCommunityIcons
                color="#FFFFFF"
                name="star-four-points-circle-outline"
                size={18}
              />
            </View>
          </Pressable>
        </View>

        <View style={styles.previewRow}>
          <Pressable
            onPress={handleFuturePress}
            style={({ pressed }) => [
              styles.previewCard,
              pressed && styles.previewCardPressed,
            ]}
          >
            <MaterialCommunityIcons
              color="#7F60A6"
              name="coffee-outline"
              size={28}
            />
            <Text style={styles.previewTitle}>커피들이 모이면</Text>
            <Text style={styles.previewText}>
              귀여운 자동차 한 대 값이 돼요.
            </Text>
          </Pressable>
          <Pressable
            onPress={handleGuardianPress}
            style={({ pressed }) => [
              styles.previewCard,
              pressed && styles.previewCardPressed,
            ]}
          >
            <MaterialCommunityIcons
              color="#7F60A6"
              name="message-badge-outline"
              size={28}
            />
            <Text style={styles.previewTitle}>지름신 방어</Text>
            <Text style={styles.previewText}>
              결제 전 나 대신 한 번 더 물어봐요.
            </Text>
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
  backgroundBlobPeach: {
    position: 'absolute',
    top: 30,
    right: -10,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#FFE4D6',
  },
  backgroundBlobMint: {
    position: 'absolute',
    top: 220,
    left: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#DDFBF1',
  },
  mascotShell: {
    alignItems: 'center',
    marginBottom: 18,
  },
  mascotGlow: {
    position: 'absolute',
    top: 12,
    width: 180,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFD8E9',
    opacity: 0.5,
  },
  mascotBody: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 122,
    height: 122,
    borderRadius: 40,
    backgroundColor: '#FFF1F7',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowColor: '#F8A5C2',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    zIndex: 2,
  },
  mascotEmoji: {
    fontSize: 28,
    color: '#6B5CA5',
    fontWeight: '700',
  },
  mascotMood: {
    marginTop: 8,
    color: '#8D79C6',
    fontSize: 12,
    fontFamily: FONT_TITLE,
  },
  mascotSpeech: {
    marginTop: -12,
    width: '86%',
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingBottom: 16,
    paddingTop: 26,
  },
  mascotSpeechTitle: {
    color: '#F97393',
    fontSize: 12,
    fontFamily: FONT_TITLE,
    letterSpacing: 1,
    textAlign: 'center',
  },
  mascotSpeechBody: {
    color: '#5D5A80',
    fontSize: 15,
    fontFamily: FONT_BODY,
    lineHeight: 22,
    marginTop: 8,
    textAlign: 'center',
  },
  heroCard: {
    borderRadius: 34,
    backgroundColor: '#FFFDFB',
    padding: 22,
    shadowColor: '#EAB0C8',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
  },
  heroTopRow: {
    flexDirection: 'row',
    gap: 14,
  },
  heroTextWrap: {
    flex: 1,
  },
  eyebrow: {
    color: '#8D79C6',
    fontSize: 13,
    fontFamily: FONT_TITLE,
    letterSpacing: 1.4,
  },
  title: {
    color: '#362F63',
    fontSize: 33,
    fontFamily: FONT_TITLE,
    lineHeight: 40,
    marginTop: 10,
  },
  subtitle: {
    color: '#716D91',
    fontSize: 15,
    fontFamily: FONT_BODY,
    lineHeight: 23,
    marginTop: 12,
  },
  bottleWrap: {
    width: 130,
    justifyContent: 'center',
  },
  smartBottleContainer: {
    alignItems: 'center',
  },
  smartBottleLabel: {
    marginBottom: 10,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: '#E8C5D5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
  },
  smartBottleLabelTitle: {
    color: '#5B4B8A',
    fontFamily: FONT_TITLE,
    fontSize: 12,
    textAlign: 'center',
  },
  smartBottleLabelBody: {
    marginTop: 4,
    color: '#7A739A',
    fontFamily: FONT_BODY,
    fontSize: 11,
    lineHeight: 15,
    textAlign: 'center',
  },
  smartBottleShell: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  smartBottleCap: {
    width: 42,
    height: 16,
    borderRadius: 10,
    backgroundColor: '#D7CCFA',
    marginBottom: 6,
  },
  smartBottle: {
    width: 90,
    height: 170,
    borderRadius: 38,
    borderWidth: 2,
    borderColor: '#EEE6F6',
    backgroundColor: '#FFFFFFCC',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#DAB8E8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
  },
  smartBottleGlass: {
    width: 72,
    height: BOTTLE_GLASS_HEIGHT,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF80',
    justifyContent: 'flex-end',
  },
  smartBottleGuide: {
    ...StyleSheet.absoluteFillObject,
  },
  smartBottleStripe: {
    flex: 1,
  },
  smartBottleGuideStripe: {
    opacity: 0.08,
  },
  smartBottleTicks: {
    position: 'absolute',
    right: -10,
    top: 12,
    bottom: 12,
    justifyContent: 'space-between',
  },
  smartBottleTick: {
    position: 'absolute',
    right: 0,
    width: 12,
    borderTopWidth: 2,
    borderTopColor: '#D2C9EC',
    borderStyle: 'dashed',
  },
  smartBottleMilk: {
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  smartBottleActiveFill: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: BOTTLE_GLASS_HEIGHT,
  },
  smartBottleWave: {
    marginTop: -6,
    height: 14,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#F9A8D4',
    opacity: 0.22,
  },
  smartBottleWaveHidden: {
    opacity: 0,
  },
  smartBottleFace: {
    position: 'absolute',
    top: 52,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smartBottleBadge: {
    marginTop: 8,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  smartBottleBadgeText: {
    color: '#F97393',
    fontFamily: FONT_TITLE,
    fontSize: 11,
  },
  metricRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  metricPill: {
    flex: 1,
    borderRadius: 22,
    backgroundColor: '#F8F3FF',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  metricLabel: {
    color: '#8D79C6',
    fontSize: 12,
    fontFamily: FONT_TITLE,
  },
  metricValue: {
    color: '#413B6B',
    fontSize: 17,
    fontFamily: FONT_TITLE,
    marginTop: 6,
  },
  healthCard: {
    marginTop: 16,
    borderRadius: 30,
    backgroundColor: '#FFF1F7',
    padding: 20,
  },
  healthHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  sectionTitle: {
    color: '#4B426F',
    fontSize: 20,
    fontFamily: FONT_TITLE,
  },
  sectionCaption: {
    color: '#7D739E',
    fontSize: 14,
    fontFamily: FONT_BODY,
    lineHeight: 21,
    marginTop: 6,
    maxWidth: 240,
  },
  sectionBadge: {
    overflow: 'hidden',
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    color: '#F97393',
    fontSize: 12,
    fontFamily: FONT_TITLE,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  healthTrack: {
    marginTop: 18,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 999,
    height: 20,
    backgroundColor: '#FFFFFF80',
  },
  healthTrackBase: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
  },
  healthTrackStripe: {
    flex: 1,
  },
  healthTrackMask: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFF8FCDD',
  },
  healthFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  healthHint: {
    color: '#6F668E',
    fontSize: 13,
    fontFamily: FONT_BODY,
    flex: 1,
    lineHeight: 20,
  },
  healthPercent: {
    color: '#F97393',
    fontSize: 24,
    fontFamily: FONT_TITLE,
    marginLeft: 12,
  },
  nudgeCard: {
    marginTop: 16,
    borderRadius: 28,
    backgroundColor: '#E6FBF3',
    padding: 18,
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  nudgeIcon: {
    width: 58,
    height: 58,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  nudgeBody: {
    flex: 1,
  },
  nudgeTitle: {
    color: '#295C59',
    fontSize: 18,
    fontFamily: FONT_TITLE,
  },
  nudgeText: {
    color: '#4D7B77',
    fontSize: 14,
    fontFamily: FONT_BODY,
    lineHeight: 21,
    marginTop: 6,
  },
  inputCard: {
    marginTop: 16,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    padding: 18,
    shadowColor: '#D8B4FE',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
  },
  inputLabel: {
    color: '#554A7A',
    fontSize: 18,
    fontFamily: FONT_TITLE,
  },
  input: {
    minHeight: 110,
    marginTop: 14,
    borderRadius: 24,
    backgroundColor: '#F8F5FF',
    paddingHorizontal: 18,
    paddingVertical: 16,
    color: '#40385F',
    fontSize: 16,
    fontFamily: FONT_BODY,
    textAlignVertical: 'top',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },
  chip: {
    borderRadius: 999,
    backgroundColor: '#FFF4C8',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipText: {
    color: '#927100',
    fontSize: 12,
    fontFamily: FONT_TITLE,
  },
  primaryButton: {
    marginTop: 18,
    borderRadius: 22,
    backgroundColor: '#FF8FB8',
    paddingVertical: 18,
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
    fontSize: 17,
    fontFamily: FONT_TITLE,
  },
  previewRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  previewCard: {
    flex: 1,
    borderRadius: 26,
    backgroundColor: '#FFFDFB',
    paddingHorizontal: 18,
    paddingVertical: 20,
    minHeight: 180,
    borderWidth: 1,
    borderColor: '#F4E8F7',
    shadowColor: '#DDB7D6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 18,
    justifyContent: 'flex-start',
  },
  previewCardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  previewTitle: {
    color: '#53486F',
    fontSize: 15,
    fontFamily: FONT_TITLE,
    marginTop: 12,
  },
  previewText: {
    color: '#7B7196',
    fontSize: 13,
    fontFamily: FONT_BODY,
    lineHeight: 20,
    marginTop: 6,
  },
});
