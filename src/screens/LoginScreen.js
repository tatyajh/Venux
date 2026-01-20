import React, { useState, useRef, useEffect } from 'react';
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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { sendOtpEmail, verifyOtp } from '../lib/supabase';
import { useAuthStore } from '../store/useAuthStore';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(0);
  const inputRefs = useRef([]);
  
  const setUser = useAuthStore((state) => state.setUser);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  // OTP countdown timer
  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpTimer]);

  // Auto-submit when OTP is complete
  useEffect(() => {
    const otpCode = otp.join('');
    if (otpCode.length === 6 && otpSent && !isLoading) {
      handleVerifyOtp();
    }
  }, [otp, otpSent]);

  const handleSendOtp = async () => {
    if (!email) {
      Alert.alert('Error', 'Por favor ingresa tu correo electrónico');
      return;
    }

    setIsLoading(true);
    
    const { error } = await sendOtpEmail(email);
    
    if (error) {
      Alert.alert('Error', error.message || 'Error enviando código');
    } else {
      setOtpSent(true);
      setOtpTimer(60);
    }
    
    setIsLoading(false);
  };

  const handleVerifyOtp = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) return;

    setIsLoading(true);

    const { data, error } = await verifyOtp(email, otpCode);

    if (error) {
      Alert.alert('Error', error.message || 'Código inválido');
      setOtp(['', '', '', '', '', '']);
    } else if (data.user && data.session) {
      setUser({
        id: data.user.id,
        email: data.user.email || '',
        membership: { plan: 'free' },
        profile: {
          name: data.user.user_metadata?.name || '',
          role: data.user.user_metadata?.role || 'single',
          isOnline: true,
        },
      });
      setAccessToken(data.session.access_token);
      navigation.replace('Main');
    }

    setIsLoading(false);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (index, key) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSocialLogin = (provider) => {
    Alert.alert('Login Social', `Login con ${provider} - Próximamente`);
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
                  <MaterialIcons name="favorite" size={40} color="#fff" />
                </LinearGradient>
              </View>
              <Text style={styles.title}>venux</Text>
            </View>

            {!otpSent ? (
              <>
                {/* Input Form - Email */}
                <View style={styles.inputForm}>
                  <View style={styles.emailInputContainer}>
                    <MaterialIcons name="email" size={20} color="#8B5CF6" style={styles.inputIcon} />
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
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                    onPress={handleSendOtp}
                    disabled={isLoading || !email}
                  >
                    <Text style={styles.loginButtonText}>
                      {isLoading ? 'Enviando código...' : 'Iniciar sesión'}
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
                  <MaterialIcons name="add" size={20} color="#fff" />
                </TouchableOpacity>
              </>
            ) : (
              <>
                {/* Back Button */}
                <TouchableOpacity 
                  style={styles.backButton}
                  onPress={() => setOtpSent(false)}
                >
                  <MaterialIcons name="arrow-back" size={24} color="#fff" />
                  <Text style={styles.backButtonText}>Atrás</Text>
                </TouchableOpacity>

                {/* OTP Info */}
                <View style={styles.otpInfoContainer}>
                  <Text style={styles.otpTitle}>Código enviado</Text>
                  <Text style={styles.otpSubtitle}>
                    Ingresa el código de 6 dígitos enviado a {email}
                  </Text>
                </View>

                {/* OTP Input */}
                <View style={styles.otpContainer}>
                  {otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={(ref) => (inputRefs.current[index] = ref)}
                      style={styles.otpInput}
                      value={digit}
                      onChangeText={(value) => handleOtpChange(index, value)}
                      onKeyPress={({ nativeEvent }) => handleOtpKeyPress(index, nativeEvent.key)}
                      keyboardType="number-pad"
                      maxLength={1}
                      selectTextOnFocus
                    />
                  ))}
                </View>

                {/* Timer or Resend */}
                {otpTimer > 0 ? (
                  <Text style={styles.timerText}>
                    Reenviar código en {otpTimer}s
                  </Text>
                ) : (
                  <TouchableOpacity onPress={handleSendOtp} disabled={isLoading}>
                    <Text style={styles.resendText}>Reenviar código</Text>
                  </TouchableOpacity>
                )}

                {/* Verify Button */}
                <TouchableOpacity
                  style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                  onPress={handleVerifyOtp}
                  disabled={isLoading || otp.join('').length !== 6}
                >
                  <Text style={styles.loginButtonText}>
                    {isLoading ? 'Verificando...' : 'Verificar código'}
                  </Text>
                </TouchableOpacity>
              </>
            )}
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
  // OTP Styles
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  otpInfoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  otpTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  otpSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 30,
  },
  otpInput: {
    width: 45,
    height: 55,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#9C27B9',
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timerText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  resendText: {
    color: '#9C27B9',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
});
