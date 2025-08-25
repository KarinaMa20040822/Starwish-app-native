import React, { useState } from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { useRouter } from "expo-router";

type PushTypeKey = "zodiac" | "lunar" | "relationship";

const pushOptions: { label: string; key: PushTypeKey }[] = [
  { label: "星座運勢", key: "zodiac" },
  { label: "農民曆提醒", key: "lunar" },
  { label: "利害關係人運勢", key: "relationship" },
];
const router = useRouter();
export default function SettingScreen() {
  const [pushEnabled, setPushEnabled] = useState(false);
  const [selectedBelief, setSelectedBelief] = useState<"eastern" | "western">("eastern");
  const [pushTypes, setPushTypes] = useState<{
    zodiac: boolean;
    lunar: boolean;
    relationship: boolean;
  }>({
    zodiac: false,
    lunar: false,
    relationship: false,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>帳號設定</Text>
      <View style={styles.itemRow}>
        <Text style={styles.itemText}>個人資料</Text>
        <Text style={styles.arrow}>→</Text>
      </View>
          <Pressable style={styles.itemRow} onPress={() => router.push("/subscribe")}>
            <Text style={styles.itemText}>訂閱管理</Text>
            <Text style={styles.arrow}>→</Text>
          </Pressable>
      <View style={styles.itemRow}>
        <Text style={styles.itemText}>LINE 帳號綁定</Text>
        <Text style={styles.boundLabel}>已綁定</Text>
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>偏好設定</Text>
          <Text style={styles.itemText}>信仰偏好</Text>
          <View style={styles.beliefRow}>
            <Pressable
              style={
                selectedBelief === "eastern"
                  ? styles.beliefBtnSelected
                  : styles.beliefBtn
              }
              onPress={() => setSelectedBelief("eastern")}
            >
              <Text
                style={
                  selectedBelief === "eastern"
                    ? styles.beliefTextSelected
                    : styles.beliefText
                }
              >
                東方信仰
              </Text>
            </Pressable>

            <Pressable
              style={
                selectedBelief === "western"
                  ? styles.beliefBtnSelected
                  : styles.beliefBtn
              }
              onPress={() => setSelectedBelief("western")}
            >
              <Text
                style={
                  selectedBelief === "western"
                    ? styles.beliefTextSelected
                    : styles.beliefText
                }
              >
                西方信仰
              </Text>
            </Pressable>
          </View>

          <Text style={styles.helperText}>
            {selectedBelief === "eastern"
              ? "包含：易經、農民曆、生肖、道教等"
              : "包含：塔羅牌、占星術等"}
          </Text>
          <Text style={[styles.sectionTitle, { marginTop: 24 }]}>通知設定</Text>
      <View style={styles.switchRow}>
        <Text style={styles.itemText}>開啟推播通知</Text>
        <Switch value={pushEnabled} onValueChange={setPushEnabled} />
      </View>

      <Text style={[styles.itemText, { marginTop: 16 }]}>選擇推播類型</Text>
      {pushOptions.map(({ label, key }) => (
        <View style={styles.switchRow} key={key}>
          <Text style={styles.itemText}>{label}</Text>
          <Switch
            value={pushTypes[key]}
            onValueChange={(val) =>
              setPushTypes((prev) => ({ ...prev, [key]: val }))
            }
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f5f3ff',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  itemText: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 20,
    color: "#999",
  },
  boundLabel: {
    fontSize: 14,
    color: "#fff",
    backgroundColor: "#BFA2E0",
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 2,
    overflow: "hidden",
  },
  beliefRow: {
    flexDirection: "row",
    marginTop: 8,
    gap: 12,
  },
  beliefBtnSelected: {
    flex: 1,
    backgroundColor: "#BFA2E0",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  beliefBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#BFA2E0",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  beliefText: {
    color: "#BFA2E0",
    fontWeight: "500",
  },
  beliefTextSelected: {
    color: "#fff",
    fontWeight: "500",
  },
  helperText: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
});
