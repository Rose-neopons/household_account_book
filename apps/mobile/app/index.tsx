import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { create } from 'zustand';

type QuickInputState = {
  prompt: string;
  setPrompt: (prompt: string) => void;
};

const useQuickInputStore = create<QuickInputState>((set) => ({
  prompt: '',
  setPrompt: (prompt) => set({ prompt }),
}));

export default function HomeScreen() {
  const { prompt, setPrompt } = useQuickInputStore();
  const handleAnalyzePress = () => {
    router.push({
      pathname: '/review',
      params: {
        prompt:
          prompt.trim() ||
          '어제 친구랑 강남에서 삼겹살 먹고 5만 2천원 긁었어',
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.kicker}>AI 지출 큐레이터</Text>
          <Text style={styles.title}>지름신을 막는{'\n'}가계부</Text>
          <Text style={styles.description}>
            소비 기록, 영수증 OCR, 미래 잔고 예측을 한 곳에서 시작합니다.
          </Text>

          <View style={styles.budgetCard}>
            <Text style={styles.budgetLabel}>이번 달 예산</Text>
            <Text style={styles.budgetAmount}>₩1,200,000</Text>
            <View style={styles.progressTrack}>
              <View style={styles.progressValue} />
            </View>
            <Text style={styles.budgetHint}>
              현재 패턴이면 3개월 뒤 예상 여유금은 ₩420,000입니다.
            </Text>
          </View>

          <View style={styles.inputCard}>
            <Text style={styles.inputTitle}>소비 기록하기</Text>
            <TextInput
              style={styles.input}
              multiline
              onChangeText={setPrompt}
              placeholder="예: 어제 친구랑 강남에서 삼겹살 먹고 5만 2천원 긁었어"
              placeholderTextColor="#64748B"
              value={prompt}
            />
            <TouchableOpacity style={styles.button} onPress={handleAnalyzePress}>
              <Text style={styles.buttonText}>AI가 정리하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  card: {
    borderRadius: 32,
    backgroundColor: '#F8FAFC',
    padding: 24,
    shadowColor: '#020617',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
  },
  kicker: {
    color: '#0369A1',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: 12,
    color: '#111827',
    fontSize: 36,
    fontWeight: '900',
    lineHeight: 44,
  },
  description: {
    marginTop: 16,
    color: '#475569',
    fontSize: 16,
    lineHeight: 28,
  },
  budgetCard: {
    marginTop: 32,
    borderRadius: 24,
    backgroundColor: '#0F172A',
    padding: 20,
  },
  budgetLabel: {
    color: '#CBD5E1',
    fontSize: 14,
    fontWeight: '700',
  },
  budgetAmount: {
    marginTop: 8,
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
  },
  progressTrack: {
    marginTop: 16,
    height: 12,
    overflow: 'hidden',
    borderRadius: 999,
    backgroundColor: '#334155',
  },
  progressValue: {
    height: '100%',
    width: '58%',
    borderRadius: 999,
    backgroundColor: '#F97316',
  },
  budgetHint: {
    marginTop: 12,
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 22,
  },
  inputCard: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  inputTitle: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '800',
  },
  input: {
    marginTop: 12,
    minHeight: 96,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    padding: 16,
    color: '#111827',
    fontSize: 16,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 16,
    borderRadius: 16,
    backgroundColor: '#F97316',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '900',
  },
});
