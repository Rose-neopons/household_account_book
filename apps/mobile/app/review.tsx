import { router, useLocalSearchParams } from 'expo-router';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const parsedItems = [
  { label: '날짜', value: '어제' },
  { label: '금액', value: '52,000원' },
  { label: '카테고리', value: '외식' },
  { label: '장소', value: '강남' },
  { label: '결제', value: '카드 추정' },
];

export default function ReviewScreen() {
  const { prompt } = useLocalSearchParams<{ prompt?: string }>();
  const rawPrompt =
    typeof prompt === 'string'
      ? prompt
      : '어제 친구랑 강남에서 삼겹살 먹고 5만 2천원 긁었어';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>AI 정리 결과</Text>
          <Text style={styles.title}>이렇게 기록할까요?</Text>
          <Text style={styles.subtitle}>
            말하듯 남긴 소비 메모를 저장하기 전에 한 번 더 확인해요.
          </Text>
        </View>

        <View style={styles.promptCard}>
          <Text style={styles.promptLabel}>입력한 내용</Text>
          <Text style={styles.promptText}>{rawPrompt}</Text>
        </View>

        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultTitle}>삼겹살 모임</Text>
            <Text style={styles.resultAmount}>-52,000원</Text>
          </View>

          <View style={styles.chipRow}>
            <Text style={styles.chip}>외식</Text>
            <Text style={styles.chip}>친구 모임</Text>
            <Text style={styles.chip}>카드</Text>
          </View>

          <View style={styles.divider} />

          {parsedItems.map((item) => (
            <View key={item.label} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{item.label}</Text>
              <Text style={styles.detailValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.insightCard}>
          <Text style={styles.insightTitle}>이번 달 외식 예산</Text>
          <Text style={styles.insightCopy}>
            이 지출을 저장하면 외식 예산의 18%를 사용한 상태가 됩니다.
          </Text>
          <View style={styles.progressTrack}>
            <View style={styles.progressValue} />
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.secondaryButton} onPress={router.back}>
            <Text style={styles.secondaryButtonText}>수정하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>기록 저장</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 24,
  },
  hero: {
    borderRadius: 30,
    backgroundColor: '#0F172A',
    padding: 24,
  },
  eyebrow: {
    color: '#FDBA74',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
  },
  title: {
    marginTop: 12,
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 42,
  },
  subtitle: {
    marginTop: 12,
    color: '#CBD5E1',
    fontSize: 15,
    lineHeight: 24,
  },
  promptCard: {
    marginTop: 18,
    borderRadius: 24,
    backgroundColor: '#E0F2FE',
    padding: 18,
  },
  promptLabel: {
    color: '#0369A1',
    fontSize: 13,
    fontWeight: '800',
  },
  promptText: {
    marginTop: 8,
    color: '#0F172A',
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 26,
  },
  resultCard: {
    marginTop: 18,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    padding: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.08,
    shadowRadius: 22,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16,
  },
  resultTitle: {
    flex: 1,
    color: '#111827',
    fontSize: 24,
    fontWeight: '900',
  },
  resultAmount: {
    color: '#F97316',
    fontSize: 22,
    fontWeight: '900',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  chip: {
    overflow: 'hidden',
    borderRadius: 999,
    backgroundColor: '#FFF7ED',
    color: '#C2410C',
    fontSize: 13,
    fontWeight: '800',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  divider: {
    height: 1,
    marginVertical: 18,
    backgroundColor: '#E2E8F0',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  detailLabel: {
    color: '#64748B',
    fontSize: 15,
    fontWeight: '700',
  },
  detailValue: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '900',
  },
  insightCard: {
    marginTop: 18,
    borderRadius: 24,
    backgroundColor: '#111827',
    padding: 18,
  },
  insightTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },
  insightCopy: {
    marginTop: 8,
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 22,
  },
  progressTrack: {
    marginTop: 14,
    height: 10,
    overflow: 'hidden',
    borderRadius: 999,
    backgroundColor: '#334155',
  },
  progressValue: {
    width: '18%',
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#F97316',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 22,
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 18,
    paddingVertical: 16,
  },
  secondaryButtonText: {
    color: '#334155',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '900',
  },
  primaryButton: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: '#F97316',
    paddingVertical: 16,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '900',
  },
});
