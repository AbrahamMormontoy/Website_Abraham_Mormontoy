import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

import openSound from './open.wav'
import closeSound from './close.wav'
import skillsSound from './skills.wav'
import ambientSound from './ambient.mp3'

const SoundContext = createContext(undefined);

const soundMap = {
    open: openSound,
    close: closeSound,
    skills: skillsSound,
    ambient: ambientSound
};

export function SoundProvider({ children }) {

    const ambientAudioRef = useRef(null) // Ref to store the ambient audio object, initialized with the ambient sound

    const [isMuted, setIsMuted] = useState(false)
    const [isAmbientPlaying, setIsAmbientPlaying] = useState(false)

    // gets the ambient sound audio object, if it doesn't exist create it, set the volume and return it
    const ambientSound = () => {
        if (!ambientAudioRef.current) {
            const audio = new Audio(soundMap.ambient);
            audio.loop = true;
            ambientAudioRef.current = audio;
        }
        ambientAudioRef.current.volume = volume;
        return ambientAudioRef.current;
    }

    // Play a sound base in the soundMap
    const playSound = (soundKey) => {
        if (isMuted) return;
        const soundSrc = soundMap[soundKey];
        if (!soundSrc) return;
        const audio = new Audio(soundSrc);
        audio.volume = volume;
        audio.play();
    }

    // Make possible to stop the ambient sound and play it again
    const toggleAmbientSound = () => {
        const ambientAudio = ambientSound();
        
        if (ambientAudio.paused) {
            ambientAudio.play();
            setIsAmbientPlaying(true);
        } else {
            ambientAudio.pause();
            setIsAmbientPlaying(false);
        }
    }

    // Function to stop the ambient sound and reset it to the beginning
    const stopAmbientSound = () => {
        if (!ambientAudioRef.current) return
        ambientAudioRef.current.pause();
        ambientAudioRef.current.currentTime = 0;
        setIsAmbientPlaying(false);
        }

    // Effect to handle the mute state and ambient state changes
    useEffect(() => {
        if (!ambientAudioRef.current) return
        if (isMuted) {
            ambientAudioRef.current.pause();
        } else if (isAmbientPlaying) {
            ambientAudioRef.current.play();
        } else {
            ambientAudioRef.current.pause();
        }
    }, [isMuted, isAmbientPlaying]) // This effect will run whenever isMuted or isAmbientPlaying changes

    return (
        <SoundContext.Provider value={{ isMuted, setIsMuted, soundMap, playSound, toggleAmbientSound, stopAmbientSound, isAmbientPlaying, setVolume, volume }}>
            {children}
        </SoundContext.Provider>
    );
}

export const useSound = () => {
    const context = useContext(SoundContext);
    return context;
}