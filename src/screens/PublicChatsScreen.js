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
    name: 'Parejas Bogotá',
    description: 'Chat para parejas en Bogotá',
    members: 128,
    online: 34,
    icon: 'location-city',
    color: '#BA68C8',
  },
  {
    id: 2,
    name: 'Singles Medellín',
    description: 'Conoce singles en Medellín',
    members: 95,
    online: 22,
    icon: 'person',
    color: '#7C4DFF',
  },
  {
    id: 3,
    name: 'Eventos y Fiestas',
    description: 'Organiza y encuentra eventos',
    members: 256,
    online: 67,
    icon: 'celebration',
    color: '#FF7043',
  },
  {
    id: 4,
    name: 'Viajes en Pareja',
    description: 'Comparte experiencias de viaje',
    members: 189,
    online: 45,
    icon: 'flight',
    color: '#26A69A',
  },
  {
    id: 5,
    name: 'Citas y Consejos',
    description: 'Tips para tus citas',
    members: 312,
    online: 89,
    icon: 'favorite',
    color: '#EC407A',
  },
  {
    id: 6,
    name: 'Nuevos Miembros',
    description: 'Bienvenidos a Venux',
    members: 78,
    online: 15,
    icon: 'waving-hand',
    color: '#FFA726',
  },
];

export default function PublicChatsScreen({ navigation }) {
  const [chatRooms] = useState(mockChatRooms);

  const renderChatRoom = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatRoomCard}
      onPress={() => {/* Navigate to chat room */}}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
        <MaterialIcons name={item.icon} size={24} color="#fff" />
      </View>
      
      <View style={styles.chatRoomInfo}>
        <Text style={styles.chatRoomName}>{item.name}</Text>
        <Text style={styles.chatRoomDescription} numberOfLines={1}>
          {item.description}
        </Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <MaterialIcons name="people" size={14} color="rgba(255,255,255,0.5)" />
            <Text style={styles.statText}>{item.members}</Text>
          </View>
          <View style={styles.stat}>
            <View style={styles.onlineDot} />
            <Text style={styles.statText}>{item.online} online</Text>
          </View>
        </View>
      </View>
      
      <MaterialIcons name="chevron-right" size={24} color="rgba(255,255,255,0.3)" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chats Públicos</Text>
        <TouchableOpacity style={styles.searchButton}>
          <MaterialIcons name="search" size={24} color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Únete a salas de chat y conoce personas con intereses similares
      </Text>

      {/* Chat Rooms List */}
      <FlatList
        data={chatRooms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderChatRoom}
        style={styles.chatRoomsList}
        contentContainerStyle={styles.chatRoomsContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Create Room Button */}
      <TouchableOpacity style={styles.createButton}>
        <MaterialIcons name="add" size={24} color="#fff" />
        <Text style={styles.createButtonText}>Crear sala</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A23',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    paddingHorizontal: 16,
    marginBottom: 20,
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
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    marginBottom: 12,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  chatRoomInfo: {
    flex: 1,
  },
  chatRoomName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  chatRoomDescription: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 6,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    marginLeft: 4,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BA68C8',
    marginHorizontal: 16,
    marginBottom: 100,
    paddingVertical: 16,
    borderRadius: 14,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
