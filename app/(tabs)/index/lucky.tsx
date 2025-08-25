// LuckyIndexScreen.js
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useMemo } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const COLORS = {
    bg: "#F0E6FF",
    card: "#FFFFFF",
    chip: "#FFFFFF",
    chipBorder: "#D9C8FF",
    text: "#3B2B54",
    sub: "#7B6E95",
    line: "#E9E1FF",
    purple: "#9C7CFF",
    bullet: "#7F5BFF",
    lemon: "#F5D44B",
    lightBlue: "#CDE7FF",
    orange: "#FFA726",
    deepGreen: "#2E7D32",
};

const SectionTitle = ({ children }) => (
    <Text style={styles.sectionTitle}>{children}</Text>
);

const Chip = ({ children }) => (
    <View style={styles.chip}>
        <Text style={styles.chipText}>{children}</Text>
    </View>
);

function getDotPosition(dir) {
    const edge = 18;
    const center = 54 - 7;
    const map = {
        N: { top: edge, left: center },
        NE: { top: edge, right: edge },
        E: { top: center, right: edge },
        SE: { bottom: edge, right: edge },
        S: { bottom: edge, left: center },
        SW: { bottom: edge, left: edge },
        W: { top: center, left: edge },
        NW: { top: edge, left: edge },
    };
    return map[dir] ?? map.NE;
}

