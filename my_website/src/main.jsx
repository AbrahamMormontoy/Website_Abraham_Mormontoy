import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import About from './tabs/About.jsx'
import Links from './tabs/Links.jsx'
import Work from './tabs/Work.jsx'
import More from './tabs/More.jsx'
import Contact from './tabs/Contact.jsx'
import { ThemeProvider } from './components/clouds/ThemeContext.jsx'
import { SoundProvider } from './components/SoundContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <SoundProvider>
      <App />
      </SoundProvider>
    </ThemeProvider>
  </StrictMode>,
)
