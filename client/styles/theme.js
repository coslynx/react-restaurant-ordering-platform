import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // 'light' or 'dark'
    primary: {
      main: '#0072ff', // Primary color
    },
    secondary: {
      main: '#f50057', // Secondary color
    },
    background: {
      default: '#f5f5f5', // Default background color
      paper: '#ffffff', // Paper background color
    },
    text: {
      primary: '#000000', // Primary text color
      secondary: '#757575', // Secondary text color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Default font family
    fontSize: 16, // Default font size
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 400,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 400,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: '1rem 2rem',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
          },
        },
      },
    },
  },
});

export default theme;