// HomeScreen.js
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const COLORS = {
  bg: "#F0E6FF",
  primary: "#663399",
  white: "#FFFFFF",
  text: "#3B2B54",
  subtext: "#6F5C90",
  chip: "#E9DCFF",
  star: "#FDBA22",
  divider: "#E7D9FF",
  lilac: "#EBDDFF",
};

const posts = [
  {
    id: 1,
    avatar: "👩‍🔬",
    name: "處女座研究社",
    time: "1小時前",
    body:
      "【本月運勢分析】處女座將迎來事業上的重要機會，同時在健康方面需多注意。幸運水晶：紫水晶、黃水晶",
    likes: 42,
    comments: 15,
    shares: 8,
  },
  {
    id: 2,
    avatar: "🧙‍♂️",
    name: "占星工坊",
    time: "3小時前",
    body:
      "水星順行帶來溝通順暢，特別利於談判、寫作與考試。建議今天把待辦清單逐一完成！",
    likes: 67,
    comments: 21,
    shares: 5,
  },
  {
    id: 3,
    avatar: "🌙",
    name: "月亮日誌",
    time: "昨天",
    body:
      "睡前儀式感：點蠟燭＋5分鐘冥想，有助提升隔日體力與專注。試試看『4-7-8 呼吸法』。",
    likes: 89,
    comments: 33,
    shares: 12,
  },
];


