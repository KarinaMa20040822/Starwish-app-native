import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function DivinationHistory() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}

      {/* Search */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#aaa" style={styles.searchIcon} />
        <TextInput
          placeholder="搜尋運勢記錄..."
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      {/* 每一張卡片（死資料） */}
      <View style={styles.recordList}>
        <View style={styles.recordCard}>
          <View style={styles.recordHeader}>
            <Text style={styles.recordTitle}>感情運勢諮詢</Text>
            <Text style={styles.recordTime}>今天 14:32</Text>
          </View>
          <Text style={styles.recordContent}>
            為什麼水瓶男總是不回我的訊息！抽到的牌：高級女祭司、權杖王牌、力量牌⋯⋯
          </Text>
          <View style={styles.recordTags}>
            <Text style={styles.tag}>感情</Text>
            <Text style={styles.tag}>塔羅牌</Text>
          </View>
        </View>

        <View style={styles.recordCard}>
          <View style={styles.recordHeader}>
            <Text style={styles.recordTitle}>事業發展指引</Text>
            <Text style={styles.recordTime}>昨天 16:45</Text>
          </View>
          <Text style={styles.recordContent}>
            最近工作上遇到一些困難，想了解未來的發展方向⋯⋯
          </Text>
          <View style={styles.recordTags}>
            <Text style={styles.tag}>事業</Text>
            <Text style={styles.tag}>塔羅牌</Text>
          </View>
        </View>

        <View style={styles.recordCard}>
          <View style={styles.recordHeader}>
            <Text style={styles.recordTitle}>健康運勢分析</Text>
            <Text style={styles.recordTime}>昨天 19:30</Text>
          </View>
          <Text style={styles.recordContent}>
            想了解最近健康狀況和需要注意的地方⋯⋯
          </Text>
          <View style={styles.recordTags}>
            <Text style={styles.tag}>健康</Text>
            <Text style={styles.tag}>解籤</Text>
          </View>
        </View>

        <View style={styles.recordCard}>
          <View style={styles.recordHeader}>
            <Text style={styles.recordTitle}>財運預測</Text>
            <Text style={styles.recordTime}>二週前 11:15</Text>
          </View>
          <Text style={styles.recordContent}>
            想知道近期的投資運勢和財務狀況⋯⋯
          </Text>
          <View style={styles.recordTags}>
            <Text style={styles.tag}>財運</Text>
            <Text style={styles.tag}>塔羅牌</Text>
          </View>
        </View>

        <View style={styles.recordCard}>
          <View style={styles.recordHeader}>
            <Text style={styles.recordTitle}>人際關係指導</Text>
            <Text style={styles.recordTime}>昨天 16:45</Text>
          </View>
          <Text style={styles.recordContent}>
            和朋友之間出現了一些誤會，抽了解如何改善關係⋯⋯
          </Text>
          <View style={styles.recordTags}>
            <Text style={styles.tag}>人際關係</Text>
            <Text style={styles.tag}>MBTI</Text>
          </View>
        </View>

        <View style={styles.recordCard}>
          <View style={styles.recordHeader}>
            <Text style={styles.recordTitle}>月運勢總覽</Text>
            <Text style={styles.recordTime}>昨天 16:45</Text>
          </View>
          <Text style={styles.recordContent}>
            想了解這個月整體運勢如何⋯⋯
          </Text>
          <View style={styles.recordTags}>
            <Text style={styles.tag}>整體運</Text>
            <Text style={styles.tag}>塔羅牌</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f3ff',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9333ea',
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  recordList: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  recordCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  recordTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
  },
  recordTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  recordContent: {
    fontSize: 13,
    color: '#4b5563',
    marginBottom: 10,
  },
  recordTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#fff',
    color: '#9333ea',
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#e9d5ff',
    marginRight: 8,
    marginBottom: 4,
  },
});
