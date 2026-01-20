import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

// Datos de ejemplo para los favoritos
const mockFavorites = [
  {
    id: 1,
    name: 'Ana & Carlos',
    type: 'Couple',
    distance: '3km',
    initial: 'A',
    color: '#9C27B9',
  },
  {
    id: 2,
    name: 'María',
    type: 'Woman',
    distance: '8km',
    initial: 'M',
    color: '#E040FB',
  },
];

export default function MatchesScreen({ navigation }) {
  const renderFavoriteCard = (item) => (
    <TouchableOpacity key={item.id} style={styles.favoriteCard}>
      <LinearGradient
        colors={[item.color, `${item.color}99`]}
        style={styles.favoriteGradient}
      >
        <Text style={styles.favoriteInitial}>{item.initial}</Text>
      </LinearGradient>
      <View style={styles.favoriteInfo}>
        <Text style={styles.favoriteName}>{item.name}</Text>
        <View style={styles.favoriteDetails}>
          <Text style={styles.favoriteType}>{item.type}</Text>
          <Text style={styles.favoriteDistance}>{item.distance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favoritos</Text>
      </View>

      {/* Favorites Grid */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      >
        {mockFavorites.map(renderFavoriteCard)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A23',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  favoriteCard: {
    width: CARD_WIDTH,
    margin: 6,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1a1a2e',
  },
  favoriteGradient: {
    height: CARD_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteInitial: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  favoriteInfo: {
    padding: 12,
  },
  favoriteName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  favoriteDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  favoriteType: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  favoriteDistance: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
});
