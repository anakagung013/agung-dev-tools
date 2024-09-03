import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Switch,
  FormControlLabel,
  Grid
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';

const languages = [
    { code: 'AF', name: 'Afrikaans' },
    { code: 'AR', name: 'Arabic' },
    { code: 'BG', name: 'Bulgarian' },
    { code: 'CA', name: 'Catalan' },
    { code: 'CS', name: 'Czech' },
    { code: 'DA', name: 'Danish' },
    { code: 'DE', name: 'German' },
    { code: 'EL', name: 'Greek' },
    { code: 'EN', name: 'English' },
    { code: 'ES', name: 'Spanish' },
    { code: 'ET', name: 'Estonian' },
    { code: 'FI', name: 'Finnish' },
    { code: 'FR', name: 'French' },
    { code: 'GA', name: 'Irish' },
    { code: 'GD', name: 'Scots Gaelic' },
    { code: 'HE', name: 'Hebrew' },
    { code: 'HI', name: 'Hindi' },
    { code: 'HR', name: 'Croatian' },
    { code: 'HU', name: 'Hungarian' },
    { code: 'ID', name: 'Indonesian' },
    { code: 'IS', name: 'Icelandic' },
    { code: 'IT', name: 'Italian' },
    { code: 'JA', name: 'Japanese' },
    { code: 'JW', name: 'Javanese' },
    { code: 'KO', name: 'Korean' },
    { code: 'LA', name: 'Latin' },
    { code: 'LB', name: 'Luxembourgish' },
    { code: 'LT', name: 'Lithuanian' },
    { code: 'LV', name: 'Latvian' },
    { code: 'MG', name: 'Malagasy' },
    { code: 'MI', name: 'Maori' },
    { code: 'MK', name: 'Macedonian' },
    { code: 'ML', name: 'Malayalam' },
    { code: 'MN', name: 'Mongolian' },
    { code: 'MR', name: 'Marathi' },
    { code: 'MY', name: 'Burmese' },
    { code: 'NE', name: 'Nepali' },
    { code: 'NO', name: 'Norwegian' },
    { code: 'OC', name: 'Occitan' },
    { code: 'PL', name: 'Polish' },
    { code: 'PT', name: 'Portuguese' },
    { code: 'RO', name: 'Romanian' },
    { code: 'RU', name: 'Russian' },
    { code: 'RW', name: 'Kinyarwanda' },
    { code: 'SA', name: 'Sanskrit' },
    { code: 'SD', name: 'Sindhi' },
    { code: 'SE', name: 'Northern Sami' },
    { code: 'SI', name: 'Sinhalese' },
    { code: 'SK', name: 'Slovak' },
    { code: 'SL', name: 'Slovenian' },
    { code: 'SM', name: 'Samoan' },
    { code: 'SN', name: 'Shona' },
    { code: 'SO', name: 'Somali' },
    { code: 'SQ', name: 'Albanian' },
    { code: 'SR', name: 'Serbian' },
    { code: 'ST', name: 'Sesotho' },
    { code: 'SU', name: 'Sundanese' },
    { code: 'SV', name: 'Swedish' },
    { code: 'SW', name: 'Swahili' },
    { code: 'TA', name: 'Tamil' },
    { code: 'TE', name: 'Telugu' },
    { code: 'TH', name: 'Thai' },
    { code: 'TI', name: 'Tigrinya' },
    { code: 'TO', name: 'Tonga' },
    { code: 'TR', name: 'Turkish' },
    { code: 'UK', name: 'Ukrainian' },
    { code: 'UR', name: 'Urdu' },
    { code: 'VI', name: 'Vietnamese' },
    { code: 'XH', name: 'Xhosa' },
    { code: 'YI', name: 'Yiddish' },
    { code: 'YO', name: 'Yoruba' },
    { code: 'ZU', name: 'Zulu' },
  ];
  

function TranslateTool({ darkMode }) {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('auto');
  const [targetLanguage, setTargetLanguage] = useState('EN');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [autoTranslate, setAutoTranslate] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#2196f3',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#000000',
        secondary: darkMode ? '#b0b0b0' : '#666666',
      }
    },
    typography: {
      allVariants: {
        color: darkMode ? '#ffffff' : '#000000',
      },
    },
  });

  const handleTranslate = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('https://api-free.deepl.com/v2/translate', null, {
        params: {
          auth_key: '0e608864-dbe8-47a2-b06c-fd71bae68311:fx', // Replace with your API Key
          text: sourceText,
          source_lang: sourceLanguage.toUpperCase(),
          target_lang: targetLanguage.toUpperCase(),
        },
      });

      if (response.data && response.data.translations) {
        setTranslatedText(response.data.translations[0].text);
      }
    } catch (error) {
      console.error('Error translating text:', error);
      setError('Error translating text. Please check your input or try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSourceTextChange = (e) => {
    setSourceText(e.target.value);
    if (autoTranslate) {
      handleTranslate();
    }
  };

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  const handleAutoTranslateChange = (e) => {
    setAutoTranslate(e.target.checked);
    if (e.target.checked && sourceText.trim()) {
      handleTranslate();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ mt: 2 }}>
        <Dialog open={settingsOpen} onClose={toggleSettings}>
          <DialogTitle>Settings</DialogTitle>
          <DialogContent>
            <FormControlLabel
              control={<Switch checked={autoTranslate} onChange={handleAutoTranslateChange} />}
              label="Auto Translate"
            />
          </DialogContent>
        </Dialog>

        <Grid container spacing={2}>
          {/* Left Side */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Source Language</InputLabel>
              <Select
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
                sx={{ backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#000' }}
              >
                <MenuItem value="auto">Detect Automatically</MenuItem>
                {languages.map((lang) => (
                  <MenuItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Source Text"
              multiline
              rows={10}
              value={sourceText}
              onChange={handleSourceTextChange}
              fullWidth
              sx={{ mt: 2, backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#000' }}
              InputProps={{
                style: {
                  color: darkMode ? '#fff' : '#000',
                },
              }}
            />
          </Grid>

          {/* Right Side */}
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center">
              <Box flex={1}>
                <FormControl fullWidth>
                  <InputLabel>Target Language</InputLabel>
                  <Select
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    sx={{ backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#000' }}
                  >
                    {languages.map((lang) => (
                      <MenuItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <IconButton onClick={toggleSettings} sx={{ ml: 1 }}>
                <SettingsIcon />
              </IconButton>
            </Box>
            <TextField
              label="Translated Text"
              multiline
              rows={10}
              value={translatedText}
              fullWidth
              InputProps={{
                readOnly: true,
                style: {
                  color: darkMode ? '#fff' : '#000',
                },
              }}
              sx={{ mt: 2, backgroundColor: darkMode ? '#333' : '#fff' }}
            />
          </Grid>
        </Grid>

        <Box mt={2} textAlign="center">
          {!autoTranslate && (
            <Button variant="contained" color="primary" onClick={handleTranslate} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Translate'}
            </Button>
          )}
          {error && (
            <Typography variant="body2" color="error" gutterBottom>
              {error}
            </Typography>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default TranslateTool;
