import { WindowFrame, Button } from '../components/SharedUI.jsx';
import { useEffect, useRef, useState } from 'react';

const ASSET_BASE = 'https://assets.abrahammormontoy.com/assets';
const gameIcon = `${ASSET_BASE}/assets95/Wordafall.png`;

// Sound assets for the game in cloudflare storage
const bgMusicPath = `${ASSET_BASE}/assets95/sound/gameMusic/background.mp3`;
const losingSoundPath = `${ASSET_BASE}/assets95/sound/gameMusic/losing.mp3`;
const rebootSoundPath = `${ASSET_BASE}/assets95/sound/gameMusic/reboot.mp3`;
const compSounds = [
    `${ASSET_BASE}/assets95/sound/gameMusic/completion1.m4a`, 
    `${ASSET_BASE}/assets95/sound/gameMusic/completion3.m4a`, 
    `${ASSET_BASE}/assets95/sound/gameMusic/completion4.m4a`,
    `${ASSET_BASE}/assets95/sound/gameMusic/completion5.m4a`, 
    `${ASSET_BASE}/assets95/sound/gameMusic/completion6.m4a`, 
    `${ASSET_BASE}/assets95/sound/gameMusic/completion7.m4a`, 
    `${ASSET_BASE}/assets95/sound/gameMusic/completion8.m4a`
];

function Wordarfall({ onClose }) {
    const canvasRef = useRef(null);
    
    // React states for the game status
    const [gameOver, setGameOver] = useState(true);
    const [finalScore, setFinalScore] = useState(0);

    return (
        <div className="font-['W95font'] select-none relative z-50">
            <WindowFrame title="Wordarfall.exe" iconSrc={gameIcon} windowClassName="sm:w-[40rem] sm:h-[50rem] w-[92vw] h-[80vh]" onClose={onClose}>
                <div className="relative w-full h-full bg-black">
                    {/*canvas is the game area that hides when the game over state is true*/}
                    <canvas ref={canvasRef} className="w-full h-full" style={{ display: gameOver ? 'none' : 'block' }} />
                    {/* All of this is produces after the game is over */}
                    {gameOver && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black text-[#33ff33] p-4 text-center">
                            <h1 className="text-4xl sm:text-6xl font-bold mb-4">SYSTEM FAILURE</h1>
                            <p className="text-xl sm:text-2xl mb-2 text-white">Final Score: {finalScore}</p>
                            
                            <Button soundType="open" className="mt-4 px-6 py-2 text-lg bg-[#c0c0c0] text-black border-2 border-white hover:scale-105 transition-transform duration-300">
                                REBOOT SYSTEM
                            </Button>
                        </div>
                    )}
                </div>                        
            </WindowFrame>
        </div>
    );
}

export default Wordarfall;