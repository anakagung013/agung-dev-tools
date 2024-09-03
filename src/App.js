import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import PasswordGenerator from './components/PasswordGenerator';
import TranslateTool from './components/TranslateTool';
import Calculator from './components/StandardCalculator';
import HomePage from './components/HomePage';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#2196f3',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#000000',
      },
      background: {
        default: darkMode ? '#424242' : '#ffffff',
      },
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          h2: {
            fontWeight: 700,
            color: darkMode ? '#ffffff' : '#000000',
          },
          h5: {
            fontWeight: 500,
            color: darkMode ? '#e0e0e0' : '#333333',
          },
          h6: {
            color: darkMode ? '#e0e0e0' : '#333333',
          },
        },
      },
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Agung Dev Tool
            </Typography>
            <IconButton color="inherit" onClick={toggleDarkMode}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<HomePage darkMode={darkMode} />} />
          <Route path="/password-generator" element={<PasswordGenerator darkMode={darkMode} />} />
          <Route path="/translate-tool" element={<TranslateTool darkMode={darkMode} />} />
          <Route path="/calculator" element={<Calculator darkMode={darkMode} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
