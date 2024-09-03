import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { evaluate, sqrt, sin, cos, tan, log, factorial, exp, pi } from 'mathjs';

const StandardCalculator = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [previousResult, setPreviousResult] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleButtonClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClearEntry = () => {
    setInput('');
    setOutput('');
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleCalculate = () => {
    try {
      let sanitizedInput = input.replace(/^\+/, '');

      // Handle functions and special characters
      sanitizedInput = sanitizedInput.replace(/Ans/g, previousResult);
      sanitizedInput = sanitizedInput.replace(/(\d+)!/g, (match, num) => factorial(Number(num)));
      sanitizedInput = sanitizedInput.replace(/(\d+)\^(\d+)/g, (match, base, exp) => Math.pow(Number(base), Number(exp)));

      // Replace function names with their respective mathjs functions
      sanitizedInput = sanitizedInput
        .replace(/sqrt\(/g, 'sqrt(')
        .replace(/sin\(/g, 'sin(')
        .replace(/cos\(/g, 'cos(')
        .replace(/tan\(/g, 'tan(')
        .replace(/log\(/g, 'log(')
        .replace(/exp\(/g, 'exp(')
        .replace(/pi/g, pi)
        .replace(/e/g, exp(1))
        .replace(/(\d+)\^(\d+)/g, (match, base, exp) => Math.pow(Number(base), Number(exp))); // Handle power function

      const result = evaluate(sanitizedInput);
      setOutput(result);
      setPreviousResult(result);
    } catch (e) {
      setOutput('Error');
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;

      if (['+', '-', '*', '/', '%'].includes(key)) {
        handleButtonClick(key);
      } else if (key >= '0' && key <= '9') {
        handleButtonClick(key);
      } else if (key === 'Enter') {
        handleCalculate();
      } else if (key === 'Backspace') {
        handleClearEntry();
      } else if (key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [input, previousResult]);

  return (
    <Box
      sx={{
        maxWidth: isMobile ? '100%' : 600,
        margin: '0 auto',
        textAlign: 'center',
        padding: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Advanced Calculator
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          value={output || input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="0"
          InputProps={{ readOnly: true }}
          sx={{ fontSize: isMobile ? '1.5rem' : '2rem', padding: 1 }}
        />
      </Box>
      <Grid container spacing={1}>
        {['(', ')', '%', 'x!'].map((label) => (
          <Grid item xs={3} key={label}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleButtonClick(label)}
              sx={{ fontSize: isMobile ? '1rem' : '1.5rem', padding: 2 }}
            >
              {label}
            </Button>
          </Grid>
        ))}
        {['7', '8', '9', '/'].map((label) => (
          <Grid item xs={3} key={label}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleButtonClick(label)}
              sx={{ fontSize: isMobile ? '1rem' : '1.5rem', padding: 2 }}
            >
              {label}
            </Button>
          </Grid>
        ))}
        {['4', '5', '6', '*'].map((label) => (
          <Grid item xs={3} key={label}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleButtonClick(label)}
              sx={{ fontSize: isMobile ? '1rem' : '1.5rem', padding: 2 }}
            >
              {label}
            </Button>
          </Grid>
        ))}
        {['1', '2', '3', '-'].map((label) => (
          <Grid item xs={3} key={label}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleButtonClick(label)}
              sx={{ fontSize: isMobile ? '1rem' : '1.5rem', padding: 2 }}
            >
              {label}
            </Button>
          </Grid>
        ))}
        {['0', '.', 'CE', '+'].map((label) => (
          <Grid item xs={3} key={label}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => label === 'CE' ? handleClear() : handleButtonClick(label)}
              sx={{ fontSize: isMobile ? '1rem' : '1.5rem', padding: 2 }}
            >
              {label}
            </Button>
          </Grid>
        ))}
        {['sin', 'cos', 'tan', 'rad'].map((label) => (
          <Grid item xs={3} key={label}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleButtonClick(`${label}(`)}
              sx={{ fontSize: isMobile ? '1rem' : '1.5rem', padding: 2 }}
            >
              {label}
            </Button>
          </Grid>
        ))}
        {['deg', 'log', 'e', '√'].map((label) => (
          <Grid item xs={3} key={label}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleButtonClick(label === '√' ? 'sqrt(' : `${label}(`)}
              sx={{ fontSize: isMobile ? '1rem' : '1.5rem', padding: 2 }}
            >
              {label}
            </Button>
          </Grid>
        ))}
        {['inv', 'phi', 'exp', 'xy'].map((label) => (
          <Grid item xs={3} key={label}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleButtonClick(label === 'xy' ? '^(' : `${label}(`)}
              sx={{ fontSize: isMobile ? '1rem' : '1.5rem', padding: 2 }}
            >
              {label}
            </Button>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleCalculate}
            sx={{ fontSize: isMobile ? '1.5rem' : '2rem', padding: 2 }}
          >
            =
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StandardCalculator;
