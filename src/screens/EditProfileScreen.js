import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const INTERESTS_OPTIONS = [
  'Viajes', 'Música', 'Cine', 'Gastronomía', 'Deportes',
  'Arte', 'Lectura', 'Fotografía', 'Baile', 'Naturaleza',
  'Tecnología', 'Moda', 'Gaming', 'Yoga', 'Cocina',
];

export default function EditProfileScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: 'Usuario Demo',
    age: '28',
    location: 'Bogotá',
    bio: 'Buscando nuevas experiencias y conexiones genuinas.',
    interests: ['Viajes', 'Música', 'Cine'],
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest) => {
    setFormData(prev => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
  };

  const handleSave = async () => {
    if (!formData.name || !formData.age) {
      Alert.alert('Error', 'Nombre y edad son requeridos');
      return;
    }

    setIsLoading(true);
    
    // Simular guardado
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('¡Listo!', 'Tu perfil ha sido actualizado', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar perfil</Text>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
          disabled={isLoading}
        >
          <Text style={styles.saveButtonText}>
            {isLoading ? 'Guardando...' : 'Guardar'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Photo Section */}
        <View style={styles.photoSection}>
          <View style={styles.mainPhotoContainer}>
            <View style={styles.photoPlaceholder}>
              <MaterialIcons name="person" size={60} color="#BA68C8" />
            </View>
            <TouchableOpacity style={styles.editPhotoButton}>
              <MaterialIcons name="camera-alt" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.photoHint}>Toca para cambiar tu foto</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          <Text style={styles.inputLabel}>Nombre</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Tu nombre"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
            />
          </View>

          <Text style={styles.inputLabel}>Edad</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Tu edad"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={formData.age}
              onChangeText={(value) => handleInputChange('age', value)}
              keyboardType="numeric"
              maxLength={2}
            />
          </View>

          <Text style={styles.inputLabel}>Ciudad</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Tu ciudad"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={formData.location}
              onChangeText={(value) => handleInputChange('location', value)}
            />
          </View>

          <Text style={styles.inputLabel}>Sobre mí</Text>
          <View style={[styles.inputContainer, styles.textAreaContainer]}>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Cuéntanos sobre ti..."
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={formData.bio}
              onChangeText={(value) => handleInputChange('bio', value)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Interests Section */}
        <View style={styles.interestsSection}>
          <Text style={styles.sectionTitle}>Intereses</Text>
          <Text style={styles.sectionSubtitle}>Selecciona hasta 5 intereses</Text>
          <View style={styles.interestsList}>
            {INTERESTS_OPTIONS.map((interest) => {
              const isSelected = formData.interests.includes(interest);
              return (
                <TouchableOpacity
                  key={interest}
                  style={[styles.interestChip, isSelected && styles.interestChipSelected]}
                  onPress={() => toggleInterest(interest)}
                >
                  <Text style={[styles.interestText, isSelected && styles.interestTextSelected]}>
                    {interest}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Spacer */}
        <View style={{ height: 40 }} />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  saveButtonText: {
    color: '#BA68C8',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  photoSection: {
    alignItems: 'center',
    marginVertical: 24,
  },
  mainPhotoContainer: {
    position: 'relative',
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#BA68C8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoHint: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
    marginTop: 12,
  },
  formSection: {
    marginBottom: 24,
  },
  inputLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginBottom: 8,
    marginTop: 16,
  },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(186, 104, 200, 0.2)',
  },
  input: {
    fontSize: 16,
    color: '#fff',
    paddingVertical: 14,
  },
  textAreaContainer: {
    paddingVertical: 8,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  interestsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 16,
  },
  interestsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestChip: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  interestChipSelected: {
    backgroundColor: 'rgba(186, 104, 200, 0.3)',
    borderColor: '#BA68C8',
  },
  interestText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
  },
  interestTextSelected: {
    color: '#BA68C8',
    fontWeight: '500',
  },
});
