import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function PointsPage() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}

      {/* Points Summary */}
      <View style={styles.pointsBox}>
        <Image
          source={require('../assets/images/wizard.png')}
          style={styles.avatar}
        />
        <View style={styles.pointsCardOnlyRight}>
          <Text style={styles.points}>⭐ 1,350</Text>
          <Text style={styles.pointsLabel}>當前積分</Text>
        </View>
      </View>


      {/* Points Sources */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>獲取積分方式</Text>

        <View style={styles.pointsCard}>
          <View style={styles.left}>
            <Ionicons name="document-text-outline" size={24} color="#6B4EFF" />
            <View>
              <Text style={styles.cardTitle}>發表文章</Text>
              <Text style={styles.cardSubtitle}>每發表一篇文章可獲得 10 積分</Text>
            </View>
          </View>
          <Text style={styles.pointsValue}>+10</Text>
        </View>

        <View style={styles.pointsCard}>
          <View style={styles.left}>
            <Ionicons name="chatbox-ellipses-outline" size={24} color="#6B4EFF" />
            <View>
              <Text style={styles.cardTitle}>發表留言</Text>
              <Text style={styles.cardSubtitle}>每發表一則留言可獲得 5 積分</Text>
            </View>
          </View>
          <Text style={styles.pointsValue}>+5</Text>
        </View>
      </View>

      {/* Points Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>積分統計</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>💬</Text>
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>發文次數</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>📝</Text>
            <Text style={styles.statNumber}>23</Text>
            <Text style={styles.statLabel}>留言次數</Text>
          </View>
        </View>
      </View>

      {/* Points Usage */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>積分用法</Text>
        <View style={styles.usageBox}>
          <Text style={styles.usageIcon}>🎁</Text>
          <Text style={styles.usagePoints}>5</Text>
          <Text style={styles.usageText}>積分可兌換一次 AI 降價回覆</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2EAFE',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B4EFF',
  },
  pointsBox: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginHorizontal: 20,
  marginTop: 24,
  },

  avatar: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 60,
  },

  pointsCardOnlyRight: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 28,
    borderRadius: 16,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  points: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#6B4EFF',
  },

  pointsLabel: {
    fontSize: 14,
    color: '#999',
  },

  section: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  pointsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  pointsValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00C851',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B4EFF',
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
  },
  usageBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
    elevation: 2,
  },
  usageIcon: {
    fontSize: 22,
  },
  usagePoints: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ae82ef',
  },
  usageText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
});
