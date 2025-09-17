import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Animated,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

// Datos de ejemplo para las tarjetas
const mockUsers = [
  {
    id: 1,
    name: 'Sofia',
    age: 24,
    distance: '2 km',
    photos: [
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    ],
    bio: 'Amante de la música y los viajes. Busco alguien con quien compartir aventuras.',
    interests: ['Música', 'Viajes', 'Fotografía'],
  },
  {
    id: 2,
    name: 'Carlos',
    age: 28,
    distance: '5 km',
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    ],
    bio: 'Chef apasionado y amante del deporte. Me gusta cocinar y hacer ejercicio.',
    interests: ['Cocina', 'Deporte', 'Cine'],
  },
  {
    id: 3,
    name: 'María',
    age: 26,
    distance: '3 km',
    photos: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    ],
    bio: 'Artista y diseñadora. Me encanta crear y explorar nuevas formas de expresión.',
    interests: ['Arte', 'Diseño', 'Literatura'],
  },
];

export default function HomeScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [users, setUsers] = useState(mockUsers);
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  // Simplified swipe handling for web compatibility
  const handleSwipe = (direction) => {
    if (direction === 'left') {
      handlePass();
    } else if (direction === 'right') {
      handleLike();
    }
  };

  const handleLike = () => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      nextCard();
    });
  };

  const handlePass = () => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: -1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      nextCard();
    });
  };

  const nextCard = () => {
    setCurrentIndex(currentIndex + 1);
    translateX.setValue(0);
    translateY.setValue(0);
    rotate.setValue(0);
  };

  const renderCard = (user, index) => {
    if (index < currentIndex) return null;
    
    const isTopCard = index === currentIndex;
    const scale = isTopCard ? 1 : 0.95;
    const opacity = isTopCard ? 1 : 0.8;

    const rotateInterpolate = rotate.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: ['-30deg', '0deg', '30deg'],
    });

    return (
      <Animated.View
        key={user.id}
        style={[
          styles.card,
          {
            transform: [
              { scale },
              { translateX: isTopCard ? translateX : 0 },
              { translateY: isTopCard ? translateY : 0 },
              { rotate: isTopCard ? rotateInterpolate : '0deg' },
            ],
            opacity,
            zIndex: users.length - index,
          },
        ]}
      >
        <Animated.View style={styles.cardContent}>
          <Image source={{ uri: user.photos[0] }} style={styles.cardImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.gradient}
          />
          <View style={styles.cardInfo}>
            <Text style={styles.cardName}>{user.name}, {user.age}</Text>
            <Text style={styles.cardDistance}>{user.distance} de distancia</Text>
            <Text style={styles.cardBio} numberOfLines={2}>{user.bio}</Text>
            <View style={styles.interestsContainer}>
              {user.interests.map((interest, idx) => (
                <View key={idx} style={styles.interestTag}>
                  <Text style={styles.interestText}>{interest}</Text>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="tune" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Venux</Text>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Icon name="settings" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Cards Container */}
      <View style={styles.cardsContainer}>
        {users.map((user, index) => renderCard(user, index))}
        
        {currentIndex >= users.length && (
          <View style={styles.noMoreCards}>
            <Icon name="favorite" size={60} color="#E91E63" />
            <Text style={styles.noMoreCardsText}>No hay más perfiles</Text>
            <Text style={styles.noMoreCardsSubtext}>
              Vuelve más tarde para ver nuevos perfiles
            </Text>
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleSwipe('left')}>
          <Icon name="close" size={30} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.superLikeButton}>
          <Icon name="star" size={25} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={() => handleSwipe('right')}>
          <Icon name="favorite" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    position: 'absolute',
    width: width - 40,
    height: height * 0.7,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  cardInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  cardName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  cardDistance: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  cardBio: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 22,
    marginBottom: 15,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    color: '#fff',
    fontSize: 14,
  },
  noMoreCards: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  noMoreCardsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
  },
  noMoreCardsSubtext: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 10,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 30,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  superLikeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
