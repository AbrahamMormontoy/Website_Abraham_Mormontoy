import {  useState ,useEffect } from "react";
import WorkIcon from '../components/assets95/Work.png'
import Exit from '../components/assets95/Exit.png'
import Cv from '../components/assets95/Cv.png'
import Github from '../components/assets95/Github.png'

const SkillsSections = function ({children}) {
    return (
        <div className="bg-[#c0c0c0] px-4 py-1 text-black text-xs sm:text-sm 
         shadow-[inset_-1.5px_-1.5px_0px_0px_#000000,inset_1.5px_1.5px_0px_0px_#ffffff] 
         transition-all duration-300 hover:scale-105 cursor-default ">
            {children}
        </div>
    )
}

function Work() {

    const projectsItems = [
        {
            title: "SFU Fitness Tracker",
            description: "Built in stormhacks of 4 (hackathon) a full-stack fitness tracking application that connects clients and trainers with user registration, personalized exercise preference and dashboard.",
            tools: "JavaScript, Java, HTML/CSS, SpringBoot, SQL",
            github: "https://github.com/egemen-guney/stormhacks-2025"
        },
        {
            title: "Windows95 style Portfolio Website",
            description: "Build a personalized website with darkmode, tab movement, displaying in one index, used libraries from thirds for movement.",
            tools: "Javascript, React, Tailwind, HTML/CSS, Figma, Next.js",
            github: "https://github.com/AbrahamMormontoy/Website_Abraham_Mormontoy"
        },
        {
            title: "Daycare Inferno (game)",
            description: "Group project of 4 to build 2D-arcade style maze game avoiding enemies and collecting rewards. Included UML diagrams, Use Cases, UI mockups, project management (Scrum) and version control.",
            tools: "Java, Swing, Awt",
            github: "https://github.com/AbrahamMormontoy/DAYCARE_INFERNO"
        },
        {
            title: "Dog Breed Classifier",
            description: "Group project of 3 to build a convolutional neural network using 50 breeds with 150 images each achieving a accuracy of 80% using transfer learning with a pretrained ResNet-18 model.",
            tools: "python, torch, torchvision, pandas/numpy, matplotlib, scikit-learn, openCV",
            github: "https://github.com/viktorz05/ImageClassification"
        },
        {
            title: "Group Chat Server with Fuzzing Clients",
            description: "Developed a TCP multi-threaded group chat server and fuzzing client. Handles concurrent connections up to 100 clients ensuring message ordering and broadcast.",
            tools: "C, Socket Programming, Multithreading",
            github: "https://github.com/AbrahamMormontoy/Group-Chat-Server-with-Fuzzing-Clients"
        },
        {
            title: "Rubik's Cube Solver",
            description: "Develop Rubik's Cube solver with A* search algorithm, heuristic function, and a Pattern DataBase to get the optimal result taking into account the position and orientation.",
            tools: "Java",
            gihub: "https://github.com/AbrahamMormontoy/Rubiks-Cube-Solver"
        },
        {
            title: "Email Spam Detector",
            description: "Processed, cleaned and analyzed 75 000 email messages converting HTML content, tokenizing text and linear classification achieving 99% accuracy over 7000 emails",
            tools: "Python, Scikit-learn, Pandas/Numpy, NLTK",
            github: "https://github.com/AbrahamMormontoy/Spam-detection-with-machine-learning"
        },
        {
            title: "Video Games Market Analysis",
            description: "Analyzed over 16,000 video game records identifying market trends and insights using visualization and a clustering algorithm to classify video games titles into recent hits.",
            tools: "Python, Pandas/Numpy, Matplotlib",
            github: "https://github.com/AbrahamMormontoy/Videogames-Market-Analysis"
        }
    ];
    

    return (<>
    <div className="w-screen h-screen flex flex-col overflow-hidden font-['W95font'] select-none relative z-50">
        <main className="flex flex-auto p-20 sm:p-8">
            <div className="m-auto w-full sm:max-w-189 h-125 sm:h-150 p-1 bg-[#c0c0c0]
            dark:bg-[#333333] shadow-[inset_-1.5px_-1.5px_0px_0px_#000000] flex flex-col">
                <div className="flex justify-between bg-[#000080] dark:bg-[#121212] shadow-[inset_1px_1px_1px_1px_#000000] h-8">
                    <div className="flex items-center gap-1 p-1">
                        <img className="w-6 h-6 [image-rendering:pixelated]" src={WorkIcon} alt="icon" draggable={false}/>
                        <div className="text-white text-6 leading-none tracking-tight font-bold">Work</div>
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
                            <div className="font-bold text-[16px] mb-1">TOOLS</div>
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
                            <div className="font-bold text-[16px] mb-1">LANGUAGES</div>
                            <div className="flex flex-wrap gap-3">
                                <SkillsSections>JavaScript</SkillsSections>
                                <SkillsSections>TypeScript</SkillsSections>
                                <SkillsSections>C</SkillsSections>
                                <SkillsSections>HTML/CSS</SkillsSections>
                                <SkillsSections>Python</SkillsSections>
                                <SkillsSections>Java</SkillsSections>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="font-bold text-[16px] mb-1">LIBRARIES/FRAMEWORKS</div>
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
                        <div className="font-bold text-center text-[16px]">DEVELOPMENT</div>
                        <div className="flex flex-col gap-5">
                            {projectsItems.map((item, index) => (
                                <div key={index} className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                                    
                                    <div className="flex flex-col text-center sm:text-left flex-auto sm:ml-4 mx-4">
                                        <div className="font-bold text-[14px]">{item.title}</div>
                                        <div className="text-[14px]">{item.description}</div>
                                        <div className="text-[12px] italic mt-1">Tools: {item.tools}</div>
                                    </div>
                                    <a href={item.github} target="_blank" rel="noopener noreferrer" 
                                    className="flex shrink-0 cursor-pointer items-center p-3 sm:mr-4 hover:scale-105 transition-transform duration-300">
                                        <img src={Github} alt="github" className="w-14 h-14.5 [image-rendering:pixelated]"/>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
    
    </>)
}

export default Work;