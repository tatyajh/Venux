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
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    location: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    const { name, email, password, confirmPassword, age, location } = formData;

    if (!name || !email || !password || !confirmPassword || !age || !location) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);
    
    // Simular registro exitoso
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        '¡Registro exitoso!',
        `¡Bienvenido a Venux, ${name}!\n\nTu cuenta ha sido creada correctamente.`,
        [{ text: 'Continuar', onPress: () => navigation.navigate('Main') }]
      );
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={['#E91E63', '#F06292', '#FFB3BA']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
              {/* Header */}
              <View style={styles.header}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}
                >
                  <Icon name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
              </View>

              {/* Logo and Title */}
              <View style={styles.logoContainer}>
                <View style={styles.logo}>
                  <Icon name="favorite" size={40} color="#fff" />
                </View>
                <Text style={styles.title}>Únete a Venux</Text>
                <Text style={styles.subtitle}>Crea tu cuenta y encuentra tu match</Text>
              </View>

              {/* Register Form */}
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <Icon name="person" size={20} color="#E91E63" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Nombre completo"
                    placeholderTextColor="#999"
                    value={formData.name}
                    onChangeText={(value) => handleInputChange('name', value)}
                    autoCapitalize="words"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Icon name="email" size={20} color="#E91E63" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    placeholderTextColor="#999"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Icon name="cake" size={20} color="#E91E63" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Edad"
                    placeholderTextColor="#999"
                    value={formData.age}
                    onChangeText={(value) => handleInputChange('age', value)}
                    keyboardType="numeric"
                    maxLength={2}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Icon name="location-on" size={20} color="#E91E63" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Ciudad"
                    placeholderTextColor="#999"
                    value={formData.location}
                    onChangeText={(value) => handleInputChange('location', value)}
                    autoCapitalize="words"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Icon name="lock" size={20} color="#E91E63" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor="#999"
                    value={formData.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Icon
                      name={showPassword ? 'visibility' : 'visibility-off'}
                      size={20}
                      color="#999"
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                  <Icon name="lock" size={20} color="#E91E63" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirmar contraseña"
                    placeholderTextColor="#999"
                    value={formData.confirmPassword}
                    onChangeText={(value) => handleInputChange('confirmPassword', value)}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Icon
                      name={showConfirmPassword ? 'visibility' : 'visibility-off'}
                      size={20}
                      color="#999"
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
                  onPress={handleRegister}
                  disabled={isLoading}
                >
                  <Text style={styles.registerButtonText}>
                    {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                  </Text>
                </TouchableOpacity>

                {/* Terms */}
                <Text style={styles.termsText}>
                  Al registrarte, aceptas nuestros{' '}
                  <Text style={styles.termsLink}>Términos de Servicio</Text>
                  {' '}y{' '}
                  <Text style={styles.termsLink}>Política de Privacidad</Text>
                </Text>
              </View>

              {/* Login Link */}
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.loginLink}>Inicia sesión</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputIcon: {
    marginRight: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 15,
  },
  eyeButton: {
    padding: 5,
  },
  registerButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  registerButtonDisabled: {
    opacity: 0.7,
  },
  registerButtonText: {
    color: '#E91E63',
    fontSize: 18,
    fontWeight: 'bold',
  },
  termsText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  loginText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
  },
  loginLink: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
