import { useCallback, useRef, useEffect } from "react";

interface AudioContextHook {
  playAmbientSpace: () => void;
  playStardust: () => void;
  playTransition: (country?: string) => void;
  stopAllAudio: () => void;
  setVolume: (volume: number) => void;
}

export function useAudioContext(): AudioContextHook {
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<Set<OscillatorNode>>(new Set());

  useEffect(() => {
    // Initialize Web Audio API on first user interaction
    const initializeAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.connect(audioContextRef.current.destination);
        gainNodeRef.current.gain.value = 0.1; // Low volume by default
      }
    };

    // Auto-initialize on first click/touch
    const handleFirstInteraction = () => {
      initializeAudio();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      
      // Cleanup oscillators
      oscillatorsRef.current.forEach(osc => {
        try {
          osc.stop();
        } catch (e) {
          // Oscillator might already be stopped
        }
      });
      oscillatorsRef.current.clear();
    };
  }, []);

  const createTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const envelope = audioContextRef.current.createGain();
    
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
    
    // Create envelope for smooth attack/decay
    envelope.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    envelope.gain.linearRampToValueAtTime(0.3, audioContextRef.current.currentTime + 0.1);
    envelope.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration);
    
    oscillator.connect(envelope);
    envelope.connect(gainNodeRef.current);
    
    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + duration);
    
    oscillatorsRef.current.add(oscillator);
    
    // Clean up after oscillator stops
    oscillator.onended = () => {
      oscillatorsRef.current.delete(oscillator);
    };
  }, []);

  const playAmbientSpace = useCallback(() => {
    // Create layered ambient space sounds
    createTone(55, 8, 'sawtooth');   // Deep bass drone
    createTone(110, 6, 'triangle');  // Mid harmonic
    createTone(220, 4, 'sine');      // Higher harmonic
    
    // Add subtle white noise simulation
    setTimeout(() => createTone(440, 2, 'sawtooth'), 1000);
    setTimeout(() => createTone(880, 1.5, 'triangle'), 2000);
  }, [createTone]);

  const playStardust = useCallback(() => {
    // Magical stardust sound - ascending tones
    const baseFreq = 440;
    const stardustNotes = [1, 1.25, 1.5, 1.875, 2.25]; // Pentatonic-ish progression
    
    stardustNotes.forEach((ratio, index) => {
      setTimeout(() => {
        createTone(baseFreq * ratio, 1.5, 'sine');
        // Add harmonic
        createTone(baseFreq * ratio * 2, 1, 'triangle');
      }, index * 200);
    });
  }, [createTone]);

  const playTransition = useCallback((country?: string) => {
    // Country-specific transition sounds
    switch (country) {
      case 'italy':
        // Warm, operatic tones
        createTone(261.63, 2, 'sine'); // C
        createTone(329.63, 2, 'sine'); // E
        break;
      case 'japan':
        // Pentatonic, zen-like
        createTone(293.66, 1.5, 'triangle'); // D
        createTone(440, 1.5, 'triangle');    // A
        break;
      case 'france':
        // Elegant, sophisticated
        createTone(349.23, 2, 'sine'); // F
        createTone(523.25, 2, 'sine'); // C
        break;
      default:
        // Generic magical transition
        createTone(523.25, 1, 'sine');
        setTimeout(() => createTone(659.25, 1, 'sine'), 300);
        setTimeout(() => createTone(783.99, 1, 'sine'), 600);
    }
  }, [createTone]);

  const stopAllAudio = useCallback(() => {
    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Oscillator might already be stopped
      }
    });
    oscillatorsRef.current.clear();
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        Math.max(0, Math.min(1, volume)), 
        audioContextRef.current?.currentTime || 0
      );
    }
  }, []);

  return {
    playAmbientSpace,
    playStardust,
    playTransition,
    stopAllAudio,
    setVolume
  };
}