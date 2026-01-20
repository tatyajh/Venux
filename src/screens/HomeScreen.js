import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useUIStore } from '../store/useUIStore';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

// Datos de ejemplo para los perfiles
const mockUsers = [
  {
    id: 1,
    name: 'Miguel',
    type: 'single',
    distance: '2 km',
    isOnline: true,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  },
  {
    id: 2,
    name: 'Elena y Ricardo',
    type: 'couple',
    distance: '5 km',
    isOnline: true,
    photo: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400',
  },
  {
    id: 3,
    name: 'Valentina',
    type: 'woman',
    distance: '3 km',
    isOnline: false,
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  },
  {
    id: 4,
    name: 'Alejandro',
    type: 'single',
    distance: '8 km',
    isOnline: true,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
  },
  {
    id: 5,
    name: 'Victoria',
    type: 'woman',
    distance: '1 km',
    isOnline: false,
    photo: null,
  },
  {
    id: 6,
    name: 'Julia',
    type: 'woman',
    distance: '4 km',
    isOnline: true,
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
  },
  {
    id: 7,
    name: 'Roberto',
    type: 'single',
    distance: '6 km',
    isOnline: false,
    photo: null,
  },
];

const FILTERS = ['Todos', 'Parejas', 'Singles', 'Mujeres'];

export default function HomeScreen({ navigation }) {
  const [users] = useState(mockUsers);
  const [showFilters, setShowFilters] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const quickFilter = useUIStore((state) => state.quickFilter);
  const setQuickFilter = useUIStore((state) => state.setQuickFilter);

  const getFilteredUsers = () => {
    if (quickFilter === 'all') return users;
    if (quickFilter === 'couples') return users.filter(u => u.type === 'couple');
    if (quickFilter === 'singles') return users.filter(u => u.type === 'single');
    if (quickFilter === 'women') return users.filter(u => u.type === 'woman');
    return users;
  };

  const handleFilterPress = (filter) => {
    const filterMap = {
      'Todos': 'all',
      'Parejas': 'couples',
      'Singles': 'singles',
      'Mujeres': 'women',
    };
    setQuickFilter(filterMap[filter]);
  };

  const renderProfileCard = (user) => (
    <TouchableOpacity 
      key={user.id} 
      style={styles.profileCard}
      onPress={() => {/* Navigate to profile */}}
    >
      {user.photo ? (
        <Image source={{ uri: user.photo }} style={styles.profileImage} />
      ) : (
        <View style={styles.profilePlaceholder}>
          <MaterialIcons name="person" size={50} color="#9C27B9" />
        </View>
      )}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.profileGradient}
      />
      {user.isOnline && <View style={styles.onlineIndicator} />}
      <View style={styles.profileInfo}>
        <Text style={styles.profileName} numberOfLines={1}>{user.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.premiumBadge}>
          <Text style={styles.premiumText}>Premium</Text>
        </TouchableOpacity>
        
        <MaterialIcons name="favorite" size={32} color="#E91E63" />
        
        <TouchableOpacity 
          style={styles.publicChatsButton}
          onPress={() => navigation.navigate('PublicChats')}
        >
          <MaterialIcons name="forum" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <MaterialIcons name="tune" size={20} color="#fff" />
        </TouchableOpacity>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersList}
        >
          {FILTERS.map((filter) => {
            const filterMap = { 'Todos': 'all', 'Parejas': 'couples', 'Singles': 'singles', 'Mujeres': 'women' };
            const isActive = quickFilter === filterMap[filter];
            return (
              <TouchableOpacity
                key={filter}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
                onPress={() => handleFilterPress(filter)}
              >
                <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Profiles Grid */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      >
        {getFilteredUsers().map(renderProfileCard)}
      </ScrollView>

      {/* Filters Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilters(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtros</Text>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <MaterialIcons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            
            {/* Location Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Ubicación a la redonda</Text>
              <View style={styles.rangeContainer}>
                <Text style={styles.rangeValue}>0 km</Text>
                <View style={styles.rangeSlider} />
                <Text style={styles.rangeValue}>25km</Text>
              </View>
            </View>

            {/* Age Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Edad</Text>
              <View style={styles.ageContainer}>
                <View style={styles.ageSelect}>
                  <Text style={styles.ageLabel}>Desde</Text>
                  <Text style={styles.ageValue}>18 años</Text>
                </View>
                <View style={styles.ageSelect}>
                  <Text style={styles.ageLabel}>Hasta</Text>
                  <Text style={styles.ageValue}>99 años</Text>
                </View>
              </View>
            </View>

            {/* Role Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Rol</Text>
              <View style={styles.roleContainer}>
                {['Parejas', 'Singles', 'Mujeres', 'Todos'].map((role) => (
                  <TouchableOpacity key={role} style={styles.roleChip}>
                    <View style={styles.roleCheckbox} />
                    <Text style={styles.roleText}>{role}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.clearButton}>
                <Text style={styles.clearButtonText}>Limpiar filtros</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={() => setShowFilters(false)}
              >
                <Text style={styles.applyButtonText}>Aplicar filtros</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  premiumBadge: {
    backgroundColor: '#9C27B9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  premiumText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  publicChatsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  connectedText: {
    color: '#fff',
    fontSize: 12,
    marginRight: 8,
  },
  toggleSwitch: {
    width: 40,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#333',
    padding: 2,
  },
  toggleSwitchActive: {
    backgroundColor: '#9C27B9',
  },
  toggleKnob: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#fff',
  },
  toggleKnobActive: {
    marginLeft: 18,
  },
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  filtersList: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#9C27B9',
  },
  filterChipText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  filterChipTextActive: {
    color: '#fff',
    fontWeight: '600',
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
  profileCard: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.3,
    margin: 6,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1a1a2e',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profilePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2a2a4e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  onlineIndicator: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#0A0A23',
  },
  profileInfo: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  profileName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1a1a2e',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  filterSection: {
    marginBottom: 24,
  },
  filterLabel: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 12,
  },
  rangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rangeValue: {
    color: '#fff',
    fontSize: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  rangeSlider: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 12,
    borderRadius: 2,
  },
  ageContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  ageSelect: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 12,
  },
  ageLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    marginBottom: 4,
  },
  ageValue: {
    color: '#fff',
    fontSize: 14,
  },
  roleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  roleChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  roleCheckbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    marginRight: 8,
  },
  roleText: {
    color: '#fff',
    fontSize: 14,
  },
  modalButtons: {
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: '#E91E63',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
