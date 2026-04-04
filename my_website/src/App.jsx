import { useState, useEffect, useContext } from 'react';

import About from './components/assets95/About.png'
import Links from './components/assets95/Links.png'
import More from './components/assets95/More.png'
import Folder from './components/assets95/Folder.png'
import Music from './components/assets95/Music.png'
import Contact from './components/assets95/Contact.png'
import Documents from './components/assets95/Work.png'
import Mode from './components/assets95/Mode.png'
import Copyright from './components/assets95/Copyright.png'


function App() {

    // TIMER FOR THE TASKBAR CLOCK 
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    function formatTime() {
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let meridiem = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12 || 12;
        const padZero = (num) => num < 10 ? `0${num}` : num;

        return `${padZero(hours)}:${padZero(minutes)} ${meridiem}`;
    } // END OF TIMER

    const desktopItems = [
        { label: 'About', icon: About },
        { label: 'Links', icon: Links },
        { label: 'Work', icon: Documents },
        { label: 'More', icon: More },
        { label: 'Contact', icon: Contact },
    ];

    const taskTabs = [
        { label: 'Mode', icon: Mode },
        { label: 'Music', icon: Music },
    ];

    return (
        <>
        <div className=""></div>
            <div className="bg-[#008080] w-screen h-screen flex flex-col overflow-hidden font-['W95font'] select-none relative z-50">

                {/*All the componets are here*/}
                <main className="flex-auto flex p-20 sm:p-8">

                    {/* Centered window with a max width and height */}
                    <div className="m-auto w-full md:max-w-3xl sm:min-h-150 min-h-125 p-1 bg-[#c0c0c0] 
                     shadow-[inset_-1.5px_-1.5px_0px_0px_#000000] flex flex-col">

                        {/* Window header that contains the title*/}
                        <div className="px-1 py-0.5 bg-[#000080]
                         flex justify-start items-center h-8 
                        shadow-[inset_1px_1px_1px_1px_#000000]">
                            <div className="flex items-center gap-1">
                                <img className="w-6 h-6 [image-rendering:pixelated]" src={Folder} alt="icon"/>
                                <div className="text-white text-6 leading-none tracking-tight font-bold">Welcome</div>
                            </div>
                        </div>

                        {/* The white frame */}
                        <div className="flex-auto bg-white flex flex-col mt-1
                        shadow-[inset_1px_1px_1px_1px_#000000]">

                            <div className="m-auto flex flex-col items-center justify-center gap-10 p-4 w-full">

                                <div className="flex flex-col items-center text-center gap-4 px-2">
                                    <h1 className="text-black text-4xl sm:text-6xl leading-tight 
                                    ">Hi <span className="font-bold">I am Abraham</span></h1>
                                    <h2 className="text-black text-xl sm:text-2xl leading-tight t-white">CS student and developer</h2>
                                </div>

                                {/* Icon grid */}
                                <div className="grid grid-cols-3 gap-y-8 gap-x-4 sm:flex sm:flex-wrap sm:justify-center
                                sm:gap-x-10 w-full max-w-sm sm:max-w-none transition-all duration-300">
                                    {desktopItems.map((item, index) => (
                                        <button
                                            key={item.label}
                                            className={`flex flex-col items-center gap-2 w-full sm:w-20 
                                                cursor-pointer p-1 hover:scale-110 transition-transform duration-300 
                                            ${index === 3 ? 'col-start-1 col-end-2 ml-[50%] sm:ml-0' : ''} 
                                            ${index === 4 ? 'col-start-2 col-end-3 ml-[50%] sm:ml-0' : ''}`}>
                                            
                                            {/* Images components */}
                                            <img
                                                className="w-16 h-16 
                                                shrink-0 [image-rendering:pixelated] transition-all duration-300 object-contain"
                                                draggable="false"
                                                src={item.icon}
                                                alt={item.label}
                                            />
                                            <span className="text-black text-[16px] 
                                            text-center leading-tight transition-all duration-300 font-bold">{item.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="h-5 mt-1 bg-[#c0c0c0]
                        shadow-[inset_1px_1px_1px_1px_#7F7F7F] flex items-center px-1">
                            <span className="text-black text-[10px] leading-none">5 object(s)</span>
                        </div>
                    </div>
                </main>

                {/* Taskbar bottom of the screen */}
                <footer className="w-full h-7 bg-[#c0c0c0] flex justify-between items-stretch p-0.5 gap-2 border-t-1.5
                border-white shadow-[inset_0px_1px_0px_0px_#C0C0C0]">
                    <div className="flex items-center gap-1 overflow-x-hidden no-scrollbar h-full ">
                        <div className="px-1.5 py-0 h-full bg-[#c0c0c0]
                        shadow-[inset_0px_0px_1px_1px_#7F7F7F]
                         flex items-center gap-1 shrink-0">
                             {/* Fixed missing Start Icon */}
                            <img className="w-4 h-4 [image-rendering:pixelated]" src={Copyright} alt="start" />
                            <span className="text-black text-[9px] sm:text-[11px] leading-2.5 text-left
                            ">Abraham Mormontoy</span>
                        </div>


                        {taskTabs.map((tab) => (
                            <button key={tab.label}
                            className="px-2 pr-20 py-0 h-full bg-[#C0C0C0]
                            shadow-[inset_-2px_-2px_0px_0px_#7F7F7F]

                            flex items-center gap-1 shrink-0 cursor-pointer hover:scale-102 transition-transform duration-200">
                                {/*Taskbar icons*/}
                                <img className="w-4 h-4 [image-rendering:pixelated]" draggable="false" src={tab.icon} alt={tab.label} />
                                <span className="text-black text-[11px] leading-none">{tab.label}</span>
                            </button>
                        ))}
                    </div>  
                    <div className="px-2 h-full bg-[#c0c0c0] shadow-[inset_1px_1px_0px_0px_#7F7F7F] 
                    flex items-center shrink-0">
                        <span className="text-black text-[10px] sm:text-[11px] leading-none mt-px">{formatTime()}</span>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default App;