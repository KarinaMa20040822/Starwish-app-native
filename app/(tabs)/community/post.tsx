import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-gesture-handler";

export default function Post() {
  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }} // ✅ 留空間給輸入框
      >
        <View style={styles.postCard}>
          {/* Post Header */}
          <View style={styles.postHeader}>
            <Image
              source={require("../../../assets/images/icon.png")}
              style={styles.avatar}
            />
            <View style={styles.postInfo}>
              <Text style={styles.username}>水瓶座小精靈</Text>
              <Text style={styles.postTime}>20分鐘前</Text>
            </View>
            <TouchableOpacity style={styles.followBtn}>
              <Text style={{ color: "white", fontSize: 12 }}>關注</Text>
            </TouchableOpacity>
          </View>

          {/* Post Content */}
          <Text style={styles.postContent}>
            今天水星與火星相位，水瓶座朋友別忘了多喝水，記得照顧自己的情緒～
            推薦使用薰衣草精油幫助放鬆
          </Text>

          {/* Post Footer */}
          <View style={styles.postFooter}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => alert("按下愛心")}
            >
              <FontAwesome name="heart" style={styles.icon} />
              <Text style={styles.actionText}>14 讚</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => alert("留言功能開發中")}
            >
              <FontAwesome name="comment" style={styles.icon} />
              <Text style={styles.actionText}>3 留言</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => alert("分享功能開發中")}
            >
              <FontAwesome name="share" style={styles.icon} />
              <Text style={styles.actionText}>2 分享</Text>
            </TouchableOpacity>
          </View>

          {/* Comments */}
          <View style={styles.commentSection}>
            {[
              {
                user: "雙子小仙子",
                text: "今天用了薰衣草精油，果然超舒服的！",
                time: "10分鐘前",
              },
              {
                user: "射手很難搞",
                text: "請問有沒有推薦的精油品牌呢？",
                time: "15分鐘前",
              },
              {
                user: "摩羯深得你心",
                text: "太貼心了實用",
                time: "17分鐘前",
              },
            ].map((comment, index) => (
              <View key={index} style={styles.comment}>
                <View>
                  <Text style={styles.commentUser}>{comment.user}</Text>
                  <Text style={styles.commentText}>{comment.text}</Text>
                  <Text style={styles.commentTime}>{comment.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed Input at Bottom */}
      <View style={styles.commentInput}>
        <TextInput
          style={styles.input}
          placeholder="發表留言..."
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.sendBtn}>
          <Text style={{ color: "white" }}>↑</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f3ff",
  },
  postCard: {
    backgroundColor: "white",
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    marginRight: 12,
  },
  postInfo: { flex: 1 },
  username: { fontWeight: "bold", color: "#4c1d95", fontSize: 14 },
  postTime: { fontSize: 12, color: "#9ca3af" },
  followBtn: {
    backgroundColor: "#9370DB",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  postContent: { fontSize: 14, color: "#1f2937", marginVertical: 8 },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  actionBtn: { flexDirection: "row", alignItems: "center", gap: 4 },
  actionText: { fontSize: 13, color: "#374151" },
  icon: { fontSize: 14, color: "#6b7280" },
  commentSection: {
    borderTopWidth: 1,
    borderTopColor: "#e9d5ff",
    paddingTop: 12,
  },
  comment: { flexDirection: "row", alignItems: "flex-start", gap: 12, marginBottom: 12 },
  commentUser: { fontWeight: "600", color: "#6b21a8", fontSize: 13 },
  commentText: { fontSize: 13, color: "#1f2937" },
  commentTime: { fontSize: 11, color: "#9ca3af" },
  commentInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,

  },
  input: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    fontSize: 14,
  },
  sendBtn: {
    backgroundColor: "#9370DB",
    marginLeft: 12,
    borderRadius: 9999,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
