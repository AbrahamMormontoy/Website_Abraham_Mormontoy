import { WindowFrame } from './components/SharedUI';
import { useState, useEffect, useContext, useRef } from 'react';
import { ThemeProvider, ThemeContext } from './components/clouds/ThemeContext';
import CloudAnimation from './components/clouds/CloudAnimation';
import Draggable from 'react-draggable';

import About from './tabs/About.jsx';
import Links from './tabs/Links.jsx';
import Work from './tabs/Work.jsx';
import More from './tabs/More.jsx';
import Contact from './tabs/Contact.jsx';

import aboutIcon from './assets/assets95/aboutIcon.png'
import linksIcon from './assets/assets95/linksIcon.png'
import moreIcon from './assets/assets95/moreIcon.png'
import folderIcon from './assets/assets95/folderIcon.png'
import musicIcon from './assets/assets95/musicIcon.png'
import contactIcon from './assets/assets95/contactIcon.png'
import workIcon from './assets/assets95/workIcon.png'
import modeIcon from './assets/assets95/modeIcon.png'
import Copyright from './assets/assets95/Copyright.png'

function DraggableWindow({ label, zIndex, defaultPosition, onFocus, children }) {
    
    const nodeRef = useRef(null);
    
    return (
        <Draggable nodeRef={nodeRef} handle=".title-bar" defaultPosition={defaultPosition}
        onStop={(e, data) => {
            const node = nodeRef.current;
            if (!node) return;
            
            const bounds = node.getBoundingClientRect();
            const vw = window.innerWidth;
            const vh = window.innerHeight;

            const minX = -bounds.width / 2;
            const maxX = vw - bounds.width / 2;
            const minY = -bounds.height / 2;
            const maxY = vh - bounds.height / 2;

            const boundX = Math.min(Math.max(data.x, minX), maxX);
            const boundY = Math.min(Math.max(data.y, minY), maxY);

            data.node.style.transform = `translate(${boundX}px, ${boundY}px)`;
        }}>
            <div ref={nodeRef} className='absolute' style={{ zIndex }} onMouseDown={() => onFocus(label)}>{children}</div>
        </Draggable>
    )
}


