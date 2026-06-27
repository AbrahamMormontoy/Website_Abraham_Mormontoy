import { WindowFrame, Button } from './components/SharedUI';
import { useState, useEffect, useContext, useRef } from 'react';
import { ThemeProvider, ThemeContext } from './components/clouds/ThemeContext';
import CloudAnimation from './components/clouds/CloudAnimation';
import Draggable from 'react-draggable';
import { TypeAnimation } from 'react-type-animation';

import About from './tabs/About.jsx';
import Links from './tabs/Links.jsx';
import Work from './tabs/Work.jsx';
import More from './tabs/More.jsx';
import Contact from './tabs/Contact.jsx';
import Wordafall from './game/Wordafall.jsx';
import AmbientVideo from './video/AmbientVideo.jsx';

import { useAudio } from './sound/AudioContext.jsx';

/*import aboutIcon from './assets/assets95/aboutIcon.png'
import linksIcon from './assets/assets95/linksIcon.png'
import moreIcon from './assets/assets95/moreIcon.png'
import folderIcon from './assets/assets95/folderIcon.png'
import musicIcon from './assets/assets95/musicIcon.png'
import contactIcon from './assets/assets95/contactIcon.png'
import workIcon from './assets/assets95/workIcon.png'
import modeIcon from './assets/assets95/modeIcon.png'
import Copyright from './assets/assets95/Copyright.png'
import darkModeIcon from './assets/assets95/DarkMode.png'
import lightModeIcon from './assets/assets95/LightMode.png'
import muteLight from './assets/assets95/muteLight.png'
import muteDark from './assets/assets95/muteDark.png'
import unmuteLight from './assets/assets95/unmuteLight.png'
import unmuteDark from './assets/assets95/unmuteDark.png'8 */

/*const ASSET_BASE = 'https://assets.abrahammormontoy.com/assets';

const aboutIcon = `${ASSET_BASE}/assets95/aboutIcon.png`;
const linksIcon = `${ASSET_BASE}/assets95/linksIcon.png`;
const moreIcon = `${ASSET_BASE}/assets95/moreIcon.png`;
const folderIcon = `${ASSET_BASE}/assets95/folderIcon.png`;
const musicIcon = `${ASSET_BASE}/assets95/musicIcon.png`;
const contactIcon = `${ASSET_BASE}/assets95/contactIcon.png`;
const workIcon = `${ASSET_BASE}/assets95/workIcon.png`;
const modeIcon = `${ASSET_BASE}/assets95/modeIcon.png`;
const CopyrightLight = `${ASSET_BASE}/assets95/CopyrightLightMode.png`;
const CopyrightDark = `${ASSET_BASE}/assets95/CopyrightDarkMode.png`;
const darkModeIcon = `${ASSET_BASE}/assets95/DarkMode.png`;
const lightModeIcon = `${ASSET_BASE}/assets95/LightMode1.png`;
const muteLight = `${ASSET_BASE}/assets95/muteLight.png`;
const muteDark = `${ASSET_BASE}/assets95/muteDark.png`;
const unmuteLight = `${ASSET_BASE}/assets95/unmuteLight.png`;
const unmuteDark = `${ASSET_BASE}/assets95/unmuteDark.png`;
const wordafallIcon = `${ASSET_BASE}/assets95/Wordafall.png`;*/

import { 
    aboutIcon, linksIcon, moreIcon, folderIcon, musicIcon, 
    contactIcon, workIcon, modeIcon, CopyrightLight, CopyrightDark, 
    darkModeIcon, lightModeIcon, muteLight, muteDark, unmuteLight, 
    unmuteDark, wordafallIcon 
} from './images/assets.jsx'; // Adjust path if needed

import { ImagePreloader } from './images/ImageManager.jsx';

