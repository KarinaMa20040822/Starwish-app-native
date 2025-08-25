import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

const { width } = Dimensions.get('window');

interface FortuneSlipProps {
  visible: boolean;
  lotId: number;
  onHide: () => void;
  onDeepReading: () => void;
}

const PURPLE = {
  bg: '#F2EAFE',
  panel: '#E9D7FF',
  deep: '#8E6DE6',
  textDark: '#4B347C',
  textLight: '#8B80A6',
  accent: '#B794F6',
};

// 籤詩數據 (示例數據，您可以根據實際籤詩內容調整)
const FORTUNE_DATA = [
  {
    id: 1,
    title: '上上籤',
    content: '春風得意馬蹄疾\n一日看盡長安花\n前程似錦展宏圖\n貴人相助事業佳',
    meaning: '此籤大吉，事業愛情皆順遂，貴人運佳。',
  },
  {
    id: 2,
    title: '上籤',
    content: '山重水複疑無路\n柳暗花明又一村\n困境之後見光明\n堅持不懈得成功',
    meaning: '目前雖有困難，但堅持下去必有轉機。',
  },
  {
    id: 3,
    title: '中籤',
    content: '平心靜氣待時機\n莫急莫躁順天意\n水到渠成自有時\n耐心等待好運來',
    meaning: '宜保持耐心，不宜急進，順其自然為佳。',
  },
  // 添加更多籤詩...
];

const FortuneSlip: React.FC<FortuneSlipProps> = ({ visible, lotId, onHide, onDeepReading }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  // 根據lotId獲取對應的籤詩，如果沒有就使用隨機籤詩
  const getFortune = (id: number) => {
    const fortune = FORTUNE_DATA.find(f => f.id === id) ||
                   FORTUNE_DATA[Math.floor(Math.random() * FORTUNE_DATA.length)];
    return fortune;
  };

  const fortune = getFortune(lotId);

  useEffect(() => {
    if (visible) {
      // 淡入動畫
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const hideSlip = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  };

  if (!visible) return null;

  return (
    <TouchableWithoutFeedback onPress={hideSlip}>
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }
        ]}
      >
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={styles.slipContainer}>
            {/* 籤詩紙張背景 */}
            <View style={styles.paperBackground}>
              {/* 頂部標題 */}
              <View style={styles.header}>
                <Text style={styles.templeTitle}>星願指引靈籤</Text>
                <View style={styles.divider} />
              </View>

              {/* 籤號 */}
              <View style={styles.lotNumberContainer}>
                <Text style={styles.lotNumber}>第{lotId}籤</Text>
                <Text style={styles.lotType}>{fortune.title}</Text>
              </View>

              {/* 籤詩內容 */}
              <View style={styles.contentContainer}>
                <Text style={styles.fortuneText}>{fortune.content}</Text>
              </View>

              {/* 解籤 */}
              <View style={styles.meaningContainer}>
                <Text style={styles.meaningTitle}>解籤：</Text>
                <Text style={styles.meaningText}>{fortune.meaning}</Text>
              </View>

              {/* 底部裝飾 */}
              <View style={styles.footer}>
                <Text style={styles.blessText}>🙏 誠心祈福 🙏</Text>
                
                {/* 深度解籤按鈕 */}
                <TouchableOpacity
                  style={styles.deepReadingBtn}
                  onPress={onDeepReading}
                >
                  <Text style={styles.deepReadingBtnText}>💬 深度解籤</Text>
                </TouchableOpacity>
                
                <Text style={styles.tapHint}>輕點螢幕收起籤詩</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  slipContainer: {
    width: width * 0.85,
    maxWidth: 320,
    alignItems: 'center',
  },
  paperBackground: {
    backgroundColor: '#FDF6E3',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 15,
    borderWidth: 2,
    borderColor: '#D4B896',
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  templeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
    textAlign: 'center',
  },
  divider: {
    width: 60,
    height: 2,
    backgroundColor: '#CD853F',
    marginTop: 8,
  },
  lotNumberContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  lotNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  lotType: {
    fontSize: 16,
    color: '#D2691E',
    marginTop: 4,
    fontWeight: '600',
  },
  contentContainer: {
    backgroundColor: '#FFFEF7',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E6D3A3',
  },
  fortuneText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#654321',
    textAlign: 'center',
    fontWeight: '500',
  },
  meaningContainer: {
    marginBottom: 16,
  },
  meaningTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 4,
  },
  meaningText: {
    fontSize: 14,
    color: '#654321',
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E6D3A3',
  },
  blessText: {
    fontSize: 14,
    color: '#D2691E',
    fontWeight: '500',
    marginBottom: 12,
  },
  deepReadingBtn: {
    backgroundColor: '#8E6DE6',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 12,
    shadowColor: '#8E6DE6',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  deepReadingBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  tapHint: {
    fontSize: 12,
    color: '#A0522D',
    fontStyle: 'italic',
    opacity: 0.7,
  },
});

export default FortuneSlip;
