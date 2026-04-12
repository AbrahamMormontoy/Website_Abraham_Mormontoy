import {  useState ,useEffect } from "react";
import AboutIcon from '../components/assets95/About.png'
import Exit from '../components/assets95/Exit.png'

function About() {
    return (
        <>
            <div className="w-screen h-screen flex flex-col overflow-hidden font-['W95font'] select-none relative z-50">
                <main className="flex flex-auto p-20 sm:p-8">
                    {/*Frame of the white frame*/}
                    <div className="m-auto w-full sm:max-w-189 h-125 sm:h-150 p-1 bg-[#c0c0c0] 
                    dark:bg-[#333333] shadow-[inset_-1.5px_-1.5px_0px_0px_#000000] flex flex-col">
                        {/* Tittle bar */}
                        <div className="flex justify-between bg-[#000080] dark:bg-[#121212] shadow-[inset_1px_1px_1px_1px_#000000] h-8">
                            <div className="flex items-center gap-1 p-1">
                                <img className="w-6 h-6 [image-rendering:pixelated]" src={AboutIcon} alt="icon" draggable={false}/>
                                <div className="text-white text-6 leading-none tracking-tight font-bold">About</div>
                            </div>
                            <div>
                                <div className="flex items-center justify-end gap-1">
                                    <button className="p-1 hover:scale-110 transition-transform 
                                    duration-300 cursor-pointer flex items-center gap-0.5">
                                        <img className="w-6 h-6 [image-rendering:pixelated]" src={Exit} alt="exit" draggable={false}/>
                                    </button>
                                </div>
                             </div>
                        </div>
                        {/* Content area */}
                        <div className="flex-auto bg-white flex flex-col mt-1 dark:bg-[#333333]
                        shadow-[inset_1px_1px_1px_1px_#000000] overflow-y-auto custom-scrollbar">
                            <div className="flex items-center justify-center p-6">
                                <img className="w-24 h-24 [image-rendering:pixelated] mr-10" src={AboutIcon} alt="icon" draggable={false}/>
                                <div className="flex flex-col gap-2">
                                    <div className="text-[2.25rem] text-black dark:text-white font-bold">Abraham Mormontoy</div>
                                <div className="text-[1rem] text-black dark:text-white leading-[0.9rem]">
                                    <div>Computer Science Student specialized in:</div>
                                    <div className="flex flex-col">
                                        <div>- Frontend Web Development</div>
                                        <div>- Data Analysis</div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="flex justify-center text-[1rem] text-black dark:text-white leading-[0.9rem] p-5">
                                Hi, I am Abraham Mormontoy a second year computer science student from Simon Fraser University in Vancouver.  
                                I am passionate about problem solving, creating innovative UI and UX, and analyzing data.  </div>
                            <div className="flex flex-col text-[1rem] text-black dark:text-white leading-[0.9rem] p-5 px-8 gap-5">
                                <div className="flex justify-between items-start leading-6">
                                    <div className="flex flex-col">
                                        <div className="font-bold">EDUCATION</div>
                                        <div className="font-bold">Simon Fraser University</div>
                                        <div>Bachelor of Science in Computer Science</div>
                                    </div>
                                    <div className="flex flex-col items-end text-right leading-6">
                                        <div className="font-bold">Burnaby British Columbia</div>
                                        <div>Expected Graduation date, Dec 2028</div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col leading-6">
                                        <div className="font-bold">INTERESTS</div>
                                        <div>- Software Development</div>
                                        <div>- Databases</div>
                                        <div>- Game Development</div>
                                        <div>- Networking</div>
                                        <div>- Machine Learning</div>
                                    </div>
                                    <div className="flex flex-col items-end text-right leading-6">
                                        <div className="font-bold">CONCENTRATION (aiming)</div>
                                        <div>- Computer System</div>
                                        <div>- Artificial Intelligence</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default About;
