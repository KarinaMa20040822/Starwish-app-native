import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform, Pressable, SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Card {
  id: number;
  name: string;
  description: string;
  isFlipped: boolean;
  image: ImageSourcePropType;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const CARDS_DATA = [
  { id: 1, name: '愚者', description: '新的開始，純真與可能性', image: require('@/assets/images/fool.png') },
  { id: 2, name: '魔術師', description: '創造力與意志力的展現', image: require('@/assets/images/magician.png')},
  { id: 3, name: '女祭司', description: '直覺與內在智慧', image: require('@/assets/images/high-priestess.png')},
  { id: 4, name: '皇后', description: '豐饒與創造力', image: require('@/assets/images/empress.png') },
  { id: 5, name: '皇帝', description: '權威與穩定的結構', image: require('@/assets/images/emperor.png') },
  { id: 6, name: '教皇', description: '傳統與靈性指導', image: require('@/assets/images/hierophant.png') },
  { id: 7, name: '戀人', description: '愛情與重要選擇', image: require('@/assets/images/lovers.png') },
  { id: 8, name: '戰車', description: '意志力與勝利', image: require('@/assets/images/chariot.png') },
  { id: 9, name: '力量', description: '內在力量與勇氣', image: require('@/assets/images/strength.png') },
];

export default function TarotScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const TAB_BAR_HEIGHT = 20;
  const { question } = useLocalSearchParams();
  const scrollViewRef = useRef<ScrollView>(null);
  
  // 頁面狀態：'drawing' | 'chat'
  const [currentScreen, setCurrentScreen] = useState<'drawing' | 'chat'>('drawing');
  
  // 抽牌相關狀態
  const [cards, setCards] = useState<Card[]>(
    Array.from({ length: 9 }, (_, i) => ({
      ...CARDS_DATA[i],
      isFlipped: false,
    }))
  );
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [animatedValues] = useState(
    Array.from({ length: 9 }, () => new Animated.Value(0))
  );

  // 新增：卡牌淡出和移動動畫的狀態
  const [cardFadeValues] = useState(
    Array.from({ length: 9 }, () => new Animated.Value(1))
  );
  const [cardMoveValues] = useState(
    Array.from({ length: 9 }, () => ({
      translateY: new Animated.Value(0),
      scale: new Animated.Value(1),
    }))
  );

  // 聊天相關狀態
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentDrawnCard, setCurrentDrawnCard] = useState<Card | null>(null);
  const drawnCardOpacity = useRef(new Animated.Value(0)).current;

  const handleCardPress = (cardId: number) => {
    if (selectedCards.length >= 3) {
      Alert.alert('提示', '最多只能選擇3張牌');
      return;
    }
  
    const cardIndex = cards.findIndex(card => card.id === cardId);
    const selectedCard = cards[cardIndex];
  
    if (selectedCard.isFlipped) return;
  
    // 翻牌動畫
    Animated.timing(animatedValues[cardIndex], {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      // 翻牌完成後更新卡片狀態
      setCards(prev => prev.map(card =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      ));
  
      // 顯示抽出的牌（淡入效果）
      setCurrentDrawnCard(selectedCard);
      Animated.timing(drawnCardOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // 加入已選擇卡片
        setSelectedCards(prev => [...prev, { ...selectedCard, isFlipped: true }]);
      });
    });
  };
  

  const proceedToChat = () => {
    if (selectedCards.length === 0) {
      Alert.alert('提示', '請至少選擇一張牌');
      return;
    }

    // 切換到聊天頁面
    setCurrentScreen('chat');
    
    // 發送初始AI回應
    setTimeout(() => {
      sendInitialAiResponse();
    }, 500);
  };

  const sendInitialAiResponse = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const cardNames = selectedCards.map(card => card.name).join('、');
      const initialResponse = generateInitialAiResponse(
        question as string,
        cardNames
      );
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: initialResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages([aiMessage]);
      setIsLoading(false);
      scrollToBottom();
    }, 1500);
  };

  const generateInitialAiResponse = (userQuestion: string, selectedCardNames: string): string => {
    return `關於你的問題「${userQuestion}」，我為你解讀了${selectedCardNames}這些牌卡。

根據牌卡的指引，我看到了一些重要的訊息：

${selectedCards.map((card, index) => {
  const meanings = {
    '愚者': '新的開始即將到來，保持開放的心態去迎接未知的可能性',
    '魔術師': '你擁有實現目標所需的所有資源和能力，關鍵在於如何運用',
    '女祭司': '相信你的直覺，內在的智慧會為你指引正確的方向',
    '皇后': '創造力和豐富的資源圍繞著你，是時候讓想法開花結果',
    '皇帝': '建立穩固的基礎和明確的結構將有助於你的成功',
    '教皇': '尋求傳統的智慧和靈性的指導會對你有所幫助',
    '戀人': '重要的選擇正在等待你，請跟隨你的心做決定',
    '戰車': '堅定的意志力將帶領你克服所有障礙，勝利在望',
    '力量': '內在的勇氣和溫柔的力量是你最大的資產'
  };
  
  return `${index + 1}. ${card.name}：${meanings[card.name as keyof typeof meanings] || '這張牌帶來正面的能量和指引'}`;
}).join('\n\n')}

整體而言，牌卡顯示這是一個充滿機會的時期。保持積極的態度，相信自己的能力，你將能夠順利度過當前的挑戰。

你還有什麼想要進一步了解的嗎？我可以為你提供更詳細的解釋。`;
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    
    setTimeout(() => {
      const aiResponse = generateAiResponse(inputText);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
      scrollToBottom();
    }, 1000);
  };

  const generateAiResponse = (userInput: string): string => {
    const responses = [
      "根據你剛才的問題，我建議你要保持耐心和信心。塔羅牌顯示，當前的困難只是暫時的，好的改變正在路上。",
      "你的牌卡組合暗示著內在力量的覺醒。相信自己的直覺，它會帶領你找到正確的答案。",
      "從靈性的角度來看，這個問題的出現是為了讓你學習和成長。擁抱這個挑戰，它將讓你變得更強大。",
      "宇宙正在為你安排最好的結果。保持積極的心態，並且準備好迎接即將到來的機會。",
      "你選擇的牌卡顯示，現在是採取行動的最佳時機。不要被恐懼束縛，勇敢地朝目標前進。"
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const resetCards = () => {
    Alert.alert(
      '重新開始',
      '確定要重新抽牌嗎？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '確定',
          onPress: () => {
            setCards(prev => prev.map(card => ({ ...card, isFlipped: false })));
            setSelectedCards([]);
            setMessages([]);
            setCurrentScreen('drawing');
            // 重置所有動畫值
            animatedValues.forEach(value => value.setValue(0));
            cardFadeValues.forEach(value => value.setValue(1));
            cardMoveValues.forEach(value => {
              value.translateY.setValue(0);
              value.scale.setValue(1);
            });
          }
        }
      ]
    );
  };

  const quickQuestions = [
    "請幫我解釋得更詳細一些？",
    "這對我的感情有什麼影響？",
    "我應該如何行動？"
  ];

  // 抽牌頁面渲染
  const renderDrawingScreen = () => (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 16 + insets.bottom + 80 }}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Instructions */}
        <View style={styles.instructionCard}>
          <Text style={styles.instructionTitle}>請抽三張牌</Text>
          <Text style={styles.instructionSubtitle}>
            已選擇 {selectedCards.length}/3 張牌
          </Text>
          {question && (
            <Text style={styles.questionText}>問題：{question}</Text>
          )}
        </View>
  
        {/* Horizontal Cards */}
        <View style={{ height: 200, paddingHorizontal: 16, marginBottom: 24 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {cards.map((card, index) => (
              <TouchableOpacity
                key={card.id}
                onPress={() => handleCardPress(card.id)}
                activeOpacity={0.8}
                style={{
                  marginLeft: index === 0 ? 0 : -80,
                  width: 120,
                  height: 180,
                }}
              >
                <Animated.View
                  style={[
                    styles.card,
                    card.isFlipped && styles.cardFlipped,
                    {
                      opacity: cardFadeValues[index],
                      transform: [
                        {
                          rotateY: animatedValues[index].interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '180deg'],
                          }),
                        },
                        {
                          translateY: cardMoveValues[index].translateY,
                        },
                        {
                          scale: cardMoveValues[index].scale,
                        }
                      ],
                    },
                  ]}
                >
                  {!card.isFlipped ? (
                    <View style={styles.cardBack}>
                      <Ionicons
                        name="star-outline"
                        size={40}
                        color={PURPLE.cardStar}
                      />
                    </View>
                  ) : (
                    <View style={styles.cardFront}>
                      {/* 如果有圖片URL，顯示圖片，否則顯示文字 */}
                      {card.image ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <View style={styles.cardImagePlaceholder}>
                          <View
                              style={{
                                width: 105,
                                height: 180,
                                borderRadius: 12,
                                overflow: 'hidden',
                                backgroundColor: PURPLE.cardFront,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <Image
                                source={card.image}
                                style={{ width: '100%', height: '100%' }}
                                resizeMode="cover"
                              />
                            </View>
                          </View>
                        </View>
                      ) : (
                        <>
                          <Text style={styles.cardName}>{card.name}</Text>
                          <Text style={styles.cardDescription}>{card.description}</Text>
                        </>
                      )}
                    </View>
                  )}
                </Animated.View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
  
        {/* Selected Cards Display */}
        {selectedCards.length > 0 && (
          <View style={styles.selectedCardsContainer}>
            <Text style={styles.selectedTitle}>已選擇的牌：</Text>
            <View style={styles.selectedCards}>
              {selectedCards.map((card) => (
                <View key={`selected-${card.id}`} style={styles.selectedCardContainer}>
                  <View style={styles.selectedCardImageContainer}>
                    {/* 顯示小版本的塔羅牌 */}
                      <Image
                        source={card.image}
                        style={styles.selectedCardMini}
                        resizeMode="cover"
                      />
                      <Text style={styles.selectedCardName}>{card.name}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={{ paddingHorizontal: 16, paddingVertical: 16, backgroundColor: PURPLE.bg }}>
          <TouchableOpacity
            style={[
              styles.proceedBtn,
              selectedCards.length === 0 && styles.proceedBtnDisabled
              ]}
              onPress={proceedToChat}
              disabled={selectedCards.length === 0}
              >
              <Text style={[
                styles.proceedBtnText,
                selectedCards.length === 0 && styles.proceedBtnTextDisabled
                ]}>
                開始AI解牌
              </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
  
// 聊天頁面渲染
const renderChatScreen = () => (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={Platform.OS === 'ios' ? TAB_BAR_HEIGHT + 10 : 0}
  >
    <View style={{ flex: 1 }}>
      {/* Selected Cards Summary */}
      <View style={styles.cardsSummary}>
        <TouchableOpacity onPress={resetCards} style={{ marginRight: -30 }}>
          <Ionicons name="arrow-back" size={24} color={PURPLE.textDark} />
        </TouchableOpacity>
        <View style={styles.cardsSummaryTitleWrapper}>
        <Text style={styles.cardsSummaryTitle}>你抽到的牌：</Text>
        <View style={styles.summaryCards}>
          {selectedCards.map((card) => (
            <View key={`summary-${card.id}`} style={styles.summaryCardContainer}>
                <Image
                  source={card.image}
                  style={styles.selectedCardMini}
                  resizeMode="cover"
                />
              <Text style={styles.summaryCardName}>{card.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          ...styles.messagesContent,
          paddingBottom: 50,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.isUser ? styles.userMessageContainer : styles.aiMessageContainer
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                message.isUser ? styles.userMessage : styles.aiMessage
              ]}
            >
              <Text style={[
                styles.messageText,
                message.isUser ? styles.userMessageText : styles.aiMessageText
              ]}>
                {message.text}
              </Text>
            </View>
            {!message.isUser && (
              <View style={styles.aiAvatar}>
                <Ionicons name="sparkles" size={16} color={PURPLE.white} />
              </View>
            )}
          </View>
        ))}

        {isLoading && (
          <View style={[styles.messageContainer, styles.aiMessageContainer]}>
            <View style={[styles.messageBubble, styles.aiMessage, styles.loadingMessage]}>
              <Text style={styles.loadingText}>AI正在思考中...</Text>
            </View>
            <View style={styles.aiAvatar}>
              <Ionicons name="sparkles" size={16} color={PURPLE.white} />
            </View>
          </View>
        )}
      
      </ScrollView>

      {/* Quick Questions + Input */}
      <View style={{ backgroundColor: PURPLE.white ,paddingBottom: insets.bottom+ TAB_BAR_HEIGHT, }}>
        {!isLoading && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickQuestionsContainer}
          >
            {quickQuestions.map((q, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickQuestion}
                onPress={() => setInputText(q)}
              >
                <Text style={styles.quickQuestionText}>{q}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="輸入你的問題..."
            placeholderTextColor={PURPLE.textLight}
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={!inputText.trim() || isLoading}
          >
            <Ionicons
              name="send"
              size={20}
              color={inputText.trim() ? PURPLE.white : PURPLE.textLight}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </KeyboardAvoidingView>
);

  return (
    <SafeAreaView style={styles.safe}>
      {/* 抽到的牌動畫顯示層 */}
      {currentDrawnCard && (
  <Pressable
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 10,
    }}
    onPress={() => {
      // 點擊淡出牌
      Animated.timing(drawnCardOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setCurrentDrawnCard(null);
        drawnCardOpacity.setValue(0);
      });
    }}
  >
    <Animated.View
      style={{
        width: 250,
        alignItems: 'center',
        opacity: drawnCardOpacity,
      }}
    >
      {/* 卡片圖片 */}
      <View
        style={{
          width: 250,
          height: 430,
          borderRadius: 12,
          overflow: 'hidden',
          backgroundColor: PURPLE.cardFront,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={currentDrawnCard.image}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>

            {/* 卡片下方文字 */}
            <View style={{ marginTop: 12, alignItems: 'center' , flexShrink: 0}}>
              <Text style={styles.cardName}>{currentDrawnCard.name}</Text>
              <Text style={styles.cardDescription}>{currentDrawnCard.description}</Text>
            </View>
          </Animated.View>
        </Pressable>
      )}

      {currentScreen === 'drawing' ? renderDrawingScreen() : renderChatScreen()}
    </SafeAreaView>
  );
}

const PURPLE = {
  bg: '#F2EAFE',
  panel: '#E9D7FF',
  deep: '#8E6DE6',
  white: '#FFFFFF',
  textDark: '#4B347C',
  textLight: '#8B80A6',
  cardBack: '#6B46C1',
  cardStar: '#C4B5FD',
  cardFront: '#FFFFFF',
  userMessage: '#8E6DE6',
  aiMessage: '#E9D7FF',
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f5f3ff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: PURPLE.white,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: PURPLE.textDark,
  },

  // 抽牌頁面樣式
  instructionCard: {
    margin: 16,
    marginBottom: 8,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  instructionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: PURPLE.textDark,
    marginBottom: 4,
  },
  instructionSubtitle: {
    fontSize: 14,
    color: PURPLE.textLight,
    marginBottom: 8,
  },
  questionText: {
    fontSize: 14,
    color: PURPLE.textDark,
    textAlign: 'center',
    backgroundColor: PURPLE.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  cardsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '30%',
    aspectRatio: 0.7,
    marginBottom: 16,
  },
  card: {
    flex: 1,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardFlipped: {
    backgroundColor: PURPLE.cardFront,
  },
  cardBack: {
    flex: 1,
    backgroundColor: PURPLE.cardBack,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFront: {
    flex: 1,
    backgroundColor: PURPLE.cardFront,
    borderRadius: 12,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 15,
    color: PURPLE.white,
    textAlign: 'center',
    lineHeight: 20,
  },
  selectedCardsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  selectedTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: PURPLE.textDark,
    marginBottom: 8,
  },
  selectedCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectedCard: {
    backgroundColor: PURPLE.deep,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  selectedCardContainer: {
    alignItems: 'center',
  },
  selectedCardImageContainer: {
    alignItems: 'center',
  },
  selectedCardMini: {
    width: 40,
    height: 60,
    backgroundColor: PURPLE.deep,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  selectedCardName: {
    color: PURPLE.textDark,
    fontSize: 12,
    fontWeight: '600',
  },
  actionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  proceedBtn: {
    backgroundColor: PURPLE.deep,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: PURPLE.deep,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  proceedBtnDisabled: {
    backgroundColor: PURPLE.textLight,
    shadowOpacity: 0,
    elevation: 0,
  },
  proceedBtnText: {
    color: PURPLE.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  proceedBtnTextDisabled: {
    color: PURPLE.white,
    opacity: 0.7,
  },

  // 聊天頁面樣式
  chatContainer: {
    flex: 1,
  },
  cardsSummary: {
    backgroundColor: PURPLE.panel,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardsSummaryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: PURPLE.textDark,
    marginBottom: 8,
  },
  cardsSummaryTitleWrapper: {
    flex: 1,
    alignItems: 'center', // 水平置中
  },
  summaryCards: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  summaryCardContainer: {
    alignItems: 'center',
  },
  summaryCardMini: {
    width: 30,
    height: 45,
    backgroundColor: PURPLE.deep,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  summaryCard: {
    backgroundColor: PURPLE.deep,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  summaryCardName: {
    color: PURPLE.white,
    fontSize: 12,
    fontWeight: '600',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContent: {
    paddingVertical: 16,
  },
  messageContainer: {
    marginBottom: 16,
    flexDirection: 'row',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  aiMessageContainer: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
  },
  userMessage: {
    backgroundColor: PURPLE.userMessage,
    marginLeft: 40,
  },
  aiMessage: {
    backgroundColor: PURPLE.aiMessage,
    marginRight: 40,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  userMessageText: {
    color: PURPLE.white,
  },
  aiMessageText: {
    color: PURPLE.textDark,
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: PURPLE.deep,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginTop: 4,
  },
  loadingMessage: {
    opacity: 0.8,
  },
  loadingText: {
    color: PURPLE.textLight,
    fontStyle: 'italic',
  },
  quickQuestionsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  quickQuestion: {
    backgroundColor: PURPLE.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: PURPLE.panel,
  },
  quickQuestionText: {
    color: PURPLE.textDark,
    fontSize: 13,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: PURPLE.white,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: -2 },
    elevation: 2,
  },
  textInput: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: PURPLE.bg,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    fontSize: 15,
    color: PURPLE.textDark,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: PURPLE.deep,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: PURPLE.panel,
  },
});
