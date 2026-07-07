import { useState, useEffect, useRef } from 'react';
import { Howl, Howler } from 'howler'; // Added Howler here
import { AudioContext } from './AudioContext.jsx';

const ASSET_BASE = 'https://assets.abrahammormontoy.com/assets';

const soundConfig = {
    // UI sounds
    open: { src: `${ASSET_BASE}/sound/open.mp3`, loop: false, volume: 0.5 },
    close: { src: `${ASSET_BASE}/sound/close.mp3`, loop: false, volume: 0.5 },
    //skills: { src: `${ASSET_BASE}/sound/skills.mp3`, loop: false, volume: 0.5 },
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

    useEffect(() => {
        // Capture the current ref value for the cleanup function
        const currentSounds = soundRef.current;

        // Initialize Howls
        Object.keys(soundConfig).forEach(key => {
            const config = soundConfig[key];
            currentSounds[key] = new Howl({
                src: [config.src],
                loop: config.loop,
                volume: config.volume,
                html5: true // Essential for mobile browsers to stream/handle long files
            });
        });

        return () => {
            // Use the captured variable instead of soundRef.current
            Object.values(currentSounds).forEach(howl => howl.unload());
        };
    }, []);

    const playSound = (soundKey) => {
        if (isMuted) return;
        const sound = soundRef.current[soundKey];
        if (sound) sound.play();
    };

    const stopSound = (soundKey) => {
        const sound = soundRef.current[soundKey];
        if (sound) sound.stop();
    };

    const toggleAmbientSound = () => {
        const ambient = soundRef.current['ambient'];
        if (!ambient) return;
        ambient.playing() ? ambient.stop() : ambient.play();
    };

    const toggleMute = () => {
        const newMuted = !isMuted;
        setIsMuted(newMuted);
        Howler.mute(newMuted); // Howler is now properly imported and defined
    };

    return (
        <AudioContext.Provider value={{ playSound, stopSound, isMuted, toggleMute, toggleAmbientSound }}>
            {children}
        </AudioContext.Provider>
    );
}