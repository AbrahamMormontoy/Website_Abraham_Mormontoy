import Links from '../components/assets95/Links.png'
import Github from '../components/assets95/Github.png'
import LinkedIn from '../components/assets95/LinkedIn.png'
import Cv from '../components/assets95/Cv.png'
import Exit from '../components/assets95/Exit.png'


function links() {

    const linksItems = [
        { label: 'GitHub', icon: Github, url:"https://github.com/AbrahamMormontoy" },
        { label: 'LinkedIn', icon: LinkedIn, url:"https://www.linkedin.com/in/abraham-mormontoy-194665314/" },
        { label: 'Cv', icon: Cv, url:"/resumeAbrahamMormontoy.pdf" },
    ]


    return (
        <>
            <div className="w-screen h-screen flex flex-col overflow-hidden font-['W95font'] select-none relative z-50">
                <main className="flex flex-auto p-25 sm:p-8">

                    <div className="m-auto w-full sm:max-w-120 min-h-50 p-1 bg-[#c0c0c0] 
                    dark:bg-[#333333] shadow-[inset_-1.5px_-1.5px_0px_0px_#000000] flex flex-col">

                        <div className="px-1 py-0.5 bg-[#000080] dark:bg-[#121212] flex justify-between items-center h-8 
                                        shadow-[inset_1px_1px_1px_1px_#000000]">
                            <div className="flex items-center gap-1">
                                <img className="w-6 h-6 [image-rendering:pixelated]" src={Links} alt="icon" draggable={false}/>
                                <div className="text-white text-6 leading-none tracking-tight font-bold">Links</div>
                            </div>
                            <div className="flex justify-center items-center gap-1">
                                <button className="flex items-center gap-0.5 p-1 hover:scale-110 transition-transform duration-300 cursor-pointer">
                                    <img className="w-5 h-5 [image-rendering:pixelated]" src={Exit} alt="exit" draggable={false}/>
                                </button>
                            </div>
                        </div>

                        <div className="flex-auto bg-white dark:bg-[#333333] flex flex-col mt-1 shadow-[inset_1px_1px_1px_1px_#000000]">
                            <div className="m-5 flex flex-row items-center justify-center flex-wrap gap-x-16 gap-y-6 transition-all duration-300">
                                {linksItems.map((item, index) => (
                                    <a key={index} className="flex flex-col items-center gap-2 p-1 hover:scale-110 transition-transform 
                                    duration-300 cursor-pointer w-20 h-25"
                                    href={item.url} target="_blank" rel="noopener noreferrer">
                                        <img src={item.icon} alt={item.label} className="w-14 h-14 [image-rendering:pixelated] transition-all duration-300" draggable={false}/>
                                        <span className="text-black text-[14px] font-bold dark:text-white transition-all duration-300">{item.label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default links;