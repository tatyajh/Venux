import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function SettingsScreen({ navigation }) {
  const [settings, setSettings] = useState({
    notifications: true,
    location: true,
    ageRange: true,
    distance: true,
    newMatches: true,
    messages: true,
    superLikes: true,
  });

  const handleSettingChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar Sesión', style: 'destructive', onPress: () => navigation.navigate('Login') },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Eliminar Cuenta',
      'Esta acción no se puede deshacer. ¿Estás seguro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => console.log('Delete account') },
      ]
    );
  };

  const SettingItem = ({ icon, title, subtitle, onPress, rightComponent }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <View style={styles.settingIcon}>
          <Icon name={icon} size={24} color="#E91E63" />
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightComponent || <Icon name="chevron-right" size={24} color="#ccc" />}
    </TouchableOpacity>
  );

  const SwitchSetting = ({ icon, title, subtitle, setting, value }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <View style={styles.settingIcon}>
          <Icon name={icon} size={24} color="#E91E63" />
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={() => handleSettingChange(setting)}
        trackColor={{ false: '#ccc', true: '#E91E63' }}
        thumbColor={value ? '#fff' : '#f4f3f4'}
      />
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configuración</Text>
        <View style={styles.placeholder} />
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuenta</Text>
          <SettingItem
            icon="person"
            title="Editar Perfil"
            subtitle="Actualiza tu información personal"
            onPress={() => console.log('Edit profile')}
          />
          <SettingItem
            icon="photo-camera"
            title="Fotos"
            subtitle="Gestiona tus fotos de perfil"
            onPress={() => console.log('Manage photos')}
          />
          <SettingItem
            icon="security"
            title="Privacidad y Seguridad"
            onPress={() => console.log('Privacy settings')}
          />
        </View>

        {/* Discovery Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descubrimiento</Text>
          <SettingItem
            icon="tune"
            title="Preferencias de Búsqueda"
            subtitle="Edad, distancia y más"
            onPress={() => console.log('Search preferences')}
          />
          <SwitchSetting
            icon="location-on"
            title="Mostrar mi ubicación"
            subtitle="Permite que otros vean tu distancia"
            setting="location"
            value={settings.location}
          />
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notificaciones</Text>
          <SwitchSetting
            icon="notifications"
            title="Notificaciones push"
            subtitle="Recibe notificaciones en tu dispositivo"
            setting="notifications"
            value={settings.notifications}
          />
          <SwitchSetting
            icon="favorite"
            title="Nuevos matches"
            subtitle="Te notificamos cuando tienes un nuevo match"
            setting="newMatches"
            value={settings.newMatches}
          />
          <SwitchSetting
            icon="chat"
            title="Mensajes"
            subtitle="Notificaciones de nuevos mensajes"
            setting="messages"
            value={settings.messages}
          />
          <SwitchSetting
            icon="star"
            title="Super Likes"
            subtitle="Cuando alguien te da un Super Like"
            setting="superLikes"
            value={settings.superLikes}
          />
        </View>

        {/* App Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aplicación</Text>
          <SettingItem
            icon="language"
            title="Idioma"
            subtitle="Español"
            onPress={() => console.log('Change language')}
          />
          <SettingItem
            icon="help"
            title="Ayuda y Soporte"
            onPress={() => console.log('Help & Support')}
          />
          <SettingItem
            icon="info"
            title="Acerca de"
            subtitle="Versión 1.0.0"
            onPress={() => console.log('About')}
          />
        </View>

        {/* Premium Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Premium</Text>
          <SettingItem
            icon="star"
            title="Venux Premium"
            subtitle="Desbloquea todas las funciones"
            onPress={() => console.log('Premium')}
          />
          <SettingItem
            icon="payment"
            title="Facturación"
            onPress={() => console.log('Billing')}
          />
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Zona de Peligro</Text>
          <TouchableOpacity style={styles.dangerItem} onPress={handleLogout}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#ffebee' }]}>
                <Icon name="logout" size={24} color="#f44336" />
              </View>
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: '#f44336' }]}>Cerrar Sesión</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.dangerItem} onPress={handleDeleteAccount}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#ffebee' }]}>
                <Icon name="delete-forever" size={24} color="#f44336" />
              </View>
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: '#f44336' }]}>Eliminar Cuenta</Text>
                <Text style={styles.settingSubtitle}>Esta acción no se puede deshacer</Text>
              </View>
            </View>
          </TouchableOpacity>
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
  backButton: {
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
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dangerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});
