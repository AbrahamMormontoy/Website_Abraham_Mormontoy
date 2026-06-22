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
    const [gameOver, setGameOver] = useState(false);
    const [finalScore, setFinalScore] = useState(0);
    const [newRecord, setNewRecord] = useState(false);
    const [gameKey, setGameKey] = useState(0);

    // Function to reboot the game by resetting the game state and remounting the game component
    const rebootGame = () => {
        setTimeout(() => {
            setGameOver(false);
            setGameKey(prevKey => prevKey + 1); // Change the key to remount the game component
        }, 500);
    }

    useEffect(() => { 
        const canvas = canvasRef.current
        if (!canvas) return;

        // 2 dimensional tool kit to draw using x and y coordinates on the canas
        const ctx = canvas.getContext('2d');

        // Canvas dimensions to fill the parent container which is the WindowFrame component
        let canvasWidth = canvas.parentElement.clientWidth;
        let canvasHeight = canvas.parentElement.clientHeight; 
        // Set up the actual canvas dimensions
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // Hold the id of the animation frame to stop it 
        let animationFrameId;
        // Hold the timeout ID for the spawning function 
        let spawnTimeoutId;

        const wordList = [
            "hack", "hack", "code", "code", "java", "java",
            "bug", "fix", "data", "loop", "loop", "if", "else",
            "try", "catch", "void", "null", "int", "float",
            "double"
        ];

        // game variables
        let wordsOnScreen = [];
        let score = 0;
        let highScore = localStorage.getItem('hackathonHighScore') || 0;
        let isGameOver = false;
        let spawnRate = 2000;
        let fallSpeed = 1.0;
        let hasGameStarted = false;
        let targetIndex = 0;
     
        // Where to spawn the word and how fast it goes
        function spawnWord() {
            if (isGameOver) return;

            // Choose a random word from the list and a random x position within the canvas bounds
            const text = wordList[Math.floor(Math.random() * wordList.length)];
            const x = Math.random() * (canvasWidth - 150) + 50;

            // Add the new word to the array of words on screen with its properties
            wordsOnScreen.push({
                text: text,
                x: x,
                y: -30,
                speed: 0,
                isDead: false,
                shakeTimer: 0,
                shakingCharIndex: -1
            });

            // Reduce spawn rate so more words appear and increase fall speed as the game goes own
            if (spawnRate > 500) spawnRate -= 50;
            if (fallSpeed < 5) fallSpeed += 0.05;

            // Id of the timeout to spawn the next word
            spawnTimeoutId = setTimeout(spawnWord, spawnRate);
        }

        function handleKeyPress(e) {
            if (isGameOver) return;

            if (!hasGameStarted) {
                hasGameStarted = true;
            }

            if (!e.key.match(/^[a-z]$/i)) return;

            const key = e.key.toLowerCase();

            // Leader is the first word that appears and isDead is false, change to true when the word is completed
            const leader = wordsOnScreen.find(w => !w.isDead);
            if (!leader) return;

            // Check which words in teh array are part the same as the leader and are not dead and put it as an array
            const comboGroup = wordsOnScreen.filter(w => !w.isDead && w.text === leader.text);

            // The next character needed to complete the leader word
            const nextCharNeeded = leader.text[targetIndex];

            // Typed correctly
            if (key === nextCharNeeded) {
                // The key pressed affects all words that are the same as the leader
                comboGroup.forEach(word => {
                    word.shakingCharIndex = targetIndex; // Todos tiemblan en esa letra
                    word.shakeTimer = 5;
                });
                
                // Update the target index after you type the correct character
                targetIndex++;

                // Target index is the same as the last character of the word
                if (targetIndex >= leader.text.length) {

                    // Finish the combo and mark all the words and their properties as dead and make them fall faster
                    comboGroup.forEach(word => {
                        word.isDead = true;
                        word.speed = 5;
                    });

                    // Increase the score by 10 points for each word in the combo group
                    score += 10 * comboGroup.length;

                    // reset index for the next word
                    targetIndex = 0;
                }
            }
        }

        function drawUI() {
            // font
            ctx.font = '20px "W95font", Courier New';
            // Draw score
            ctx.fillStyle = "#33ff33";
            ctx.fillText("SCORE: " + score, 20, 30);
            ctx.textAlign = "right";

            // Draw high score
            ctx.fillStyle = "#ffcc00";
            ctx.fillText("MAX: " + highScore, canvasWidth - 20, 30);
            ctx.textAlign = "left";    
        }

        // Function to draw each word including multiple word that is a combo
        function drawWordCombo(wordObj, leader) {
            // font
            ctx.font = 'bold 24px "W95font", Courier New';
            
            // Start drawing the word from its x position
            let currentX = wordObj.x;
            
            // Check if leader exist and if the wordObj.text is the same as the leader.text, return true or false
            const isPartOfCombo = (leader && (wordObj.text === leader.text));

            for (let i = 0; i < wordObj.text.length; i++) {
                let char = wordObj.text[i];

                // Make the character shake if it was typed
                let offsetX = 0;
                let offsetY = 0;
                if (wordObj.shakeTimer > 0 && i === wordObj.shakingCharIndex) {
                    const intensity = 5;
                    offsetX = (Math.random() - 0.5) * intensity;
                    offsetY = (Math.random() - 0.5) * intensity;
                }

                // Color if the word is dead
                if (wordObj.isDead) {
                    ctx.fillStyle = "#33ff33";
                } else if (isPartOfCombo) {
                    // If part of the combo, color the letters that have been typed and the ones that are pending
                    if (i < targetIndex) {
                        ctx.fillStyle = "#33ff33"; // green correct
                    } else {
                        ctx.fillStyle = "#ffffff"; // white yet typed
                    }
                } else {
                    // Not part of anything
                    ctx.fillStyle = "#ffffff";
                }

                // Draw the character at the current position with any offsets for shaking
                ctx.fillText(char, currentX + offsetX, wordObj.y + offsetY);
                // Make the characters have space between each other
                currentX += ctx.measureText(char).width;
            }

            // Arrow that indicates the word is part of combo or the leader
            if (isPartOfCombo && !wordObj.isDead) {
                ctx.fillStyle = "#ffff00"; // yellow arrow
                ctx.fillText("~", wordObj.x - 20, wordObj.y);
            }
        }

        // Game over
        function triggerGameOver() {
            isGameOver = true;

            let isRecordUpdated = false;

            if (score > highScore) {
                highScore = score;
                localStorage.setItem('hackathonHighScore', highScore);
                isRecordUpdated = true;
            }

            setFinalScore(score);
            setNewRecord(isRecordUpdated);
            setGameOver(true);
        }

        // What is being run each frame by requestAnimationFrame
        function update() {
            if (isGameOver) return;

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            // Find the word that is on the front and is not dead false
            const leader = wordsOnScreen.find(w => !w.isDead);

            // Draw the UI elements like score and high score
            drawUI();

            // Update the position of each word on the screen and draw them
            for (let i = wordsOnScreen.length - 1; i >= 0; i--) {
                let wordObj = wordsOnScreen[i];

                // Increase the speed and make it fall faster
                if (wordObj.isDead) {
                    wordObj.speed += 1;
                    wordObj.y += wordObj.speed;
                    // If word is out the screen remove it from the array
                    if (wordObj.y > canvasHeight + 50) {
                        wordsOnScreen.splice(i, 1);
                        continue;
                    }
                } else {
                    wordObj.y += fallSpeed;
                    // If the word reaches the bottom of the canvas, trigger game over
                    if (wordObj.y > canvasHeight - 20) {
                        triggerGameOver();
                    }
                }

                // Decrease the shake timer for the word if it's shaking
                if (wordObj.shakeTimer > 0) wordObj.shakeTimer--;

                // Draw the word on the canvas, passing the leader to determine if it's part of a combo
                drawWordCombo(wordObj, leader);
            }

            // Request the next frame to keep the game running
            animationFrameId = requestAnimationFrame(update);
        }

        // Add event listener for the keydown event handling user input
        window.addEventListener('keydown', handleKeyPress);
        // Start the first spawn of a word after the initial spawn
        spawnTimeoutId = setTimeout(spawnWord, spawnRate);
        // Start the game loop
        update();

        // Cleanup the function when the component stops being used
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            cancelAnimationFrame(animationFrameId);
            clearTimeout(spawnTimeoutId);
        }

    }, [gameKey]);

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
                            
                            {newRecord && (
                                <p className="text-yellow-400 text-lg mb-6 animate-pulse">(NEW RECORD!)</p>
                            )}

                            <Button onClick={rebootGame} className="mt-4 px-6 py-2 text-lg bg-[#c0c0c0] text-black border-2 border-white hover:scale-105 transition-transform duration-300">
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