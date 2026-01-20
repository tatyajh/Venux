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
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';

const COUNTRY_CODES = [
  { code: '+57', country: 'CO', flag: '🇨🇴' },
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+52', country: 'MX', flag: '🇲🇽' },
  { code: '+34', country: 'ES', flag: '🇪🇸' },
];

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    countryCode: '+57',
    phone: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContinue = async () => {
    const { phone, email } = formData;

    if (!phone || !email) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setIsLoading(true);
    
    try {
      // Registrar con email OTP (sin contraseña)
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          data: {
            phone: `${formData.countryCode}${phone}`,
          },
        },
      });

      if (error) throw error;

      setIsLoading(false);
      Alert.alert(
        '¡Código enviado!',
        'Te hemos enviado un código de verificación a tu correo.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          {/* Header */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={20} color="#BA68C8" />
            <Text style={styles.backText}>Atrás</Text>
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.title}>Crear una cuenta en Venux</Text>

          {/* Form Card */}
          <View style={styles.formCard}>
            {/* Country Code */}
            <Text style={styles.inputLabel}>Indicativo <Text style={styles.required}>*</Text></Text>
            <TouchableOpacity style={styles.selectContainer}>
              <Text style={styles.selectText}>CO  {formData.countryCode}</Text>
              <MaterialIcons name="keyboard-arrow-down" size={24} color="#fff" />
            </TouchableOpacity>

            {/* Phone */}
            <Text style={styles.inputLabel}>Número de celular <Text style={styles.required}>*</Text></Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="smartphone" size={20} color="rgba(255,255,255,0.5)" />
              <TextInput
                style={styles.input}
                placeholder="Ingresa tu número"
                placeholderTextColor="rgba(255,255,255,0.4)"
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                keyboardType="phone-pad"
              />
            </View>

            {/* Email */}
            <Text style={styles.inputLabel}>Correo electrónico <Text style={styles.required}>*</Text></Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="mail-outline" size={20} color="rgba(255,255,255,0.5)" />
              <TextInput
                style={styles.input}
                placeholder="Ingresa tu correo"
                placeholderTextColor="rgba(255,255,255,0.4)"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Spacer */}
          <View style={{ flex: 1 }} />

          {/* Continue Button */}
          <TouchableOpacity
            style={[styles.continueButton, isLoading && styles.continueButtonDisabled]}
            onPress={handleContinue}
            disabled={isLoading}
          >
            <Text style={styles.continueButtonText}>
              {isLoading ? 'Enviando...' : 'Continuar'}
            </Text>
            <MaterialIcons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A23',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backText: {
    color: '#BA68C8',
    fontSize: 14,
    marginLeft: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
  },
  formCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#BA68C8',
  },
  inputLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginBottom: 8,
    marginTop: 16,
  },
  required: {
    color: '#BA68C8',
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 12,
  },
  selectText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    marginLeft: 12,
    paddingVertical: 8,
  },
  continueButton: {
    flexDirection: 'row',
    backgroundColor: '#BA68C8',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonDisabled: {
    opacity: 0.7,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});