export default function IndexScreen() {
    const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* 今日運勢 */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>今日運勢</Text>
            <View style={styles.pillCircle}>
              <Text style={styles.pillText}>♍︎</Text>
            </View>
          </View>

          {/* 標題 + 星星同一行 */}
          <View style={styles.titleRow}>
            <Text style={styles.blockTitle} numberOfLines={1}>整體運勢</Text>
            <View style={styles.starRow}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Ionicons
                  key={i}
                  name={i < 4 ? "star" : "star-half"}
                  size={16}
                  color={COLORS.star}
                  style={{ marginLeft: 4 }}
                />
              ))}
            </View>
          </View>

          <Text style={styles.paragraph}>
            處女座的你今天充滿活力，適合嘗試新事物，可能會有意外小收穫。
          </Text>

          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => router.push("/todaysfortune")}
            activeOpacity={0.7}
          >
            <Text style={styles.linkText}>查看完整運勢 ></Text>
          </TouchableOpacity>
        </View>

        {/* 幸運指數 / 利害關係人運勢 */}
        <View style={styles.row}>
          {/* 幸運指數 */}
          <View style={[styles.card, styles.half, styles.withBottomLink, { marginRight: 8 }]}>
            <Text style={styles.sectionTitle}>幸運指數</Text>

            <View style={styles.luckRow}>
              {/* 左：幸運顏色 */}
              <View style={styles.luckCol}>
                <View style={styles.dot} />
                <Text style={styles.subNoteCenter}>檸檬黃</Text>
              </View>

              {/* 右：幸運數字 */}
              <View style={styles.luckCol}>
                <View style={styles.numBadge}>
                  <Text style={styles.numText}>7</Text>
                </View>
                <Text style={styles.subNoteCenter}>幸運數字</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.bottomLink}
              onPress={() => router.push("/lucky")}
              activeOpacity={0.7}
            >
              <Text style={styles.linkText}>查看詳情 ></Text>
            </TouchableOpacity>
          </View>

          {/* 利害關係人運勢 + 今日貴人 */}
          <View style={[styles.card, styles.half, styles.withBottomLink, { marginLeft: 8 }]}>
            <Text style={styles.sectionTitle}>利害關係人運勢</Text>

            <View style={{ height: 6 }} />

            <View style={styles.personRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarEmoji}>👨🏻‍💼</Text>
              </View>
              <View>
                <Text style={styles.tagText}>宜：入學、開市</Text>
                <Text style={styles.tagText}>忌：爭執、衝動</Text>
              </View>
            </View>

            {/* 第二個大標題 */}
            <Text style={[styles.sectionTitle, { marginTop: 8, marginBottom: 6 }]}>今日貴人</Text>

            <View style={styles.personRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarEmoji}>🧑🏻‍🦱</Text>
              </View>
            </View>

          <TouchableOpacity
            style={styles.bottomLink}
            onPress={() => router.push("/stakeholder")}
          >
            <Text style={styles.linkText}>查看詳情 ></Text>
          </TouchableOpacity>

          </View>
        </View>

        {/* 熱門話題 標題 */}
        <Text style={[styles.sectionTitle, { marginTop: 6, marginBottom: 8 }]}>熱門話題</Text>

        {/* 熱門話題：三篇 */}
        {posts.map((p) => (
          <View style={styles.card} key={p.id}>
            <View style={styles.topicHeader}>
              <View style={styles.topicAvatar}>
                <Text style={styles.avatarEmoji}>{p.avatar}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                  <Text style={styles.topicName}>{p.name}</Text>
                  <Text style={styles.topicTime}> ・ {p.time}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.topicBody}>{p.body}</Text>

            <View style={styles.imageRow}>
              <View style={[styles.phImage, { marginRight: 10 }]} />
              <View style={styles.phImage} />
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.metaText}>{p.likes} 讚</Text>
              <Text style={styles.dotSep}>·</Text>
              <Text style={styles.metaText}>{p.comments} 留言</Text>
              <Text style={styles.dotSep}>·</Text>
              <Text style={styles.metaText}>{p.shares} 分享</Text>
            </View>
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f3ff'},
  container: { padding: 16, paddingBottom: 0 },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    position: "relative",
  },

  withBottomLink: { paddingBottom: 52 },

  row: { flexDirection: "row" },
  half: { flex: 1 },
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },

  sectionTitle: { color: COLORS.primary, fontSize: 18, fontWeight: "700" },

  titleRow: { flexDirection: "row", alignItems: "center", marginTop: 8, marginBottom: 6 },
  blockTitle: { color: COLORS.text, fontSize: 16, fontWeight: "700", marginRight: 8, maxWidth: "60%" },
  starRow: { flexDirection: "row", alignItems: "center", marginLeft: 4 },

  pillCircle: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: COLORS.chip, alignItems: "center", justifyContent: "center",
  },
  pillText: { color: COLORS.primary, fontWeight: "700" },

  paragraph: { color: COLORS.subtext, lineHeight: 20, fontSize: 14 },

  linkRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  linkText: { color: COLORS.primary, fontWeight: "700", marginRight: 2, fontSize: 13, marginTop: 5 },

  bottomLink: {
    position: "absolute", right: 16, bottom: 14, flexDirection: "row", alignItems: "center",
  },

  // 幸運指數
  luckRow: {
    flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between",
    marginTop: 10, paddingRight: 8, paddingLeft: 8,
  },
  luckCol: { width: "45%", alignItems: "center", justifyContent: "flex-start", marginTop: 15 },
  dot: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#F4C542", marginBottom: 8 },
  numBadge: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.lilac,
    alignItems: "center", justifyContent: "center", marginBottom: 8,
  },
  numText: { fontSize: 18, fontWeight: "800", color: COLORS.primary },
  subNoteCenter: { marginTop: 0, color: COLORS.subtext, fontSize: 12, textAlign: "center" },

  // 人物
  personRow: { flexDirection: "row", alignItems: "center", marginBottom: 1 },
  avatar: { alignItems: "center", justifyContent: "center", marginRight: 8, marginTop: 3 },
  avatarEmoji: { fontSize: 24, lineHeight: 26 }, // ⬅️ 放大 emoji

  tagText: { color: COLORS.subtext, fontSize: 15, },

  // 熱門話題
  topicHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  topicAvatar: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.chip,
    alignItems: "center", justifyContent: "center", marginRight: 8,
  },
  topicName: { color: COLORS.text, fontWeight: "700" },
  topicTime: { color: COLORS.subtext, fontSize: 12 },
  topicBody: { color: COLORS.subtext, fontSize: 13, lineHeight: 20, marginBottom: 8 },

  imageRow: { flexDirection: "row" },
  phImage: { flex: 1, height: 86, borderRadius: 12, backgroundColor: COLORS.divider },

  metaRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  metaText: { color: COLORS.subtext, fontSize: 12 },
  dotSep: { marginHorizontal: 6, color: COLORS.subtext },
});
