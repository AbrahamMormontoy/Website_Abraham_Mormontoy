import React from 'react';
import Exit from '../assets/assets95/Exit.png'


export function TitleBar({ title, iconSrc }) {
  return (
        <div className="flex justify-between bg-[#000080] dark:bg-[#121212] shadow-[inset_1px_1px_1px_1px_#000000] h-8">
            <div className="flex items-center gap-1 p-1">
                <img className="w-6 h-6 [image-rendering:pixelated]" src={iconSrc} alt={`${title} icon`} draggable={false}/>
                <div className="text-white text-[1rem] leading-none tracking-tight font-bold">{title}</div>
            </div>
            <div className="flex items-center justify-end p-1">
                <button className="p-1 hover:scale-110 transition-transform duration-300 cursor-pointer flex items-center gap-0.5">
                    <img className="w-6 h-6 [image-rendering:pixelated]" src={Exit} alt="exit" draggable={false}/>
                </button>
            </div>
        </div>
  );
}