import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function LoginScreen({ navigation }) {
  const [isPhoneMode, setIsPhoneMode] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+57');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (isPhoneMode) {
      if (!phoneNumber) {
        Alert.alert('Error', 'Por favor ingresa tu número de celular');
        return;
      }
    } else {
      if (!email) {
        Alert.alert('Error', 'Por favor ingresa tu correo electrónico');
        return;
      }
    }

    setIsLoading(true);
    
    // Simular login exitoso
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('¡Bienvenido!', 'Login exitoso', [
        { text: 'OK', onPress: () => navigation.navigate('Main') }
      ]);
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    Alert.alert('Login Social', `Login con ${provider} - Funcionalidad en desarrollo`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.gradient}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.content}>
            {/* Logo and Title */}
            <View style={styles.logoContainer}>
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
                  <Icon name="favorite" size={40} color="#fff" />
                </LinearGradient>
              </View>
              <Text style={styles.title}>venux</Text>
            </View>

            {/* Toggle Switch */}
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[styles.toggleButton, isPhoneMode && styles.toggleButtonActive]}
                onPress={() => setIsPhoneMode(true)}
              >
                <Text style={[styles.toggleText, isPhoneMode && styles.toggleTextActive]}>
                  Celular
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, !isPhoneMode && styles.toggleButtonActive]}
                onPress={() => setIsPhoneMode(false)}
              >
                <Text style={[styles.toggleText, !isPhoneMode && styles.toggleTextActive]}>
                  Correo
                </Text>
              </TouchableOpacity>
            </View>

            {/* Input Form */}
            <View style={styles.inputForm}>
              {isPhoneMode ? (
                <>
                  <View style={styles.countryCodeContainer}>
                    <View style={styles.flagContainer}>
                      <Text style={styles.flag}>🇨🇴</Text>
                    </View>
                    <Text style={styles.countryCodeText}>+57</Text>
                    <Icon name="keyboard-arrow-down" size={20} color="#fff" />
                  </View>
                  <View style={styles.phoneInputContainer}>
                    <Icon name="phone" size={20} color="#8B5CF6" style={styles.inputIcon} />
                    <TextInput
                      style={styles.phoneInput}
                      placeholder="Ingresa tu número"
                      placeholderTextColor="#999"
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      keyboardType="phone-pad"
                    />
                  </View>
                </>
              ) : (
                <View style={styles.emailInputContainer}>
                  <Icon name="email" size={20} color="#8B5CF6" style={styles.inputIcon} />
                  <TextInput
                    style={styles.emailInput}
                    placeholder="Ingresa tu correo"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              )}
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <Text style={styles.loginButtonText}>
                  {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </Text>
              </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.googleButton}
                    onPress={() => handleSocialLogin('Google')}
                  >
                    <View style={styles.googleIconContainer}>
                      <Text style={styles.googleIcon}>G</Text>
                    </View>
                    <Text style={styles.googleButtonText}>Iniciar sesión con Google</Text>
                  </TouchableOpacity>
            </View>

            {/* Register Link */}
            <TouchableOpacity 
              style={styles.registerLinkContainer}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.registerText}>Crear una cuenta</Text>
              <Icon name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
    backgroundColor: '#0A0A23',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  heartContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#FF247E',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  heartGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '200',
    color: '#fff',
    textTransform: 'lowercase',
    letterSpacing: 3,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'Roboto',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 25,
    padding: 4,
    marginBottom: 40,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
  },
  toggleTextActive: {
    color: '#fff',
  },
  inputForm: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
  },
  flagContainer: {
    marginRight: 10,
  },
  flag: {
    fontSize: 20,
  },
  countryCodeText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    flex: 1,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  emailInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 15,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  emailInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  buttonsContainer: {
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: '#9C27B9',
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  googleIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  googleIcon: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  googleButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '400',
  },
  registerLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30,
  },
  registerText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 8,
  },
});
