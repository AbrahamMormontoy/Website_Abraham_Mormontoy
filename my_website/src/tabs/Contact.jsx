import { TitleBar } from '../components/SharedUI';

import ContactIcon from '../assets/assets95/Contact.png'
import Exit from '../assets/assets95/Exit.png'

function Contact() {
  return (
    <>
      <div className="w-screen min-h-screen flex flex-col overflow-y-auto font-['W95font'] select-none relative z-50">
        <main className="flex flex-auto p-6 sm:p-8">
          
          {/* Size of the window */}
          <div className="m-auto w-full sm:max-w-190 p-1 bg-[#c0c0c0] dark:bg-[#333333] shadow-[inset_-1.5px_-1.5px_0px_0px_#000000] flex flex-col">
            
            {/* Title bar */}
            <TitleBar title="Contact" iconSrc={ContactIcon}/>

            {/* Content area */}
            <div className="flex-auto bg-white dark:bg-[#333333] mt-1 shadow-[inset_1px_1px_1px_1px_#000000] p-6 sm:p-10">
              
              {/* Header */}
              <div className="flex flex-col items-center text-center mb-8">
                <div className="text-[1.5rem] sm:text-[2rem] text-black dark:text-white font-bold mb-2">EMAIL</div>
                <div className="text-[1rem] sm:text-[1.125rem] text-black dark:text-gray-300 max-w-[80%]">
                  the easiest way to contact me is through email. You can fill out the form or contact me directly.
                </div>
              </div>

              {/* Form container */}
              <div className="bg-[#f7f7f7] dark:bg-[#222] p-5 mb-6">
                <form className="flex flex-col gap-4">
                  {/* Grid for top 4 inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Name */}
                    <div className="flex flex-col gap-1">
                      <label className="text-black dark:text-white text-[1rem]">Name:</label>
                      <input type="text" className="w-full bg-white dark:bg-[#111] text-black dark:text-white p-1 focus:outline-none
                        shadow-[inset_1.5px_1.5px_0px_0px_#000000,inset_-1px_-1px_0px_0px_#ffffff] dark:shadow-[inset_1.5px_1.5px_0px_0px_#000000,inset_-1px_-1px_0px_0px_#555555]"/>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                      <label className="text-black dark:text-white text-[1rem]">Email:</label>
                      <input type="email" className="w-full bg-white dark:bg-[#111] text-black dark:text-white p-1 focus:outline-none
                        shadow-[inset_1.5px_1.5px_0px_0px_#000000,inset_-1px_-1px_0px_0px_#ffffff] dark:shadow-[inset_1.5px_1.5px_0px_0px_#000000,inset_-1px_-1px_0px_0px_#555555]"/>
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col gap-1">
                      <label className="text-black dark:text-white text-[1rem]">Phone number (Optional):</label>
                      <input type="tel" className="w-full bg-white dark:bg-[#111] text-black dark:text-white p-1 focus:outline-none
                      shadow-[inset_1.5px_1.5px_0px_0px_#000000,inset_-1px_-1px_0px_0px_#ffffff] dark:shadow-[inset_1.5px_1.5px_0px_0px_#000000,inset_-1px_-1px_0px_0px_#555555]"/>
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-1">
                      <label className="text-black dark:text-white text-[1rem]">Subject:</label>
                      <input type="text" className="w-full bg-white dark:bg-[#111] text-black dark:text-white p-1 focus:outline-none
                        shadow-[inset_1.5px_1.5px_0px_0px_#000000,inset_-1px_-1px_0px_0px_#ffffff] dark:shadow-[inset_1.5px_1.5px_0px_0px_#000000,inset_-1px_-1px_0px_0px_#555555]"/>
                    </div>

                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1">
                    <label className="text-black dark:text-white text-[1rem]">Message:</label>
                    <textarea rows="4" className="w-full bg-white dark:bg-[#111] text-black dark:text-white p-1 resize-none focus:outline-none custom-scrollbar
                      shadow-[inset_1.5px_1.5px_0px_0px_#000000,inset_-1px_-1px_0px_0px_#ffffff] dark:shadow-[inset_1.5px_1.5px_0px_0px_#000000,inset_-1px_-1px_0px_0px_#555555]"/>
                  </div>

                  {/* Submit Button */}
                  <button type="button" className="mt-4 w-full py-2 bg-[#c0c0c0] dark:bg-[#444] text-black dark:text-white font-bold 
                  shadow-[inset_-1.5px_-1.5px_0px_0px_#000000,inset_1.5px_1.5px_0px_0px_#ffffff] dark:shadow-[inset_-1.5px_-1.5px_0px_0px_#111111,inset_1.5px_1.5px_0px_0px_#666666]
                  active:shadow-[inset_1.5px_1.5px_0px_0px_#000000,inset_-1.5px_-1.5px_0px_0px_#ffffff] dark:active:shadow-[inset_1.5px_1.5px_0px_0px_#111,inset_-1px_-1px_0px_0px_#555]
                  cursor-pointer hover:scale-101 transition-all duration-100">Send me an email</button>
                </form>
              </div>

              {/* Direct Email link */}
              <div className="text-center text-[0.95rem] text-black dark:text-gray-300">
                or email me at: <a href="mailto:aem19@sfu.ca" className="hover:underline">aem19@sfu.ca</a>
              </div>

            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Contact;