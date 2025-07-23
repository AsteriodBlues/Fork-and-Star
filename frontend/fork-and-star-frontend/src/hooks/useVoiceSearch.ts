import { useState, useEffect, useCallback, useRef } from 'react';

// TypeScript declarations for Web Speech API
interface SpeechRecognitionResult {
  readonly [index: number]: SpeechRecognitionAlternative;
  readonly length: number;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionResultList {
  readonly [index: number]: SpeechRecognitionResult;
  readonly length: number;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

interface SpeechRecognitionConstructor {
  new(): SpeechRecognition;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onnomatch: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  abort(): void;
  start(): void;
  stop(): void;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor;
    webkitSpeechRecognition: SpeechRecognitionConstructor;
  }
}

interface VoiceSearchState {
  isListening: boolean;
  transcript: string;
  error: string | null;
  isSupported: boolean;
  isHydrated: boolean;
}

interface VoiceSearchHook extends VoiceSearchState {
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

export const useVoiceSearch = (
  onResult?: (transcript: string) => void,
  language: string = 'en-US'
): VoiceSearchHook => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  const onResultRef = useRef(onResult);
  
  useEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);

  // Enhanced browser detection with Safari-specific handling
  useEffect(() => {
    setIsHydrated(true);
    
    const userAgent = navigator.userAgent;
    const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    
    // Check for speech recognition support
    const hasWebkitSpeech = 'webkitSpeechRecognition' in window;
    const hasSpeech = 'SpeechRecognition' in window;
    
    let supported = false;
    
    if (isIOS) {
      // iOS Safari - no support
      supported = false;
      setError('Voice search is not supported on iOS Safari. Please try Chrome or Edge.');
    } else if (isSafari) {
      // macOS Safari - limited support, needs user interaction
      supported = hasWebkitSpeech;
      if (!supported) {
        setError('Voice search requires Chrome, Edge, or a newer version of Safari.');
      }
    } else {
      // Chrome, Edge, etc.
      supported = hasWebkitSpeech || hasSpeech;
    }
    
    console.log('Voice Search Detection:', {
      browser: isSafari ? 'Safari' : 'Other',
      isIOS,
      hasWebkitSpeech,
      hasSpeech,
      supported,
      userAgent: userAgent.slice(0, 50) + '...'
    });
    
    setIsSupported(supported);
  }, []);

  useEffect(() => {
    if (!isHydrated || !isSupported) return;

    try {
      const SpeechRecognitionClass = (window.SpeechRecognition || window.webkitSpeechRecognition) as SpeechRecognitionConstructor;
      const recognitionInstance = new SpeechRecognitionClass();

      // Safari-specific configuration
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false; // Safari works better with false
      recognitionInstance.lang = language;
      recognitionInstance.maxAlternatives = 1;

      recognitionInstance.onstart = () => {
        console.log('Voice recognition started');
        setIsListening(true);
        setError(null);
      };

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        console.log('Voice recognition result:', event.results);
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          }
        }

        if (finalTranscript) {
          console.log('Final transcript:', finalTranscript);
          setTranscript(finalTranscript);
          onResultRef.current?.(finalTranscript);
        }
      };

      recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Voice recognition error:', event.error);
        let errorMessage = 'Voice recognition error';
        
        switch (event.error) {
          case 'no-speech':
            errorMessage = 'No speech detected. Please try again.';
            break;
          case 'audio-capture':
            errorMessage = 'Microphone not available. Please check permissions.';
            break;
          case 'not-allowed':
            errorMessage = 'Microphone permission denied. Click the microphone icon in Safari\'s address bar to allow access.';
            break;
          case 'network':
            errorMessage = 'Network error. Please check your connection.';
            break;
          case 'service-not-allowed':
            errorMessage = 'Speech service not allowed. Try using Chrome or Edge instead.';
            break;
          default:
            errorMessage = `Voice recognition error: ${event.error}. Safari has limited voice support - try Chrome or Edge.`;
        }
        
        setError(errorMessage);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        console.log('Voice recognition ended');
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    } catch (error) {
      console.error('Failed to initialize speech recognition:', error);
      setError('Voice recognition not available. Please try Chrome or Edge.');
      setIsSupported(false);
    }

    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, [isHydrated, isSupported, language]);

  const startListening = useCallback(() => {
    if (!isHydrated || !recognition || !isSupported) {
      setError('Voice search requires Chrome, Edge, or a newer Safari version.');
      return;
    }

    try {
      console.log('Starting voice recognition...');
      recognition.start();
    } catch (err) {
      console.error('Failed to start voice recognition:', err);
      setError('Failed to start voice recognition. Try Chrome or Edge for better support.');
    }
  }, [recognition, isSupported, isHydrated]);

  const stopListening = useCallback(() => {
    if (recognition) {
      console.log('Stopping voice recognition...');
      recognition.stop();
    }
  }, [recognition]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  return {
    isListening,
    transcript,
    error,
    isSupported: isHydrated && isSupported,
    isHydrated,
    startListening,
    stopListening,
    resetTranscript,
  };
};