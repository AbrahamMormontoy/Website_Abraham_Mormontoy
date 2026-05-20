import { TitleBar, WindowFrame } from '../components/SharedUI.jsx'

import { ThemeContext } from '../components/clouds/ThemeContext.jsx'
import { useState, useEffect ,useContext } from 'react'
import linksIcon from '../assets/assets95/linksIcon.png'
import GithubDark from '../assets/assets95/GithubDarkmode.png'
import Github from '../assets/assets95/Github.png'
import LinkedIn from '../assets/assets95/LinkedIn.png'
import Cv from '../assets/assets95/Cv.png'


function links( { onClose } ) {
    const { theme }  = useContext(ThemeContext);
    const darkMode = theme === 'dark';

    const linksItems = [
        { label: 'GitHub', icon: Github, url:"https://github.com/AbrahamMormontoy" },
        { label: 'LinkedIn', icon: LinkedIn, url:"https://www.linkedin.com/in/abraham-mormontoy-194665314/" },
        { label: 'Cv', icon: Cv, url:"/resumeAbrahamMormontoy.pdf" },
    ]


    return (
        <>
            <div className="font-['W95font'] select-none relative z-50">
                    <WindowFrame title="Links" iconSrc={linksIcon}  
                    footer={<div className="h-5 mt-1 bg-[#c0c0c0] dark:bg-[#333333] dark:shadow-[inset_1px_1px_1px_1px_#000000] shadow-[inset_1px_1px_1px_1px_#7F7F7F] flex items-center px-1">
                                <span className="text-black dark:text-white text-[10px] leading-none">3 object(s)</span>
                            </div>}
                    windowClassName="sm:w-120 min-w-90 sm:h-55 h-55" onClose={onClose}>
                            
                            {/* Links sections */}
                            <div className="flex-auto p-5 flex items-center justify-center flex-wrap gap-x-16 gap-y-6 transition-all duration-300">
                                {linksItems.map((item, index) => {
                                    const IconItem = (item.label === 'GitHub') ? (darkMode ? GithubDark : Github) : item.icon;
                                    return (
                                        <a key={index} className="flex flex-col sm:justify-center items-center gap-2 p-1 hover:scale-110 transition-transform 
                                        duration-300 cursor-pointer w-20 h-25"
                                        href={item.url} target="_blank" rel="noopener noreferrer">
                                            <img src={IconItem} alt={item.label} className="w-14 h-14 [image-rendering:pixelated]"/>
                                            <span className="text-black text-[16px] font-bold dark:text-white transition-all duration-300">{item.label}</span>
                                        </a>
                                    )
                                })}
                            </div>                        
                    </WindowFrame>
                
            </div>
        </>
    )
}

export default links;