import { useState, useEffect, useRef } from 'react';

import { AudioContext } from './AudioContext.jsx';

const ASSET_BASE = 'https://assets.abrahammormontoy.com/assets';

const soundConfig = {
    // UI sounds
    open: { src: `${ASSET_BASE}/sound/open.wav`, loop: false, volume: 0.5 },
    close: { src: `${ASSET_BASE}/sound/close.wav`, loop: false, volume: 0.5 },
    skills: { src: `${ASSET_BASE}/sound/skills.wav`, loop: false, volume: 0.5 },
    ambient: { src: `${ASSET_BASE}/sound/ambient.mp3`, loop: true, volume: 0.5 },
    
    // Game music sounds
    bgMusic: { src: `${ASSET_BASE}/sound/gameMusic/background.mp3`, loop: true, volume: 0.5 },
    losing: { src: `${ASSET_BASE}/sound/gameMusic/losingSound.m4a`, loop: false, volume: 0.5 },
    reboot: { src: `${ASSET_BASE}/sound/gameMusic/reboot.mp3`, loop: false, volume: 0.5 },
    comp1: { src: `${ASSET_BASE}/sound/gameMusic/completion1.m4a`, loop: false, volume: 0.5 },
    comp2: { src: `${ASSET_BASE}/sound/gameMusic/completion2.m4a`, loop: false, volume: 0.5 },
    comp3: { src: `${ASSET_BASE}/sound/gameMusic/completion3.m4a`, loop: false, volume: 0.5 },
    comp4: { src: `${ASSET_BASE}/sound/gameMusic/completion4.m4a`, loop: false, volume: 0.5 },
    comp5: { src: `${ASSET_BASE}/sound/gameMusic/completion5.m4a`, loop: false, volume: 0.5 },
    comp6: { src: `${ASSET_BASE}/sound/gameMusic/completion6.m4a`, loop: false, volume: 0.5 },
    comp7: { src: `${ASSET_BASE}/sound/gameMusic/completion7.m4a`, loop: false, volume: 0.5 },
    comp8: { src: `${ASSET_BASE}/sound/gameMusic/completion8.m4a`, loop: false, volume: 0.5 },
}

export function AudioManager({ children }) {
    
    const soundRef = useRef({});
    const [isMuted, setIsMuted] = useState(false);
    const [activeLoop, setActiveLoop] = useState(new Set());

    useEffect(() => {
        // List of objects to iterate through their keys and preload the audio files. The object are audio elements
        Object.keys(soundConfig).forEach(key => {
            // Get the configuration for the current sound key and load the audio file as an Audio element
            const config = soundConfig[key];
            const audio = new Audio(config.src);
            // Configuration of the audio element
            audio.preload = 'auto';
            audio.loop = config.loop;
            audio.volume = config.volume;
            // Store the audio element in the ref as its already loaded and ready to play
            soundRef.current[key] = audio;
        });

        return () => {
            // Clean up audio elements on unmount to prevent memory leaks
            Object.keys(soundConfig).forEach(key => {
                // For now
                // eslint-disable-next-line react-hooks/exhaustive-deps
                const audio = soundRef.current[key];
                
                if (!audio) return;
                // Pause the audio if it's playing
                audio.pause();
                // Remove the src attribute to free up memory
                audio.removeAttribute('src');
            });
        }
    }, []);

    const playSound = (soundKey) => {
        // Load the audio element from the reference to audio variable
        const audio = soundRef.current[soundKey];
        // Exists?
        if (!audio) return;

        // Checks if the audio is a looping track and adds it to the activeLoop set if it is
        if (audio.loop) {
            setActiveLoop(prev => new Set([...prev, soundKey]));
        }

        // If muted then return without playing
        if (isMuted) return;

        // Current time to 0 and catch error 
        audio.currentTime = 0;
        audio.play().catch(e => console.log(`Error: ${soundKey}`, e));
    }

    const stopSound = (soundKey) => {
        // Load the audio element 
        const audio = soundRef.current[soundKey];
        if (!audio) return;

        // Pause the audio and reset to 0
        audio.pause();
        audio.currentTime = 0;
        
        // Only remove from active loops if it's actually a looping track
        if (audio.loop) {
            setActiveLoop(prev => {
                const newSet = new Set(prev);
                newSet.delete(soundKey);
                return newSet;
            });
        }
    }

    // With the loops get from setActiveLoop, check if active loop has 'ambient'
    const toggleAmbientSound = () => {
        if (activeLoop.has('ambient')) {
            stopSound('ambient');
        } else {
            playSound('ambient');
        }
    }

    useEffect(() => {
        Object.keys(soundConfig).forEach(key => {
            const audio = soundRef.current[key];
            
            if (!audio) return;

            if (isMuted) {
                if (!audio.paused) {
                    audio.pause();
                }
            } else {
                if (audio.loop && activeLoop.has(key) && audio.paused) {
                    audio.play().catch(e => console.log("Play blocked:", e));
                }
            }
        });
    // Occurs when isMuted or activeLoop changes, ensuring that the audio state is consistent with the current settings
    }, [isMuted, activeLoop]);

    // Toggle mute
    const toggleMute = () => { setIsMuted(!isMuted) } 

    return (
        <AudioContext.Provider value={{ playSound, stopSound, isMuted, toggleMute, toggleAmbientSound }} >
            {children}
        </AudioContext.Provider>
    )
}