// Wraps all tab components and handles the dragging logic. Also handles if screen is in mobile by tabs static at the center
function DraggableWindow({ label, zIndex, defaultPosition, onFocus, isMobile, children }) {
    
    // Tracking of the tab position
    const nodeRef = useRef(null);
    const [dragBounds, setDragBounds] = useState({})

    // Handle the start of the dragging to generate the focus on the current label and set the drag bounds based in the size of the screen
    const handleStart = () => {
        onFocus(label);
        
        const node = nodeRef.current;
        if (!node) return;

        const vw = window.innerWidth;
        const vh = window.innerHeight;

        setDragBounds({
            left: -node.offsetWidth / 2,
            right: vw - node.offsetWidth / 2,
            top: 0,
            bottom: vh - node.offsetHeight / 2,
        })
    }
    
    // Mobile portability
    if (isMobile) {
        return (
            <div className='fixed inset-0 flex items-center justify-center pointer-events-none pb-7' style={{ zIndex}}>
                <div className='pointer-events-auto' onMouseDownCapture={() => onFocus(label)}>
                    {children}
                </div>
            </div>
        )
    }

    // desktop portability with dragging, the handle is .title bar which means that the classes that have the tittle bar in className tailwind can be dragged around
    // Node ref is tracking, default position gives the initial position of each tab, bounds makes sure that tabs can only be dragged half of the screen, onStart handles the 
    // focus, on MouseDown capture is to make sure that the moment the user clicks a tab it becomes the focus with the highest zIndex. 
    return (
        <Draggable nodeRef={nodeRef} handle=".title-bar" defaultPosition={defaultPosition} bounds={dragBounds} onStart={handleStart}>
            <div ref={nodeRef} className='absolute' style={{ zIndex }} onMouseDownCapture={() => onFocus(label)}>{children}</div>
        </Draggable>
    )
}


