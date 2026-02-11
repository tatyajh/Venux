import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function UserProfileScreen({ route, navigation }) {
  const { user } = route.params || {};
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Datos de ejemplo si no se pasa usuario
  const profileData = user || {
    id: 1,
    name: 'María y Carlos',
    age: 28,
    type: 'couple',
    location: 'Bogotá',
    bio: 'Somos una pareja joven buscando nuevas experiencias y amistades. Nos encanta viajar, la buena música y las noches de películas.',
    photos: [],
    interests: ['Viajes', 'Música', 'Cine', 'Gastronomía'],
    isOnline: true,
    isVerified: true,
  };

  const getTypeBadge = () => {
    switch (profileData.type) {
      case 'couple': return { text: 'Pareja', color: '#BA68C8' };
      case 'single': return { text: 'Single', color: '#7C4DFF' };
      case 'woman': return { text: 'Mujer', color: '#EC407A' };
      default: return { text: 'Usuario', color: '#BA68C8' };
    }
  };

  const typeBadge = getTypeBadge();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Photo Section */}
      <View style={styles.photoSection}>
        {profileData.photos && profileData.photos.length > 0 ? (
          <Image 
            source={{ uri: profileData.photos[currentPhotoIndex] }} 
            style={styles.mainPhoto} 
          />
        ) : (
          <View style={styles.photoPlaceholder}>
            <MaterialIcons name="person" size={100} color="#BA68C8" />
          </View>
        )}
        
        <LinearGradient
          colors={['transparent', 'rgba(10,10,35,0.8)', '#0A0A23']}
          style={styles.photoGradient}
        />

        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        {/* More Options */}
        <TouchableOpacity style={styles.moreButton}>
          <MaterialIcons name="more-vert" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Photo Indicators */}
        {profileData.photos && profileData.photos.length > 1 && (
          <View style={styles.photoIndicators}>
            {profileData.photos.map((_, index) => (
              <View 
                key={index}
                style={[
                  styles.indicator,
                  currentPhotoIndex === index && styles.indicatorActive
                ]}
              />
            ))}
          </View>
        )}

        {/* Online Indicator */}
        {profileData.isOnline && (
          <View style={styles.onlineStatus}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>En línea</Text>
          </View>
        )}
      </View>

      {/* Profile Info */}
      <ScrollView style={styles.infoSection} showsVerticalScrollIndicator={false}>
        {/* Name and Age */}
        <View style={styles.nameRow}>
          <Text style={styles.name}>{profileData.name}</Text>
          {profileData.age && <Text style={styles.age}>, {profileData.age}</Text>}
          {profileData.isVerified && (
            <MaterialIcons name="verified" size={20} color="#BA68C8" style={styles.verifiedIcon} />
          )}
        </View>

        {/* Type Badge and Location */}
        <View style={styles.metaRow}>
          <View style={[styles.typeBadge, { backgroundColor: typeBadge.color }]}>
            <Text style={styles.typeBadgeText}>{typeBadge.text}</Text>
          </View>
          <View style={styles.locationContainer}>
            <MaterialIcons name="location-on" size={16} color="rgba(255,255,255,0.5)" />
            <Text style={styles.locationText}>{profileData.location}</Text>
          </View>
        </View>

        {/* Bio */}
        {profileData.bio && (
          <View style={styles.bioSection}>
            <Text style={styles.sectionTitle}>Sobre nosotros</Text>
            <Text style={styles.bioText}>{profileData.bio}</Text>
          </View>
        )}

        {/* Interests */}
        {profileData.interests && profileData.interests.length > 0 && (
          <View style={styles.interestsSection}>
            <Text style={styles.sectionTitle}>Intereses</Text>
            <View style={styles.interestsList}>
              {profileData.interests.map((interest, index) => (
                <View key={index} style={styles.interestChip}>
                  <Text style={styles.interestText}>{interest}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Spacer for buttons */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="close" size={28} color="#FF5252" />
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionButton, styles.likeButton]}>
          <MaterialIcons name="favorite" size={28} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('ChatConversation', { conversation: profileData })}
        >
          <MaterialIcons name="chat-bubble-outline" size={24} color="#BA68C8" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A23',
  },
  photoSection: {
    height: width * 0.9,
    position: 'relative',
  },
  mainPhoto: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoIndicators: {
    position: 'absolute',
    top: 16,
    left: 70,
    right: 70,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 4,
  },
  indicatorActive: {
    backgroundColor: '#fff',
    width: 24,
  },
  onlineStatus: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  onlineText: {
    color: '#4CAF50',
    fontSize: 14,
  },
  infoSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  age: {
    fontSize: 26,
    color: '#fff',
  },
  verifiedIcon: {
    marginLeft: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 12,
  },
  typeBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    marginLeft: 4,
  },
  bioSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  bioText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 22,
  },
  interestsSection: {
    marginTop: 24,
  },
  interestsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestChip: {
    backgroundColor: 'rgba(186, 104, 200, 0.2)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    color: '#BA68C8',
    fontSize: 13,
  },
  actionButtons: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  likeButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#BA68C8',
    borderWidth: 0,
  },
});
