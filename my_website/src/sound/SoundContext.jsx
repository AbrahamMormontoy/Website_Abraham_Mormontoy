import React, { createContext, useState, useEffect, useRef } from 'react';

/*import openSound from '../assets/sound/open.wav'
import closeSound from '../assets/sound/close.wav'
import skillsSound from '../assets/sound/skills.wav'
import ambientSound from '../assets/sound/ambient.mp3'*/

const ASSET_BASE = 'https://assets.abrahammormontoy.com/assets';

const openSound = `${ASSET_BASE}/sound/open.wav`;
const closeSound = `${ASSET_BASE}/sound/close.wav`;
const skillsSound = `${ASSET_BASE}/sound/skills.wav`;
const ambientSound = `${ASSET_BASE}/sound/ambient.mp3`;

const SoundContext = createContext(undefined);

const soundMap = {
    open: openSound,
    close: closeSound,
    skills: skillsSound,
    ambient: ambientSound
};

export function SoundProvider({ children }) {

    const soundRefs = useRef({}); // Ref to store audio objects for each sound, initialized as an empty object
    const ambientAudioRef = useRef(null) // Ref to store the ambient audio object, initialized with the ambient sound

    const [isMuted, setIsMuted] = useState(false)
    const [isAmbientPlaying, setIsAmbientPlaying] = useState(false)

    useEffect(() => {
        const preloadAudio = ['open', 'close', 'skills'];
        preloadAudio.forEach(sound => {
            const audio = new Audio(soundMap[sound]);
            audio.preload = 'auto'
            soundRefs.current[sound] = audio; // Store the preloaded audio object in the ref
        })
    }, [])

    // gets the ambient sound audio object, if it doesn't exist create it, set the volume and return it
    const ambientSound = () => {
        if (!ambientAudioRef.current) {
            const audio = new Audio(soundMap.ambient);
            audio.loop = true;
            ambientAudioRef.current = audio;
        }
        return ambientAudioRef.current;
    }

    // Play a sound base in the soundMap
    const playSound = (soundKey) => {
        if (isMuted) return;
        const audio = soundRefs.current[soundKey];
        if (!audio) return;
        audio.currentTime = 0;
        audio.play();
    }

    // Make possible to stop the ambient sound and play it again
    const toggleAmbientSound = () => {
        const ambientAudio = ambientSound();
        
        if (ambientAudio.paused) {
            if (isMuted) return;
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
        <SoundContext.Provider value={{ isMuted, setIsMuted, soundMap, playSound, toggleAmbientSound, stopAmbientSound, isAmbientPlaying }}>
            {children}
        </SoundContext.Provider>
    );
}

export { SoundContext };