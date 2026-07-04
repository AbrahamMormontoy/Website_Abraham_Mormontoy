import { TitleBar, SkillsSections , ProjectCard, WindowFrame } from '../components/SharedUI.jsx'
import { useContext } from "react";
import { ThemeContext } from '../components/clouds/ThemeContext.jsx'

/*import workIcon from '../assets/assets95/workIcon.png'
import Exit from '../assets/assets95/Exit.png'
import Cv from '../assets/assets95/Cv.png'
import Github from '../assets/assets95/Github.png'
import GithubDark from '../assets/assets95/GithubDarkmode.png'
import DayCare from '../assets/workImages/Daycare.png'
import DogBreed from '../assets/workImages/DogBreed.png'
import PetMind from '../assets/workImages/PetMind.png'
import SFUFitness from '../assets/workImages/SfuFitness.jpg'
import Windows95 from '../assets/workImages/Windows95.png'*/

import { workIcon, Cv, Github, GithubDark, DayCare, DogBreed, PetMind, SFUFitness, Windows95 } from '../images/assets.jsx'

function Work({ onClose, onImageOpen }) {

    const { theme }  = useContext(ThemeContext);
    const darkMode = theme === 'dark';

    return (
        <>
            <div className="font-['W95font'] select-none relative z-50">
            
                {/* Size of the window and title bar included */}
                <WindowFrame title="Work" iconSrc={workIcon} windowClassName="sm:w-250 w-[92vw] sm:h-170 h-[80vh]" onClose={onClose}>
                
                        
                    {/* Skills section */}
                    <div className="flex flex-col gap-5 mt-5 ml-5 pr-5 pb-5">                        

                        {/* Languages sections */}
                        <div className="w-full">
                            <div className="font-bold sm:text-[1.30rem] text-[1rem] mb-1 dark:text-white">LANGUAGES</div>
                            <div className="flex flex-wrap gap-3">
                                <SkillsSections>JavaScript</SkillsSections>
                                <SkillsSections>TypeScript</SkillsSections>
                                <SkillsSections>Java</SkillsSections>
                                <SkillsSections>C/C++</SkillsSections>
                                <SkillsSections>HTML/CSS</SkillsSections>
                                <SkillsSections>Python</SkillsSections>
                                <SkillsSections>SQL</SkillsSections>
                            </div>
                        </div>

                        {/* Libraries/Frameworks sections */}
                        <div className="w-full">
                            <div className="font-bold sm:text-[1.30rem] text-[1rem] mb-1 dark:text-white">LIBRARIES/FRAMEWORKS</div>
                            <div className="flex flex-wrap gap-3">
                                <SkillsSections>React</SkillsSections>
                                <SkillsSections>Node.js</SkillsSections>
                                <SkillsSections>Express.js</SkillsSections>
                                <SkillsSections>Tailwind CSS</SkillsSections>
                                <SkillsSections>Next.js</SkillsSections>
                                <SkillsSections>Pandas/NumPy</SkillsSections>
                                <SkillsSections>Matplotlib</SkillsSections>
                                <SkillsSections>Scikit-learn</SkillsSections>
                            </div>
                        </div>

                        {/* Tools sections */}
                        <div className="w-full">
                            <div className="font-bold sm:text-[1.30rem] text-[1rem] mb-1 dark:text-white">TOOLS</div>
                            <div className="flex flex-wrap gap-3">
                                <SkillsSections>Git/Github</SkillsSections>
                                <SkillsSections>Docker</SkillsSections>
                                <SkillsSections>PostgreSQL</SkillsSections>
                                <SkillsSections>Vercel</SkillsSections>
                                <SkillsSections>Render</SkillsSections>
                                <SkillsSections>Vite</SkillsSections>
                                <SkillsSections>Cloudflare</SkillsSections>
                                <SkillsSections>Neon</SkillsSections>
                                <SkillsSections>Figma</SkillsSections>
                                <SkillsSections>Jupyter Notebook/lab</SkillsSections>
                                <SkillsSections>Arch/Linux</SkillsSections>
                                <SkillsSections>MS Office</SkillsSections>
                            </div>
                        </div>

                    </div>
                    <div className="w-full mt-5">
                        <div className="font-bold text-center text-[1.25rem] sm:text-[1.5rem] dark:text-white">DEVELOPMENT</div>
                        <div className="flex flex-col gap-4 mb-5 mx-4">

                            {/* Windows95 Portfolio */}
                           <ProjectCard
                           title="Windows95 Web Portfolio"
                           date="Personal Project | April - May 2026"
                           description="Windows95 Personal Portfolio is a full-stack application to showcase my projects through a classic Windows 95 desktop aesthetic. Built with React, 
                           Tailwind CSS, Node.js, and PostgreSQL, the responsive interface features draggable tabs and seamless window management. The platform integrates a custom typing 
                           game with a live global leaderboard hosted on Neon, an auto-adjusting dark mode, retro audio effects, and EmailJS, all deployed efficiently across Vercel, 
                           Cloudflare, and Render."
                           tools="JavaScript, React, Node.js, Express.js, PostgreSQL, Tailwind CSS"
                           imageSrc={Windows95}
                           imageAlt="Windows95 Portfolio"
                           githubUrl="https://github.com/AbrahamMormontoy/Website_Abraham_Mormontoy"
                           onImageClick={() => onImageOpen(Windows95)}
                           darkMode={darkMode}/>


                           {/* Pet Mind Reader */}
                           <ProjectCard
                           title="Pet Mind Reader"
                           date="SFU Surge Sillyhack | April 2026"
                           description="Pet Mind Reader is an AI-powered web application developed in a team of four at SFU Surge Sillyhacks to generate humorous, unhinged captions revealing 
                           what pets are thinking. Built using React, TypeScript, Tailwind CSS, and Next.js, the app leverages the Google Generative AI SDK (Gemini) to process image uploads 
                           up to 10MB. It embraces the hackathon’s chaotic theme, delivering a responsive and highly entertaining AI-driven user experience."
                           tools="TypeScript, React, Tailwind CSS, Next.js, Framer Motion, Google Generative AI SDK"
                           imageSrc={PetMind}
                           imageAlt="Pet Mind Reader"
                           githubUrl="https://github.com/kentishnguyen/pet-mind-reader"
                           onImageClick={() => onImageOpen(PetMind)}
                           darkMode={darkMode}/>

                            {/* SFU Fitness Tracker */}
                            <ProjectCard 
                            title="SFU Fitness Tracker" 
                            date="SFU Surge Stormhacks | December 2025"
                            description="SFU Fitness Tracker is a full-stack web application developed in a team of four at SFU Stormhacks 2025 to streamline client-trainer relationships. 
                            The platform features encrypted user authentication and dedicated dashboards for managing schedules and booking sessions. It seamlessly integrates data communication 
                            to track exercise preferences, fitness goals, and detailed user profiles, delivering a secure and comprehensive fitness management experience."
                            tools="Java, Spring Boot, JavaScript, HTML/CSS, SQL" 
                            imageSrc={SFUFitness} 
                            imageAlt="SFU Fitness Tracker" 
                            githubUrl="https://github.com/egemen-guney/stormhacks-2025" 
                            onImageClick={() => onImageOpen(SFUFitness)} 
                            darkMode={darkMode}/>

                            {/* Dog Breed Classifier */}
                            <ProjectCard 
                            title="Dog Breed Classifier" 
                            date="SFU CMPT 310 Introduction to Artificial Intelligence | January - April 2026"
                            description="Dog Breed Image Classifier is a Convolutional Neural Network developed in a team of four for CMPT 310 to predict the top three likely breeds from 
                            an image. Built using transfer learning with a pre-trained ResNet-18 model, we trained the pipeline on the Stanford Dogs Dataset over 15 epochs utilizing a CUDA-accelerated 
                            GPU. The model achieved 80% Top-1 and 94% Top-3 accuracy across 50 breeds, supported by comprehensive phase reporting."  
                            tools="Python, PyTorch/Torchvision, Pandas/Numpy, Matplotlib, Scikit-learn, OpenCV" 
                            imageSrc={DogBreed} 
                            imageAlt="Dog Breed Classifier" 
                            githubUrl="https://github.com/viktorz05/ImageClassification" 
                            onImageClick={() => onImageOpen(DogBreed)}
                            darkMode={darkMode}/>
                    
                            {/* Daycare inferno */}
                            <ProjectCard 
                            title="Daycare inferno" 
                            date="SFU CMPT 276 Introduction to Software Engineering | January - April 2026"
                            description="Daycare Inferno is a 2D arcade-style maze game developed in a team of four for CMPT 276, where players navigate a burning daycare to collect rewards 
                            while evading AI-driven enemies. Built using Agile methodologies, the project features Greedy Search pathfinding, dynamic collision detection, and procedural entity 
                            generation. We managed the development lifecycle utilizing Maven, JUnit testing, and comprehensive UML documentation to rigorously apply core software engineering principles."
                            tools="Java, Swing, Awt, JUnit" 
                            imageSrc={DayCare} 
                            imageAlt="Daycare inferno" 
                            githubUrl="https://github.com/AbrahamMormontoy/DAYCARE_INFERNO" 
                            onImageClick={() => onImageOpen(DayCare)} 
                            darkMode={darkMode}/>
                            
                            {/* Group Chat Server with Fuzzing Clients */}
                            <ProjectCard 
                            title="Group Chat Server with Fuzzing Clients" 
                            date="SFU CMPT 201 System Programming | March 2026"
                            description="Multithreaded TCP Group Chat is a C-based server I developed for a Systems Programming course capable of handling over 100 concurrent clients. The 
                            application ensures ordered message broadcasting and implements a custom protocol supporting sender metadata and new-line termination framing. Managed with a CMake 
                            project structure, I rigorously verified system requirements and concurrency stability by debugging memory leaks and threading issues utilizing sanitizers, CGDB, 
                            and automated testing frameworks."
                            tools="C, Socket Programming, Multithreading, Docker, CMake, CGDB, Linux" 
                            githubUrl="https://github.com/AbrahamMormontoy/Group-Chat-Server-with-Fuzzing-Clients" 
                            darkMode={darkMode}/>

                            {/*Rubiks Cube Solver*/}
                            <ProjectCard 
                            title="Rubik's Cube Solver" 
                            date="SFU CMPT 225 Data Structures and Programming | November - December 2026"
                            description="Rubik’s Cube Solver is an algorithm-driven application I developed for CMPT 225. It utilizes A* search, a Pattern Database, and tiered Manhattan distance 
                            heuristics to solve configurations. I optimized performance through HashMap transposition pruning and matrix rotations, rigorously applying core data structures and algorithmic principles."
                            tools="Java" 
                            githubUrl="https://github.com/AbrahamMormontoy/Rubiks-Cube-Solver" 
                            darkMode={darkMode}/>

                            {/* Email Spam Detector */}
                            <ProjectCard 
                            title="Email Spam Detector" 
                            date="Personal Project | August 2025"
                            description="Spam Email Classifier is a natural language processing pipeline I developed to process, clean, and analyze over 75,000 messages. By converting HTML 
                            content and tokenizing text to extract numerical features, the model enables highly effective spam detection, achieving a 99% accuracy rate on a 7,000-email test dataset."
                            tools="Python, NLTK, Pandas, Scikit-learn" 
                            githubUrl="https://github.com/AbrahamMormontoy/Spam-detection-with-machine-learning" 
                            darkMode={darkMode}/>

                            {/* Video Games Market Analysis */}
                            <ProjectCard 
                            title="Video Games Market Analysis" 
                            date="Personal Project | June 2025"
                            description="Video Game Data Analysis is a project I developed to analyze over 16,000 records and identify industry trends. By creating visualizations for regional 
                            preferences and building clustering algorithms to classify titles, I extracted actionable insights and documented findings in a comprehensive data-driven report."
                            tools="Python, Pandas, Matplotlib, Scikit-learn" 
                            githubUrl="https://github.com/AbrahamMormontoy/Videogames-Market-Analysis" 
                            darkMode={darkMode}/>
                        </div>
                    </div>
                </WindowFrame>
            </div>
        </>
    )
}

export default Work;