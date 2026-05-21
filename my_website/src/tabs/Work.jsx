import { TitleBar, SkillsSections , ProjectCard, WindowFrame } from '../components/SharedUI.jsx'
import {  useState ,useEffect, useContext } from "react";
import { ThemeContext } from '../components/clouds/ThemeContext.jsx'

import workIcon from '../assets/assets95/workIcon.png'
import Exit from '../assets/assets95/Exit.png'
import Cv from '../assets/assets95/Cv.png'
import Github from '../assets/assets95/Github.png'
import GithubDark from '../assets/assets95/GithubDarkmode.png'
import DayCare from '../assets/workImages/Daycare.png'
import DogBreed from '../assets/workImages/DogBreed.png'
import PetMind from '../assets/workImages/PetMind.png'
import SFUFitness from '../assets/workImages/SfuFitness.jpg'
import Windows95 from '../assets/workImages/Windows95.png'



function Work( {onClose} ) {
    const [image, setImage] = useState(null);

    const imageViewer = function (img, onClose) {
        if (!img) return null;
        // fix
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center cursor-pointer z-50" onClick={onClose}>
                <img src={img} alt="Enlarged view" className="w-[80vw] h-[90vh] object-contain"/>
            </div>
        );
    }  

    const { theme }  = useContext(ThemeContext);
    const darkMode = theme === 'dark';

    return (
    <>
        <div className="font-['W95font'] select-none relative z-50">
            
            {imageViewer(image, () => setImage(null))}

                {/* Size of the window and title bar included */}
                <WindowFrame title="Work" iconSrc={workIcon} windowClassName="sm:w-250 w-[92vw] sm:h-170 h-[80vh]" onClose={onClose}>
                
                        
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
                                <SkillsSections>Arch/Linux</SkillsSections>
                                <SkillsSections>MS Office</SkillsSections>
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
                           date="Personal Project | April - May 2026"
                           description="Build a portfolio website inspired by the Windows 95 aesthetic. The project supports tab movement in desktop form for each section as well as the ability to
                           open multiple windows at the same time. The design is responsive and includes dark mode support that depends on the system preferences or the time of the day. It also includes
                           animated clouds in the background that respond to the current theme. Added contact form with validation and email sending functionality using EmailJS. Added sound effects
                           for opening and closing windows, hovering over icons, and clicking buttons to enhance the user experience."
                           tools="Javascript, React, Tailwind CSS, HTML/CSS, Figma, Next.js"
                           imageSrc={Windows95}
                           imageAlt="Windows95 Portfolio"
                           githubUrl="https://github.com/AbrahamMormontoy/Website_Abraham_Mormontoy"
                           onImageClick={() => setImage(Windows95)}
                           darkMode={darkMode}/>


                           {/* Pet Mind Reader */}
                           <ProjectCard
                           title="Pet Mind Reader"
                           date="SFU Surge Sillyhack | April 2026"
                           description="Develop a web application where you upload a photo of a pet and it generates a humorous caption of what the pet might be thinking. The application supports the
                           upload of sinle pet photos as well as multiple pets in the same photo generating a caption for each pet. The app uses the Gemini model from Google Generative AI to generate
                           the captions and Next.js API routes to handle the backend processing of the images and communication with the Gemini API. It supports jpeg, png, gif and webp formats with
                           a limit of 10MB. This project was developed in the sillyhack 2025 hackathon in a group of 4 following the hackathon theme of fun, chaotic and unhinge ideas."
                           tools="TypeScript, React, Tailwind CSS, Next.js, Framer Motion, Google Generative AI SDK"
                           imageSrc={PetMind}
                           imageAlt="Pet Mind Reader"
                           githubUrl="https://github.com/kentishnguyen/pet-mind-reader"
                           onImageClick={() => setImage(PetMind)}
                           darkMode={darkMode}/>

                            {/* SFU Fitness Tracker */}
                            <ProjectCard 
                            title="SFU Fitness Tracker" 
                            date="SFU Surge Stormhacks | December 2025"
                            description="Develop a fitness tracking full stack web application with trainer and client user registration and log in system with encryption. The app has a integrated 
                            client-trainer data communication to keep track of a exercise preferences, long-term, short-term goals, avialability and information. This information can go from certifications
                            of the trainer to gender and favorite exercise of the client. Implemented a dashboard for both clients and trainers so they can see the avialability of each one has and the 
                            possibility to book a session if possible. The project was developed in a group of 4 for the SFU Stormhacks 2025."
                            tools="Java, Spring Boot, JavaScript, HTML/CSS, SQL" 
                            imageSrc={SFUFitness} 
                            imageAlt="SFU Fitness Tracker" 
                            githubUrl="https://github.com/egemen-guney/stormhacks-2025" 
                            onImageClick={() => setImage(SFUFitness)} 
                            darkMode={darkMode}/>

                            {/* Dog Breed Classifier */}
                            <ProjectCard 
                            title="Dog Breed Classifier" 
                            date="SFU CMPT 310 Introduction to Artificial Intelligence | January - April 2026"
                            description="Build a Dog Breed Image Classificator model using a Convolutionall Neural Network that gives the top 3 most accurate predictions of the picture of a dog breed. 
                            The model supports jpg, jpeg and png formats. The model was trained using transfer learning with a pretrained ResNet-18 model. The pipeline included image resizing to 224x224.
                            Training was performed over 15 epochs using a CUDA-acelerated GPU and backpropagation. The dataset used for the training is the Stanford Dogs Dataset using only 50 breeds with 150 images each.
                            The accuracy achieved is 80% for Top-1 and 94% for the Top-3. This project was developed in a group of 4 for the CMPT 310 course at SFU creating reports for each phase of the development process."  
                            tools="python, torch, torchvision, pandas/numpy, matplotlib, scikit-learn, openCV" 
                            imageSrc={DogBreed} 
                            imageAlt="Dog Breed Classifier" 
                            githubUrl="https://github.com/viktorz05/ImageClassification" 
                            onImageClick={() => setImage(DogBreed)}
                            darkMode={darkMode}/>
                    
                            {/* Daycare inferno */}
                            <ProjectCard 
                            title="Daycare inferno" 
                            date="SFU CMPT 276 Introduction to Software Engineering | January - April 2026"
                            description="Build a 2D arcade-style maze game that consists of a daycare burning and an employee trapped inside. The main objective of the game is to rescue all of the scattered children while avoiding
                            the fire enemies (moving) and debris enemies (static). The core mechanics of the game consists in AI-driven enemies using Greedy Search, collision detection using rectangles, score system based on the rescued 
                            children and special rewards and a timer system. The enemies, both static and moving, and rewards are randomly generated at the start of each game. This project was developed in a group of 4 for the CMPT 276 
                            course at SFU following software engineering principles like Version Control, UML diagrams, use cases, UI mockups, Scrum and Agile development, maven for project managment, unit testing with JUnit and Javadocs.
                            Constant reports were made for each phase of the development process."
                            tools="Java, Swing, Awt, JUnit" 
                            imageSrc={DayCare} 
                            imageAlt="Daycare inferno" 
                            githubUrl="https://github.com/AbrahamMormontoy/DAYCARE_INFERNO" 
                            onImageClick={() => setImage(DayCare)} 
                            darkMode={darkMode}/>
                            
                            {/* Group Chat Server with Fuzzing Clients */}
                            <ProjectCard 
                            title="Group Chat Server with Fuzzing Clients" 
                            date="SFU CMPT 201 System Programming | March 2026"
                            description="Build a multithreaded group chat TCP server capable of handling 100 concurrent clients. The server ensures all messages are broadcasted to every client maintaining the order of the messages. The server
                            implements a messaging protocol supporting writing a message, sender metadata (IP/Port), and new-line termination framing to guarante correct parsing. Implemented a CMake for the project structure and compilation. 
                            Verify correctness of the server and clients requirements with provided automated tests. Debug memmory leaks and threading issues using sanitizers and CGDB."
                            tools="C, Socket Programming, Multithreading" 
                            githubUrl="https://github.com/AbrahamMormontoy/Group-Chat-Server-with-Fuzzing-Clients" 
                            darkMode={darkMode}/>

                            {/*Rubiks Cube Solver*/}
                            <ProjectCard 
                            title="Rubiks Cube Solver" 
                            date="SFU CMPT 225 Data Structures and Programming | November - December 2026"
                            description="Build a Rubik’s Cube solver utilizing the A∗ search algorithm paired with a Pattern Database (PDB) and a tiered heuristic function. Implemented a complex heuristic estimation incorporating
                             Manhattan distances for corner and edge permutations, accounting for both position and orientation. Optimized search performance by integrating transposition pruning via HashMaps to eliminate redundant state 
                             evaluations and modular move logic using matrix rotations. This project was developed for the CMPT 225 course at SFU following data structures and algorithms principles like search algorithms and heuristic functions."
                            tools="Java" 
                            githubUrl="https://github.com/AbrahamMormontoy/Rubiks-Cube-Solver" 
                            darkMode={darkMode}/>

                            {/* Email Spam Detector */}
                            <ProjectCard 
                            title="Email Spam Detector" 
                            date="Personal Project | August 2025"
                            description="Processed, cleaned, and analyzed 75,000+ email messages. Extracted numerical features from email data by converting HTML content and tokenizing text, enabling effective spam classification.      
                            Achieved an accuracy rate of 99% on a test dataset of over 7,000 emails, natural language processing."
                            tools="Python, NLTK, Pandas, Scikit-learn" 
                            githubUrl="https://github.com/AbrahamMormontoy/Spam-detection-with-machine-learning" 
                            darkMode={darkMode}/>

                            {/* Video Games Market Analysis */}
                            <ProjectCard 
                            title="Video Games Market Analysis" 
                            date="Personal Project | June 2025"
                            description="Analyzed over 16,000 video game records to identify market trends and insights. Created data visualizations to detect trends in genres, publishers, and regional preferences, 
                            enabling data-driven decision-making. Built clustering algorithms to classify video game titles into recent hits and successful legacy titles. Made a report about my finding and insights from
                            the analysis and visualization of the data."
                            tools="Python, Pandas, Matplotlib, Scikit-learn" 
                            githubUrl="https://github.com/AbrahamMormontoy/Videogames-Market-Analysis" 
                            darkMode={darkMode}/>
                        </div>
                    </div>
                </WindowFrame>
        </div>
    
    </>)
}

export default Work;