import { TitleBar, SkillsSections , ProjectCard, WindowFrame } from '../components/SharedUI.jsx'
import {  useState ,useEffect, useContext } from "react";
import { ThemeContext } from '../components/clouds/ThemeContext.jsx'

import WorkIcon from '../assets/assets95/Work.png'
import Exit from '../assets/assets95/Exit.png'
import Cv from '../assets/assets95/Cv.png'
import Github from '../assets/assets95/Github.png'
import GithubDark from '../assets/assets95/GithubDarkmode.png'
import DayCare from '../assets/workImages/Daycare.png'
import DogBreed from '../assets/workImages/DogBreed.png'
import PetMind from '../assets/workImages/PetMind.png'
import SFUFitness from '../assets/workImages/SfuFitness.jpg'
import Windows95 from '../assets/workImages/Windows95.png'



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

    return (
    <>
        <div className="w-screen h-screen flex flex-col overflow-hidden font-['W95font'] select-none relative z-50">
            
            {imageViewer(image, () => setImage(null))}
            <main className="flex flex-auto p-20 sm:p-8">

                {/* Size of the window and title bar included */}
                <WindowFrame title="Work" iconSrc={WorkIcon} windowClassName="sm:max-w-250 sm:h-170 h-125">
                
                        
                    {/* Skills section */}
                    <div className="flex flex-col gap-5 mt-5 ml-5 pr-5 pb-5">
                        
                        {/* Tools sections */}
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

                        {/* Languages sections */}
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

                        {/* Libraries/Frameworks sections */}
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
                            <ProjectCard 
                            title="Windows95 Web Portfolio" 
                            description="Build a personalized website with darkmode, tab movement, displaying in one 
                            index, used libraries from thirds for movement."
                            tools="Javascript, React, Tailwind CSS, HTML/CSS, Figma, Next.js" 
                            imageSrc={Windows95} 
                            imageAlt="Windows95 Portfolio" 
                            githubUrl="https://github.com/AbrahamMormontoy/Website_Abraham_Mormontoy" 
                            onImageClick={() => setImage(Windows95)} 
                            darkMode={darkMode}/>

                            {/* Pet Mind Reader */}
                            <ProjectCard 
                            title="Pet Mind Reader" 
                            description="Build a personalized website with darkmode..."
                            tools="TypeScript, React, Tailwind CSS, Next.js, Framer Motion, Google Generative AI SDK" 
                            imageSrc={PetMind} 
                            imageAlt="Pet Mind Reader" 
                            githubUrl="https://github.com/kentishnguyen/pet-mind-reader" 
                            onImageClick={() => setImage(PetMind)} 
                            darkMode={darkMode}/>

                            {/* SFU Fitness Tracker */}
                            <ProjectCard 
                            title="SFU Fitness Tracker" 
                            description="Built in stormhacks of 4 (hackathon) a full-stack fitness tracking application 
                            that connects clients and trainers with user registration, personalized exercise preference and dashboard."
                            tools="Java, Spring Boot, JavaScript, HTML/CSS, SQL" 
                            imageSrc={SFUFitness} 
                            imageAlt="SFU Fitness Tracker" 
                            githubUrl="https://github.com/egemen-guney/stormhacks-2025" 
                            onImageClick={() => setImage(SFUFitness)} 
                            darkMode={darkMode}/>

                            {/* Dog Breed Classifier */}
                            <ProjectCard 
                            title="Dog Breed Classifier" 
                            description="Group project of 4 to build a convolutional neural network using 50 breeds with 
                            150 images each achieving a accuracy of 80% using transfer learning with a pretrained ResNet-18 model"
                            tools="python, torch, torchvision, pandas/numpy, matplotlib, scikit-learn, openCV" 
                            imageSrc={DogBreed} 
                            imageAlt="Dog Breed Classifier" 
                            githubUrl="https://github.com/viktorz05/ImageClassification" 
                            onImageClick={() => setImage(DogBreed)}
                            darkMode={darkMode}/>
                    
                            {/* Daycare inferno */}
                            <ProjectCard 
                            title="Daycare inferno" 
                            description="Group project of 4 to build 2D-arcade style maze game avoiding enemies and collecting 
                            rewards. Included UML diagrams, Use Cases, UI mockups, project management (Scrum) and version control."
                            tools="Java, Swing, Awt" 
                            imageSrc={DayCare} 
                            imageAlt="Daycare inferno" 
                            githubUrl="https://github.com/AbrahamMormontoy/DAYCARE_INFERNO" 
                            onImageClick={() => setImage(DayCare)} 
                            darkMode={darkMode}/>
                            
                            {/* Group Chat Server with Fuzzing Clients */}
                            <ProjectCard 
                            title="Group Chat Server with Fuzzing Clients" 
                            description=" Developed a TCP multi-threaded group chat server and fuzzing client. 
                            Handles concurrent connections up to 100 clients ensuring message ordering and broadcast."
                            tools="C, Socket Programming, Multithreading" 
                            githubUrl="https://github.com/AbrahamMormontoy/Group-Chat-Server-with-Fuzzing-Clients" 
                            darkMode={darkMode}/>

                            {/*Rubiks Cube Solver*/}
                            <ProjectCard 
                            title="Rubiks Cube Solver" 
                            description="Develop Rubik's Cube solver with A* search algorithm, heuristic function, and a 
                            Pattern DataBase to get the optimal result taking into account the position and orientation."
                            tools="Java" 
                            githubUrl="https://github.com/AbrahamMormontoy/Rubiks-Cube-Solver" 
                            darkMode={darkMode}/>

                            {/* Email Spam Detector */}
                            <ProjectCard 
                            title="Email Spam Detector" 
                            description="Processed, cleaned and analyzed 75 000 email messages converting HTML content, tokenizing 
                            text and linear classification achieving 99% accuracy over 7000 emails."
                            tools="Python, NLTK, Pandas, Scikit-learn" 
                            githubUrl="https://github.com/AbrahamMormontoy/Spam-detection-with-machine-learning" 
                            darkMode={darkMode}/>

                            {/* Video Games Market Analysis */}
                            <ProjectCard 
                            title="Video Games Market Analysis" 
                            description="Analyzed over 16,000 video game records identifying market trends and insights 
                            using visualization and a clustering algorithm to classify video games titles into recent hits."
                            tools="Python, Pandas, Matplotlib, Scikit-learn" 
                            githubUrl="https://github.com/AbrahamMormontoy/Videogames-Market-Analysis" 
                            darkMode={darkMode}/>
                        </div>
                    </div>
                </WindowFrame>
            </main>
        </div>
    
    </>)
}

export default Work;