# 🎮 Juego de Educación Vial

Un juego educativo interactivo sobre educación vial desarrollado con React, TypeScript y Vite. Incluye animaciones épicas, efectos visuales impresionantes y un sistema de preguntas categorizadas.

## ✨ Características

- 🎯 **Sistema de Preguntas Categorizadas**: 3 categorías diferentes de preguntas
  - **Educación Vial**: 50 preguntas sobre tránsito, semáforos, señales y reglas de tráfico
  - **Movilis**: 3 preguntas sobre MOVILIS
  - **Riesgos Naturales**: 3 preguntas sobre desastres naturales y conducción
- 🎭 **Selección de Personajes**: Sistema personalizable de jugadores
- ⚡ **Animaciones Épicas**: Efectos visuales con Framer Motion
- 🎨 **Diseño Moderno**: Estilo épico con glassmorphism y gradientes
- 🏆 **Sistema de Puntuación**: Competencia entre 2 jugadores
- 📱 **Responsive**: Funciona perfectamente en móviles y desktop
- 🎪 **Efectos Visuales**: Partículas flotantes, animaciones 3D y scrollbars personalizadas

## 🚀 Instalación Rápida

### Prerrequisitos

Asegúrate de tener instalado en tu sistema:
- **Node.js** (versión 16 o superior)
- **npm** (viene incluido con Node.js)

### Pasos de Instalación

1. **Clona o descarga el proyecto**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd juego-vial
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abre tu navegador**
   - Ve a `http://localhost:5173`
   - ¡Disfruta del juego! 🎮

## 🛠️ Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Construye el proyecto para producción |
| `npm run preview` | Previsualiza la versión de producción |
| `npm run lint` | Ejecuta el linter para revisar el código |

## 🎯 Cómo Jugar

1. **Selección de Personajes**: Elige personajes para cada jugador y personaliza sus nombres
2. **Animación de Inicio**: Disfruta de la épica animación de presentación
3. **Selección de Iniciador**: Elige qué jugador comienza el juego
4. **Tablero de Juego**: Haz clic en las diferentes categorías de preguntas
5. **Responder Preguntas**: Selecciona la respuesta correcta para ganar puntos
6. **Victoria**: El primer jugador en llegar a 3 puntos gana

## 🎨 Categorías de Preguntas

### 📚 Educación Vial 
### 🎪 Movilis
### 🌋 Riesgos Naturales 

## 🏗️ Tecnologías Utilizadas

- **React 18**: Framework de JavaScript para interfaces de usuario
- **TypeScript**: JavaScript con tipado estático
- **Vite**: Herramienta de construcción rápida
- **Tailwind CSS**: Framework de CSS utilitario
- **Framer Motion**: Biblioteca de animaciones
- **React Router**: Navegación entre páginas
- **Local Storage**: Persistencia de datos del juego

## 📁 Estructura del Proyecto

```
juego-vial/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── ui/             # Componentes de interfaz base
│   │   ├── ModalPregunta.tsx
│   │   ├── ModalGanador.tsx
│   │   └── ...
│   ├── pages/              # Páginas principales
│   │   ├── SeleccionPersonaje.tsx
│   │   ├── FightIntro.tsx
│   │   ├── PantallaPrincipal.tsx
│   │   └── ...
│   ├── context/            # Context API para estado global
│   │   └── GameContext.tsx
│   ├── utils/              # Utilidades y datos
│   │   └── questions.ts    # Base de datos de preguntas
│   └── index.css           # Estilos globales
├── public/                 # Archivos estáticos
├── tailwind.config.js      # Configuración de Tailwind
└── package.json           # Dependencias del proyecto
```

## 🎨 Características de Diseño

- **Estilo Épico**: Gradientes dramáticos y efectos visuales
- **Glassmorphism**: Efectos de cristal con blur y transparencias
- **Partículas Flotantes**: Animaciones de ambiente dinámicas
- **Scrollbars Personalizadas**: Barras de desplazamiento temáticas
- **Animaciones 3D**: Rotaciones, escalas y efectos de profundidad
- **Responsive Design**: Adaptable a todos los tamaños de pantalla

## 🔧 Configuración Avanzada

### Personalización de Preguntas

Para agregar nuevas preguntas, edita el archivo `src/utils/questions.ts`:

```typescript
// Agregar pregunta de tránsito
{
  id: 57,
  text: "¿Cuál es la velocidad máxima en zona escolar?",
  options: ["30 km/h", "40 km/h", "50 km/h", "60 km/h"],
  answerIndex: 0,
  category: 'transito'
}
```

### Personalización de Colores

Los colores se pueden modificar en `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#00bcd4',    // Color principal
      secondary: '#ffd166',  // Color secundario
      // ... más colores
    }
  }
}
```

## 🐛 Solución de Problemas

### Error: "Cannot find module"
```bash
# Elimina node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
```

### Puerto 5173 ocupado
```bash
# Vite usará automáticamente el siguiente puerto disponible
# O especifica un puerto diferente:
npm run dev -- --port 3000
```

### Problemas con las animaciones
- Asegúrate de que tu navegador soporte CSS moderno
- Las animaciones se optimizan automáticamente en dispositivos con poca potencia

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Desarrollado por

[José Valdez, Antony y Jeremy Clearminds Consultores] - [joxzsian@gmail.com]

## 🙏 Agradecimientos

- **React Team** por el increíble framework
- **Tailwind CSS** por el sistema de diseño utilitario
- **Framer Motion** por las animaciones fluidas
- **Vite** por la experiencia de desarrollo rápida

---

⭐ **¡Si te gusta este proyecto, dale una estrella!** ⭐

🎮 **¡Disfruta jugando y aprendiendo sobre educación vial!** 🚗