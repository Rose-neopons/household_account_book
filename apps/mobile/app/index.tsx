import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { create } from "zustand";

type QuickInputState = {
  prompt: string;
  setPrompt: (prompt: string) => void;
};

const useQuickInputStore = create<QuickInputState>((set) => ({
  prompt: "",
  setPrompt: (prompt) => set({ prompt })
}));

export default function HomeScreen() {
  const { prompt, setPrompt } = useQuickInputStore();

  return (
    <SafeAreaView className="flex-1 bg-guard-900">
      <ScrollView className="flex-1" contentContainerClassName="px-5 py-8">
        <View className="rounded-[32px] bg-guard-50 p-6 shadow">
          <Text className="text-sm font-semibold uppercase tracking-[3px] text-guard-700">
            AI 지출 큐레이터
          </Text>
          <Text className="mt-3 text-4xl font-black leading-tight text-ink">
            지름신을 막는{'\n'}가계부
          </Text>
          <Text className="mt-4 text-base leading-7 text-slate-600">
            자연어 입력, 영수증 OCR, 미래 잔고 예측을 한 곳에서 시작합니다.
          </Text>

          <View className="mt-8 rounded-3xl bg-guard-900 p-5">
            <Text className="text-sm font-semibold text-slate-300">이번 달 예산</Text>
            <Text className="mt-2 text-3xl font-black text-white">₩1,200,000</Text>
            <View className="mt-4 h-3 overflow-hidden rounded-full bg-slate-700">
              <View className="h-full w-7/12 rounded-full bg-roast" />
            </View>
            <Text className="mt-3 text-sm text-slate-300">
              현재 패턴이면 3개월 뒤 예상 여유금은 ₩420,000입니다.
            </Text>
          </View>

          <View className="mt-6 rounded-3xl border border-guard-100 bg-white p-4">
            <Text className="font-bold text-ink">자연어 퀵 입력</Text>
            <TextInput
              className="mt-3 min-h-24 rounded-2xl bg-slate-100 p-4 text-base text-ink"
              multiline
              onChangeText={setPrompt}
              placeholder="예: 어제 친구랑 강남에서 삼겹살 먹고 5만 2천원 긁었어"
              placeholderTextColor="#64748B"
              value={prompt}
            />
            <TouchableOpacity className="mt-4 rounded-2xl bg-roast px-5 py-4">
              <Text className="text-center text-base font-black text-white">AI로 분석하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
