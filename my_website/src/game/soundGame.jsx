import { useEffect, useRef } from 'react';

const ASSET_BASE = 'https://assets.abrahammormontoy.com/assets';

const bgMusicPath = `${ASSET_BASE}/sound/gameMusic/background.mp3`;
const losingSoundPath = `${ASSET_BASE}/sound/gameMusic/losingSound.m4a`;
const rebootSoundPath = `${ASSET_BASE}/sound/gameMusic/reboot.mp3`;
const compSounds = [
    `${ASSET_BASE}/sound/gameMusic/completion1.m4a`, 
    `${ASSET_BASE}/sound/gameMusic/completion3.m4a`, 
    `${ASSET_BASE}/sound/gameMusic/completion4.m4a`,
    `${ASSET_BASE}/sound/gameMusic/completion5.m4a`, 
    `${ASSET_BASE}/sound/gameMusic/completion6.m4a`, 
    `${ASSET_BASE}/sound/gameMusic/completion7.m4a`, 
    `${ASSET_BASE}/sound/gameMusic/completion8.m4a`
];

export function SoundGame() {

    const bgMusicRef = useRef(null);
    const losingSoundRef = useRef(null);
    const rebootSoundRef = useRef(null);

    useEffect(() => {
        bgMusicRef.current = new Audio(bgMusicPath);
        bgMusicRef.current.loop = true;
        bgMusicRef.current.volume = 0.5; 

        losingSoundRef.current = new Audio(losingSoundPath);
        rebootSoundRef.current = new Audio(rebootSoundPath);

        return () => {
            if (bgMusicRef.current) {
                bgMusicRef.current.pause();
                bgMusicRef.current = null;
            }
        }
    }, []);

    const startMusic = () => {
        if (bgMusicRef.current) {
            bgMusicRef.current.play().catch(e => {console.log("Error playing background music:", e)});
        }
    }

    const playCompletionSound = () => {
        const randomIndex = Math.floor(Math.random() * compSounds.length);
        const sound = new Audio(compSounds[randomIndex]);
        sound.volume = 0.5;
        sound.play().catch(e => {console.log("Error playing completion sound:", e)});
    }

    const triggerLosingSound = () => {
        if (bgMusicRef.current) {
            bgMusicRef.current.pause();
            bgMusicRef.current.currentTime = 0;
        }
        if (losingSoundRef.current) {
            losingSoundRef.current.currentTime = 0;
            losingSoundRef.current.play().catch(e => {console.log("Error playing losing sound:", e)});
        }
    }

    const triggerRebootSound = () => {
        if (rebootSoundRef.current) {
            rebootSoundRef.current.currentTime = 0;
            rebootSoundRef.current.play().catch(e => {console.log("Error playing reboot sound:", e)});
        }
    }

    return {
        startMusic,
        playCompletionSound,
        triggerLosingSound,
        triggerRebootSound
    }
}