import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const FONT_BODY = 'MemomentKkukkukk';
const FONT_TITLE = 'MemomentKkukkukk';

const chatRows = [
  {
    side: 'user' as const,
    icon: 'account-heart-outline' as const,
    iconColor: '#C05E8C',
    text: '이거 사도 돼? 한정판 헤드셋이 너무 귀여워…',
  },
  {
    side: 'ai' as const,
    icon: 'message-processing-outline' as const,
    iconColor: '#5F4A8A',
    text: '지금 사면 이번 주 점심 예산이 조금 얇아져요. 그래도 완전 위험한 건 아니에요.',
  },
  {
    side: 'ai' as const,
    icon: 'message-processing-outline' as const,
    iconColor: '#5F4A8A',
    text: '정말 필요한지 세 번만 더 생각하면, 이번 달 목표 자산에 5% 더 가까워질 수 있어요.',
  },
];

export default function GuardianScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.page}>
          <View style={styles.glowMint} />
          <View style={styles.glowPink} />

          <View style={styles.heroCard}>
            <View style={styles.stampRow}>
              <View style={styles.mascotFaceWrap}>
                <Text style={styles.mascotFace}>૮ • ﻌ - ა</Text>
              </View>
              <View style={styles.stampBadge}>
                <Text style={styles.stampText}>보류</Text>
              </View>
            </View>

            <Text style={styles.eyebrow}>The Purchase Guardian</Text>
            <Text style={styles.title}>지름신 방어 에이전트</Text>
            <Text style={styles.subtitle}>
              결제 직전에 물어보면, 포켓가드가 독설과 격려를 섞어서 판결해줘요.
            </Text>
          </View>

          <View style={styles.sectionCardMint}>
            <Text style={styles.sectionTitle}>상담실 티키타카</Text>

            {chatRows.map((row, index) => (
              <View
                key={`${row.side}-${index}`}
                style={[
                  styles.chatBubble,
                  row.side === 'user' ? styles.userBubble : styles.aiBubble,
                ]}
              >
                <MaterialCommunityIcons
                  color={row.iconColor}
                  name={row.icon}
                  size={20}
                />
                <Text
                  style={[
                    styles.chatText,
                    row.side === 'user' ? styles.userText : styles.aiText,
                  ]}
                >
                  {row.text}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.sectionCardLavender}>
            <Text style={styles.sectionTitle}>기회비용 비교 카드</Text>

            <View style={styles.compareOption}>
              <View style={[styles.compareIcon, { backgroundColor: '#FFE4EC' }]}>
                <MaterialCommunityIcons
                  color="#D3638F"
                  name="store-outline"
                  size={22}
                />
              </View>
              <View style={styles.compareBody}>
                <Text style={styles.compareTitle}>지금 사면</Text>
                <Text style={styles.compareText}>
                  이번 주 점심은 편의점 모드로 조정될 가능성이 커요.
                </Text>
              </View>
            </View>

            <View style={styles.compareOption}>
              <View style={[styles.compareIcon, { backgroundColor: '#DDFBF1' }]}>
                <MaterialCommunityIcons
                  color="#1E6D63"
                  name="piggy-bank-outline"
                  size={22}
                />
              </View>
              <View style={styles.compareBody}>
                <Text style={styles.compareTitle}>안 사면</Text>
                <Text style={styles.compareText}>
                  이번 달 목표 자산에 5% 더 가까워지고, 주말 외식도 여유 있어요.
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.ctaCard}>
            <View style={styles.ctaHighlight}>
              <MaterialCommunityIcons
                color="#FFFFFF"
                name="star-four-points"
                size={18}
              />
              <Text style={styles.ctaPrimaryText}>안 살게요!</Text>
            </View>

            <Text style={styles.ctaSecondaryText}>
              오늘 한 번 참으면 포켓가드가 내일 더 환하게 웃어줄 거예요.
            </Text>
          </View>
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
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 36,
  },
  page: {
    flex: 1,
  },
  glowMint: {
    position: 'absolute',
    top: 40,
    left: -24,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#DDFBF1',
  },
  glowPink: {
    position: 'absolute',
    top: 260,
    right: -34,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FFE4EC',
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
  stampRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mascotFaceWrap: {
    width: 98,
    height: 98,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF1F7',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  mascotFace: {
    color: '#6650A4',
    fontSize: 28,
    fontWeight: '700',
  },
  stampBadge: {
    borderRadius: 22,
    borderWidth: 3,
    borderColor: '#FF8FB8',
    paddingHorizontal: 16,
    paddingVertical: 10,
    transform: [{ rotate: '-10deg' }],
  },
  stampText: {
    color: '#FF6FA6',
    fontFamily: FONT_TITLE,
    fontSize: 18,
  },
  eyebrow: {
    marginTop: 14,
    color: '#5AAE9F',
    fontFamily: FONT_TITLE,
    fontSize: 13,
    letterSpacing: 1.2,
  },
  title: {
    marginTop: 10,
    color: '#362F63',
    fontFamily: FONT_TITLE,
    fontSize: 30,
    lineHeight: 38,
  },
  subtitle: {
    marginTop: 10,
    color: '#716D91',
    fontFamily: FONT_BODY,
    fontSize: 15,
    lineHeight: 22,
  },
  sectionCardMint: {
    marginTop: 16,
    borderRadius: 30,
    backgroundColor: '#EAFBF4',
    padding: 20,
  },
  sectionCardLavender: {
    marginTop: 16,
    borderRadius: 30,
    backgroundColor: '#F6F1FF',
    padding: 20,
  },
  sectionTitle: {
    color: '#3F3564',
    fontFamily: FONT_TITLE,
    fontSize: 20,
  },
  chatBubble: {
    marginTop: 14,
    flexDirection: 'row',
    borderRadius: 24,
    padding: 16,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFF0F7',
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  chatText: {
    flex: 1,
    marginLeft: 10,
    fontFamily: FONT_BODY,
    fontSize: 14,
    lineHeight: 21,
  },
  userText: {
    color: '#7B5770',
  },
  aiText: {
    color: '#5A5778',
  },
  compareOption: {
    marginTop: 16,
    flexDirection: 'row',
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  compareIcon: {
    width: 46,
    height: 46,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compareBody: {
    flex: 1,
    marginLeft: 14,
  },
  compareTitle: {
    color: '#51476F',
    fontFamily: FONT_TITLE,
    fontSize: 16,
  },
  compareText: {
    marginTop: 4,
    color: '#746E8D',
    fontFamily: FONT_BODY,
    fontSize: 14,
    lineHeight: 21,
  },
  ctaCard: {
    marginTop: 16,
    borderRadius: 30,
    backgroundColor: '#FFF7D6',
    padding: 20,
    alignItems: 'center',
  },
  ctaHighlight: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: '#FF8FB8',
    paddingHorizontal: 20,
    paddingVertical: 18,
    shadowColor: '#FF8FB8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
  },
  ctaPrimaryText: {
    marginLeft: 8,
    color: '#FFFFFF',
    fontFamily: FONT_TITLE,
    fontSize: 22,
  },
  ctaSecondaryText: {
    marginTop: 14,
    textAlign: 'center',
    color: '#826E49',
    fontFamily: FONT_BODY,
    fontSize: 14,
    lineHeight: 21,
  },
});
