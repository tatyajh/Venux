import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

// Datos de ejemplo para los matches
const mockMatches = [
  {
    id: 1,
    name: 'Sofia',
    age: 24,
    lastMessage: '¡Hola! Me encanta tu perfil 😊',
    lastMessageTime: '2 min',
    isOnline: true,
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
    unreadCount: 2,
  },
  {
    id: 2,
    name: 'Carlos',
    age: 28,
    lastMessage: '¿Te gusta cocinar?',
    lastMessageTime: '1 hora',
    isOnline: false,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    unreadCount: 0,
  },
  {
    id: 3,
    name: 'María',
    age: 26,
    lastMessage: '¡Perfecto! Nos vemos mañana',
    lastMessageTime: '3 horas',
    isOnline: true,
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    unreadCount: 1,
  },
  {
    id: 4,
    name: 'Ana',
    age: 25,
    lastMessage: 'Me encanta tu sentido del humor',
    lastMessageTime: '1 día',
    isOnline: false,
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
    unreadCount: 0,
  },
];

export default function MatchesScreen({ navigation }) {
  const [matches, setMatches] = useState(mockMatches);

  const renderMatchItem = ({ item }) => (
    <TouchableOpacity
      style={styles.matchItem}
      onPress={() => navigation.navigate('Chat', { match: item })}
    >
      <View style={styles.photoContainer}>
        <Image source={{ uri: item.photo }} style={styles.photo} />
        {item.isOnline && <View style={styles.onlineIndicator} />}
      </View>
      
      <View style={styles.matchInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.age}>{item.age}</Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
        <Text style={styles.lastMessageTime}>{item.lastMessageTime}</Text>
      </View>
      
      {item.unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadCount}>{item.unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderNewMatches = () => (
    <View style={styles.newMatchesSection}>
      <Text style={styles.sectionTitle}>Nuevos Matches</Text>
      <FlatList
        data={matches.slice(0, 3)}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.newMatchItem}>
            <View style={styles.newMatchPhotoContainer}>
              <Image source={{ uri: item.photo }} style={styles.newMatchPhoto} />
              <View style={styles.newMatchBadge}>
                <Icon name="favorite" size={16} color="#fff" />
              </View>
            </View>
            <Text style={styles.newMatchName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.newMatchesList}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient
        colors={['#E91E63', '#F06292']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Matches</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      {/* New Matches Section */}
      {renderNewMatches()}

      {/* Matches List */}
      <View style={styles.matchesListContainer}>
        <Text style={styles.sectionTitle}>Mensajes</Text>
        <FlatList
          data={matches}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMatchItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.matchesList}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newMatchesSection: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
    marginBottom: 15,
  },
  newMatchesList: {
    paddingHorizontal: 20,
  },
  newMatchItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  newMatchPhotoContainer: {
    position: 'relative',
  },
  newMatchPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#E91E63',
  },
  newMatchBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E91E63',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newMatchName: {
    fontSize: 14,
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  matchesListContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  matchesList: {
    paddingHorizontal: 20,
  },
  matchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  photoContainer: {
    position: 'relative',
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  matchInfo: {
    flex: 1,
    marginLeft: 15,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  age: {
    fontSize: 14,
    color: '#666',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  lastMessageTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E91E63',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCount: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
});
