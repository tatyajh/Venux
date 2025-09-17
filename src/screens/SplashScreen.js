import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    // Mostrar splash por 3 segundos, luego ir al login
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.gradient}>
        <View style={styles.logoContainer}>
          {/* Logo con gradiente exacto del Figma */}
          <View style={styles.heartContainer}>
            <LinearGradient
              colors={[
                '#3D016F',
                '#5F016F', 
                '#89016F',
                '#8D026F',
                '#9B0671',
                '#B10D74',
                '#D11678',
                '#F9227D',
                '#FF247E'
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heartGradient}
            >
              <Icon name="favorite" size={60} color="#fff" />
            </LinearGradient>
          </View>
          
          <Text style={styles.appName}>venux</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A23',
  },
  logoContainer: {
    alignItems: 'center',
  },
  heartContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#FF247E',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.4,
    shadowRadius: 25,
    elevation: 25,
  },
  heartGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 42,
    fontWeight: '200',
    color: '#fff',
    textTransform: 'lowercase',
    letterSpacing: 4,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'Roboto',
  },
});
