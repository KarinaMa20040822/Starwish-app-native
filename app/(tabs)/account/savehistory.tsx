// FavoritePostsPage (React Native version)
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import 'react-native-gesture-handler';

export default function FavoritePostsPage() {
  return (
    <View style={styles.page}>

      <View style={styles.searchBar}>
        <TextInput placeholder="搜尋收藏的貼文" style={styles.searchInput} />
      </View>

      <Text style={styles.count}>共 5 則收藏貼文</Text>

      <ScrollView contentContainerStyle={styles.postList}>
        <View style={styles.postCard}>
          <View style={styles.avatarRow}>
            <Image
              source={require("../../../assets/images/icon.png")}
              style={styles.avatar}
            />
            <View style={styles.info}>
              <Text style={styles.author}>水瓶感小精靈</Text>
              <Text style={styles.time}>20 分鐘前</Text>
            </View>
          </View>
          <Text style={styles.text}>今天太星象火星相位，水瓶應用差別方式多吸水，記得照顧自己的情緒~推薦使用薰衣草精油協助放鬆</Text>
          <View style={styles.imageRow}>
            <Image
              source={require("../../../assets/images/perfume.jpg")}
              style={styles.postImage}
            />
          </View>
          <Text style={styles.stats}>14 喜歡 2 評論 2 分享</Text>
        </View>

        <View style={styles.postCard}>
          <View style={styles.avatarRow}>
             <Image
               source={require("../../../assets/images/icon.png")}
               style={styles.avatar}
             />
             <View style={styles.info}>
               <Text style={styles.author}>處女座研究社</Text>
               <Text style={styles.time}>1 小時前</Text>
             </View>
           </View>
          <Text style={styles.text}>【本月運勢分析】處女座迎來挑戰月。的情緒穩度，同理與溝通能力將被考驗。幸運色：紫水晶、黃水晶</Text>
          <View style={styles.imageRow}>
            <Image
              source={require("../../../assets/images/perfume.jpg")}
              style={styles.postImage}
            />
          </View>
          <Text style={styles.stats}>42 喜歡 15 評論 8 分享</Text>
        </View>

        <View style={styles.postCard}>
          <View style={styles.avatarRow}>
            <Image
              source={require("../../../assets/images/icon.png")}
              style={styles.avatar}
            />
            <View style={styles.info}>
              <Text style={styles.author}>金牛座王</Text>
              <Text style={styles.time}>3 小時前</Text>
            </View>
          </View>
          <Text style={styles.text}>今日財運佳，適合制定理財計畫與收支控管📈記得避免衝動性購物哦～</Text>
          <View style={styles.imageRow}>
            <Image
              source={require("../../../assets/images/perfume.jpg")}
              style={styles.postImage}
            />
            <Image
              source={require("../../../assets/images/perfume.jpg")}
              style={styles.postImage}
            />
          </View>
          <Text style={styles.stats}>23 喜歡 7 評論 1 分享</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f5f3ff',
  },
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  back: {
    fontSize: 20,
    color: '#6B4EFF',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6B4EFF',
  },
  setting: {
    fontSize: 20,
    color: '#6B4EFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 8,
    elevation: 1,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#a19fabff',
  },
  count: {
    textAlign: 'right',
    marginRight: 20,
    color: '#813da3',
    fontSize: 14,
  },
  postList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  postImage: {
    width: 120,             // 設定寬度
    height: 90,             // 設定高度
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'cover',    // 保持比例並裁切填滿容器
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10, // React Native 0.71+ 支援 gap，如果版本不支援就把第一張圖片加 marginRight: 10
    marginVertical: 10,
  },
  info: {
    flexDirection: 'column',
  },
  author: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  text: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  stats: {
    fontSize: 12,
    color: '#999',
  },
});
