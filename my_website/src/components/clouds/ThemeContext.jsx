import React, { useEffect, createContext, useState, useContext } from "react";

// Create a context for theme management
const ThemeContext = createContext(undefined);

// Checks theme preference based on time of day (6am-6pm = light, otherwise dark)
function getThemebyTime() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) {
        return "light";
    } else {
        return "dark";
    }
}

function ThemeProvider({ children }) {
    const savedTheme = localStorage.getItem("useTheme"); // check if user has a saved theme preference (light/dark)
    const userPreference = savedTheme !== null;
    
    const [theme, setThemeState] = useState(savedTheme || getThemebyTime()); // default to time-based theme if no saved preference

    const [backgroundEffect, setBackgroundEffect] = useState("clouds"); // default effect is clouds
    const [isAnimating, setIsAnimating] = useState(false); // tracking animation state
    const [isUserInteracted, setIsUserInteracted] = useState(userPreference); // track if user has interacted with theme toggle
    
    // Update localStorage whenever theme changes
    function setTheme(newTheme) {
        setThemeState(newTheme);
        localStorage.setItem("useTheme", newTheme);
    }

    // Toggle between default background and clouds with fade animation
    function toggleBackground() {
        if (backgroundEffect === "default") {
            setBackgroundEffect("clouds");
        } else {
            setIsAnimating(true);
            setTimeout(() => {
                setBackgroundEffect("default");
                setIsAnimating(false);
            }, 1000);
        }
    }

    // Apply theme class to root element for global CSS styling
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark"); // remove existing theme classes
        root.classList.add(theme);
    } , [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, backgroundEffect, toggleBackground, isAnimating, isUserInteracted }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeProvider, ThemeContext }; 

// Hook to access the theme context values in other components ()
const useTheme = () => {
    const context = useContext(ThemeContext);
    return context;
}