import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuthStore } from '../store/useAuthStore';
import { signOut } from '../lib/supabase';

// Datos de ejemplo del perfil del usuario
const userProfile = {
  name: 'Dev User',
  type: 'Pareja',
  description: 'Lorem ipsum dolor sit amet consectetur. Odio viverra nisi eu tellus arcu vulputate posuere sodales.',
  orientation: 'Heterosexual',
  age: '27 años',
  height: '1.54 cm',
  womanType: 'Con permiso',
  albumsCount: 0,
};

export default function ProfileScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Perfil');
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await signOut();
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi cuenta</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <MaterialIcons name="settings" size={24} color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {['Perfil', 'Fotos'].map((tab) => (
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

        {/* Albums Count */}
        <Text style={styles.albumsText}>[DEBUG] Albums loaded: {userProfile.albumsCount}</Text>

        {/* Type Badge */}
        <View style={styles.typeBadge}>
          <Text style={styles.typeBadgeText}>{userProfile.type}</Text>
        </View>

        {/* User Name */}
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Nombre de usuario</Text>
          <Text style={styles.infoValue}>{userProfile.name}</Text>
        </View>

        {/* Description */}
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Descripción</Text>
          <Text style={styles.infoValue}>{userProfile.description}</Text>
        </View>

        {/* Characteristics */}
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Características</Text>
          <View style={styles.characteristicsContainer}>
            <View style={styles.characteristicRow}>
              <Text style={styles.characteristicLabel}>Orientación sexual</Text>
              <Text style={styles.characteristicValue}>{userProfile.orientation}</Text>
            </View>
            <View style={styles.characteristicRow}>
              <Text style={styles.characteristicLabel}>Edad</Text>
              <Text style={styles.characteristicValue}>{userProfile.age}</Text>
            </View>
            <View style={styles.characteristicRow}>
              <Text style={styles.characteristicLabel}>Altura</Text>
              <Text style={styles.characteristicValue}>{userProfile.height}</Text>
            </View>
            <View style={styles.characteristicRow}>
              <Text style={styles.characteristicLabel}>Tipo de mujer</Text>
              <Text style={styles.characteristicValue}>{userProfile.womanType}</Text>
            </View>
          </View>
        </View>

        {/* Edit Profile Button */}
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Text style={styles.editButtonText}>Editar perfil</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>

        {/* Spacer for tab bar */}
        <View style={{ height: 100 }} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    paddingHorizontal: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginRight: 8,
  },
  tabActive: {
    backgroundColor: '#fff',
  },
  tabText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  tabTextActive: {
    color: '#0A0A23',
    fontWeight: '600',
  },
  albumsText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    marginBottom: 16,
  },
  typeBadge: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  typeBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  infoSection: {
    marginBottom: 20,
  },
  infoLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    marginBottom: 6,
  },
  infoValue: {
    color: '#fff',
    fontSize: 16,
  },
  characteristicsContainer: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  characteristicRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  characteristicLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
  },
  characteristicValue: {
    color: '#fff',
    fontSize: 14,
  },
  editButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#E91E63',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
