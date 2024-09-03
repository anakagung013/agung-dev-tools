// PasswordGenerator.js
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, FormControlLabel, Checkbox, RadioGroup, Radio, FormControl, FormLabel, InputAdornment, Snackbar, Alert, IconButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function PasswordGenerator({ darkMode }) {
  const [length, setLength] = useState(10);
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [complexity, setComplexity] = useState('easyToRead');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#2196f3',
      },
      background: {
        default: darkMode ? '#424242' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#000000',
        secondary: darkMode ? '#e0e0e0' : '#333333',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '50px',
            padding: '10px 20px',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#616161' : '#ffffff', // Background for TextField
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            color: darkMode ? '#e0e0e0' : '#333333', // Color for labels
          },
        },
      },
    },
  });

  const generatePassword = () => {
    if (!uppercase && !lowercase && !numbers && !symbols) {
      setOpenSnackbar(true);
      return;
    }

    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let charSet = '';
    if (uppercase) charSet += upperChars;
    if (lowercase) charSet += lowerChars;
    if (numbers) charSet += numberChars;
    if (symbols) charSet += symbolChars;

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      password += charSet[randomIndex];
    }

    setGeneratedPassword(password);
  };

  const handleLengthChange = (e) => {
    setLength(e.target.value);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword)
      .then(() => alert('Password copied to clipboard!'))
      .catch(err => alert('Failed to copy password.'));
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box mt={4} bgcolor={theme.palette.background.default} p={2} borderRadius={1}>
        <Typography variant="h4" gutterBottom color={theme.palette.text.primary}>
          Password Generator
        </Typography>
        <Box mb={2} display="flex" alignItems="center">
          <TextField
            value={generatedPassword}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={copyToClipboard}>
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Box>

        <Box mb={2}>
          <TextField
            label="Password Length"
            type="number"
            value={length}
            onChange={handleLengthChange}
            fullWidth
          />
        </Box>

        <FormControlLabel
          control={<Checkbox checked={uppercase} onChange={() => setUppercase(!uppercase)} />}
          label="Include Uppercase Letters"
        />
        <FormControlLabel
          control={<Checkbox checked={lowercase} onChange={() => setLowercase(!lowercase)} />}
          label="Include Lowercase Letters"
        />
        <FormControlLabel
          control={<Checkbox checked={numbers} onChange={() => setNumbers(!numbers)} />}
          label="Include Numbers"
        />
        <FormControlLabel
          control={<Checkbox checked={symbols} onChange={() => setSymbols(!symbols)} />}
          label="Include Symbols"
        />

        <FormControl>
          <FormLabel>Complexity</FormLabel>
          <RadioGroup
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
          >
            <FormControlLabel value="easyToRead" control={<Radio />} label="Easy to Read" />
            <FormControlLabel value="easyToSay" control={<Radio />} label="Easy to Say" />
            <FormControlLabel value="allCharacters" control={<Radio />} label="All Characters" />
          </RadioGroup>
        </FormControl>

        <Box display="flex" justifyContent="center" mt={3}>
          <Button onClick={generatePassword} variant="contained" color="primary">
            Generate Password
          </Button>
        </Box>

        <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
            Please select at least one option for generating a password!
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default PasswordGenerator;
