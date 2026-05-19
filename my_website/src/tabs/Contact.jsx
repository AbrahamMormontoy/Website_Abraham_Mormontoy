import { TitleBar, WindowFrame, InputText } from '../components/SharedUI';

import ContactIcon from '../assets/assets95/Contact.png'
import Exit from '../assets/assets95/Exit.png'

function Contact() {
  return (
    <>
      <div className="w-screen min-h-screen flex flex-col overflow-y-auto font-['W95font'] select-none relative z-50">
        <main className="flex flex-auto p-6 sm:p-8">
            <WindowFrame title="Contact" iconSrc={ContactIcon} windowClassName="sm:max-w-190 min-h-95" frameclassName="p-6 sm:p-10">
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
                  <InputText label="Name:" />
                  {/* Email */}
                  <InputText label="Email:" type="email" />
                  {/* Phone Number */}
                  <InputText label="Phone number (Optional):" type="tel" />
                  {/* Subject */}
                  <InputText label="Subject:" />
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
                email me at: <a href="mailto:mormontoy.abraham@gmail.com" className="hover:underline">mormontoy.abraham@gmail.com</a>
                <a href="tel:123-456-7890" className="hover:underline"> 123-456-7890</a>
              </div>
              <div className="text-center text-[0.95rem] text-black dark:text-gray-300">
                or phone me at: <a href="tel:123-456-7890" className="hover:underline"> 123-456-7890</a>
              </div>
            </WindowFrame>
        </main>
      </div>
    </>
  )
}

export default Contact;