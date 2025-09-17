# Venux - Aplicación de Citas

Una aplicación de citas moderna y elegante construida con React Native y Expo.

## 🚀 Características

- **Swipe de Perfiles**: Desliza para dar like o pasar perfiles
- **Sistema de Matches**: Conecta con personas que también te dieron like
- **Chat en Tiempo Real**: Mensajería instantánea con tus matches
- **Perfil Personalizable**: Crea y edita tu perfil con fotos e información
- **Notificaciones**: Recibe alertas de nuevos matches y mensajes
- **Configuraciones**: Personaliza tu experiencia de usuario
- **Diseño Moderno**: Interfaz elegante con gradientes y animaciones

## 📱 Pantallas Incluidas

- **Onboarding**: Introducción a la aplicación
- **Login/Register**: Autenticación de usuarios
- **Home**: Pantalla principal con swipe de perfiles
- **Matches**: Lista de coincidencias
- **Chat**: Mensajería con matches
- **Perfil**: Información personal del usuario
- **Configuración**: Ajustes de la aplicación

## 🛠️ Tecnologías Utilizadas

- **React Native**: Framework para desarrollo móvil
- **Expo**: Plataforma de desarrollo y despliegue
- **React Navigation**: Navegación entre pantallas
- **React Native Paper**: Componentes de UI
- **React Native Vector Icons**: Iconografía
- **Expo Linear Gradient**: Gradientes
- **React Native Reanimated**: Animaciones
- **React Native Gesture Handler**: Gestos táctiles

## 📦 Instalación

### Prerrequisitos

- Node.js (versión 14 o superior)
- npm o yarn
- Expo CLI
- Expo Go app en tu dispositivo móvil

### Pasos de Instalación

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd venux-dating-app
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Instala Expo CLI globalmente** (si no lo tienes)
   ```bash
   npm install -g @expo/cli
   ```

4. **Inicia el servidor de desarrollo**
   ```bash
   npm start
   # o
   expo start
   ```

5. **Ejecuta en tu dispositivo**
   - Escanea el código QR con la app Expo Go (Android) o la cámara (iOS)
   - O presiona `a` para Android o `i` para iOS en el emulador

## 🎨 Personalización

### Colores
Los colores de la aplicación están definidos en `src/constants/colors.js`. Puedes modificar la paleta de colores cambiando los valores en este archivo.

### Dimensiones
Las dimensiones y espaciados están centralizados en `src/constants/dimensions.js`.

### Datos de Ejemplo
Los datos de usuarios y matches están hardcodeados en las pantallas. En una aplicación real, estos vendrían de una API o base de datos.

## 📱 Funcionalidades Implementadas

### ✅ Completadas
- [x] Navegación entre pantallas
- [x] Pantalla de onboarding
- [x] Autenticación (Login/Register)
- [x] Swipe de perfiles con animaciones
- [x] Sistema de matches
- [x] Chat básico
- [x] Perfil de usuario
- [x] Configuraciones
- [x] Diseño responsive
- [x] Iconografía y gradientes

### 🔄 En Desarrollo
- [ ] Integración con backend
- [ ] Notificaciones push
- [ ] Geolocalización
- [ ] Subida de fotos
- [ ] Filtros avanzados
- [ ] Premium features

## 🎯 Próximos Pasos

1. **Backend Integration**: Conectar con una API real
2. **Base de Datos**: Implementar persistencia de datos
3. **Autenticación Real**: Integrar con servicios de auth
4. **Notificaciones**: Implementar notificaciones push
5. **Geolocalización**: Añadir funcionalidad de ubicación
6. **Testing**: Añadir tests unitarios y de integración

## 📄 Estructura del Proyecto

```
venux-dating-app/
├── App.js                 # Componente principal
├── app.json              # Configuración de Expo
├── babel.config.js       # Configuración de Babel
├── package.json          # Dependencias del proyecto
├── src/
│   ├── screens/          # Pantallas de la aplicación
│   │   ├── HomeScreen.js
│   │   ├── MatchesScreen.js
│   │   ├── ChatScreen.js
│   │   ├── ProfileScreen.js
│   │   ├── OnboardingScreen.js
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   └── SettingsScreen.js
│   ├── components/       # Componentes reutilizables
│   ├── constants/        # Constantes y configuraciones
│   │   ├── colors.js
│   │   └── dimensions.js
│   ├── utils/           # Utilidades y helpers
│   └── assets/          # Recursos estáticos
└── README.md
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

Si tienes preguntas o sugerencias, no dudes en contactarnos.

---

**¡Disfruta creando conexiones con Venux! 💕**
