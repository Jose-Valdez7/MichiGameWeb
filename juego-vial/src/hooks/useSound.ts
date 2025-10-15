import { useRef, useCallback } from 'react';

interface SoundOptions {
  volume?: number;
  loop?: boolean;
}

export const useSound = () => {
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  const playSound = useCallback((soundPath: string, options: SoundOptions = {}) => {
    try {
      // Si ya existe una instancia del sonido, la reutilizamos
      if (!audioRefs.current[soundPath]) {
        audioRefs.current[soundPath] = new Audio(soundPath);
        // Configurar para que funcione en navegadores modernos
        audioRefs.current[soundPath].preload = 'auto';
      }

      const audio = audioRefs.current[soundPath];
      
      // Configurar opciones
      audio.volume = options.volume || 0.3;
      audio.loop = options.loop || false;
      
      // Reiniciar el audio si ya está reproduciéndose
      audio.currentTime = 0;
      
      // Reproducir con manejo de errores mejorado
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log('Sonido reproducido correctamente:', soundPath);
        }).catch(error => {
          console.log('No se pudo reproducir el sonido:', error);
          // Intentar cargar el audio primero
          audio.load();
        });
      }
    } catch (error) {
      console.log('Error al reproducir sonido:', error);
    }
  }, []);

  const stopSound = useCallback((soundPath: string) => {
    if (audioRefs.current[soundPath]) {
      audioRefs.current[soundPath].pause();
      audioRefs.current[soundPath].currentTime = 0;
    }
  }, []);

  const stopAllSounds = useCallback(() => {
    Object.values(audioRefs.current).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  }, []);

  return {
    playSound,
    stopSound,
    stopAllSounds
  };
};
