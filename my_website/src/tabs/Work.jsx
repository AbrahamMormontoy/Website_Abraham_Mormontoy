import {  useState ,useEffect } from "react";
import WorkIcon from '../components/assets95/Work.png'
import Exit from '../components/assets95/Exit.png'
import Cv from '../components/assets95/Cv.png'
import Github from '../components/assets95/Github.png'

function Work() {
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

                </div>
            </div>
        </main>
    </div>
    
    </>)
}

export default Work;