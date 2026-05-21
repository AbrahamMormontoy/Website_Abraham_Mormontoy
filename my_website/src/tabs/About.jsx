import { TitleBar, WindowFrame }  from '../components/SharedUI.jsx'

import aboutIcon from '../assets/assets95/aboutIcon.png'

function About( { onClose } ) {
  return (
      <>
        <div className="font-['W95font'] select-none relative z-50">
            {/* Size of the window and title bar included */}
              <WindowFrame title="About Me" iconSrc={aboutIcon} windowClassName="w-[92vw] sm:w-[50rem]  sm:h-[38rem] h-[80vh]" frameclassName="p-6" onClose={onClose}>
            
              {/* Header */}
              <div className="flex sm:flex-row flex-col justify-center items-center text-center gap-3 mb-6">
                <img className="w-20 h-20 sm:w-28 sm:h-28 [image-rendering:pixelated]" src={aboutIcon} alt="avatar" draggable={false}/>
                <div>
                  <div className="text-[2rem] sm:text-[3rem] text-black dark:text-white font-bold leading-tight">Abraham Mormontoy</div>
                  <div className="text-[1rem] sm:text-[1.25rem] text-black dark:text-white">Computer Science Student · Frontend and Software Development</div>
                </div>
              </div>

              {/* About Myself card */}
              <div className="mb-6 bg-[#f7f7f7] dark:bg-[#222222] p-5">
                <div className="text-[1.25rem] sm:text-[1.5rem] font-bold text-black dark:text-white mb-2">About Myself</div>
                <div className="text-[0.875rem] sm:text-[1rem] text-black dark:text-white mb-3 text-justify flex flex-col gap-3">
                    <div>
                        I'am an undergraduate Computer Science student at Simon Fraser University with a passion for building clean, user-centric
                        interfaces and understanding insights through data analysis and visualization. I thrive on building engaging user experiences
                        and creative driven features that add value to the design and functionality of an application.
                    </div>
                    <div>
                        My academic jorney provides me with a strong foundation in programming, algorithm and software development principles.
                        I enjoy collaborating with peers on projects from developing interactive frontends with React and Tailwind CSS to 
                        building a game with a clean structure, functionality and following the requirements. 
                    </div>
                    <div>
                        Drawn to artificial intelligence, I have explored Image Classification models and Natural Languague Processing with projects such as a CNN
                        for classifying images of dog breeds and a email spam classifier as well as taking courses in Artificial Intelligence. 
                    </div>
                    <div>
                        I'm also drawn to system-level programming and have explored building my own Arch Linux enviroment, improving my efficiency as 
                        its customized, while taking Computing Systems courses, which both have depeened my understanding of how system works as Operating 
                        Systems and Networking.
                    </div>
                </div>
                <ul className="text-[0.875rem] sm:text-[1rem] list-disc pl-6 space-y-1 text-black dark:text-white">
                  <li>Frontend development (React, Tailwind)</li>
                  <li>Data analysis & visualization</li>
                  <li>UI/UX design and prototyping</li>
                  <li>Small 2D game projects and experiments</li>
                </ul>
              </div>

              {/* Education section*/}
              <div className="mb-6 bg-[#f7f7f7] dark:bg-[#222222] p-5">
                <div className="text-[1.25rem] sm:text-[1.5rem] font-bold text-black dark:text-white mb-2">Education</div>
                <div className="text-[0.875rem] sm:text-[1rem] font-semibold text-black dark:text-white">Simon Fraser University</div>
                <div className="text-[0.875rem] sm:text-[1rem] text-black dark:text-white">Bachelor of Science in Computer Science</div>
                <div className="text-[0.8rem] sm:text-[0.9rem] mt-2 text-black dark:text-white">Expected Graduation: Dec 2028</div>
              </div>

              {/* Interests*/}
              <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#f7f7f7] dark:bg-[#222222] p-5">
                  <div className="text-[1.25rem] sm:text-[1.5rem] font-bold mb-2 text-black dark:text-white">Interests</div>
                  <ul className="list-disc pl-6 space-y-1 text-[0.875rem] sm:text-[1rem] text-black dark:text-white">
                    <li>Web Development</li>
                    <li>Machine Learning</li>
                    <li>Game Development</li>
                    <li>Networking</li>
                  </ul>
                </div>

                {/* Concentrations*/}
                <div className="bg-[#f7f7f7] dark:bg-[#222222] p-5">
                  <div className="text-[1.25rem] sm:text-[1.5rem] font-bold mb-2 text-black dark:text-white">Concentrations</div>
                  <ul className="text-[0.875rem] sm:text-[1rem] list-disc pl-6 space-y-1 text-black dark:text-white">
                    <li>Computer Systems</li>
                    <li>Artificial Intelligence</li>
                  </ul>
                </div>
              </div>

              {/* Contact */}
              <div className="mt-2 p-4 bg-[#eaeaea] dark:bg-[#1f1f1f] text-center">
                <div className="text-[1.25rem] sm:text-[1.5rem] font-semibold text-black dark:text-white">Get in touch</div>
                <div className="text-[0.875rem] sm:text-[1rem] text-black dark:text-white">Email: 
                    <a className="underline" href="mailto:mormontoy.abraham@gmail.com"> mormontoy.abraham@gmail.com</a></div>
              </div>
            </WindowFrame>
      </div>
    </>
  )
}

export default About;