// app/todaysfortune.tsx
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const COLORS = {
    bg: "#F0E6FF",
    primary: "#663399",
    white: "#FFFFFF",
    text: "#3B2B54",
    subtext: "#6F5C90",
    chip: "#E9DCFF",
    star: "#FDBA22",
    divider: "#E7D9FF",
    border: "#E9DDFE",
    accent: "#F28B2B", // 農民曆小標題橘
    danger: "#E85C4A", // 「宜」
    muted: "#9BA0A6",  // 「忌」
};

type StarRowProps = { score?: number };
const StarRow = ({ score = 5 }: StarRowProps) => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
        {Array.from({ length: 5 }).map((_, i) => (
            <Ionicons
                key={i}
                name={i < Math.floor(score) ? "star" : i < score ? "star-half" : "star-outline"}
                size={16}
                color={COLORS.star}
                style={{ marginLeft: i === 0 ? 0 : 3 }}
            />
        ))}
    </View>
);

type ItemRowProps = { emoji: string; title: string; text: string; stars?: number };
const ItemRow = ({ emoji, title, text, stars = 5 }: ItemRowProps) => (
    <View style={styles.itemCard}>
        {/* 標題 + 星星 同一行且靠左 */}
        <View style={styles.itemHeaderRow}>
            <View style={styles.itemTitleRow}>
                <View style={styles.emojiBadge}><Text style={{ fontSize: 16 }}>{emoji}</Text></View>
                <Text style={styles.itemTitle} numberOfLines={1}>{title}</Text>
            </View>
            <View style={{ marginLeft: 8 }}>
                <StarRow score={stars} />
            </View>
        </View>

        <Text style={styles.itemText}>{text}</Text>
    </View>
);

