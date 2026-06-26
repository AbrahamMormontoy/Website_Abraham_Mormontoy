import { WindowFrame, Button } from '../components/SharedUI.jsx';
import { useEffect, useRef, useState } from 'react';

import { useAudio } from '../sound/AudioContext.jsx';

import { wordafallIcon } from '../images/assets.jsx'

function Wordarfall({ onClose }) {

    const { playSound, stopSound } = useAudio();

    const containerRef = useRef(null);
    
    // React states for the game status
    const [gameOver, setGameOver] = useState(false);
    const [finalScore, setFinalScore] = useState(0);
    const [newRecord, setNewRecord] = useState(false);
    const [gameKey, setGameKey] = useState(0);

    // Function to reboot the game by resetting the game state and remounting the game component
    const [renderState, setRenderState] = useState({
        wordsOnScreen: [],
        score: 0,
        highScore: localStorage.getItem('hackathonHighScore') || 0,
        leaderText: null,
        targetIndex: 0,
    })
    

    const rebootGame = () => {
        playSound('reboot'); // Play reboot sound
        setTimeout(() => {
            setGameOver(false);
            setGameKey(prevKey => prevKey + 1); // Change the key to remount the game component
        }, 500);
    }

    useEffect(() => { 
        const container = containerRef.current
        if (!container) return;

        // Canvas dimensions to fill the parent container which is the WindowFrame component
        let gameWidth = container.clientWidth;
        let gameHeight = container.clientHeight; 

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
            const x = Math.random() * (gameWidth - 150) + 50;

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
                playSound('bgMusic'); // Start background music on the first key press
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

                    const randomCompSound = Math.floor(Math.random() * 8) + 1; // Random number between 1 and 8
                    playSound(`comp${randomCompSound}`); // Play completion sound when a word is completed

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

        // Game over
        function triggerGameOver() {
            isGameOver = true;

            stopSound('bgMusic'); // Stop background music
            playSound('losing'); // Play losing sound

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

            // Find the word that is on the front and is not dead false
            const leader = wordsOnScreen.find(w => !w.isDead);

            // Update the position of each word on the screen and draw them
            for (let i = wordsOnScreen.length - 1; i >= 0; i--) {
                let wordObj = wordsOnScreen[i];

                // Increase the speed and make it fall faster
                if (wordObj.isDead) {
                    wordObj.speed += 1;
                    wordObj.y += wordObj.speed;
                    // If word is out the screen remove it from the array
                    if (wordObj.y > gameHeight + 50) {
                        wordsOnScreen.splice(i, 1);
                        continue;
                    }
                } else {
                    wordObj.y += fallSpeed;
                    // If the word reaches the bottom of the canvas, trigger game over
                    if (wordObj.y > gameHeight - 20) {
                        triggerGameOver();
                    }
                }

                // Decrease the shake timer for the word if it's shaking
                if (wordObj.shakeTimer > 0) wordObj.shakeTimer--;

            }

            setRenderState({
                wordsOnScreen: [...wordsOnScreen],
                score: score,
                highScore: highScore,
                leaderText: leader ? leader.text : null,
                targetIndex: targetIndex,
            })

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameKey]);


    const handleCloseWindow = () => {
        stopSound('bgMusic');
        onClose();
    }

    return (
            <div className="font-['W95font'] select-none relative z-50">
                <WindowFrame title="Wordarfall.exe" iconSrc={wordafallIcon} windowClassName="sm:w-[40rem] sm:h-[50rem] w-[92vw] h-[80vh]" onClose={handleCloseWindow}>
                    <div ref={containerRef} className="relative w-full h-full bg-white dark:bg-black overflow-hidden transition-colors duration-300">
                        
                        {/* Screen with the gameplay */}
                        <div style={{ display: gameOver ? 'none' : 'block' }}>
                            
                            {/* Render Score and High Score */}
                            <div className="absolute top-4 left-4 text-[1.25rem] font-bold text-[#000080] dark:text-[#33ff33]">
                                SCORE: {renderState.score}
                            </div>
                            <div className="absolute top-4 right-4 text-[1.25rem] font-bold text-[#ff0000] dark:text-[#ffcc00]">
                                MAX: {renderState.highScore}
                            </div>

                            {/* Render Words on Screen */}
                            {renderState.wordsOnScreen.map(word => {
                                // Check if the word is part of the combo group (same as leader and not dead) to render the combo indicator
                                const isPartOfCombo = (renderState.leaderText) && (word.text === renderState.leaderText);

                                return (
                                    <div key={word.id} className="absolute font-bold text-2xl whitespace-nowrap" style={{ left: word.x, top: word.y }}>
                                        {/* The ~ indicator to indicate the current target letter */}
                                        {isPartOfCombo && !word.isDead && (
                                            <span className="absolute -left-6 text-[#d10000] dark:text-[#ffff00]">~</span>
                                        )}

                                        {/* Splitting the word to render letters individually for shaking and colors */}
                                        {word.text.split('').map((char, i) => {
                                            
                                            // apply shaking effect if the word is shaking and it's the current target letter
                                            let transform = 'none';
                                            if (word.shakeTimer > 0 && i === word.shakingCharIndex) {
                                                const intensity = 5;
                                                const offsetX = (Math.random() - 0.5) * intensity;
                                                const offsetY = (Math.random() - 0.5) * intensity;
                                                transform = `translate(${offsetX}px, ${offsetY}px)`;
                                            }

                                            // Color of the word when is dead or not dead
                                            let colorClass = "text-[#000000] dark:text-white";
                                            if (word.isDead || (isPartOfCombo && i < renderState.targetIndex)) {
                                                colorClass = "text-[#000080] dark:text-[#33ff33]";
                                            }

                                            return (
                                                // Render each letter with the corresponding color and shaking effect if it's the current target letter
                                                <span key={i} className={`inline-block ${colorClass}`} style={{ transform }}>
                                                    {char}
                                                </span>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Game Over Screen */}
                        {gameOver && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-black p-4 text-center transition-colors duration-300 z-10">
                                <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-[#000080] dark:text-[#33ff33]">SYSTEM FAILURE</h1>
                                <p className="text-xl sm:text-2xl mb-2 text-black dark:text-white">Final Score: {finalScore}</p>
                                
                                {newRecord && (
                                    <p className="text-red-600 dark:text-yellow-400 text-lg mb-6 animate-pulse">(NEW RECORD!)</p>
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