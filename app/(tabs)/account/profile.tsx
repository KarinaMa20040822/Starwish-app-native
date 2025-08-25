import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <Image source={require("@/assets/images/virgo.png")} style={styles.avatar} />
        <View style={styles.proTag}>
          <Text style={styles.proText}>PRO</Text>
        </View>
        <Text style={styles.nickname}>仙女下凡</Text>
        <Text style={styles.constellation}>處女座</Text>
      </View>

      {/* 會員資料：兩欄 × 兩列，置左 */}
      <View style={styles.section}>
        <Text style={styles.memberTitle}>會員資料</Text>
          <View style={styles.infoGridOut}>
            <View style={styles.infoGrid}>
              <Field label="生日" value="1990/09/15" />
              <Field label="生肖" value="馬" />
              <Field label="MBTI" value="INFJ" />
              <Field label="信仰偏好" value="西方" />
            </View>
        </View>
      </View>

      {/* 會員功能（四個置於同一行） */}
      <View style={styles.section}>
        <Text style={styles.memberTitle}>會員功能</Text>
        <View style={styles.featureRow}>
          <Feature
            icon={require("@/assets/images/heart.png")}
            label="收藏記錄"
            to="./savehistory"
            onPress={(to) => router.push(to)}
          />
          <Feature
            icon={require("@/assets/images/history.png")}
            label="占卜歷史"
            to="./askhistory"
            onPress={(to) => router.push(to)}
          />

          <Feature
            icon={require("@/assets/images/relation.png")}
            label="利害關係"
            to="./stakeholder"
            onPress={(to) => router.push(to)}
          />
          <Feature
            icon={require("@/assets/images/reward.png")}
            label="積分"
            to="./mypoint"
            onPress={(to) => router.push(to)}
          />
        </View>
      </View>

      {/* 活動資訊 */}
      <View style={styles.sectionRow}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>社群活動</Text>
          <Text style={styles.infoText}>討論參與：12次</Text>
          <Text style={styles.infoText}>獲得點讚：35次</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>商城訂單</Text>
          <Text style={styles.infoText}>待收貨：1件</Text>
          <Text style={styles.infoText}>歷史訂單：5筆</Text>
        </View>
      </View>

      <Text style={styles.footer}>© 2025 星願指引 版權所有</Text>
    </ScrollView>
  );
}

/** 兩欄中的單一欄位（置左） */
function Field({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}：</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
}

/** 可點擊的功能卡片 */
function Feature({
  icon,
  label,
  to,
  onPress,
}: {
  icon: any;
  label: string;
  to: string;
  onPress: (to: string) => void;
}) {
  return (
    <Pressable style={styles.featureItem} onPress={() => onPress(to)}>
      <Image source={icon} style={{ width: 35, height: 35, marginBottom: 6 }} />
      <Text style={styles.featureText} numberOfLines={1} ellipsizeMode="tail">
        {label}
      </Text>
    </Pressable>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f3ff",
    paddingHorizontal: 20,
  },

  /** Avatar */
  avatarContainer: { alignItems: "center", marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  proTag: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    position: "absolute",
    top: 10,
    right: 110,
    elevation: 2,
  },
  proText: { color: "orange", fontWeight: "bold", fontSize: 12 },
  nickname: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  constellation: { fontSize: 14, color: "#888" },

  /** 區塊 */
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  memberTitle: { fontSize: 15, fontWeight: "bold", marginBottom: 10 },
    infoGridOut: {
      alignItems:"center"
    },
  /** 會員資料：兩欄 × 兩列（置左） */
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width:"90%",
  },
  field: {
    width: "50%",                // 兩欄
    flexDirection: "row",
    marginBottom: 8,
    paddingRight: 8,             
  },
  fieldLabel: { fontSize: 14, color: "#333", fontWeight: "500" },
  fieldValue: { fontSize: 14, color: "#333", flexShrink: 1 },

  /** 會員功能：四個平均分散在一列 */
    featureRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 4,
    },
    featureItem: {
      width: "25%",
      alignItems: "center",
      paddingVertical: 8,
    },
    featureText: {
      fontSize: 12,
      marginTop: 4,
      textAlign: "center",
    },
  /** 下方資訊卡 */
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
  },
  infoTitle: { fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  infoText: { fontSize: 13, color: "#444", textAlign: "center" },

  footer: { textAlign: "center", fontSize: 12, color: "#888", marginTop: 12 },
});
