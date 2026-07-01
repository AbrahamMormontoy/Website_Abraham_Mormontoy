import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './components/clouds/ThemeContext.jsx'
import { AudioManager } from './sound/AudioManager.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider>
            <AudioManager>
                <App />
            </AudioManager>
        </ThemeProvider>
    </StrictMode>,
)
