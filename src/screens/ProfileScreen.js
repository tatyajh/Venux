import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

// Datos de ejemplo del perfil del usuario
const userProfile = {
  name: 'Ana García',
  age: 25,
  location: 'Madrid, España',
  photos: [
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
  ],
  bio: 'Soy una persona apasionada por la vida, la música y los viajes. Me encanta conocer gente nueva y compartir experiencias únicas. ¡Siempre estoy buscando la próxima aventura!',
  interests: ['Música', 'Viajes', 'Fotografía', 'Cocina', 'Deporte', 'Arte'],
  job: 'Diseñadora UX/UI',
  education: 'Universidad Complutense de Madrid',
  height: '1.65m',
  zodiac: 'Leo',
  lookingFor: 'Algo serio',
};

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState(userProfile);

  const handleEditProfile = () => {
    Alert.alert(
      'Editar Perfil',
      '¿Qué te gustaría editar?',
      [
        { text: 'Fotos', onPress: () => console.log('Edit photos') },
        { text: 'Información', onPress: () => console.log('Edit info') },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const renderPhoto = (photo, index) => (
    <TouchableOpacity key={index} style={styles.photoItem}>
      <Image source={{ uri: photo }} style={styles.photo} />
      {index === 0 && (
        <View style={styles.mainPhotoBadge}>
          <Text style={styles.mainPhotoText}>Principal</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderInterest = (interest, index) => (
    <View key={index} style={styles.interestTag}>
      <Text style={styles.interestText}>{interest}</Text>
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
        <Text style={styles.headerTitle}>Mi Perfil</Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Icon name="settings" size={24} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Photos */}
        <View style={styles.photosSection}>
          <View style={styles.photosGrid}>
            {profile.photos.map((photo, index) => renderPhoto(photo, index))}
          </View>
          <TouchableOpacity style={styles.editPhotosButton} onPress={handleEditProfile}>
            <Icon name="camera-alt" size={20} color="#E91E63" />
            <Text style={styles.editPhotosText}>Editar fotos</Text>
          </TouchableOpacity>
        </View>

        {/* Basic Info */}
        <View style={styles.section}>
          <View style={styles.basicInfo}>
            <Text style={styles.name}>{profile.name}, {profile.age}</Text>
            <Text style={styles.location}>
              <Icon name="location-on" size={16} color="#666" /> {profile.location}
            </Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Icon name="edit" size={20} color="#E91E63" />
          </TouchableOpacity>
        </View>

        {/* Bio */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre mí</Text>
          <Text style={styles.bio}>{profile.bio}</Text>
        </View>

        {/* Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles</Text>
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Icon name="work" size={20} color="#E91E63" />
              <Text style={styles.detailText}>{profile.job}</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="school" size={20} color="#E91E63" />
              <Text style={styles.detailText}>{profile.education}</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="height" size={20} color="#E91E63" />
              <Text style={styles.detailText}>{profile.height}</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="star" size={20} color="#E91E63" />
              <Text style={styles.detailText}>{profile.zodiac}</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="favorite" size={20} color="#E91E63" />
              <Text style={styles.detailText}>{profile.lookingFor}</Text>
            </View>
          </View>
        </View>

        {/* Interests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Intereses</Text>
          <View style={styles.interestsContainer}>
            {profile.interests.map((interest, index) => renderInterest(interest, index))}
          </View>
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estadísticas</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>127</Text>
              <Text style={styles.statLabel}>Perfiles vistos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>23</Text>
              <Text style={styles.statLabel}>Matches</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Conversaciones</Text>
            </View>
          </View>
        </View>

        {/* Premium Section */}
        <View style={styles.premiumSection}>
          <LinearGradient
            colors={['#FFD700', '#FFA500']}
            style={styles.premiumCard}
          >
            <Icon name="star" size={30} color="#fff" />
            <Text style={styles.premiumTitle}>Venux Premium</Text>
            <Text style={styles.premiumSubtitle}>
              Desbloquea todas las funciones y encuentra tu match perfecto
            </Text>
            <TouchableOpacity style={styles.premiumButton}>
              <Text style={styles.premiumButtonText}>Actualizar ahora</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  photosSection: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    marginBottom: 10,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  photoItem: {
    width: (width - 60) / 2,
    height: 200,
    marginBottom: 10,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  mainPhotoBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  mainPhotoText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  editPhotosButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  editPhotosText: {
    color: '#E91E63',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  section: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 10,
  },
  basicInfo: {
    flex: 1,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: '#666',
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  bio: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 15,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  interestText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E91E63',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  premiumSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  premiumCard: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  premiumTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    marginBottom: 5,
  },
  premiumSubtitle: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
  },
  premiumButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  premiumButtonText: {
    color: '#FFA500',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
