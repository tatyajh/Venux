# 🚀 Guía de Instalación - Venux Dating App

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 14 o superior) - [Descargar aquí](https://nodejs.org/)
- **npm** o **yarn** (viene con Node.js)
- **Expo CLI** - Se instalará en los pasos siguientes
- **Expo Go** app en tu dispositivo móvil:
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

## 🛠️ Instalación Paso a Paso

### 1. Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd venux-dating-app
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Instalar Expo CLI (si no lo tienes)
```bash
npm install -g @expo/cli
```

### 4. Verificar la Instalación
```bash
expo --version
```

### 5. Iniciar el Servidor de Desarrollo
```bash
npm start
# o
expo start
```

## 📱 Ejecutar en Dispositivo

### Opción 1: Usando Expo Go (Recomendado para desarrollo)

1. **Abre Expo Go** en tu dispositivo móvil
2. **Escanea el código QR** que aparece en la terminal o navegador
3. **Espera** a que la aplicación se cargue

### Opción 2: Usando Emulador

#### Para Android:
```bash
expo start --android
```

#### Para iOS (solo en macOS):
```bash
expo start --ios
```

## 🔧 Comandos Útiles

```bash
# Iniciar en modo desarrollo
npm start

# Limpiar caché de Metro
expo start --clear

# Iniciar en modo tunnel (para dispositivos en diferentes redes)
expo start --tunnel

# Ver logs en tiempo real
expo start --dev-client
```

## 🐛 Solución de Problemas Comunes

### Error: "Metro bundler failed to start"
```bash
# Limpiar caché y reinstalar
rm -rf node_modules
npm install
expo start --clear
```

### Error: "Unable to resolve module"
```bash
# Verificar que todas las dependencias estén instaladas
npm install
```

### Error: "Expo CLI not found"
```bash
# Reinstalar Expo CLI
npm uninstall -g @expo/cli
npm install -g @expo/cli
```

### Problemas con el código QR
- Asegúrate de que tu dispositivo y computadora estén en la misma red WiFi
- Usa el modo tunnel: `expo start --tunnel`

## 📦 Estructura de Dependencias

Las principales dependencias incluidas son:

- **React Native**: Framework base
- **Expo**: Plataforma de desarrollo
- **React Navigation**: Navegación entre pantallas
- **React Native Paper**: Componentes de UI
- **React Native Vector Icons**: Iconografía
- **Expo Linear Gradient**: Gradientes
- **React Native Reanimated**: Animaciones
- **React Native Gesture Handler**: Gestos táctiles

## 🎯 Próximos Pasos

Una vez que la aplicación esté funcionando:

1. **Explora las pantallas**: Navega por todas las funcionalidades
2. **Personaliza el diseño**: Modifica colores y estilos en `src/constants/`
3. **Añade funcionalidades**: Implementa nuevas características
4. **Integra backend**: Conecta con una API real

## 📞 Soporte

Si encuentras algún problema:

1. Revisa la [documentación de Expo](https://docs.expo.dev/)
2. Consulta los [foros de Expo](https://forums.expo.dev/)
3. Verifica que todas las dependencias estén actualizadas

---

**¡Disfruta desarrollando con Venux! 💕**