export default function TodaysFortune() {
    const navigation = useNavigation();

    // 用系統 Header，但樣式統一
    useLayoutEffect(() => {
        navigation.setOptions?.({
            headerShown: true,
            title: "今日運勢",
            headerTitleAlign: "center",
            headerTitleStyle: { color: "#663399", fontSize: 20, fontWeight: "700" },
            headerStyle: { backgroundColor: COLORS.white }, // 不拉高，跟另一頁一致
            headerShadowVisible: false,
            headerBackTitleVisible: false,
            // 如果返回箭頭也要深紫，打開下面這行
            // headerTintColor: "#663399",
        });
    }, [navigation]);


    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView contentContainerStyle={styles.container}>
                <ItemRow
                    emoji="🔮"
                    title="今日運勢總覽"
                    text="今天是處女座展現才華的好時機，你的分析能力和細節觀察特別敏銳，嘗試新事物有意外收穫。"
                    stars={4.5}
                />
                <ItemRow
                    emoji="💜"
                    title="愛情運勢"
                    text="單身有告白機會；穩定關係適合安排約會，特別是輕鬆聊天型的行程。"
                    stars={4}
                />
                <ItemRow
                    emoji="💼"
                    title="事業運勢"
                    text="工作上的表現獲得肯定，適合整理報告與數據分析；與人合作能帶來更高效率。"
                    stars={4.5}
                />
                <ItemRow
                    emoji="💰"
                    title="財富運勢"
                    text="理財思路清晰，適合回顧收支、做中短期規劃；投資以穩健為上。"
                    stars={4}
                />
                <ItemRow
                    emoji="🩺"
                    title="健康運勢"
                    text="精神壓力可能較大，建議適度休息與伸展運動，規律作息有助恢復。"
                    stars={3.5}
                />

                {/* 今日需要注意 */}
                <View style={styles.noticeCard}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                        <Ionicons name="alert-circle" size={18} color={COLORS.primary} />
                        <Text style={[styles.cardTitlePurple, { marginLeft: 6 }]}>今日需要注意</Text>
                    </View>
                    <View style={styles.bulletRow}>
                        <Text style={styles.bulletDot}>•</Text>
                        <Text style={styles.bulletText}>避免消耗性爭辯，接受跟進也是一種智慧</Text>
                    </View>
                    <View style={styles.bulletRow}>
                        <Text style={styles.bulletDot}>•</Text>
                        <Text style={styles.bulletText}>調整溝通語氣，避免引發不必要的誤會</Text>
                    </View>
                </View>

                {/* 農民曆（標題在框外） */}
                <View style={{ marginBottom: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                        <Ionicons name="calendar" size={18} color={COLORS.accent} />
                        <Text style={[styles.cardTitleOrange, { marginLeft: 6 }]}>農民曆</Text>
                    </View>

                    {/* 白色框：全部內容 */}
                    <View style={styles.almanacCard}>
                        {/* 國曆/農曆/節氣 */}
                        <View style={styles.innerPanel}>
                            <View style={styles.kvRow}>
                                <Text style={styles.kvKey}>國曆</Text>
                                <Text style={styles.kvVal}>2025 年 6 月 4 日（週三）</Text>
                            </View>
                            <View style={styles.kvRow}>
                                <Text style={styles.kvKey}>農曆</Text>
                                <Text style={styles.kvVal}>五月初九</Text>
                            </View>
                            <View style={[styles.kvRow, { borderBottomWidth: 0 }]}>
                                <Text style={styles.kvKey}>節氣</Text>
                                <Text style={styles.kvVal}>小滿</Text>
                            </View>
                        </View>

                        {/* 宜 / 忌 */}
                        <View style={{ marginTop: 10 }}>
                            <View style={styles.yiJiRow}>
                                <View style={[styles.roundBadge, { backgroundColor: COLORS.danger }]}>
                                    <Text style={styles.roundBadgeText}>宜</Text>
                                </View>
                                <Text style={styles.kvValMulti}>
                                    祭祀、冠帶、祭祀、出行、移徙、入宅、作灶、安床、納財、開市、開倉、納畜、啟攢、解除、開光、入學
                                </Text>
                            </View>
                            <View style={[styles.yiJiRow, { marginTop: 8 }]}>
                                <View style={[styles.roundBadge, { backgroundColor: COLORS.muted }]}>
                                    <Text style={styles.roundBadgeText}>忌</Text>
                                </View>
                                <Text style={styles.kvValMulti}>蓋屋、造橋、安門、安葬、破土、上樑</Text>
                            </View>
                        </View>

                        {/* 小卡 */}
                        <View style={styles.gridRow}>
                            <View style={styles.gridBox}>
                                <Text style={styles.gridKey}>沖</Text>
                                <Text style={styles.gridVal}>（戊戌）狗</Text>
                            </View>
                            <View style={styles.gridBox}>
                                <Text style={styles.gridKey}>煞</Text>
                                <Text style={styles.gridVal}>南方</Text>
                            </View>
                        </View>

                        <View style={styles.gridRow}>
                            <View style={styles.gridBox}>
                                <Text style={styles.gridKey}>吉時</Text>
                                <Text style={styles.gridVal}>時辰、時鳴、生氣、要安</Text>
                            </View>
                            <View style={styles.gridBox}>
                                <Text style={styles.gridKey}>凶煞</Text>
                                <Text style={styles.gridVal}>五虛、八風、九坎、地煞、天牢</Text>
                            </View>
                        </View>

                        <View style={styles.gridRow}>
                            <View style={[styles.gridBox, { flex: 1 }]}>
                                <Text style={styles.gridKey}>方位</Text>
                                <Text style={styles.gridVal}>喜神東北 福神正北 財神東北</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ height: 24 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#f5f3ff'},
    container: { padding: 16, paddingBottom: 0 },

    /* ===== 運勢卡 ===== */
    itemCard: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 12,
        marginBottom: 13,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 1,
    },
    itemHeaderRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    itemTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        flexShrink: 1,
    },
    emojiBadge: {
        width: 24, height: 24, borderRadius: 12,
        backgroundColor: COLORS.chip, alignItems: "center", justifyContent: "center",
        marginRight: 8,
    },
    itemTitle: { color: COLORS.text, fontWeight: "700", fontSize: 16, maxWidth: 180 },
    itemText: { color: COLORS.subtext, fontSize: 13.5, lineHeight: 22, marginTop: 8, marginBottom: 2 },

    /* ===== 小節標題 ===== */
    cardTitlePurple: { color: COLORS.primary, fontWeight: "700", fontSize: 16 },
    cardTitleOrange: { color: COLORS.accent, fontWeight: "700", fontSize: 16 },

    /* ===== 注意卡 ===== */
    noticeCard: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 12,
        marginTop: 8,
        marginBottom: 10,
    },
    bulletRow: { flexDirection: "row", alignItems: "flex-start", marginTop: 4 },
    bulletDot: { color: COLORS.primary, marginRight: 6, fontSize: 14, lineHeight: 20 },
    bulletText: { color: COLORS.subtext, fontSize: 13.5, lineHeight: 20, flex: 1, marginBottom: 2 },

    /* ===== 農民曆 ===== */
    almanacCard: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 12,
    },
    innerPanel: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: "hidden",
    },
    kvRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    kvKey: { width: 48, color: COLORS.text, fontWeight: "700", fontSize: 14 },
    kvVal: { color: COLORS.subtext, fontSize: 14, flex: 1 },

    yiJiRow: { flexDirection: "row", alignItems: "flex-start" },
    roundBadge: {
        width: 23, height: 23, borderRadius: 11,
        alignItems: "center", justifyContent: "center",
        marginRight: 8,
    },
    roundBadgeText: { color: COLORS.white, fontWeight: "700", fontSize: 14 },
    kvValMulti: { color: COLORS.subtext, fontSize: 14, lineHeight: 20, flex: 1 },

    gridRow: { flexDirection: "row", gap: 10, marginTop: 10 },
    gridBox: {
        flex: 1,
        backgroundColor: "#F7F1FF",
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    gridKey: { color: COLORS.text, fontWeight: "700", fontSize: 15, marginBottom: 4 },
    gridVal: { color: COLORS.subtext, fontSize: 14, lineHeight: 18 },
});
