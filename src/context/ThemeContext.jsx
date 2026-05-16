import { createContext, useState, useContext } from 'react'; 
 
const ThemeContext = createContext(); 
 
export function useTheme() { 
  return useContext(ThemeContext); 
} 
 
export const THEMES = { 
  light: { 
    bg:          '#f4f4f4', 
    card:        '#ffffff', 
    text:        '#222222', 
    subText:     '#888888', 
    primary:     '#1E4D8C', 
    border:      '#eeeeee', 
    headerBg:    '#1E4D8C', 
    headerText:  'white', 
    tabActive:   '#1E4D8C', 
    tabInactive: '#aaaaaa', 
  }, 
  dark: { 
    bg:          '#121212', 
    card:        '#1e1e1e', 
    text:        '#e0e0e0', 
    subText:     '#888888', 
    primary:     '#4A90D9', 
    border:      '#333333', 
    headerBg:    '#1a1a2e', 
    headerText:  '#e0e0e0', 
    tabActive:   '#4A90D9', 
    tabInactive: '#555555', 
  }, 
}; 
 
export function ThemeProvider({ children }) { 
  const [mode, setMode] = useState('light'); 
  const toggleTheme = () => setMode(m => m === 'light' ? 'dark' : 'light'); 
  const theme = THEMES[mode]; 
 
  return ( 
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}> 
      {children} 
    </ThemeContext.Provider> 
  ); 
} 