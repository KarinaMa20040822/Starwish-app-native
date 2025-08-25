import * as Haptics from 'expo-haptics';
import { Stack, useRouter } from 'expo-router';
import { Accelerometer } from 'expo-sensors';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import FortuneSlip from "./FortuneSlip";


const PURPLE = {
  bg: '#f5f3ff',
  panel: '#E9D7FF',
  deep: '#8E6DE6',
  textDark: '#4B347C',
  textLight: '#8B80A6',
};

export default function ProfileLotShakeScreen() {
  const router = useRouter();
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const [enabled, setEnabled] = useState(false);
  const [showFortune, setShowFortune] = useState(false);
  const [currentLotId, setCurrentLotId] = useState(1);
  const lastShakeRef = useRef<number>(0);

  useEffect(() => {
    setEnabled(true);
    Accelerometer.setUpdateInterval(100);
    const sub = Accelerometer.addListener(({ x, y, z }) => detectShake(x, y, z));
    return () => {
      sub && sub.remove();
      setEnabled(false);
    };
  }, []);

  const detectShake = (x: number, y: number, z: number) => {
    const g = Math.sqrt(x * x + y * y + z * z);
    const delta = Math.abs(g - 1);
    const threshold = 0.9;
    const cooldownMs = 1200;
    const now = Date.now();
    if (delta > threshold && now - lastShakeRef.current > cooldownMs) {
      lastShakeRef.current = now;
      onShake();
    }
  };

  const onShake = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {}
    
    // 搖晃動畫
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 1, duration: 80, easing: Easing.linear, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -1, duration: 80, easing: Easing.linear, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 1, duration: 80, easing: Easing.linear, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 80, easing: Easing.linear, useNativeDriver: true }),
    ]).start(() => {
      // 搖晃動畫完成後顯示籤詩
      const lotId = Math.floor(Math.random() * 100) + 1; // 1~100
      setCurrentLotId(lotId);
      setShowFortune(true);
    });
  };

  const handleFortuneHide = () => {
    setShowFortune(false);
  };

  const handleDeepReading = () => {
    // 跳轉到聊天室進行深度解籤
    router.push({
      pathname: '/setting', // 根據您的路由結構調整
      params: {
        lotId: String(currentLotId),
        question: '請幫我深度解讀這支籤的含義'
      }
    });
  };

  const rotate = shakeAnim.interpolate({ inputRange: [-1, 1], outputRange: ['-8deg', '8deg'] });

  return (
    <SafeAreaView style={styles.safe}>
      <Stack.Screen />
      
      <View style={styles.bodyCard}>
        <Text style={styles.tip}>請專心冥想您的問題，然後搖一搖手機</Text>
        <Animated.Image
          source={require('@/assets/images/poem.png')}
          style={[styles.sticks, { transform: [{ rotate }] }]}
          resizeMode="contain"
        />
        <Text style={styles.status}>{enabled ? '感測器已啟用' : '感測器未啟用'}</Text>
        
        {/* 使用說明 */}
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionTitle}>🔮 求籤步驟</Text>
          <Text style={styles.instructionText}>1. 靜心思考您想問的問題</Text>
          <Text style={styles.instructionText}>2. 輕搖手機抽取靈籤</Text>
          <Text style={styles.instructionText}>3. 誠心看待籤詩指引</Text>
        </View>

        
      </View>

      {/* 籤詩組件 */}
      <FortuneSlip
        visible={showFortune}
        lotId={currentLotId}
        onHide={handleFortuneHide}
        onDeepReading={handleDeepReading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: PURPLE.bg
  },
  
  bodyCard: {
    flex: 1,
    margin: 16,
    borderRadius: 18,
    alignItems: 'center',
    paddingTop: 28,
    paddingHorizontal: 20,
  },
  
  tip: {
    color: PURPLE.textDark,
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: '500',
  },
  
  sticks: {
    width: '70%',
    height: 300
  },
  
  status: {
    marginTop: 12,
    fontSize: 12,
    color: PURPLE.textLight
  },
  
  instructionContainer: {
    marginTop: 32,
    backgroundColor: 'rgba(142, 109, 230, 0.1)',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    alignItems: 'center',
  },
  
  instructionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PURPLE.textDark,
    marginBottom: 12,
    textAlign: 'center',
  },
  
  instructionText: {
    fontSize: 14,
    color: PURPLE.textLight,
    marginBottom: 6,
    textAlign: 'center',
    lineHeight: 20,
  },
  
  deepReadingContainer: {
    marginTop: 16,
    paddingHorizontal: 20,
    width: '100%',
  },
  
  deepReadingButton: {
    backgroundColor: PURPLE.deep,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: PURPLE.deep,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  
  deepReadingButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: PURPLE.bg,
    marginBottom: 4,
  },
  
  deepReadingButtonSubtext: {
    fontSize: 12,
    color: 'rgba(242, 234, 254, 0.8)',
    fontWeight: '500',
  },
});
