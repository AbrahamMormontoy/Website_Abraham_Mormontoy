import { TitleBar, WindowFrame } from '../components/SharedUI.jsx'
import { ThemeContext } from '../components/clouds/ThemeContext.jsx'
import { useState, useEffect ,useContext } from 'react'

/*import linksIcon from '../assets/assets95/linksIcon.png'
import GithubDark from '../assets/assets95/GithubDarkmode.png'
import Github from '../assets/assets95/Github.png'
import LinkedIn from '../assets/assets95/LinkedIn.png'
import Cv from '../assets/assets95/Cv.png'

import resume from '../assets/resumeAbrahamMormontoy.pdf'*/

const ASSET_BASE = 'https://assets.abrahammormontoy.com/assets';

const linksIcon = `${ASSET_BASE}/assets95/linksIcon.png`;
const GithubDark = `${ASSET_BASE}/assets95/GithubDarkmode.png`;
const Github = `${ASSET_BASE}/assets95/Github.png`;
const LinkedIn = `${ASSET_BASE}/assets95/LinkedIn.png`;
const Cv = `${ASSET_BASE}/assets95/Cv.png`;
const resume = `${ASSET_BASE}/resumeAbrahamMormontoy.pdf`;

import { Button } from '../components/SharedUI.jsx'

function links( { onClose } ) {
    const { theme }  = useContext(ThemeContext);
    const darkMode = theme === 'dark';

    const linksItems = [
        { label: 'GitHub', icon: Github, url:"https://github.com/AbrahamMormontoy" },
        { label: 'LinkedIn', icon: LinkedIn, url:"https://www.linkedin.com/in/abraham-mormontoy-194665314/" },
        { label: 'Cv', icon: Cv, url: resume },
    ]


    return (
        <>
            <div className="font-['W95font'] select-none relative z-50">
                    <WindowFrame title="Links" iconSrc={linksIcon}  
                    footer={<div className="h-5 mt-1 bg-[#c0c0c0] dark:bg-[#333333] dark:shadow-[inset_1px_1px_1px_1px_#000000] shadow-[inset_1px_1px_1px_1px_#7F7F7F] flex items-center px-1">
                                <span className="text-black dark:text-white text-[10px] leading-none">3 object(s)</span>
                            </div>}
                    windowClassName="w-[92vw] max-w-[24rem] sm:max-w-none sm:w-[30rem] h-[15.5rem] sm:h-[14rem]" onClose={onClose}>
                            
                            {/* Links sections */}
                            <div className="flex-auto p-4 sm:p-5 flex flex-col sm:flex-row sm:flex-wrap items-center sm:justify-center gap-3 sm:gap-x-16 sm:gap-y-6 w-full transition-all duration-300">
                                {linksItems.map((item, index) => {
                                    const IconItem = (item.label === 'GitHub') ? (darkMode ? GithubDark : Github) : item.icon;
                                    return (
                                        <Button soundType="open" key={index} className="flex flex-row sm:flex-col justify-start sm:justify-center items-center gap-4 sm:gap-2 sm:p-1 w-full sm:w-20 sm:h-25 bg-[#f3f4f6] dark:bg-[#2a2a2a]
                                        sm:bg-transparent sm:dark:bg-transparent border border-black dark:border-white sm:border-none hover:scale-101 sm:hover:scale-110 transition-transform duration-300 cursor-pointer"
                                        href={item.url} target="_blank" rel="noopener noreferrer">
                                            <img src={IconItem} alt={item.label} className="w-10 h-10 sm:w-12 sm:h-12 [image-rendering:pixelated]"/>
                                            <span className="text-black text-[16px] font-bold dark:text-white transition-all duration-300">{item.label}</span>
                                        </Button>
                                    )
                                })}
                            </div>                        
                    </WindowFrame>
                
            </div>
        </>
    )
}

export default links;