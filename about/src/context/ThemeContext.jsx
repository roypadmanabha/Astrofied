import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    // Strictly light mode (isDarkMode is always false)
    const [isDarkMode] = useState(false);

    useEffect(() => {
        const body = window.document.body;
        body.classList.add('light');
        body.classList.remove('dark');
    }, []);

    const toggleTheme = () => {}; // No-op since dark mode is disabled

    return (
        <ThemeContext.Provider value={{ isDarkMode: false, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
