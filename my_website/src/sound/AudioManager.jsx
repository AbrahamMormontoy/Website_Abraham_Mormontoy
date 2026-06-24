import {useState, useEffect, createContext, useContext, useRef} from 'react';

const ASSET_BASE = 'https://assets.abrahammormontoy.com/assets';

const soundConfig = {
    open: {src: `${ASSET_BASE}/sound/open.wav`, loop: false, volume: 0.5},
    close: {src: `${ASSET_BASE}/sound/close.wav`, loop: false, volume: 0.5},
    skills: {src: `${ASSET_BASE}/sound/skills.wav`, loop: false, volume: 0.5},
    ambient: {src: `${ASSET_BASE}/sound/ambient.mp3`, loop: true, volume: 0.5},
    bgMusic: {src: `${ASSET_BASE}/sound/bgMusic.mp3`, loop: true, volume: 0.5},
    losing: {src: `${ASSET_BASE}/sound/losing.mp3`, loop: false, volume: 0.5},
    comp5: {src: `${ASSET_BASE}/sound/comp5.wav`, loop: false, volume: 0.5},
}

export const AudioContext = createContext(null);

export function AudioManager({children}) {
    
    // hold audio instances to render them
    const soundRef = useRef({});

    // Tracks the looping sounds that should be playing when unmute
    const activeLoopRef = useRef(new Set());

    // State to track mute status
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        // Make data in soundConfig objects with attributes (entries) and then iterate over them
        Object.entries(soundConfig).forEach(([key, config]) => {
            const audio = new Audio(config.src);
            audio.loop = config.loop;
            audio.volume = config.volume;
            soundRef.current[key] = audio;
        });

        return () => {
            // Make each audio instance pause and remove its attribute
            Object.values(soundRef.current).forEach(audio => {
                audio.pause()
                audio.removeAttribute('src');
            })
        }
    }, []);

    // Play a sound base in the soundMap
    const playSound = (soundKey) => {
        const audio = soundRef.current[soundKey];
        if (!audio) return;

        if (!audio.loop) {
            activeLoopRef.current.add(soundKey);
        }

        if (isMuted) return;

        audio.currentTime = 0;
        audio.play();
    }

    const stopSound = (soundKey) => {
        const audio = soundRef.current[soundKey];
        if (!audio) return;

        audio.pause();
        audio.currentTime = 0;
        if (!audio.loop) {
            activeLoopRef.current.delete(soundKey);
        }
    }

    // Effect to handle mute state changes
    useEffect(() => {
        // Uses keys to iterate through soundRef that are audio objects
        Object.keys(soundRef.current).forEach(key => {
            const audio = soundRef.current[key];
            // If not muted pause
            if (isMuted) {
                if (!audio.paused) {
                    audio.pause();
                }
            // Already muted so play the audio
            } else {
                if (audio.loop && activeLoopRef.current.has(key) && audio.paused) {
                    audio.play();
                }
            }
        })
    }, [isMuted]);

    // Change mute state
    const toggleMute = () => {setIsMuted(!isMuted)} 

    return (
        <AudioContext.Provider value={{playSound, stopSound, isMuted, toggleMute}} >
            {children}
        </AudioContext.Provider>
    )
}

export const useAudio = () => { return useContext(AudioContext); }