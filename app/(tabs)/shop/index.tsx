import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const categories = ['全部', '水晶', '數位', '飾品', '開運物品'];

const categoryIcons = [
  { name: '愛情運', icon: require('@/assets/images/love.png') },
  { name: '財運', icon: require('@/assets/images/money.png') },
  { name: '事業運', icon: require('@/assets/images/work.png') },
  { name: '健康運', icon: require('@/assets/images/healthy.png') },
];

const featuredProducts = [
  {
    id: 1,
    name: '碧璽天然水晶原礦',
    price: 'NT$ 590',
    image: 'https://via.placeholder.com/150x120/deb887/000000?text=碧璽水晶',
    link: 'https://example-shop.com/product1',
  },
  {
    id: 2,
    name: '巴西淨化白水晶-福氣開運胸針',
    price: 'NT$ 390',
    image: 'https://via.placeholder.com/150x120/f5f5dc/000000?text=白水晶',
    link: 'https://example-shop.com/product2',
  },
];

const hotProducts = [
  {
    id: 3,
    name: '水晶純音石花瓶',
    price: 'NT$ 666',
    image: 'https://via.placeholder.com/100x100/e6e6fa/000000?text=花瓶',
    link: 'https://example-shop.com/product3'
  },
  {
    id: 4,
    name: '巴西光芒發晶蓮花',
    price: 'NT$ 1,000',
    image: 'https://via.placeholder.com/100x100/daa520/000000?text=發晶',
    link: 'https://example-shop.com/product4'
  },
  {
    id: 5,
    name: '巴西發晶',
    price: 'NT$ 700',
    image: 'https://via.placeholder.com/100x100/f0e68c/000000?text=發晶',
    link: 'https://example-shop.com/product5'
  }
];

const newProducts = [
  {
    id: 6,
    name: '磁性紫粉水',
    price: 'NT$ 390',
    image: 'https://via.placeholder.com/100x100/dda0dd/000000?text=紫粉水',
    link: 'https://example-shop.com/product6'
  },
  {
    id: 7,
    name: '開運招財新春禮盒',
    price: 'NT$ 666',
    image: 'https://via.placeholder.com/100x100/ff6347/000000?text=禮盒',
    link: 'https://example-shop.com/product7'
  },
  {
    id: 8,
    name: '紫水晶',
    price: 'NT$ 400',
    image: 'https://via.placeholder.com/100x100/9370db/000000?text=紫水晶',
    link: 'https://example-shop.com/product8'
  }
];

const allProducts = [
  {
    id: 9,
    name: '紫水晶洞',
    price: 'NT$ 800',
    image: 'https://via.placeholder.com/100x100/8a2be2/000000?text=紫水晶洞',
    link: 'https://example-shop.com/product9'
  },
  {
    id: 10,
    name: '招財貔貅擺件',
    price: 'NT$ 500',
    image: 'https://via.placeholder.com/100x100/228b22/000000?text=貔貅',
    link: 'https://example-shop.com/product10'
  }
];

