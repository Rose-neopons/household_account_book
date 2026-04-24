import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import { cn } from '../src/design-system/cn';
import { ui } from '../src/design-system/ui';

const yearChips = ['1년 뒤', '3년 뒤', '5년 뒤', '10년 뒤'];
const rainDates = [
  { label: '지금 속도 유지', value: '2026년 11월 18일', tone: '#FF8FB8' },
  { label: '커피 30% 줄이기', value: '2027년 3월 12일', tone: '#86D7C7' },
  { label: '택시 20% 줄이기', value: '2027년 5월 7일', tone: '#93C5FD' },
];

const shadowCard = {
  shadowColor: '#EAB0C8',
  shadowOffset: { width: 0, height: 14 },
  shadowOpacity: 0.16,
  shadowRadius: 24,
};

export default function FutureSimulatorScreen() {
  return (
    <SafeAreaView className={ui.screen} style={{ flex: 1, backgroundColor: '#FFF8FC' }}>
      <ScrollView
        className={ui.scroll}
        contentContainerClassName={ui.content}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 36 }}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        <View className="absolute -right-[30px] top-6 h-[180px] w-[180px] rounded-full bg-app-peach" />
        <View className="absolute -left-10 top-[260px] h-[140px] w-[140px] rounded-full bg-app-skySoft" />

        <View className={ui.heroCard} style={shadowCard}>
          <View className="items-center">
            <View className={ui.mascotBall}>
              <Text style={{ color: '#6650A4', fontSize: 28, fontWeight: '700' }}>
                ૮ • ﻌ - ა
              </Text>
            </View>
          </View>
          <Text className={ui.eyebrowBlue}>Future Impact Simulator</Text>
          <Text className={ui.heroTitleCenter}>
            커피들이 모이면{'\n'}무엇이 될까요?
          </Text>
          <Text className={ui.heroSubtitle}>
            소소한 지출이 얼마나 크게 자라는지, 포켓가드가 마법처럼 보여줄게요.
          </Text>
        </View>

        <View className={cn(ui.sectionCard, 'bg-app-blueSoft')}>
          <Text className={ui.sectionTitle}>둥글둥글 타임 슬라이더</Text>
          <Text className={ui.bodyText}>
            지금은 5년 뒤 기준으로 보고 있어요. 매주 사는 커피가 작은 자동차
            저금통으로 커지고 있어요.
          </Text>

          <View className={ui.chipRow}>
            {yearChips.map((chip, index) => (
              <View
                key={chip}
                className={cn(ui.chip, index === 2 && ui.chipActive)}
              >
                <Text
                  className={cn(
                    ui.chipText,
                    index === 2 && ui.chipTextActive,
                  )}
                >
                  {chip}
                </Text>
              </View>
            ))}
          </View>

          <View className={ui.timelineTrack}>
            <View className="ml-1 h-3 w-[58%] rounded-full bg-app-rainBlue" />
            <View className="absolute right-[38%] h-7 w-7 items-center justify-center rounded-full bg-app-blue">
              <MaterialCommunityIcons
                color="#FFFFFF"
                name="star-four-points"
                size={16}
              />
            </View>
          </View>
        </View>

        <View className={cn(ui.sectionCard, 'bg-[#FFF6E8]')}>
          <Text className={ui.sectionTitle}>스노우볼 효과</Text>
          <Text className={ui.bodyText}>
            매일 한 잔씩 사는 커피가 5년 뒤에는 취미 드라이브 예산으로 변해요.
          </Text>

          <View className="mt-[18px] flex-row items-center justify-between">
            <View className={ui.cardBubble}>
              <MaterialCommunityIcons
                color="#7F60A6"
                name="coffee-outline"
                size={26}
              />
            </View>
            <View className={ui.cardBubble}>
              <MaterialCommunityIcons
                color="#7F60A6"
                name="coffee-outline"
                size={26}
              />
            </View>
            <View className={ui.cardBubble}>
              <MaterialCommunityIcons
                color="#7F60A6"
                name="coffee-outline"
                size={26}
              />
            </View>
            <MaterialCommunityIcons
              color="#6B5CA5"
              name="arrow-right-thin"
              size={28}
            />
            <View className={cn(ui.cardBubble, 'bg-app-mint')}>
              <MaterialCommunityIcons
                color="#1E6D63"
                name="car-convertible"
                size={28}
              />
            </View>
          </View>

          <View className="mt-[18px] rounded-[24px] bg-app-white p-4">
            <Text className={ui.bodyText}>
              커피 습관을 30%만 줄이면 5년 뒤 약 2,340,000원을 남길 수 있어요.
            </Text>
          </View>
        </View>

        <View className={cn(ui.sectionCard, 'bg-app-lavenderSoft')}>
          <Text className={ui.sectionTitle}>파산 예보</Text>
          <Text className={ui.bodyText}>
            현재 지출 속도를 유지하면 잔고 하늘에 비가 내리는 날짜를 미리 알려줘요.
          </Text>

          {rainDates.map((item) => (
            <View key={item.label} className={ui.weatherRow}>
              <View
                className={ui.weatherIcon}
                style={{ backgroundColor: `${item.tone}22` }}
              >
                <MaterialCommunityIcons
                  color={item.tone}
                  name="weather-rainy"
                  size={20}
                />
              </View>
              <View className="flex-1">
                <Text className="font-guard text-[15px] text-[#635B83]">
                  {item.label}
                </Text>
                <Text className="mt-1 font-guard text-[13px] text-[#8A84A3]">
                  {item.value}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
