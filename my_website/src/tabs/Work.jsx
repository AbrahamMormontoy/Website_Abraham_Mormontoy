import {  useState ,useEffect, useContext } from "react";
import { ThemeContext } from '../components/clouds/ThemeContext.jsx'
import WorkIcon from '../components/assets95/Work.png'
import Exit from '../components/assets95/Exit.png'
import Cv from '../components/assets95/Cv.png'
import Github from '../components/assets95/Github.png'
import GithubDark from '../components/assets95/GithubDarkmode.png'
import DayCare from '../components/workImages/Daycare.png'
import DogBreed from '../components/workImages/DogBreed.png'
import PetMind from '../components/workImages/PetMind.png'
import SFUFitness from '../components/workImages/SfuFitness.jpg'
import Windows95 from '../components/workImages/Windows95.png'

const SkillsSections = function ({children}) {
    return (
        <div className="bg-[#c0c0c0] px-4 py-1 text-black text-[0.8rem]  sm:text-[1rem] 
         shadow-[inset_-1.5px_-1.5px_0px_0px_#000000,inset_1.5px_1.5px_0px_0px_#ffffff] 
         transition-all duration-300 hover:scale-105 cursor-default dark:bg-[#333333] dark:text-white dark:shadow-[inset_-1.5px_-1.5px_0px_0px_#000000,inset_1.5px_1.5px_0px_0px_#ffffff]">
            {children}
        </div>
    )
}

function Work() {

    const [image, setImage] = useState(null);

const imageViewer = function (img, onClose) {
    if (!img) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center cursor-pointer z-50" onClick={onClose}>
            <img src={img} alt="Enlarged view" className="max-w-[80vw] max-h-[90vh] object-contain"/>
        </div>
    );
}

    const { theme }  = useContext(ThemeContext);
    const darkMode = theme === 'dark';
    
    return (<>
    <div className="w-screen h-screen flex flex-col overflow-hidden font-['W95font'] select-none relative z-50">
        <main className="flex flex-auto p-20 sm:p-8">
            <div className="m-auto w-full sm:max-w-250 h-125 sm:h-170 p-1 bg-[#c0c0c0]
            dark:bg-[#333333] shadow-[inset_-1.5px_-1.5px_0px_0px_#000000] flex flex-col">
                <div className="flex justify-between bg-[#000080] dark:bg-[#121212] shadow-[inset_1px_1px_1px_1px_#000000] h-8">
                    <div className="flex items-center gap-1 p-1">
                        <img className="w-6 h-6 [image-rendering:pixelated]" src={WorkIcon} alt="icon" draggable={false}/>
                        <div className="text-white text-[1rem] leading-none tracking-tight font-bold">Work</div>
                    </div>
                    <div className="flex items-center">
                        <button className="p-1 cursor-pointer hover:scale-110 transition-transform duration-300">
                            <img className="w-6 h-6 [image-rendering:pixelated]" src={Exit} alt="exit" draggable={false}/>
                        </button>
                    </div>
                </div>
                <div className="flex-auto bg-white flex flex-col mt-1 dark:bg-[#333333]
                shadow-[inset_1px_1px_1px_1px_#000000] overflow-y-auto custom-scrollbar">
                    <div className="flex flex-col gap-5 mt-5 ml-5 pr-5 pb-5">
                        <div className="w-full">
                            <div className="font-bold sm:text-[1.30rem] text-[1rem] mb-1 dark:text-white">TOOLS</div>
                            <div className="flex flex-wrap gap-3">
                                <SkillsSections>Jupyter Notebook/lab</SkillsSections>
                                <SkillsSections>Git/Github</SkillsSections>
                                <SkillsSections>Figma</SkillsSections>
                                <SkillsSections>VS Code</SkillsSections>
                                <SkillsSections>IntelliJ IDEA</SkillsSections>
                                <SkillsSections>Linux</SkillsSections>
                                <SkillsSections>Excel</SkillsSections>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="font-bold sm:text-[1.30rem] text-[1rem] mb-1 dark:text-white">LANGUAGES</div>
                            <div className="flex flex-wrap gap-3">
                                <SkillsSections>JavaScript</SkillsSections>
                                <SkillsSections>TypeScript</SkillsSections>
                                <SkillsSections>C/C++</SkillsSections>
                                <SkillsSections>HTML/CSS</SkillsSections>
                                <SkillsSections>Python</SkillsSections>
                                <SkillsSections>Java</SkillsSections>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="font-bold sm:text-[1.30rem] text-[1rem] mb-1 dark:text-white">LIBRARIES/FRAMEWORKS</div>
                            <div className="flex flex-wrap gap-3">
                                <SkillsSections>React</SkillsSections>
                                <SkillsSections>Next.js</SkillsSections>
                                <SkillsSections>Tailwind CSS</SkillsSections>
                                <SkillsSections>SQL</SkillsSections>
                                <SkillsSections>Pandas/NumPy</SkillsSections>
                                <SkillsSections>Matplotlib</SkillsSections>
                                <SkillsSections>Scikit-learn</SkillsSections>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-5">
                        <div className="font-bold text-center text-[1.25rem] sm:text-[1.5rem] dark:text-white">DEVELOPMENT</div>
                        <div className="flex flex-col gap-4 mb-5 mx-4">

                            {/* Windows95 Portfolio */}
                            <div className="mb-4 bg-[#f7f7f7] dark:bg-[#222] p-5">
                                <div className="flex flex-col sm:flex-row items-start gap-4">
                                    <img src={Windows95} alt="Windows95 Portfolio" className="shrink-0 w-full sm:w-auto sm:max-w-[20rem] h-auto cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => setImage(Windows95)}/>
                                    <div className="flex flex-col gap-2 flex-auto">
                                        <div className="font-bold text-[1rem] sm:text-[1.25rem] leading-tight dark:text-white">Windows95 Web Portafolio</div>
                                        <div className="text-[0.875rem] sm:text-[1rem] leading-[1.4] dark:text-white">
                                            Build a personalized website with darkmode, tab movement, displaying in one index, used libraries from thirds for movement.</div>
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="text-[0.8rem] sm:text-[0.95rem] italic dark:text-gray-300">
                                                Tools: Javascript, React, Tailwind, HTML/CSS, Figma, Next.js</div>
                                            <a href="https://github.com/AbrahamMormontoy/Website_Abraham_Mormontoy" target="_blank" rel="noopener noreferrer" 
                                            className="flex shrink-0 cursor-pointer items-center hover:scale-105 transition-transform duration-300">
                                                {darkMode ? <img src={GithubDark} alt="github" className="w-6 h-6"/> : <img src={Github} alt="github" className="w-6 h-6"/>}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pet Mind Reader */}
                            <div className="mb-4 bg-[#f7f7f7] dark:bg-[#222] p-5">
                                <div className="flex flex-col sm:flex-row items-start gap-4">
                                    <img src={PetMind} alt="Pet Mind Reader" className="shrink-0 w-full sm:w-auto sm:max-w-[20rem] h-auto cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => setImage(PetMind)}/>
                                    <div className="flex flex-col gap-2 flex-auto">
                                        <div className="font-bold text-[1rem] sm:text-[1.25rem] leading-tight dark:text-white">Pet Mind Reader</div>
                                        <div className="text-[0.875rem] sm:text-[1rem] leading-[1.4] dark:text-white">
                                            a</div>
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="text-[0.8rem] sm:text-[0.95rem] italic dark:text-gray-300">
                                                Tools: Javascript, React, Tailwind, HTML/CSS, Figma, Next.js</div>
                                            <a href="https://github.com/kentishnguyen/pet-mind-reader" target="_blank" rel="noopener noreferrer" 
                                            className="flex shrink-0 cursor-pointer items-center hover:scale-105 transition-transform duration-300">
                                                {darkMode ? <img src={GithubDark} alt="github" className="w-6 h-6"/> : <img src={Github} alt="github" className="w-6 h-6"/>}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* SFU Fitness Tracker */}
                            <div className="mb-4 bg-[#f7f7f7] dark:bg-[#222] p-5">
                                <div className="flex flex-col sm:flex-row items-start gap-4">
                                    <img src={SFUFitness} alt="SFU Fitness Tracker" className="shrink-0 w-full sm:w-auto sm:max-w-[20rem] h-auto cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => setImage(SFUFitness)}/>
                                    <div className="flex flex-col gap-2 flex-1 min-w-0">
                                        <div className="font-bold text-[1rem] sm:text-[1.25rem] leading-tight dark:text-white">
                                            SFU Fitness Tracker
                                        </div>
                                        <div className="text-[0.875rem] sm:text-[1rem] leading-[1.4] dark:text-white text-justify">
                                            Built in stormhacks of 4 (hackathon) a full-stack fitness tracking application that connects clients and 
                                            trainers with user registration, personalized exercise preference and dashboard.
                                        </div>
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="text-[0.8rem] sm:text-[0.95rem] italic dark:text-gray-300">
                                            Tools: JavaScript, Java, HTML/CSS, SpringBoot, SQL
                                            </div>
                                            <a href="https://github.com/egemen-guney/stormhacks-2025" target="_blank" rel="noopener noreferrer" className="flex shrink-0 cursor-pointer items-center hover:scale-105 transition-transform duration-300">
                                            {darkMode ? <img src={GithubDark} alt="github" className="w-6 h-6 [image-rendering:pixelated]" /> : <img src={Github} alt="github" className="w-6 h-6 [image-rendering:pixelated]" />}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Dog Breed Classifier */}
                            <div className="mb-4 bg-[#f7f7f7] dark:bg-[#222] p-5">
                                <div className="flex flex-col sm:flex-row items-start gap-4">
                                    <img src={DogBreed} alt="Dog Breed Classifier" className="shrink-0 w-full sm:w-auto sm:max-w-[20rem] h-auto cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => setImage(DogBreed)}/>
                                    {imageViewer(image, () => setImage(null))}
                                    <div className="flex flex-col gap-2 flex-auto">
                                        <div className="font-bold text-[1rem] sm:text-[1.25rem] leading-tight dark:text-white">Dog Breed Classifier</div>
                                        <div className="text-[0.875rem] sm:text-[1rem] leading-[1.4] dark:text-white">
                                            Group project of 4 to build a convolutional neural network using 50 breeds with 150 images each achieving a accuracy 
                                            of 80% using transfer learning with a pretrained ResNet-18 model.</div>
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="text-[0.8rem] sm:text-[0.95rem] italic dark:text-gray-300">
                                                Tools: python, torch, torchvision, pandas/numpy, matplotlib, scikit-learn, openCV</div>
                                            <a href="https://github.com/viktorz05/ImageClassification" target="_blank" rel="noopener noreferrer" 
                                            className="flex shrink-0 cursor-pointer items-center hover:scale-105 transition-transform duration-300">
                                                {darkMode ? <img src={GithubDark} alt="github" className="w-6 h-6"/> : <img src={Github} alt="github" className="w-6 h-6"/>}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                     
                            {/* Daycare inferno */}
                            <div className="mb-4 bg-[#f7f7f7] dark:bg-[#222] p-5">
                                <div className="flex flex-col sm:flex-row items-start gap-4">
                                    <img src={DayCare} alt="Daycare Inferno" className="shrink-0 w-full sm:w-auto sm:max-w-[20rem] h-auto cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => setImage(DayCare)}/>
                                    <div className="flex flex-col gap-2 flex-auto">
                                        <div className="font-bold text-[1rem] sm:text-[1.25rem] leading-tight dark:text-white">Daycare Inferno</div>
                                        <div className="text-[0.875rem] sm:text-[1rem] leading-[1.4] dark:text-white">
                                            Group project of 4 to build 2D-arcade style maze game avoiding enemies and collecting rewards. Included 
                                            UML diagrams, Use Cases, UI mockups, project management (Scrum) and version control.</div>
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="text-[0.8rem] sm:text-[0.95rem] italic dark:text-gray-300">
                                                Tools: Java, Swing, Awt</div>
                                            <a href="https://github.com/AbrahamMormontoy/DAYCARE_INFERNO" target="_blank" rel="noopener noreferrer" 
                                            className="flex shrink-0 cursor-pointer items-center hover:scale-105 transition-transform duration-300">
                                                {darkMode ? <img src={GithubDark} alt="github" className="w-6 h-6"/> : <img src={Github} alt="github" className="w-6 h-6"/>}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Group Chat Server with Fuzzing Clients */}
                            <div className="mb-4 bg-[#f7f7f7] dark:bg-[#222] p-5">
                                <div className="flex flex-col sm:flex-row items-start gap-4">
                                    <div className="flex flex-col gap-2 flex-auto">
                                        <div className="font-bold text-[1rem] sm:text-[1.25rem] leading-tight dark:text-white">Group Chat Server with Fuzzing Clients</div>
                                        <div className="text-[0.875rem] sm:text-[1rem] leading-[1.4] dark:text-white">
                                            Developed a TCP multi-threaded group chat server and fuzzing client. Handles concurrent connections up to 100 clients ensuring 
                                            message ordering and broadcast.</div>
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="text-[0.8rem] sm:text-[0.95rem] italic dark:text-gray-300">
                                                Tools: C, Socket Programming, Multithreading</div>
                                            <a href="https://github.com/AbrahamMormontoy/Group-Chat-Server-with-Fuzzing-Clients" target="_blank" rel="noopener noreferrer" 
                                            className="flex shrink-0 cursor-pointer items-center hover:scale-105 transition-transform duration-300">
                                                {darkMode ? <img src={GithubDark} alt="github" className="w-6 h-6"/> : <img src={Github} alt="github" className="w-6 h-6"/>}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*Rubiks Cube Solver*/}
                            <div className="mb-4 bg-[#f7f7f7] dark:bg-[#222] p-5">
                                <div className="flex flex-col sm:flex-row items-start gap-4">
                                    <div className="flex flex-col gap-2 flex-auto">
                                        <div className="font-bold text-[1rem] sm:text-[1.25rem] leading-tight dark:text-white">Rubiks Cube Solver</div>
                                        <div className="text-[0.875rem] sm:text-[1rem] leading-[1.4] dark:text-white">
                                            Develop Rubik's Cube solver with A* search algorithm, heuristic function, and a Pattern DataBase to get the 
                                            optimal result taking into account the position and orientation.</div>
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="text-[0.8rem] sm:text-[0.95rem] italic dark:text-gray-300">
                                                Tools: C, Socket Programming, Multithreading</div>
                                            <a href="https://github.com/AbrahamMormontoy/Rubiks-Cube-Solver" target="_blank" rel="noopener noreferrer" 
                                            className="flex shrink-0 cursor-pointer items-center hover:scale-105 transition-transform duration-300">
                                                {darkMode ? <img src={GithubDark} alt="github" className="w-6 h-6"/> : <img src={Github} alt="github" className="w-6 h-6"/>}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Email Spam Detector */}
                            <div className="mb-4 bg-[#f7f7f7] dark:bg-[#222] p-5">
                                <div className="flex flex-col sm:flex-row items-start gap-4">
                                    <div className="flex flex-col gap-2 flex-auto">
                                        <div className="font-bold text-[1rem] sm:text-[1.25rem] leading-tight dark:text-white">Email Spam Detector</div>
                                        <div className="text-[0.875rem] sm:text-[1rem] leading-[1.4] dark:text-white">
                                            Processed, cleaned and analyzed 75 000 email messages converting HTML content, tokenizing text and linear 
                                            classification achieving 99% accuracy over 7000 emails.</div>
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="text-[0.8rem] sm:text-[0.95rem] italic dark:text-gray-300">
                                                Tools: C, Socket Programming, Multithreading</div>
                                            <a href="https://github.com/AbrahamMormontoy/Spam-detection-with-machine-learning" target="_blank" rel="noopener noreferrer" 
                                            className="flex shrink-0 cursor-pointer items-center hover:scale-105 transition-transform duration-300">
                                                {darkMode ? <img src={GithubDark} alt="github" className="w-6 h-6"/> : <img src={Github} alt="github" className="w-6 h-6"/>}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Video Games Market Analysis */}
                            <div className="mb-4 bg-[#f7f7f7] dark:bg-[#222] p-5">
                                <div className="flex flex-col sm:flex-row items-start gap-4">
                                    <div className="flex flex-col gap-2 flex-auto">
                                        <div className="font-bold text-[1rem] sm:text-[1.25rem] leading-tight dark:text-white">Video Games Market Analysis</div>
                                        <div className="text-[0.875rem] sm:text-[1rem] leading-[1.4] dark:text-white">
                                            Analyzed over 16,000 video game records identifying market trends and insights using visualization and a clustering 
                                            algorithm to classify video games titles into recent hits.
                                        </div>
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="text-[0.8rem] sm:text-[0.95rem] italic dark:text-gray-300">
                                                Tools: Python, Pandas, Matplotlib
                                            </div>
                                            <a href="https://github.com/AbrahamMormontoy/Videogames-Market-Analysis" target="_blank" rel="noopener noreferrer" 
                                            className="flex shrink-0 cursor-pointer items-center hover:scale-105 transition-transform duration-300">
                                                {darkMode ? <img src={GithubDark} alt="github" className="w-6 h-6"/> : <img src={Github} alt="github" className="w-6 h-6"/>}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
    
    </>)
}

export default Work;