// DarkMode.tsx

import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Define light and dark mode themes
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button onClick={toggleDarkMode} startIcon={darkMode ? <Brightness7Icon /> : <Brightness4Icon />}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default DarkMode;
