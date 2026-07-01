import { WindowFrame, Button, InputText } from '../components/SharedUI.jsx';
import { useEffect, useRef, useState } from 'react';

import { useAudio } from '../sound/AudioContext.jsx';

import { wordafallIcon } from '../images/assets.jsx'

function Wordarfall({ onClose }) {

    const { playSound, stopSound } = useAudio();

    const containerRef = useRef(null);
    
    // React states for the game status
    const [finalScore, setFinalScore] = useState(0);
    const [newRecord, setNewRecord] = useState(false);
    const [gameKey, setGameKey] = useState(0);

    const [gameState, setGameState] = useState("START"); // START, PLAYING, GAMEOVER, LEADERBOARD

    // Database states for the leaderboard
    const [playerName, setPlayerName] = useState("");
    const [playerMessage, setPlayerMessage] = useState("");
    const [leaderboardData, setLeaderboardData] = useState([]);

    // Function to reboot the game by resetting the game state and remounting the game component
    const [renderState, setRenderState] = useState({
        wordsOnScreen: [],
        score: 0,
        highScore: localStorage.getItem('bestScore') || 0,
        leaderText: null,
        targetIndex: 0,
    })

    // Handles when the user switches tabs or minimizes the browser window, it stops the music and sets the game to start
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && gameState === 'PLAYING') {
                stopSound('bgMusic'); // Stop background music when the tab is hidden
                setGameState('START'); // Change the game state to START when the tab is hidden
            }
        }
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        }
    }, [gameState, stopSound]);

    useEffect(() => {
        if (gameState === "LEADERBOARD") {
            // Fetch the leaderboard data from the backend API
            const fetchLeaderboardData = async () => {
                try {
                    const response = await fetch('http://localhost:3000/api/scores');
                    const data = await response.json();

                    if (Array.isArray(data)) {
                        setLeaderboardData(data); // Set the leaderboard data if it's an array
                    } else {
                        console.error('Unexpected data format:', data);
                        setLeaderboardData([]); // Set to empty array if the data format is unexpected  
                    }
                } catch (error) {
                    console.error('Error fetching leaderboard data:', error);
                    setLeaderboardData([]); // Set to empty array
                }
            }
            fetchLeaderboardData();
        }
    }, [gameState]);

    useEffect(() => { 
        const container = containerRef.current
        if (!container) return;
        
        let isGameOver = false;

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
        let highScore = localStorage.getItem('bestScore') || 0;
        let spawnRate = 2000;
        let fallSpeed = 1.0;
        let hasGameStarted = false;
        let targetIndex = 0;
     
        // Where to spawn the word and how fast it goes
        function spawnWord() {
            if (gameState !== "PLAYING") return;

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
            if (gameState !== "PLAYING") return;

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

        // What is being run each frame by requestAnimationFrame
        function update() {
            if (gameState !== "PLAYING" || isGameOver) return;

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

        function triggerGameOver() {
            if (isGameOver) return; // Prevent multiple triggers
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
            setGameState("GAMEOVER");
        }

    }, [gameKey]);

    async function handleSubmitScore(e) {

        const API_URL =  'http://localhost:3000/api/scores';

        // Prevent the default form submission behavior which is to reload the page
        e.preventDefault();

        // If user tries to submit without entering a name, show an alert and return 
        if (!playerName) {
            alert("Please enter your name before submitting your score.");
            return;
        }

        try {
            // fetch the database API, make a POST request with headers that specify the content type as JSON, send the player name, message and score in JSON.stringify format as the body of the request
            await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: playerName, message: playerMessage, score: finalScore, }),
            }) ;
            setLeaderboard(); // After submitting the score, show the leaderboard
        } catch (e) {
            console.error("Error saving score to database:", e);
        }
    }

    const handleCloseWindow = () => {
        stopSound('bgMusic');
        onClose();
    }

    const setStart = () => {
            stopSound('bgMusic');
            playSound('reboot')
            setGameState("START");
        }

    const setPlaying = () => {

        playSound('reboot'); // Play reboot sound
        setTimeout(() => {
            setGameState("PLAYING");
            playSound('bgMusic'); // Start background music
            setGameKey(prevKey => prevKey + 1); // Change the key to remount the game component
        }, 500);
    }
    
    const setLeaderboard = () => {
        stopSound('bgMusic');
        playSound('reboot')
        setGameState("LEADERBOARD");
    }

    return (
        <>
            <div className="font-['W95font'] select-none relative z-50">
                <WindowFrame title="Wordarfall.exe" iconSrc={wordafallIcon} windowClassName="sm:w-[40rem] sm:h-[50rem] w-[92vw] h-[80vh]" onClose={handleCloseWindow}>
                    <div ref={containerRef} className="relative w-full h-full bg-white dark:bg-black overflow-hidden transition-colors duration-300">
                        
                        {gameState === "START" && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-black p-4 text-center transition-colors duration-300 z-10" >
                                <div className="text-4xl sm:text-6xl font-bold mb-4 text-[#000080] dark:text-[#33ff33]">WORDAFALL</div>
                                <div className="flex flex-col gap-4">

                                    <Button onClick={setPlaying} className="bg-[#c0c0c0] px-4 py-1 text-black text-[1.4rem] shadow-[inset_-1.5px_-1.5px_0px_0px_#000000,inset_1.5px_1.5px_0px_0px_#ffffff] 
                                    transition-all duration-300 hover:scale-105 cursor-default dark:bg-[#333333] dark:text-white dark:shadow-[inset_-1.5px_-1.5px_0px_0px_#000000,inset_1.5px_1.5px_0px_0px_#ffffff]">
                                        START SYSTEM
                                    </Button>

                                    <Button onClick={setLeaderboard} className="bg-[#c0c0c0] px-4 py-1 text-black text-[1.4rem] shadow-[inset_-1.5px_-1.5px_0px_0px_#000000,inset_1.5px_1.5px_0px_0px_#ffffff] 
                                    transition-all duration-300 hover:scale-105 cursor-default dark:bg-[#333333] dark:text-white dark:shadow-[inset_-1.5px_-1.5px_0px_0px_#000000,inset_1.5px_1.5px_0px_0px_#ffffff]">
                                        LEADERBOARD
                                    </Button>
                                </div>
                            </div>
                        )}

                        {gameState === "LEADERBOARD" && (
                            <div className="absolute inset-0 flex flex-col gap-5 items-center justify-center bg-white dark:bg-black p-4 text-center transition-colors duration-300 z-10" >
                                <div className="text-6xl font-bold text-[#000080] dark:text-[#33ff33]">LEADERBOARD</div>

                                    {leaderboardData.length === 0 ? (
                                        <div className='text-4xl dark:text-white'>Loading database...</div> 
                                    ) : (leaderboardData.map((entry, index) => (
                                        <div key={index} className="w-full max-w-md bg-[#f7f7f7] dark:bg-[#222222] p-4 h-120 overflow-y-auto border-2 border-black dark:border-white">
                                            <div className="flex justify-between mb-2 p-2 bg-white dark:bg-black rounded">
                                                <div className="font-bold">{entry.name}</div>
                                                <div className="text-xl dark:text-white">{entry.score}</div>
                                            </div>
                                        </div>
                                    )))}



                                <Button onClick={setStart} className="bg-[#c0c0c0] px-4 py-1 text-black text-[1.4rem] shadow-[inset_-1.5px_-1.5px_0px_0px_#000000,inset_1.5px_1.5px_0px_0px_#ffffff] 
                                transition-all duration-300 hover:scale-105 cursor-default dark:bg-[#333333] dark:text-white dark:shadow-[inset_-1.5px_-1.5px_0px_0px_#000000,inset_1.5px_1.5px_0px_0px_#ffffff]">
                                    BACK TO START
                                </Button>
                            </div>
                        )}

                        {/* Screen with the gameplay */}
                        {gameState === "PLAYING" && (
                            <div className="absolute inset-0 w-full h-full">
                            {/* Render Score and High Score */}
                                <div className="absolute top-4 left-4 text-[1.25rem] font-bold text-[#000080] dark:text-[#33ff33]">SCORE: {renderState.score}</div>
                                <div className="absolute top-4 right-4 text-[1.25rem] font-bold text-[#ff0000] dark:text-[#ffcc00]">MAX: {renderState.highScore}</div>

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
                        )}

                        {/* Game Over Screen */}
                        {gameState === "GAMEOVER" && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-black p-4 text-center transition-colors duration-300 z-10 gap-3">
                                <div className="text-4xl sm:text-6xl font-bold mb-4 text-[#000080] dark:text-[#33ff33]">SYSTEM FAILURE</div>
                                <div className="text-xl sm:text-2xl mb-2 text-black dark:text-white">Final Score: {finalScore}</div>
                                <div className="text-xl sm:text-2xl mb-2 text-black dark:text-white">Best Score: {localStorage.getItem('bestScore') || 0}</div>
                                {newRecord && (
                                    <div className="text-[#d10000] dark:text-[#ffff00] text-lg mb-6 animate-pulse">(NEW RECORD!)</div>
                                )}

                                <div className="text-2xl mb-2 text-black dark:text-white">Save your results?</div>
                                <form onSubmit={handleSubmitScore} className="flex flex-col gap-4 w-80 bg-[#f7f7f7] dark:bg-[#222222] p-5 mb-6">
                                    <InputText label="Enter your name:" type="text" name="playerName" required={true} onChange={(e) => setPlayerName(e.target.value)} />

                                    {/* Message */}
                                    <label className="flex flex-col gap-1">
                                        <div className="text-black dark:text-white text-[1rem]">Leave a message (optional):</div>
                                        <textarea name="message" type="text" required={false} rows="2" maxLength="30" onChange={(e) => setPlayerMessage(e.target.value)} className="w-full bg-white dark:bg-[#111] text-black dark:text-white p-1 resize-none focus:outline-none custom-scrollbar
                                        shadow-[inset_1.5px_1.5px_0px_0px_#000000,inset_-1px_-1px_0px_0px_#000000] dark:shadow-[inset_1.5px_1.5px_0px_0px_#000000,inset_-1px_-1px_0px_0px_#555555]"/>    
                                    </label>
                                    
                                    <Button onClick={handleSubmitScore} className="bg-[#c0c0c0]  px-4 py-1 text-black text-[1.4rem] shadow-[inset_-1.5px_-1.5px_0px_0px_#000000,inset_1.5px_1.5px_0px_0px_#ffffff] 
                                    transition-all duration-300 hover:scale-105 cursor-default dark:bg-[#333333] dark:text-white dark:shadow-[inset_-1.5px_-1.5px_0px_0px_#000000,inset_1.5px_1.5px_0px_0px_#ffffff]">
                                    SUBMIT
                                    </Button>
                                </form>


                                <Button onClick={setPlaying} className="bg-[#c0c0c0] w-50 px-4 py-1 text-black text-[1.4rem] shadow-[inset_-1.5px_-1.5px_0px_0px_#000000,inset_1.5px_1.5px_0px_0px_#ffffff] 
                                transition-all duration-300 hover:scale-105 cursor-default dark:bg-[#333333] dark:text-white dark:shadow-[inset_-1.5px_-1.5px_0px_0px_#000000,inset_1.5px_1.5px_0px_0px_#ffffff]">
                                    REBOOT SYSTEM
                                </Button>

                                <Button onClick={setStart} className="bg-[#c0c0c0] w-50 px-4 py-1 text-black text-[1.4rem] shadow-[inset_-1.5px_-1.5px_0px_0px_#000000,inset_1.5px_1.5px_0px_0px_#ffffff] 
                                transition-all duration-300 hover:scale-105 cursor-default dark:bg-[#333333] dark:text-white dark:shadow-[inset_-1.5px_-1.5px_0px_0px_#000000,inset_1.5px_1.5px_0px_0px_#ffffff]">
                                    RETURN START
                                </Button>
                            </div>
                        )}
                    </div>                        
                </WindowFrame>
            </div>
        </>
    );
}

export default Wordarfall;