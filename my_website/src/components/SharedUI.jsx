import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';

import { useAudio } from '../sound/AudioContext.jsx';

import { Exit, Github, GithubDark } from '../images/assets.jsx'

export function Button ({ children, onClick, soundType, href, className="", disableScale }) {
    // Get the playSound function
    const { playSound } = useAudio()

    const handleClick = (event) => {
        if (soundType && playSound) {
            playSound(soundType)
        }
        if (onClick) {
            onClick(event)
        }
    }

    if (href) {
        return (
            <button className={`active:scale-105`} >
            <a href={href} target="_blank" rel="noopener noreferrer" onClick={handleClick} className={className} >
                {children}
            </a>
            </button>
        )
    }

    if (disableScale) {
        return (
            <button type="button" className={`${className} `} onClick={handleClick}>
                {children}
            </button>
        )
    }

    return (
        <button type="button" onClick={handleClick} className={`transition-all duration-300 active:scale-105 ${className} `} >
            {children}
        </button>
    )
}

export function TitleBar({ title, iconSrc, showExit = true, onClose }) {
  return (
        <div className="title-bar flex justify-between bg-[#000080] dark:bg-[#121212] shadow-[inset_1px_1px_1px_1px_#000000] h-6 sm:h-8">
            <div className="flex items-center gap-1 p-1">
                <img className="sm:w-6 sm:h-6 w-4 h-4 [image-rendering:pixelated]" src={iconSrc} alt={`${title} icon`} draggable={false}/>
                <div className="text-white text-[0.875rem] sm:text-[1rem] leading-none tracking-tight font-bold">{title}</div>
            </div>
            {showExit && (
                <div className="flex items-center justify-end p-1">
                    <Button soundType="close" onClick={onClose} className="p-1 hover:scale-110 transition-transform duration-300 cursor-pointer flex items-center gap-0.5 bg-transparent">
                        <img className="sm:w-6 sm:h-6 w-4 h-4 [image-rendering:pixelated]" src={Exit} alt="exit" draggable={false}/>
                    </Button>
                </div>
            )}
        </div>
    );
}

export function WindowFrame({ title, iconSrc, showExit, children, footer ,windowClassName="" , frameclassName="", onClose }) {
    return (
        <div className={`m-auto p-1 bg-[#c0c0c0] dark:bg-[#333333] shadow-[inset_-1.5px_-1.5px_0px_0px_#000000] flex flex-col ${windowClassName}`}>
            <TitleBar title={title} iconSrc={iconSrc} showExit={showExit} onClose={onClose} />
            <div className={`flex-auto bg-white flex flex-col mt-1 dark:bg-[#333333] shadow-[inset_1px_1px_1px_1px_#000000] overflow-y-auto custom-scrollbar ${frameclassName}`}>
            {children}
            </div>
            {footer}
        </div>
    );
}

export function InputText({ label, type="text", name, required, maxLength, onChange, className }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-black dark:text-white text-[1rem]">{label}</label>
            <input type={type} name={name} required={required} maxLength={maxLength} onChange={onChange} className={`w-full bg-white dark:bg-[#111] text-black dark:text-white p-1 focus:outline-none
            shadow-[inset_1.5px_1.5px_0px_0px_#000000,inset_-1px_-1px_0px_0px_#000000]
            dark:shadow-[inset_1.5px_1.5px_0px_0px_#000000,inset_-1px_-1px_0px_0px_#555555] ${className}`}/>
        </div>
    )
}

export function SkillsSections({children}) {
    // Took away the sound from the skill section because it was too much noise
    //const { playSound } = useSound() || {}
    
    return (
        <div /*onMouseEnter={() => playSound?.('skills')}*/ className="bg-[#c0c0c0] px-4 py-1 text-black text-[0.8rem]  sm:text-[1rem] shadow-[inset_-1.5px_-1.5px_0px_0px_#000000,inset_1.5px_1.5px_0px_0px_#ffffff] 
         transition-all duration-300 hover:scale-105 cursor-default dark:bg-[#333333] dark:text-white dark:shadow-[inset_-1.5px_-1.5px_0px_0px_#000000,inset_1.5px_1.5px_0px_0px_#ffffff]">
            {children}
        </div>
    )
}

export function ProjectCard( { title, date, description, tools, imageSrc, imageAlt, githubUrl, onImageClick, darkMode }) {
    const [isPulsing, setIsPulsing] = useState(false)
    const pulseTimeoutRef = useRef(null)

    useEffect(() => {
        return () => {
            if (pulseTimeoutRef.current) {
                window.clearTimeout(pulseTimeoutRef.current)
            }
        }
    }, [])

    const handleCardClick = () => {
        setIsPulsing(true)

        if (pulseTimeoutRef.current) {
            window.clearTimeout(pulseTimeoutRef.current)
        }

        pulseTimeoutRef.current = window.setTimeout(() => {
            setIsPulsing(false)
        }, 180)
    }

    return (
        <div className="mb-4 bg-[#f7f7f7] dark:bg-[#222222] p-5 hover:scale-101 cursor-pointer" onClick={handleCardClick}>
            <div className="flex flex-col sm:flex-row items-center gap-4 ">
            {imageSrc && ( <img src={imageSrc} alt={imageAlt} className={`shrink-0 w-full sm:w-auto sm:max-w-[20rem] h-auto cursor-zoom-in hover:scale-103 
            transition-transform duration-300 ${isPulsing ? 'scale-102' : ''}`} onClick={onImageClick} />)}
                <div className="flex flex-col gap-2 flex-auto">
                    <div className="font-bold text-[1rem] sm:text-[1.25rem] leading-tight dark:text-white">{title}</div>
                    <div className="text-[0.8rem] sm:text-[0.95rem] dark:text-white">{date}</div>
                    <div className="text-[0.875rem] sm:text-[1rem] leading-[1.4] dark:text-white text-justify">{description}</div>
                    <div className="flex items-center justify-between gap-3">
                        <div className="text-[0.8rem] sm:text-[0.95rem] italic dark:text-white">Tools: {tools}</div>
                        {githubUrl && (<a href={githubUrl} target="_blank" rel="noopener noreferrer" className={`flex shrink-0 cursor-pointer items-center 
                        hover:scale-105 transition-transform duration-300 ${isPulsing ? 'scale-110' : ''}`}>
                        {darkMode ? <img src={GithubDark} alt="github" className="w-6 h-6" /> : <img src={Github} alt="github" className="w-6 h-6" />}
                        </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Wraps all tab components and handles the dragging logic. Also handles if screen is in mobile by tabs static at the center
export function DraggableWindow({ label, zIndex, defaultPosition, onFocus, isMobile, children }) {
    
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

