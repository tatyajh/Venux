import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Datos de ejemplo para las salas de chat
const mockChatRooms = [
  {
    id: 1,
    name: 'Parejas',
    description: 'Sala exclusiva para parejas.',
    current: 38,
    max: 100,
  },
  {
    id: 2,
    name: 'Solos y solas',
    description: 'Sala exclusiva para singles y mujeres.',
    current: 23,
    max: 100,
  },
  {
    id: 3,
    name: 'Mixta',
    description: 'Sala para todos, son bienvenidos parejas, solteros y mujeres.',
    current: 110,
    max: 300,
  },
];

const TABS = ['Disponibles', 'Abiertos'];

export default function PublicChatsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Disponibles');
  const [chatRooms] = useState(mockChatRooms);

  const renderChatRoom = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatRoomCard}
      onPress={() => {/* Navigate to chat room */}}
    >
      <View style={styles.iconPlaceholder} />
      
      <View style={styles.chatRoomInfo}>
        <View style={styles.chatRoomHeader}>
          <Text style={styles.chatRoomName}>{item.name}</Text>
          <View style={styles.membersContainer}>
            <MaterialIcons name="people-outline" size={16} color="rgba(255,255,255,0.5)" />
            <Text style={styles.membersText}>{item.current} / {item.max}</Text>
          </View>
        </View>
        <Text style={styles.chatRoomDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat público</Text>
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

      {/* Chat Rooms List */}
      <FlatList
        data={chatRooms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderChatRoom}
        style={styles.chatRoomsList}
        contentContainerStyle={styles.chatRoomsContent}
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
    marginBottom: 20,
    backgroundColor: '#3d3d5c',
    borderRadius: 25,
    padding: 3,
    alignSelf: 'flex-start',
  },
  tab: {
    paddingHorizontal: 16,
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
  chatRoomsList: {
    flex: 1,
  },
  chatRoomsContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  chatRoomCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    marginBottom: 12,
  },
  iconPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#0d0d1a',
    marginRight: 14,
  },
  chatRoomInfo: {
    flex: 1,
  },
  chatRoomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  chatRoomName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  membersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  membersText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginLeft: 4,
  },
  chatRoomDescription: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 18,
  },
});
