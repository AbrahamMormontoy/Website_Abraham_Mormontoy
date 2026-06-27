import { TitleBar, WindowFrame, Button } from "../components/SharedUI";

import { useEffect, useContext } from "react";

import { musicIcon } from "../images/assets";

import { useAudio } from "../sound/AudioContext.jsx";

import { ThemeContext } from "../components/clouds/ThemeContext.jsx";


export default function AmbientVideo({ onClose }) {

    const videoSourceLight = "https://assets.abrahammormontoy.com/assets/RoverReadingLight.mp4";
    const videoSourceDark = "https://assets.abrahammormontoy.com/assets/RoverReadingDark.mp4";

    const { playSound, stopSound } = useAudio();

    const { theme } = useContext(ThemeContext);

    // useEffect to play the ambient sound when the window opens and stop it when it closes. Only runs once when the component mounts and unmounts
    useEffect(() => {
        playSound('ambient');
        return () => {
            stopSound('ambient');
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="font-['W95font'] select-none relative z-50">
            <WindowFrame title="Ambient Video" iconSrc={musicIcon} windowClassName="w-[92vw] sm:w-[20rem] sm:h-[22rem] h-[60vh] max-h-[29rem]" frameclassName="p-6 gap-6 fade-in" onClose={onClose}>
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <video src={theme === 'light' ? videoSourceLight : videoSourceDark} preload="auto" autoPlay loop muted className="w-full h-full object-cover shadow-[inset_-1px_-1px_1px_1px_#000000]"/>
                </div>
            </WindowFrame>
        </div>
    )
}