import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Stakeholders = () => {
  const [selectedPerson, setSelectedPerson] = useState<string>('老闆');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigation = useNavigation();

  const people = ['老闆', '同事', '客戶', '朋友'];

  const getContrastingColors = () => {
    const hue1 = Math.floor(Math.random() * 360);
    const hue2 = (hue1 + 120 + Math.floor(Math.random() * 120)) % 360;

    const hslToHex = (h: number, s: number, l: number) => {
      s /= 100;
      l /= 100;
      const k = (n: number) => (n + h / 30) % 12;
      const a = s * Math.min(l, 1 - l);
      const f = (n: number) =>
        Math.round(
          255 *
            (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))))
        )
          .toString(16)
          .padStart(2, '0');

      return `#${f(0)}${f(8)}${f(4)}`;
    };

    return {
      lucky: hslToHex(hue1, 90, 60),
      avoid: hslToHex(hue2, 90, 60),
    };
  };

  const fortuneData: Record<
    string,
    {
      matchRate: string;
      todayFortune: {
        love: { icon: string; title: string; desc: string };
        wealth: { icon: string; title: string; desc: string };
        career: { icon: string; title: string; desc: string };
      };
      businessHours: string;
      keywords: string[];
      analysis: {
        work: { title: string; desc: string; stars: number };
        heart: { title: string; desc: string; stars: number };
      };
      colors: {
        lucky: string;
        avoid: string;
      };
      suggestions: string[];
    }
  > = {
    老闆: {
      matchRate: '98%',
      todayFortune: {
        love: { icon: '💕', title: '情緒支持', desc: '今天的事業能力特別強，建議趁此機會好好發揮' },
        wealth: { icon: '💰', title: '創意激發', desc: '能夠拿起金錢能力的黃金機會，多嘗試新事物的機會' },
        career: { icon: '⭐', title: '行動支持', desc: '今日運勢特別觀察遷延策略恰好，可增強魅力完成事務' },
      },
      businessHours: '早上7:00-9:00',
      keywords: ['爭執', '衝動'],
      analysis: {
        work: { title: '工作運', desc: '容易情緒化', stars: 4 },
        heart: { title: '心情運', desc: '不確定', stars: 3 },
      },
      colors: {
        lucky: '#4A90E2',
        avoid: '#F5A623',
      },
      suggestions: ['給老闆足夠的個人空間', '資料準備要充分完整'],
    },
    同事: {
      matchRate: '85%',
      todayFortune: {
        love: { icon: '💕', title: '合作運', desc: '今天與同事的合作運勢良好' },
        wealth: { icon: '💰', title: '財運', desc: '有機會獲得額外收入' },
        career: { icon: '⭐', title: '事業運', desc: '工作表現出色，獲得認可' },
      },
      businessHours: '下午2:00-4:00',
      keywords: ['合作', '溝通'],
      analysis: {
        work: { title: '工作運', desc: '表現穩定', stars: 4 },
        heart: { title: '心情運', desc: '愉快', stars: 4 },
      },
      colors: {
        lucky: '#4A90E2',
        avoid: '#F5A623',
      },
      suggestions: ['主動與同事溝通', '分享工作經驗'],
    },
    客戶: {
      matchRate: '72%',
      todayFortune: {
        love: { icon: '💕', title: '信任運', desc: '建立良好的客戶關係' },
        wealth: { icon: '💰', title: '商機', desc: '有新的商業機會出現' },
        career: { icon: '⭐', title: '成交運', desc: '簽約成功率高' },
      },
      businessHours: '上午10:00-12:00',
      keywords: ['信任', '機會'],
      analysis: {
        work: { title: '工作運', desc: '需要耐心', stars: 3 },
        heart: { title: '心情運', desc: '穩定', stars: 3 },
      },
      colors: {
        lucky: '#4A90E2',
        avoid: '#F5A623',
      },
      suggestions: ['保持專業態度', '傾聽客戶需求'],
    },
    朋友: {
      matchRate: '90%',
      todayFortune: {
        love: { icon: '💕', title: '友情運', desc: '朋友關係和諧美好' },
        wealth: { icon: '💰', title: '人脈運', desc: '朋友帶來好運氣' },
        career: { icon: '⭐', title: '支持運', desc: '獲得朋友的大力支持' },
      },
      businessHours: '晚上6:00-8:00',
      keywords: ['友誼', '支持'],
      analysis: {
        work: { title: '工作運', desc: '心情愉悅', stars: 5 },
        heart: { title: '心情運', desc: '非常好', stars: 5 },
      },
      colors: {
        lucky: '#4A90E2',
        avoid: '#F5A623',
      },
      suggestions: ['多與朋友聚會', '分享生活點滴'],
    },
  };

  const currentData = fortuneData[selectedPerson] || fortuneData['老闆'];
  const [randomColors, setRandomColors] = useState(getContrastingColors());

  useEffect(() => {
    setRandomColors(getContrastingColors());
  }, [selectedPerson]);

  const renderStars = (count: number) => {
    return '⭐'.repeat(count) + '☆'.repeat(5 - count);
  };

  const renderDropdownItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => {
        setSelectedPerson(item);
        setShowDropdown(false);
      }}
    >
      <View style={styles.personAvatarSmall}>
        <Text style={styles.avatarTextSmall}>{item[0]}</Text>
      </View>
      <Text style={styles.dropdownItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>今日貴人</Text>
        <View style={styles.todayPersonCard}>
            <View style={styles.personCard}>
            <View style={styles.personInfo}>
              <View style={styles.personAvatar}>
                <Text style={styles.avatarText}>{selectedPerson[0]}</Text>
              </View>
              <View style={styles.personDetails}>
                <Text style={styles.personName}>{selectedPerson}</Text>
                <Text style={styles.personSubtitle}>今日的契合度分析</Text>
              </View>
            </View>
            <View style={styles.matchRate}>
              <Text style={styles.matchRateText}>契合度 {currentData.matchRate}</Text>
            </View>
          </View>

          <Text style={styles.todayFortuneTitle}>今日可能幫助你的方面</Text>

          {Object.entries(currentData.todayFortune).map(([key, val], index) => (
            <View
              key={index}
              style={[
                styles.fortuneItem,
                {
                  backgroundColor:
                    key === 'love'
                      ? '#F5F3FF'
                      : key === 'wealth'
                      ? '#F5F3FF'
                      : '#F5F3FF',
                },
              ]}
            >
              <Text style={styles.fortuneIcon}>{val.icon}</Text>
              <View style={styles.fortuneContent}>
                <Text style={styles.fortuneName}>{val.title}</Text>
                <Text style={styles.fortuneDesc}>{val.desc}</Text>
              </View>
            </View>
          ))}

          <View style={styles.businessHours}>
            <Text style={styles.businessHoursText}>幸運互動時段：{currentData.businessHours}</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>利害關係人運勢</Text>
        <View style={styles.personSelectorContainer}>
          <TouchableOpacity style={styles.personDropdown} onPress={() => setShowDropdown(true)}>
            <View style={styles.person}>
              <View style={styles.personAvatarSmall}>
                <Text style={styles.avatarTextSmall}>{selectedPerson[0]}</Text>
              </View>
              <Text style={styles.dropdownText}>{selectedPerson}</Text>
            </View>

            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addPersonButton}
            onPress={() => router.push('/ask')}
          >
            <Text style={styles.addPersonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.fortuneAnalysis}>
          <Text style={styles.analysisTitle}>{selectedPerson}今日運勢</Text>

          <View style={styles.analysisItem}>
              <Text style={styles.analysisLabel}>總體運勢：</Text>
              <Text style={styles.analysisDesc}>{currentData.keywords.join('、')} </Text>
              <Text style={styles.analysisStars}>{renderStars(5)}</Text>
          </View>
          <Text style={styles.analysisSubtitle}>詳細分析</Text>
            <View style={styles.analysisItem}>
              <Text style={styles.analysisLabel}>{currentData.analysis.work.title}：</Text>
              <Text style={styles.analysisDesc}>{currentData.analysis.work.desc}</Text>
              <Text style={styles.analysisStars}>{renderStars(currentData.analysis.work.stars)}</Text>
            </View>

            <View style={styles.analysisItem1}>
              <Text style={styles.analysisLabel}>{currentData.analysis.heart.title}：</Text>
              <Text style={styles.analysisDesc}>{currentData.analysis.heart.desc}</Text>
              <Text style={styles.analysisStars}>{renderStars(currentData.analysis.heart.stars)}</Text>
            </View>

            <View style={styles.colorIndicators}>
              <View style={styles.colorItem}>
                <Text style={styles.colorLabel}>幸運色：</Text>
                <View style={[styles.colorCircle, { backgroundColor: randomColors.lucky }]} />
              </View>
              <View style={styles.colorItem1}>
                <Text style={styles.colorLabel}>霉運色：</Text>
                <View style={[styles.colorCircle, { backgroundColor: randomColors.avoid }]} />
              </View>
            </View>

          <View style={styles.suggestions}>
            <Text style={styles.suggestionsTitle}>今日相處建議：</Text>
            {currentData.suggestions.map((suggestion, index) => (
              <Text key={index} style={styles.suggestionItem}>
                • {suggestion}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal visible={showDropdown} transparent animationType="fade" onRequestClose={() => setShowDropdown(false)}>
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowDropdown(false)}>
          <View style={styles.dropdownMenu}>
            <FlatList data={people} renderItem={renderDropdownItem} keyExtractor={item => item} />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f3ff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  headerButton: {
    width: 24,
    height: 24,
  },
  headerButtonText: {
    fontSize: 18,
    color: '#9B59B6',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9B59B6',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  todayPersonCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6b21a8',
    marginBottom: 8,
  },
  personCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  personInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  personAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#9B59B6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  person: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  personAvatarSmall: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#9B59B6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatarTextSmall: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  personDetails: {
    flexDirection: 'column',
  },
  personName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  personSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  matchRate: {
    backgroundColor: '#FF6B9D',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  matchRateText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  todayFortuneTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
    fontWeight: '500',
  },
  fortuneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  fortuneIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  fortuneContent: {
    flex: 1,
  },
  fortuneName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 4,
  },
  fortuneDesc: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  businessHours: {
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    padding: 12,
  },
  businessHoursText: {
    fontSize: 12,
    color: 'black',
    fontWeight: '500',
  },
  personSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  personDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#B19CD9',
    borderRadius: 20,
    padding: 12,
    width:150,
  },
  dropdownText: {
    color: 'white',
    fontSize: 14,
  },
  dropdownArrow: {
    color: 'white',
    fontSize: 16,
  },
  addPersonButton: {
    width: 30,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B19CD9',
    borderRadius: 16,
  },
  addPersonText: {
    fontSize: 30,
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownMenu: {
    backgroundColor: 'white',
    borderRadius: 8,
    minWidth: 160,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },
  fortuneAnalysis: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  analysisTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 16,
  },
  keywords: {
    backgroundColor: '#F5F3FF',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  keywordsText: {
    fontSize: 14,
    color: '#333',
  },
  detailedAnalysis: {
    marginBottom: 16,
    backgroundColor: '#F5F3FF',
    borderRadius: 8,
    padding: 12,
  },
  analysisSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 16,
  },
  analysisItem: {
    backgroundColor: '#F5F3FF',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  analysisItem1: {
    backgroundColor: '#F5F3FF',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  analysisLabel: {
    color: '#333',
    fontWeight: '500',
    minWidth: 60,
    fontSize: 14,
  },
  analysisDesc: {
    color: '#666',
    flex: 1,
    marginRight: 8,
    fontSize: 14,
  },
  analysisStars: {
    fontSize: 12,
  },
  colorIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorItem: {
    backgroundColor: '#F5F3FF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    width:150,
  },
  colorItem1: {
    backgroundColor: '#F5F3FF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    width:150,
  },
  colorLabel: {
    fontSize: 14,
    color: '#333',
    marginRight: 6,
  },
  colorCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  suggestions: {
    backgroundColor: '#E6D5FF',
    borderRadius: 8,
    padding: 12,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
  },
  suggestionItem: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    marginBottom: 4,
  },
});

export default Stakeholders;
