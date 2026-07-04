import { useState } from "react";
import { TitleBar, WindowFrame, Button } from "../components/SharedUI";

/*import moreIcon from '../assets/assets95/moreIcon.png'
import Exit from '../assets/assets95/Exit.png'*/

import { moreIcon } from '../images/assets.jsx'

function More({ onClose }) {
    
    const questionList = [
        {
            question: `What are my hobbies and interests?`,
            answer: `I have a lot of hobbies and interests that vary a lot over time. My main hobbies are story-driven media such as manga and narrative video games. I like how these media explore different themes in different ways and are still able to convey messages and emotions even if you don't fully understand what's happening or don't completely relate to the characters.

            My favorite genre in video games is psychological horror, and in manga is thriller. If I had to pick one game and one manga, I would say Silent Hill 2 and Fire Punch (at this moment), but there are a lot of videogames and mangas that I enjoyed, such as Resident Evil 2, Silksong, Deltarune, Portal 2, Full Metal Alchemist, JoJo's, Tokyo Ghoul, and more.`  
        },
        {
            question: `Why do I use Hyprland Arch Linux?`,
            answer: `I use my Arch + Hyprland setup mainly because of convenience. First, I used this repository https://github.com/JaKooLit/Arch-Hyprland as it's really hard to set up everything from the start, and I just wanted to see if I liked it. After using it for a while, I decided to customize the system to my liking because there were a lot of things I didn't truly like. This went from small stuff, like using nano instead of nvim and downloading terminal tools like ncdu and the power system timer, to big stuff, like writing scripts to move applications like in Windows, configuring a second screen, and applying touchscreen and web camera settings (.conf files in general).

            My biggest recommendation is to start with a prebuilt setup like the one I used, then remove things you don't like and add things you do. This is especially true if you are aiming for convenience, because you are going to learn and deal with errors anyway every time there is an update or a mistake in the changes you made (the recent change from hyprlang to lua, for example, which I am not changing for now).`
        },
        {
            question: `What I am currently learning?`,
            answer: `I am currently learning SQL and Node.js to expand my backend development skills while constantly improving my frontend development skills with React and Tailwind.`
        },
        {
            question: `What are my future goals?`,
            answer: `At the moment, I am seeking co-op opportunities in various fields as a software developer and data analyst. I am aiming for a frontend development role, a data analysis role, a full-stack development or IT role.`
        },
        {
            question: `What coursework have I taken?`,
            answer: `I have taken Introduction to Software Engineering (CMPT 276), Data Structures and Algorithms (CMPT 225), Introduction to Computer Systems (CMPT 295), System Programming (CMPT 201), and Introduction to Artificial Intelligence (CMPT 310).`
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

    const [openTabs, setOpenTabs] = useState([])


    // Handles opening and closing
    const toggle = function (index) {
        // If the index is already in the openTabs array, remove it from the array to close the tab
        if (openTabs.includes(index)) {
            setOpenTabs(openTabs.filter(i => i !== index))
        } else {
            // If the index is not in the openTabs array, add it to the array to open the tab
            setOpenTabs([...openTabs, index])
        }
    }    

    return (
        <>
            <div className="font-['W95font'] select-none relative z-50">
                <WindowFrame title="More" iconSrc={moreIcon} windowClassName="w-[92vw] sm:w-[45rem] sm:h-[32rem] h-[60vh] max-h-[29rem]" frameclassName="p-6 gap-6" onClose={onClose}>
                {/* Question sections */}
                {questionList.map((item, index) => (
                    // Question button to display the answer when is clicked
                    <div key={index} className="flex flex-col" >
                        <Button soundType="open" onClick={() => toggle(index)} disableScale={true}
                        className="bg-[#c0c0c0] dark:bg-[#444444] text-black dark:text-white flex justify-between items-center px-3 py-1.5 
                            shadow-[inset_1px_1px_1px_1px_#000000] cursor-pointer transition-none">
                            <span className="text-[1.25rem] sm:text-[1.5rem] text-left">{item.question}</span>
                            <div className="bg-[#c0c0c0] dark:bg-[#333333] shadow-[inset_-1px_-1px_0px_0px_#000000,inset_1px_1px_0px_0px_#ffffff] px-2 py-0.5 ml-4 flex items-center justify-center shrink-0">
                                <span className="text-[1rem] sm:text-[1.25rem] leading-none transform transition-transform duration-200">
                                    {openTabs.includes(index) ? '▲' : '▼'}
                                </span>
                            </div>
                        </Button>
                        {openTabs.includes(index) && (
                            // Answer section that is display when the question button is clicked
                            <div className="bg-[#e0e0e0] dark:bg-[#222222] text-black dark:text-[#ddd] p-3 text-[1rem] sm:text-[1.25rem] leading-tight whitespace-pre-line
                            shadow-[inset_-1px_-1px_1px_1px_#000000]">
                                {item.answer}
                            </div>
                        )}
                    </div>
                ))}
                </WindowFrame>
            </div>
        </>
    )
}

export default More;