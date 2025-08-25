import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CommunityIndex() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("熱門");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const tabs = ["熱門", "最新", "關注", "我的星座"];

  const handleTopicPress = (topic: string) => {
    setSelectedTopic(topic === selectedTopic ? null : topic);
  };

  const isVisible = (content: string) => {
    if (!selectedTopic) return true;
    return content.includes(selectedTopic);
  };

  // 跳轉到 /community/post
  const openPost = () => {
    router.push("/community/post");
  };

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchBarBack}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#9ca3af" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="搜尋星座、話題..."
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={styles.tabWrapper}>
            <Text style={[styles.tab, activeTab === tab && styles.activeTab]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollArea}>
        {/* Post Card 1 */}
        {isVisible("#水晶選擇") && (
          <TouchableOpacity activeOpacity={0.85} onPress={openPost}>
            <View style={styles.postCard}>
              <View style={styles.postHeader}>
                <Image source={require("../../../assets/images/icon.png")} style={styles.avatar} />
                <View>
                  <Text style={styles.username}>水瓶座小精靈</Text>
                  <Text style={styles.postTime}>20分鐘前</Text>
                </View>
              </View>
              <Text style={styles.postContent}>
                今天水星與火星相位，水瓶座朋友別忘了多喝水，記得照顧自己的情緒～
                推薦使用薰衣草精油幫助放鬆
              </Text>
              <View style={styles.imageRow}>
                <Image source={require("../../../assets/images/perfume.jpg")} style={styles.postImage} />
              </View>
              <Text style={styles.postFooter}>14 讚 ・ 3 留言 ・ 2 分享</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Post Card 2 */}
        {isVisible("#星座相位解析") && (
          <TouchableOpacity activeOpacity={0.85} onPress={openPost}>
            <View style={styles.postCard}>
              <View style={styles.postHeader}>
                <Image source={require("../../../assets/images/icon.png")} style={styles.avatar} />
                <View>
                  <Text style={styles.username}>處女座研究社</Text>
                  <Text style={styles.postTime}>1小時前</Text>
                </View>
              </View>
              <Text style={styles.postContent}>
                【本月運勢分析】處女座將迎來事業上的重要機會，同時健康方面需多注意。
                幸運水晶：紫水晶、黃水晶
              </Text>
              <View style={styles.imageRow}>
                <Image source={require("../../../assets/images/perfume.jpg")} style={styles.postImage} />
              </View>
              <Text style={styles.postFooter}>42 讚 ・ 15 留言 ・ 8 分享</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Hot Topics */}
        <View style={styles.hotTopics}>
          <Text style={styles.hotTopicsTitle}>熱門話題</Text>
          <View style={styles.hotTopicsList}>
            {["#金牛座新月", "#星座相位", "#水晶選擇"].map((topic) => (
              <TouchableOpacity
                key={topic}
                style={[
                  styles.hotTopic,
                  selectedTopic === topic && styles.hotTopicSelected,
                ]}
                onPress={() => handleTopicPress(topic)}
                activeOpacity={0.85}
              >
                <Text style={styles.hotTopicText}>{topic}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/community/uploadPost")}
        activeOpacity={0.85}
      >
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f3ff" },
  scrollArea: { paddingBottom: 100 },
  searchBarBack: { backgroundColor: "white" },
  searchBar: {
    flexDirection: "row",
    margin: 16,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#e9d5ff",
    alignItems: "center",
  },
  input: { flex: 1, fontSize: 14, color: "#111827" },
  searchIcon: { marginRight: 8 },

  tabs: {
    flexDirection: "row",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#ddd6fe",
    justifyContent: "space-around",
    paddingBottom: 5,
  },
  tabWrapper: { flex: 1, alignItems: "center" },
  tab: { fontSize: 14, color: "#a78bfa", paddingVertical: 8 },
  activeTab: { fontWeight: "bold", color: "#6b21a8", borderBottomWidth: 2, borderColor: "#6b21a8" },

  postCard: { backgroundColor: "white", borderRadius: 16, margin: 16, padding: 16 },
  postHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8, gap: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 8 },
  postImage: { width: 120, height: 90, borderRadius: 8, marginBottom: 10, resizeMode: "cover" },
  imageRow: { flexDirection: "row", justifyContent: "flex-start", gap: 10, marginVertical: 10 },
  username: { fontWeight: "600", color: "#4c1d95", fontSize: 14 },
  postTime: { fontSize: 12, color: "#9ca3af" },
  postContent: { fontSize: 14, color: "#1f2937", marginVertical: 8 },
  postFooter: { fontSize: 12, color: "#6b7280", marginTop: 4 },

  // ★ 熱門話題：自適應寬度 + 換行 + 靠左
  hotTopics: { backgroundColor: "white", margin: 16, padding: 16, borderRadius: 16 },
  hotTopicsTitle: { fontWeight: "bold", color: "#6b21a8", fontSize: 16, marginBottom: 12 },
  hotTopicsList: {
    flexDirection: "row",
    flexWrap: "wrap",      // 需要時換行
    alignItems: "center",
    gap: 10,               // 若 RN 版不支援 gap，可改為 hotTopic 上加 margin
  },
  hotTopic: {
    backgroundColor: "#B69EE5",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 9999,
    alignSelf: "flex-start", // 以內容寬度排版
    // 若不支援 gap，開下面兩行：
    // marginRight: 10,
    // marginBottom: 10,
  },
  hotTopicSelected: { backgroundColor: "#6b21a8" },
  hotTopicText: { color: "white", fontSize: 13 },

  addButton: {
    position: "absolute",
    bottom: 100,
    right: 20,
    backgroundColor: "#663399",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 100,
  },
});
