import React from 'react';
import Exit from '../assets/assets95/Exit.png'
import Github from '../assets/assets95/Github.png'
import GithubDark from '../assets/assets95/GithubDarkmode.png'

export function TitleBar({ title, iconSrc, showExit = true, onClose }) {
  return (
        <div className="title-bar flex justify-between bg-[#000080] dark:bg-[#121212] shadow-[inset_1px_1px_1px_1px_#000000] h-8">
            <div className="flex items-center gap-1 p-1">
                <img className="w-6 h-6 [image-rendering:pixelated]" src={iconSrc} alt={`${title} icon`} draggable={false}/>
                <div className="text-white text-[1rem] leading-none tracking-tight font-bold">{title}</div>
            </div>
            {showExit && (
                <div className="flex items-center justify-end p-1">
                    <button className="p-1 hover:scale-110 transition-transform duration-300 cursor-pointer flex items-center gap-0.5" onClick={onClose}>
                        <img className="w-6 h-6 [image-rendering:pixelated]" src={Exit} alt="exit" draggable={false}/>
                    </button>
                </div>
            )}
        </div>
    );
}

export function WindowFrame({ title, iconSrc, showExit, children, footer ,windowClassName="" , frameclassName="", onClose }) {
    return (
        <div className={`m-auto w-full p-1 bg-[#c0c0c0] dark:bg-[#333333] shadow-[inset_-1.5px_-1.5px_0px_0px_#000000] flex flex-col ${windowClassName}`}>
            <TitleBar title={title} iconSrc={iconSrc} showExit={showExit} onClose={onClose} />
            <div className={`flex-auto bg-white flex flex-col mt-1 dark:bg-[#333333] shadow-[inset_1px_1px_1px_1px_#000000] overflow-y-auto custom-scrollbar ${frameclassName}`}>
            {children}
            </div>
            {footer}
        </div>
    );
}

export function InputText( { label, type="text" } ) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-black dark:text-white text-[1rem]">{label}</label>
            <input type={type} className="w-full bg-white dark:bg-[#111] text-black dark:text-white p-1 focus:outline-none
            shadow-[inset_1.5px_1.5px_0px_0px_#000000,inset_-1px_-1px_0px_0px_#ffffff]
            dark:shadow-[inset_1.5px_1.5px_0px_0px_#000000,inset_-1px_-1px_0px_0px_#555555]"/>
        </div>
    )
}

export const SkillsSections = function ({children}) {
    return (
        <div className="bg-[#c0c0c0] px-4 py-1 text-black text-[0.8rem]  sm:text-[1rem] 
         shadow-[inset_-1.5px_-1.5px_0px_0px_#000000,inset_1.5px_1.5px_0px_0px_#ffffff] 
         transition-all duration-300 hover:scale-105 cursor-default dark:bg-[#333333] dark:text-white dark:shadow-[inset_-1.5px_-1.5px_0px_0px_#000000,inset_1.5px_1.5px_0px_0px_#ffffff]">
            {children}
        </div>
    )
}

export const ProjectCard = function ( { title, date, description, tools, imageSrc, imageAlt, githubUrl, onImageClick, darkMode }) {
    
    return (
        <div className="mb-4 bg-[#f7f7f7] dark:bg-[#222222] p-5">
            <div className="flex flex-col sm:flex-row items-center gap-4 ">
            {imageSrc && ( <img src={imageSrc} alt={imageAlt} className="shrink-0 w-full sm:w-auto sm:max-w-[20rem] h-auto cursor-pointer hover:scale-105 
            transition-transform duration-300" onClick={onImageClick} />)}
                <div className="flex flex-col gap-2 flex-auto">
                    <div className="font-bold text-[1rem] sm:text-[1.25rem] leading-tight dark:text-white">{title}</div>
                    <div className="text-[0.8rem] sm:text-[0.95rem] dark:text-white">{date}</div>
                    <div className="text-[0.875rem] sm:text-[1rem] leading-[1.4] dark:text-white text-justify">{description}</div>
                    <div className="flex items-center justify-between gap-3">
                        <div className="text-[0.8rem] sm:text-[0.95rem] italic dark:text-white">Tools: {tools}</div>
                        {githubUrl && (<a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex shrink-0 cursor-pointer items-center 
                        hover:scale-105 transition-transform duration-300">
                        {darkMode ? <img src={GithubDark} alt="github" className="w-6 h-6" /> : <img src={Github} alt="github" className="w-6 h-6" />}
                        </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}