export default function LuckyIndexScreen() {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "幸運指數",
            headerTitleAlign: "center",
            headerTitleStyle: { color: "#663399", fontSize: 20, fontWeight: "700" }, // ← 顏色與字級
            // 若不想改返回箭頭顏色，就不要設定 headerTintColor
        });
    }, [navigation]);

    const luckyDir = "E";
    const dotStyle = useMemo(() => getDotPosition(luckyDir), [luckyDir]);

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* 幸運數字 */}
                <View style={styles.card}>
                    <SectionTitle>幸運數字</SectionTitle>
                    <View style={styles.rowWrap}>
                        {["7", "16", "23", "32", "41"].map((n) => (
                            <Chip key={n}>{n}</Chip>
                        ))}
                    </View>
                </View>

                {/* 幸運色 / 霉運色 */}
                <View style={styles.row2}>
                    <View style={styles.cardHalf}>
                        <SectionTitle>幸運色</SectionTitle>
                        <View style={styles.colorRow}>
                            <View style={styles.colorCol}>
                                <View style={[styles.colorBox, { backgroundColor: COLORS.lemon }]} />
                                <Text style={styles.colorLabelCenter}>檸檬黃</Text>
                            </View>
                            <View style={styles.colorCol}>
                                <View style={[styles.colorBox, { backgroundColor: COLORS.lightBlue }]} />
                                <Text style={styles.colorLabelCenter}>淺藍</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.cardHalf}>
                        <SectionTitle>霉運色</SectionTitle>
                        <View style={styles.colorRow}>
                            <View style={styles.colorCol}>
                                <View style={[styles.colorBox, { backgroundColor: COLORS.orange }]} />
                                <Text style={styles.colorLabelCenter}>橘色</Text>
                            </View>
                            <View style={styles.colorCol}>
                                <View style={[styles.colorBox, { backgroundColor: COLORS.deepGreen }]} />
                                <Text style={styles.colorLabelCenter}>深綠</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* 幸運方位 */}
                <View style={styles.card}>
                    <SectionTitle>幸運方位</SectionTitle>
                    <View style={styles.directionRow}>
                        <View style={styles.compass}>
                            <View style={styles.compassCircle}>
                                <View style={[styles.crossLine, { transform: [{ rotate: "0deg" }] }]} />
                                <View style={[styles.crossLine, { transform: [{ rotate: "90deg" }] }]} />
                                <View style={[styles.crossLineThin, { transform: [{ rotate: "45deg" }] }]} />
                                <View style={[styles.crossLineThin, { transform: [{ rotate: "-45deg" }] }]} />
                                <View style={[styles.dotPointer, dotStyle]} />
                            </View>
                            <Text style={[styles.dirText, { top: -6 }]}>北</Text>
                            <Text style={[styles.dirText, { bottom: -6 }]}>南</Text>
                            <Text style={[styles.dirText, { left: -8, top: "46%" }]}>西</Text>
                            <Text style={[styles.dirText, { right: -8, top: "46%" }]}>東</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={styles.dirPara}>
                                今日幸運方位：<Text style={styles.dirStrong}>
                                    {({ N: "北方", NE: "東北方", E: "東方", SE: "東南方", S: "南方", SW: "西南方", W: "西方", NW: "西北方" }[luckyDir] || "東北方")}
                                </Text>
                            </Text>
                            <Text style={styles.dirSub}>
                                適合前往此方位展開活動{"\n"}或擺放重要物品
                            </Text>
                        </View>
                    </View>
                </View>

                {/* 幸運時段 */}
                <View style={styles.card}>
                    <SectionTitle>幸運時段</SectionTitle>
                    <View style={styles.timeBar}>
                        <View style={styles.timeBlockDim} />
                        <View style={styles.timeBlockBright} />
                        <View style={styles.timeBlockDim} />
                        <View style={styles.timeBlockBrightShort} />
                        <View style={styles.timeBlockDim} />
                    </View>
                    <Text style={styles.timeNote}>
                        今日幸運時段：<Text style={styles.timeStrong}>12:00–14:00</Text>，此時段行動效率最高
                    </Text>
                </View>

                {/* 幸運物品（三欄、整體往右一些） */}
                <View style={[styles.card, { marginBottom: 20 }]}>
                    <SectionTitle>幸運物品</SectionTitle>
                    <View style={styles.itemGrid}>
                        {["水晶飾品", "木質物品", "綠色植物", "紫色衣物", "筆記本", "舒壓香氛"].map((t) => (
                            <View style={styles.itemRow} key={t}>
                                <View style={styles.bullet} />
                                <Text style={styles.itemText}>{t}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1,  backgroundColor: '#f5f3ff', },
    container: { padding: 14, paddingBottom: 24 },

    card: {
        backgroundColor: COLORS.card,
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.line,
    },

    row2: { flexDirection: "row", gap: 12, marginBottom: 12 },
    cardHalf: {
        flex: 1,
        backgroundColor: COLORS.card,
        borderRadius: 16,
        padding: 14,
        borderWidth: 1,
        borderColor: COLORS.line,
    },

    // 小標題統一：#663399、size 16
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#663399",
        marginBottom: 10,
    },

    // 幸運數字：五顆均分
    rowWrap: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    chip: {
        height: 44,
        width: 44,
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.chip,
        borderWidth: 1.5,
        borderColor: COLORS.chipBorder,
    },
    chipText: { fontSize: 16, fontWeight: "700", color: "#663399" },

    // 幸運色／霉運色
    colorRow: { flexDirection: "row", justifyContent: "space-between" },
    colorCol: { width: "47%", alignItems: "center" },
    colorBox: {
        width: 36,
        height: 36,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.line,
        marginBottom: 6,
    },
    colorLabelCenter: {
        fontSize: 13,
        color: COLORS.text,
        fontWeight: "600",
        textAlign: "center",
    },

    // 幸運方位
    directionRow: { flexDirection: "row", alignItems: "center", gap: 16 },
    compass: { width: 120, height: 120, alignItems: "center", justifyContent: "center" },
    compassCircle: {
        width: 108,
        height: 108,
        borderRadius: 54,
        borderWidth: 2,
        borderColor: COLORS.chipBorder,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    crossLine: { position: "absolute", width: 2, height: 92, backgroundColor: COLORS.chipBorder },
    crossLineThin: { position: "absolute", width: 1, height: 92, backgroundColor: COLORS.line },
    dotPointer: { position: "absolute", width: 14, height: 14, borderRadius: 7, backgroundColor: COLORS.purple },
    dirText: { position: "absolute", fontSize: 12, color: COLORS.sub },
    dirPara: { fontSize: 13, color: COLORS.text, marginBottom: 6 },
    dirStrong: { color: "#663399", fontWeight: "800" },
    dirSub: { fontSize: 12, lineHeight: 18, color: COLORS.sub },

    // 幸運時段
    timeBar: {
        height: 22,
        borderRadius: 10,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: COLORS.line,
        flexDirection: "row",
        marginTop: 4,
        marginBottom: 8,
    },
    timeBlockDim: { flex: 1.2, backgroundColor: "#EFE9FF" },
    timeBlockBright: { flex: 1.1, backgroundColor: "#CDBBFF" },
    timeBlockBrightShort: { flex: 0.7, backgroundColor: "#CDBBFF" },
    timeNote: { fontSize: 12, color: COLORS.sub },
    timeStrong: { color: "#663399", fontWeight: "800" },

    // 幸運物品（三欄、往右一些）
    itemGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between", // 三欄平均分布
        rowGap: 10,
        paddingLeft: 8, // 往右一點
    },
    itemRow: {
        width: "30%", // 三欄
        flexDirection: "row",
        alignItems: "center",
    },
    bullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.bullet, marginRight: 6 },
    itemText: { fontSize: 13, color: COLORS.text },
});
