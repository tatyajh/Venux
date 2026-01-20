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
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Datos de ejemplo para las conversaciones
const mockConversations = [
  {
    id: 1,
    name: 'Ana & Carlos',
    lastMessage: '¡Nos encantaría conocerte mej...',
    time: '03:30 P.M.',
    unread: 3,
    photo: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=100',
    isOnline: true,
  },
  {
    id: 2,
    name: 'María',
    lastMessage: 'Gracias por tu mensaje, me pa...',
    time: '02:00 P.M.',
    unread: 1,
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    isOnline: false,
  },
  {
    id: 3,
    name: 'Luis & Patricia',
    lastMessage: '¿Están disponibles este fin de...',
    time: '10:00 A.M.',
    unread: 2,
    photo: 'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=100',
    isOnline: true,
  },
  {
    id: 4,
    name: 'Sofia',
    lastMessage: 'Nos vemos entonces! 💜',
    time: '07:45 P.M.',
    unread: 0,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    isOnline: false,
  },
  {
    id: 5,
    name: 'Roberto & Julia',
    lastMessage: 'Perfecto, quedamos confirma...',
    time: '04:20 P.M.',
    unread: 0,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    isOnline: false,
  },
  {
    id: 6,
    name: 'Valentina',
    lastMessage: 'Me encanta tu perfil!',
    time: '11:30 A.M.',
    unread: 0,
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100',
    isOnline: true,
  },
  {
    id: 7,
    name: 'Diego & Laura',
    lastMessage: 'Sí, estamos interesados',
    time: '08:15 P.M.',
    unread: 0,
    photo: null,
    isOnline: false,
  },
];

const TABS = ['Todos', 'Leídos', 'No leídos'];

export default function ChatScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Todos');
  const [conversations] = useState(mockConversations);

  const getFilteredConversations = () => {
    if (activeTab === 'Leídos') return conversations.filter(c => c.unread === 0);
    if (activeTab === 'No leídos') return conversations.filter(c => c.unread > 0);
    return conversations;
  };

  const renderConversation = ({ item }) => (
    <TouchableOpacity 
      style={styles.conversationItem}
      onPress={() => {/* Navigate to chat */}}
    >
      <View style={styles.avatarContainer}>
        {item.photo ? (
          <Image source={{ uri: item.photo }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <MaterialIcons name="person" size={24} color="#9C27B9" />
          </View>
        )}
      </View>
      
      <View style={styles.conversationInfo}>
        <View style={styles.conversationHeader}>
          <View style={styles.conversationNameRow}>
            {item.isOnline && <View style={styles.onlineIndicator} />}
            <Text style={styles.conversationName}>{item.name}</Text>
          </View>
          <Text style={styles.conversationTime}>{item.time}</Text>
        </View>
        <Text style={styles.conversationMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      
      {item.unread > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{item.unread}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mensajes</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Solicitudes */}
      <TouchableOpacity style={styles.solicitudesButton}>
        <Text style={styles.solicitudesText}>Solicitudes (5)</Text>
        <MaterialIcons name="chevron-right" size={20} color="rgba(255,255,255,0.5)" />
      </TouchableOpacity>

      {/* Conversations List */}
      <FlatList
        data={getFilteredConversations()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderConversation}
        style={styles.conversationsList}
        contentContainerStyle={styles.conversationsContent}
        showsVerticalScrollIndicator={false}
      />
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
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#3d3d5c',
    borderRadius: 25,
    padding: 3,
    alignSelf: 'flex-start',
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  tabActive: {
    backgroundColor: '#0d0d1a',
  },
  tabText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: '500',
  },
  solicitudesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  solicitudesText: {
    color: '#CE93D8',
    fontSize: 14,
  },
  conversationsList: {
    flex: 1,
  },
  conversationsContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    marginBottom: 10,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2a2a4e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF9800',
    marginRight: 6,
  },
  conversationInfo: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  conversationNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conversationName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  conversationTime: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
  },
  conversationMessage: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
  },
  unreadBadge: {
    backgroundColor: '#BA68C8',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
