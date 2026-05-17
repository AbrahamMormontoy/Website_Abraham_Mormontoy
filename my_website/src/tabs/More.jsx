import { useState ,useEffect } from "react";

import MoreIcon from '../components/assets95/More.png'
import Exit from '../components/assets95/Exit.png'

function More() {
    
    const questionList = [
        {
            question: `What are my hobbies and interests?`,
            answer: `I have a lot of hobbies and interests that vary a lot along time. My main hobbies are story driven media such as
            mangas and narrative videogames. I like how these media explore different themes in different ways and are still able 
            to convey message and emotions even if you dont fully understand whats happening or dont completely relate to the characters.
            My favorite genre in videogame is psychological horror and in manga is slice of life. If I had to pick one game and one manga
            , I would say Silent Hill 2 and Your Lie in April (they are not even remotely similar) but there are a lot of videogames and mangas
            that I enjoyed such as Resident Evil 2, Silksong, Deltarune, Portal 2, Fire punch, Full Metal Alchemist, Jojos, Tokyo Ghoul and more.`  
        },
        {
            question: `Why do I use Hyprland Arch Linux?`,
            answer: `I use arch linux mainly because of convenience. First I use this repository https://github.com/JaKooLit/Arch-Hyprland 
            as its really hard to set up everything from the start and I just wanted to see if I like it. After using it for a while I decided
            to customize system to my liking because there were a lot of things I didnt truly like that went from small stuff, using nano instead
            of nvim, download terminal tools like ncdu and the power system timer, to big stuff, writing scripts to move applications like in windows, work for a second screen,
            apply touchscreen settings and the web camera (conf files in general). My biggest recomedation is to start with a prebuilt software like the one I used and
            then remove things you dont like and add things you do like, this especially if you are aiming for convenience because you are gonna learn anyways and deal
            with error anyways everytime there is an update or a mistake in the own changes you made (Recent change to hprlang to lua for example, I am not changing it for now).`
        },
        {
            question: `What I am currently learning?`,
            answer: `I am currently learning SQL and node.js to expand my backend development skills while constantly 
            improving my frontend development skills with React and Tailwind.`
        },
        {
            question: `What are my future goals?`,
            answer: `At the moment, I am seekin co-op opportunities in various fields as a software developer and data analyst.
             I am aiming for a frontend development role, data analysis role, full-stack development or IT`
        },
        {
            question: `What coursework have I taken?`,
            answer: `I have taken Introduction to Software Engineering (CMPT 276), Data Structures and Algorithms (CMPT 225),
            Introduction to Computer Systems (CMPT 295), System Programming (CMPT 201), Introduction to Artificial Intelligence (CMPT 310).`
        },
        {
            question: `What are the course I plan to take?`,
            answer: `I plan to make a concentration in both AI and Computer Systems so the main courses I plan to take are:

            Artificial Intelligence
            - Introduction to Artificial Intelligence (CMPT 310)
            - Machine Learning (CMPT 410), 
            - Deep Learning (CMPT 420), 
            - Intelligent Systems (CMPT 417)

            Computing Systems
            - Data Communications and Networking (CMPT 371), 
            - Distributed Systems (CMPT 431), 
            - Embedded Systems (CMPT 433),
            - Networking II (CMPT 471)
            
            Other important courses are Database Systems (CMPT 354), Database Systems II (CMPT 454), Data Structures and Algorithms (CMPT 307), and more `
        }
    ]

    const [openTabs, setOpenTabs] = useState(null)

    // Handles opening and closing
    const toggle = function (index) {
        if (openTabs === index) {
            setOpenTabs(null)
        } else {
            setOpenTabs(index)
        }
    }    

    return (
        <>
            <div className="w-screen h-screen flex flex-col overflow-hidden font-['W95font'] select-none relative z-50">
                    <main className="flex flex-auto p-20 sm:p-8">
                        <div className="m-auto w-full sm:max-w-170 h-100 sm:h-100 p-1 bg-[#c0c0c0]
                        dark:bg-[#333333] shadow-[inset_-1.5px_-1.5px_0px_0px_#000000] flex flex-col">
                            <div className="flex justify-between bg-[#000080] dark:bg-[#121212] shadow-[inset_1px_1px_1px_1px_#000000] h-8">
                                <div className="flex items-center gap-1 p-1">
                                    <img className="w-6 h-6 [image-rendering:pixelated]" src={MoreIcon} alt="icon" draggable={false}/>
                                    <div className="text-white text-6 leading-none tracking-tight font-bold">More</div>
                                </div>
                                <div className="flex items-center">
                                    <button className="p-1 cursor-pointer hover:scale-110 transition-transform duration-300">
                                        <img className="w-6 h-6 [image-rendering:pixelated]" src={Exit} alt="exit" draggable={false}/>
                                    </button>
                                </div>
                            </div>
                            <div className="flex-auto bg-white flex flex-col mt-1 dark:bg-[#333333]
                            shadow-[inset_1px_1px_1px_1px_#000000] overflow-y-auto custom-scrollbar p-3 gap-3">
                                {questionList.map((item, index) => (
                                    <div key={index} className="flex flex-col" >
                                        <button onClick={() => toggle(index)} 
                                        className="bg-[#c0c0c0] dark:bg-[#444] text-black dark:text-white flex justify-between items-center px-3 py-1.5 
                                            shadow-[inset_1px_1px_1px_1px_#000000] cursor-pointer transition-none">
                                            <span className="text-[20px] text-left">{item.question}</span>
                                            <div className="bg-[#c0c0c0] dark:bg-[#333] shadow-[inset_-1px_-1px_0px_0px_#000000,inset_1px_1px_0px_0px_#ffffff] px-2 py-0.5 ml-4 flex items-center justify-center shrink-0">
                                                <span className="text-[20px] leading-none transform transition-transform duration-200">
                                                    {openTabs === index ? '▲' : '▼'}
                                                </span>
                                            </div>
                                        </button>
                                        {openTabs === index && (
                                            <div className="bg-[#e0e0e0] dark:bg-[#222] text-black dark:text-[#ddd] p-3 text-[14px] leading-tight whitespace-pre-line
                                            shadow-[inset_-1px_-1px_1px_1px_#000000]">
                                                {item.answer}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </main>
                </div>
        </>
    )
}

export default More;