function App() {
    
    const [activeImage, setActiveImage] = useState(null);

    const imageViewer = function (img, onClose) {
        if (!img) return null;
        return (
            <div className="fixed inset-0 bg-black/70 p-4 sm:p-8 flex items-center justify-center cursor-zoom-out z-9999" onClick={onClose}>
                <img src={img} alt="Enlarged view" className="max-w-[95vw] max-h-[90vh] w-auto h-auto object-contain"/>
            </div>
        );
    }  

    const { isMuted, toggleMute, toggleAmbientSound } = useAudio()  

    const [isMobile, setIsMobile] = useState(window.innerWidth < 766);

    // Checks constantly if the screen is in mobile size to inform the DraggableWindow component
    useEffect(() => {
        const handleResize = () => {
            return setIsMobile(window.innerWidth < 766)
        }
        // Allows to go back and forth between mobile and desktop size keeping the features of each one
        // This is done by cleaning the even listeners
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    // List of open windows by labels
    const [openWindows, setOpenWindows] = useState([]) 
    // Tracks z-index of each window in order
    const [zOrder, setZOrder] = useState({})
    // Current highest z-index
    const [zTop, setZTop] = useState(20)

    // Increases the z-index of the window so that it is in front of the others
    const bringToFront = (label) => {
        const next = zTop + 1;
        setZTop(next)
        setZOrder((prevZ) => ({...prevZ, [label]: next }));
    }

    // Add new tab to the list in openWindow if its already there
    const openWindow = (label) => {
        setOpenWindows((prev) => {
            return (prev.includes(label) ? prev : [...prev, label])
        })
        bringToFront(label)
    }

    // Removes the tab from the list and the screen
    const closeWindow = (label) => {
        setOpenWindows((prev) => {
            return prev.filter((item) => {
                return item !== label
            })
        })
    }

    const getPosition = (index) => {

        // Get the size of the screen
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const startX = vw * 0.1;
        const startY = vh * 0.1;

        const spacingX = 120;
        const spacingY = 100;

        return {
            x: startX + index * spacingX,
            y: startY + index * spacingY
        }
    }

    const windowConfig = {
        About: { Component: About, defaultPosition: getPosition(0)},
        Links: { Component: Links, defaultPosition: getPosition(1)},
        Work: { Component: Work, defaultPosition: getPosition(2)},
        More: { Component: More, defaultPosition: getPosition(3)},
        Contact: { Component: Contact, defaultPosition: getPosition(4)},
        Wordafall: { Component: Wordafall, defaultPosition: getPosition(5)},    
        Music: { Component: AmbientVideo, defaultPosition: getPosition(6)},
    }

    // Check if the theme is dark or light to change the icons in the links tab
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
        { label: 'Dark Mode', icon: modeIcon, soundType: 'open' },
        { label: 'Music', icon: musicIcon, soundType: 'open' },
        { label: 'Wordafall', icon: wordafallIcon, soundType: 'open' },
    ].filter(isMobile ? (tab) => tab.label !== 'Wordafall' : () => true); // Filter out Wordafall on mobile

    return (
        <>
        <ImagePreloader />
        <CloudAnimation />
            <div className="w-screen h-dvh flex flex-col overflow-hidden font-['W95font'] select-none relative z-50">
                {/* Image Viewer */}
                {imageViewer(activeImage, () => setActiveImage(null))}

                {/*All the components are here*/}
                <div>
                {openWindows.map((label) => {
                    const {Component, defaultPosition} = windowConfig[label]
                    return (
                        <DraggableWindow key={label} label={label} defaultPosition={defaultPosition} zIndex={zOrder[label] || 0} onFocus={bringToFront} isMobile={isMobile}>             
                        {label === 'Work' ? ( <Component onClose={() => closeWindow(label)} onImageOpen={setActiveImage} />) : 
                        ( <Component onClose={() => closeWindow(label)} />)}
                            </DraggableWindow>
                        )
                        })}
                </div>
                <main className="flex-auto flex p-4 sm:p-8 relative items-center justify-center">
                    
                    <WindowFrame title="Welcome" iconSrc={folderIcon} showExit={false} 
                    footer={
                    <div className="h-5 mt-1 bg-[#c0c0c0] dark:bg-[#333333] dark:shadow-[inset_1px_1px_1px_1px_#000000] 
                        shadow-[inset_1px_1px_1px_1px_#7F7F7F] flex items-center px-1">
                        <span className="text-black dark:text-white text-[10px] leading-none">5 object(s)</span>
                    </div> } 
                    windowClassName="w-[28rem] sm:w-[45rem] sm:h-[35rem] h-[25rem] overflow-y-auto overflow-x-hidden custom-scrollbar">

                            <div className="m-auto flex flex-col items-center justify-center gap-6 sm:gap-10 p-4 w-full">

                                <div className="flex flex-col items-center text-center gap-2 sm:gap-4 px-2">                           
                                    <div className="text-black text-3xl sm:text-6xl leading-tight 
                                    dark:text-white">Hi! <span className="font-bold">I'm Abraham</span></div>
                                    
                                    <div className="text-black text-[1rem] sm:text-[1.5rem] leading-tight dark:text-white h-8 sm:h-[1.7rem]">
                                        <TypeAnimation
                                            sequence={[
                                                'Computer Science Student at Simon Fraser University',
                                                2000, 
                                                'Frontend and Software Developer',
                                                2000,
                                            ]}
                                            wrapper="span"
                                            speed={50}
                                            repeat={Infinity}
                                        />
                                    </div>
                                </div>

                                {/* THE ICON GRID */}
                                <div className="grid grid-cols-3 gap-y-4 gap-x-4 sm:flex sm:flex-wrap sm:justify-center
                                sm:gap-x-10 w-full max-w-sm sm:max-w-none transition-all duration-300">
                                    {desktopItems.map((item, index) => (
                                        <Button soundType="open" key={item.label} className={`flex flex-col items-center gap-1 sm:gap-2 w-full sm:w-20 
                                        cursor-pointer p-1 hover:scale-110 transition-transform duration-300 
                                        ${index === 3 ? 'col-start-1 col-end-2 ml-[50%] sm:ml-0' : ''} 
                                        ${index === 4 ? 'col-start-2 col-end-3 ml-[50%] sm:ml-0' : ''}`}
                                        onClick={() => openWindow(item.label)}>
                                            
                                            <img className="w-10 h-10 sm:w-16 sm:h-16 [image-rendering:pixelated] transition-all duration-300 object-contain" draggable="false"
                                            src={item.label === "Dark Mode" ? (theme === 'dark' ? lightModeIcon : darkModeIcon ) : item.icon} alt={item.label}/>
                                            
                                            <span className="text-black text-[12px] sm:text-[16px] dark:text-white
                                            text-center leading-tight transition-all duration-300 font-bold">
                                                {item.label === "Dark Mode" ? (theme === 'dark' ? 'Light Mode' : 'Dark Mode') : item.label}
                                            </span>
                                            
                                        </Button>
                                    ))}
                                </div>
                            </div>               
                    </WindowFrame>
                </main>

                {/* Taskbar bottom of the screen */}
                <footer className="w-full h-7 bg-[#c0c0c0] flex justify-between items-stretch p-0.5 gap-2 border-t-1.5 z-100 relative
                border-white shadow-[inset_0px_1px_0px_0px_#C0C0C0] dark:bg-[#333333] dark:shadow-[inset_0px_0px_1px_0px_#FFFFFF] ">
                    <div className="flex items-center gap-1 h-full">
                        <div className="px-1.5 py-0 h-full bg-[#c0c0c0] dark:bg-[#333333]
                        shadow-[inset_0px_0px_1px_1px_#7F7F7F] dark:shadow-[inset_0px_0px_1px_1px_#000000]
                         flex items-center gap-1 shrink-0">
                            <img className="w-4 h-4 [image-rendering:pixelated] transition-transform duration-300" src={theme === 'dark' ? CopyrightDark : CopyrightLight} alt="start" />
                            <span className="text-black dark:text-white text-[9px] sm:text-[11px] leading-2.5 text-left transition-transform duration-300">
                                2026 Abraham Mormontoy</span>
                        </div>


                        {taskTabs.map((tab) => (
                            <Button soundType={tab.soundType} key={tab.label} onClick={() => {
                                if (tab.label === "Dark Mode") {
                                    setTheme(theme === "light" ? "dark" : "light");
                                } else if (tab.label === "Music") {
                                    if (!isMobile) { 
                                        openWindow(tab.label);
                                    } else {
                                        toggleAmbientSound();
                                    }
                                    
                                } else if (tab.label === "Wordafall") {
                                    openWindow(tab.label);
                                }
                            }} 
                            className="px-2 sm:pr-20 pr-2 py-0 h-full bg-[#C0C0C0] dark:bg-[#333333]
                            shadow-[inset_-2px_-2px_0px_0px_#7F7F7F] dark:shadow-[inset_-2px_-2px_0px_0px_#000000]
                            flex items-center gap-1 shrink-0 cursor-pointer hover:scale-102 transition-transform duration-300">
                                
                                {/*Taskbar icons*/}
                                <img className="w-4 h-4 [image-rendering:pixelated]" draggable="false" src={tab.label === "Dark Mode" ? (theme === 'dark' ? lightModeIcon : darkModeIcon ) : tab.icon} alt={tab.label} />
                                <span className="text-black dark:text-white text-[9px] sm:text-[11px] leading-none">{tab.label === "Dark Mode" ? (theme === 'dark' ? 'Light Mode' : 'Dark Mode') : tab.label}</span>
                                
                            </Button>
                        ))}
                    </div> 
                    
                    <div className='flex item-center h-full'>
                        <Button soundType="open" onClick={toggleMute} className="p-2 py-0 h-full bg-[#C0C0C0] dark:bg-[#333333]
                            shadow-[inset_-2px_-2px_0px_0px_#7F7F7F] dark:shadow-[inset_-2px_-2px_0px_0px_#000000]
                            flex items-center gap-1 shrink-0 cursor-pointer hover:scale-102 transition-transform duration-300">
                            <img className="w-4 h-4 [image-rendering:pixelated]" draggable="false" src={theme === 'dark'? (isMuted ? unmuteDark : unmuteLight) : (isMuted ? muteDark : muteLight)} alt="music" />
                        </Button> 
                        <div className="px-2 h-full bg-[#c0c0c0] shadow-[inset_1px_1px_0px_0px_#7F7F7F] 
                        dark:bg-[#333333] dark:shadow-[inset_1px_1px_0px_0px_#000000] flex items-center shrink-0">
                            <span className="text-black dark:text-white text-[9px] sm:text-[11px] leading-none mt-px">{formatTime()}</span>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default App;
