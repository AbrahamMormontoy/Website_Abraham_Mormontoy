import { createContext, useContext } from 'react';

// Create context for audio management to allow components to access audio functions
// This functions are playSound, stopSound, isMuted, toggleMute
export const AudioContext = createContext(null);
export const useAudio = () => useContext(AudioContext);