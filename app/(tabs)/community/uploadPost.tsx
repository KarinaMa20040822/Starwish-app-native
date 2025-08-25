import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Social3() {
  const allZodiacs: string[] = [
    "牡羊座", "金牛座", "雙子座", "巨蟹座",
    "獅子座", "處女座", "天秤座", "天蠍座",
    "射手座", "魔羯座", "水瓶座", "雙魚座"
  ];
  const relatedTags: string[] = ["#自我照護", "#相位解析", "#星願小物"];

  const [privacy, setPrivacy] = useState<string>("公開");
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const [selectedZodiacs, setSelectedZodiacs] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showAllZodiacs, setShowAllZodiacs] = useState<boolean>(false);

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uris = result.assets.map(asset => asset.uri);
      setImages(prev => [...prev, ...uris]);
    }
  };

  const toggleZodiac = (zodiac: string) => {
    setSelectedZodiacs((prev) =>
      prev.includes(zodiac) ? prev.filter((z) => z !== zodiac) : [...prev, zodiac]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
          <ScrollView contentContainerStyle={styles.scrollContent}>
                 {/* 使用者頭像與設定 */}
                 <View style={styles.postHeader}>
                   <View style={styles.userInfo}>
                     <Image source={require("../../../assets/images/icon.png")} style={styles.avatar} />
                     <Text style={styles.username}>仙女下凡</Text>
                   </View>
                   <TouchableOpacity style={styles.privacyButton} onPress={() => setShowOptions(!showOptions)}>
                     <Text>{privacy} ▼</Text>
                   </TouchableOpacity>
                 </View>

          {/* 輸入框 */}
          <View style={styles.postInputAreaWrapper}>
            <TextInput
              style={styles.postTextarea}
              placeholder="分享你的星座心情、運勢或建議..."
              multiline
            />
          </View>

          {/* 星座選擇 */}
          <View style={styles.hotTopicsSection}>
            <View style={styles.hotTopicsTitleContainer}>
              <Text style={styles.hotTopicsTitle}>選擇相關星座</Text>
              <TouchableOpacity onPress={() => setShowAllZodiacs(!showAllZodiacs)}>
                <Text>▼</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.hotTopicsList}>
              {(showAllZodiacs ? allZodiacs : allZodiacs.slice(0, 4)).map((zodiac) => (
                <TouchableOpacity
                  key={zodiac}
                  style={[styles.hotTopic, selectedZodiacs.includes(zodiac) && styles.selectedTopic]}
                  onPress={() => toggleZodiac(zodiac)}
                >
                  <Text style={styles.hotTopicText}>{zodiac}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 話題標籤 */}
          <View style={styles.hotTopicsSection}>
            <Text style={styles.hotTopicsTitle}>加入話題標籤</Text>
            <View style={styles.hotTopicsList}>
              {relatedTags.map((tag) => (
                <TouchableOpacity
                  key={tag}
                  style={[styles.hotTopic, selectedTags.includes(tag) && styles.selectedTopic]}
                  onPress={() => toggleTag(tag)}
                >
                  <Text style={styles.hotTopicText}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 圖片上傳 */}
          <View style={styles.hotTopicsSection}>
            <Text style={styles.hotTopicsTitle}>添加圖片或影片</Text>
            <View style={styles.imageUploadPreview}>
              {images.map((img, idx) => (
                <View key={idx} style={styles.imageBox}>
                  <Image source={{ uri: img }} style={styles.imagePreview} />
                  <TouchableOpacity
                    style={styles.deleteIcon}
                    onPress={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                  >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity style={styles.imageBox} onPress={pickImages}>
                <Text style={styles.uploadText}>＋</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.floatingSubmitContainer}>
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitText}>發布</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
          
        {/* 選單浮層 */}
        {showOptions && (
          <View style={styles.privacyOptionsOverlay}>
            {["公開", "私人"].map((opt) => (
              <TouchableOpacity key={opt} onPress={() => { setPrivacy(opt); setShowOptions(false); }}>
                <Text style={styles.privacyOption}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

          {/* 發布按鈕常駐底部 */}
        

      </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
    backgroundColor: '#F0E6FF',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  privacyButton: {
    backgroundColor: '#B69EE5',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    zIndex: 1,
  },
  privacyOptionsOverlay: {
    position: 'absolute',
    top: 65,
    right: 16,
    backgroundColor: '#e7d0ffff',
    borderRadius: 10,
    elevation: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    zIndex: 9999,
  },
  privacyOption: {
    padding: 8,
    fontSize: 14,
    
  },
  postInputAreaWrapper: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  postTextarea: {
    height: 100,
    padding: 10,
    textAlignVertical: 'top',
    color: '#a19fabff',
  },
  hotTopicsSection: {
    padding: 20,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 12,
    borderRadius: 12,
  },
  hotTopicsTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  hotTopicsTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#4c1d95',
  },
  hotTopicsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  hotTopic: {
    backgroundColor: '#E8DDFF',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
  },
  selectedTopic: {
    backgroundColor: '#B69EE5',
    color:'white',
  },
  hotTopicText: {
    color:'#5D3B94',
    fontSize: 13,
  },
  imageUploadPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageBox: {
    width: 100,
    height: 100,
    backgroundColor: '#E8DDFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    margin: 5,
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  deleteIcon: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    backgroundColor: '#0008',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#7c3aed',
  },
    floatingSubmitContainer: {
      position: 'absolute',
      bottom: 30, // 🔑 預留 TabBar 高度，避免被擋住
      left: 0,
      right: 0,
      paddingVertical: 16,
      paddingHorizontal: 16,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 6,
    },
    submitButton: {
      backgroundColor: '#663399',
      paddingVertical: 12,
      paddingHorizontal: 50,
      borderRadius: 25,
    },

  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