export default function ShoppingApp() {
  const [activeCategory, setActiveCategory] = useState('全部');

  const handleProductPress = (link: string) => {
    Linking.openURL(link).catch(() => {
      alert('無法開啟連結');
    });
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.mainTitleContainer}>
          <Text style={styles.mainTitle}>幸運小物商城</Text>
        </View>

        <View style={styles.luckyCardContainer}>
          <View style={styles.luckyCard}>
            <View style={styles.luckyCardContent}>
              <View style={styles.luckyCardText}>
                <Text style={styles.luckyCardTitle}>今日幸運推薦</Text>
                <Text style={styles.luckyCardSubtitle}>提升你的好運勢</Text>
              </View>
              <View style={styles.luckyCardIcon}>
                <View style={styles.luckyCardIconInner} />
              </View>
            </View>
            <View style={[styles.decorCircle, styles.decorCircle1]} />
            <View style={[styles.decorCircle, styles.decorCircle2]} />
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryTabs}
          contentContainerStyle={{ paddingHorizontal: 8 }}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryTab,
                activeCategory === cat && styles.categoryTabActive,
              ]}
              onPress={() => setActiveCategory(cat)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryTabText,
                  activeCategory === cat && styles.categoryTabTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.fortuneCategories}>
          <Text style={styles.sectionTitle}>幸運分類</Text>
          <View style={styles.fortuneGrid}>
            {categoryIcons.map((item) => (
              <View
                key={item.name}
                style={[styles.fortuneItem]}
              >
                 <Image source={item.icon} style={styles.fortuneIcon} />
                 <Text style={styles.fortuneName}>{item.name}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.virgoContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.virgoicon}>♍</Text>
            <Text style={styles.virgoContainerTitle}>處女座本月幸運物</Text>
          </View>
            <View style={styles.featuredGrid}>
              {featuredProducts.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  style={styles.featuredProductCard}
                  onPress={() => handleProductPress(product.link)}
                  activeOpacity={0.8}
                >
                  <Image
                    source={{ uri: product.image }}
                    style={styles.featuredProductImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.featuredProductName} numberOfLines={2}>
                    {product.name}
                  </Text>
                  <Text style={styles.featuredProductPrice}>{product.price}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderTitle}>熱門推薦</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {hotProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() => handleProductPress(product.link)}
                activeOpacity={0.8}
              >
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImageLarge}
                  resizeMode="cover"
                />
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderTitle}>新品上架</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {newProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() => handleProductPress(product.link)}
                activeOpacity={0.8}
              >
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImageLarge}
                  resizeMode="cover"
                />
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderTitle}>所有商品</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {allProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() => handleProductPress(product.link)}
                activeOpacity={0.8}
              >
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImageLarge}
                  resizeMode="cover"
                />
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f5f3ff',
  },
  mainTitleContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6b21a8',
  },
  luckyCardContainer: {
    marginHorizontal: 20,
    marginBottom: 28,
  },
  luckyCard: {
    backgroundColor: '#9370DB',
    borderRadius: 16,
    padding: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  luckyCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  luckyCardText: {
    flex: 1,
  },
  luckyCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  luckyCardSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  luckyCardIcon: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  luckyCardIconInner: {
    width: 48,
    height: 48,
    backgroundColor: '#f9ca24',
    borderRadius: 24,
  },
  decorCircle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 50,
  },
  decorCircle1: {
    width: 96,
    height: 96,
    top: -32,
    right: -32,
  },
  decorCircle2: {
    width: 64,
    height: 64,
    bottom: -16,
    left: -16,
  },
  contentContainer: {
    paddingVertical: 20,
    paddingBottom: 150,
  },
  categoryTabs: {
    maxHeight: 48,
  },
  categoryTab: {
    backgroundColor: '#DDCDFF',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTabActive: {
    backgroundColor: '#9370DB',
  },
  categoryTabText: {
    color: '#7e22ce',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTabTextActive: {
    color: 'white',
  },
  fortuneCategories: {
    marginTop: 32,
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#6b21a8',
    fontWeight: '600',
    marginBottom: 16,
  },
  fortuneGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fortuneItem: {
    width: (windowWidth - 64) / 4,
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
    fortuneIcon: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
      marginBottom: 6,
    },
  fortuneName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  section: {
    marginTop: 40,
    paddingHorizontal: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  virgoContainerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    left:16,
  },
  sectionHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginRight: 14,
    width: 160,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  productImageLarge: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
  },
  productPrice: {
    fontSize: 14,
    color: '#e74c3c',
    fontWeight: '700',
    marginTop: 6,
  },
  virgoicon: {
    position: 'relative',
    fontSize: 18,
  },
  virgoContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  featuredGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featuredProductCard: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 12,
    width: (windowWidth - 80) / 2,
  },
  featuredProductImage: {
    width: '100%',
    height: 96,
    borderRadius: 8,
    marginBottom: 8,
  },
  featuredProductName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  featuredProductPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#e74c3c',
  },
});