function App() {

    const bringToFront = (label) => {
        setZTop((prev) => {
            const next = prev + 1;
            setZOrder((prevZ) => ({...prevZ, [label]: next }));
            return next;
        })
    }

    // List of open windows by labels
    const [openWindows, setOpenWindows] = useState([])
    const [zOrder, setZOrder] = useState({})
    const [zTop, setZTop] = useState(20)

    const openWindow = (label) => {
        setOpenWindows((prev) => {
            return (prev.includes(label) ? prev : [...prev, label])
        })
        bringToFront(label)
    }

    const closeWindow = (label) => {
        setOpenWindows((prev) => {
            return prev.filter((item) => {
                return item !== label
            })
        })
    }

    const windowConfig = {
        About: { Component: About, defaultPosition: { x: 120, y: 80}},
        Links: { Component: Links, defaultPosition: { x: 140, y: 100}},
        Work: { Component: Work, defaultPosition: { x: 160, y: 120}},
        More: { Component: More, defaultPosition: { x: 180, y: 140}},
        Contact: { Component: Contact, defaultPosition: { x: 200, y: 160}},
    }

    const { theme, setTheme } = useContext(ThemeContext);

    // TIMER FOR THE TASKBAR CLOCK 
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    function formatTime() {
        // Get hours and minutes
        let hours = time.getHours();
        let minutes = time.getMinutes();
        // Determine AM or PM
        let meridiem = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12 || 12;
        // Zero added if number has only one digit
        const padZero = (num) => num < 10 ? `0${num}` : num;

        return `${padZero(hours)}:${padZero(minutes)} ${meridiem}`;
    } // END OF TIMER

    const desktopItems = [
        { label: 'About', icon: aboutIcon },
        { label: 'Links', icon: linksIcon },
        { label: 'Work', icon: workIcon },
        { label: 'More', icon: moreIcon },
        { label: 'Contact', icon: contactIcon },
    ];

    const taskTabs = [
        { label: 'Dark Mode', icon: modeIcon },
        { label: 'Music', icon: musicIcon },
    ];

    return (
        <>
        <CloudAnimation />
            <div className="w-screen h-screen flex flex-col overflow-hidden font-['W95font'] select-none relative z-50">
                {/*All the componets are here*/}
                <div>
                {openWindows.map((label) => {
                    const {Component, defaultPosition} = windowConfig[label]
                    return (
                        <DraggableWindow key={label} label={label} defaultPosition={defaultPosition} zIndex={zOrder[label] || 0} onFocus={() => bringToFront(label)}>         
                            <Component onClose={() => closeWindow(label)}/>
                            </DraggableWindow>
                        )
                        })}
                </div>
                <main className="flex-auto flex p-20 sm:p-8 relative">
                    <WindowFrame title="Welcome" iconSrc={folderIcon} showExit={false} 
                    footer={
                    <div className="h-5 mt-1 bg-[#c0c0c0] dark:bg-[#333333] dark:shadow-[inset_1px_1px_1px_1px_#000000] 
                        shadow-[inset_1px_1px_1px_1px_#7F7F7F] flex items-center px-1">
                        <span className="text-black dark:text-white text-[10px] leading-none">5 object(s)</span>
                    </div>
                    }
                    windowClassName="sm:max-w-3xl sm:min-h-150 min-h-125">

                            <div className="m-auto flex flex-col items-center justify-center gap-10 p-4 w-full">

                                <div className="flex flex-col items-center text-center gap-4 px-2">
                                    <h1 className="text-black text-4xl sm:text-6xl leading-tight 
                                    dark:text-white">Hi <span className="font-bold">I am Abraham</span></h1>
                                    <h2 className="text-black text-xl sm:text-2xl leading-tight dark:text-white">CS student and developer</h2>
                                </div>

                                {/* Icon grid */}
                                    <div className="grid grid-cols-3 gap-y-8 gap-x-4 sm:flex sm:flex-wrap sm:justify-center
                                    sm:gap-x-10 w-full max-w-sm sm:max-w-none transition-all duration-300">
                                        {desktopItems.map((item, index) => (
                                            <button key={item.label} className={`flex flex-col items-center gap-2 w-full sm:w-20 
                                            cursor-pointer p-1 hover:scale-110 transition-transform duration-300 
                                            ${index === 3 ? 'col-start-1 col-end-2 ml-[50%] sm:ml-0' : ''} 
                                            ${index === 4 ? 'col-start-2 col-end-3 ml-[50%] sm:ml-0' : ''}`}
                                            onClick={() => openWindow(item.label)}>
                                                
                                                {/* Images components */}
                                                <img className="w-16 h-16 shrink-0 [image-rendering:pixelated] transition-all duration-300 object-contain" draggable="false"
                                                src={item.icon} alt={item.label}/>
                                                <span className="text-black text-[16px] dark:text-white
                                                text-center leading-tight transition-all duration-300 font-bold">{item.label}</span>
                                            </button>
                                        ))}
                                </div>
                            </div>               
                    </WindowFrame>
                </main>

                {/* Taskbar bottom of the screen */}
                <footer className="w-full h-7 bg-[#c0c0c0] flex justify-between items-stretch p-0.5 gap-2 border-t-1.5 z-50 relative
                border-white shadow-[inset_0px_1px_0px_0px_#C0C0C0] dark:bg-[#333333] dark:shadow-[inset_0px_0px_1px_0px_#FFFFFF] ">
                    <div className="flex items-center gap-1 overflow-x-hidden no-scrollbar h-full ">
                        <div className="px-1.5 py-0 h-full bg-[#c0c0c0] dark:bg-[#333333]
                        shadow-[inset_0px_0px_1px_1px_#7F7F7F] dark:shadow-[inset_0px_0px_1px_1px_#000000]
                         flex items-center gap-1 shrink-0">
                             {/* Fixed missing Start Icon */}
                            <img className="w-4 h-4 [image-rendering:pixelated]" src={Copyright} alt="start" />
                            <span className="text-black dark:text-white text-[9px] sm:text-[11px] leading-2.5 text-left
                            ">Abraham Mormontoy</span>
                        </div>


                        {taskTabs.map((tab) => (
                            <button key={tab.label} onClick={() => {
                                if (tab.label === "Dark Mode") {
                                    setTheme(theme === "light" ? "dark" : "light");
                                }    
                            }} 
                            className="px-2 pr-20 py-0 h-full bg-[#C0C0C0] dark:bg-[#333333]
                            shadow-[inset_-2px_-2px_0px_0px_#7F7F7F] dark:shadow-[inset_-2px_-2px_0px_0px_#000000]
                            flex items-center gap-1 shrink-0 cursor-pointer hover:scale-102 transition-transform duration-200">
                                {/*Taskbar icons*/}
                                <img className="w-4 h-4 [image-rendering:pixelated]" draggable="false" src={tab.icon} alt={tab.label} />
                                <span className="text-black dark:text-white text-[11px] leading-none">{tab.label === "modeIcon" ? `${theme === 'dark' ? 'Light' : 'Dark'} modeIcon` : tab.label}</span>
                            </button>
                        ))}
                    </div>  
                    <div className="px-2 h-full bg-[#c0c0c0] shadow-[inset_1px_1px_0px_0px_#7F7F7F] 
                    dark:bg-[#333333] dark:shadow-[inset_1px_1px_0px_0px_#000000] flex items-center shrink-0">
                        <span className="text-black dark:text-white text-[10px] sm:text-[11px] leading-none mt-px">{formatTime()}</span>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default App;