"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { ReactNode } from "react";

interface MUIProviderProps {
  children: ReactNode;
}

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ff6b35",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#e55a2b",
      contrastText: "#ffffff",
    },
    background: {
      default: "transparent",
      paper: "rgba(255, 255, 255, 0.9)",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily:
      'var(--font-geist-sans), "Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          fontWeight: 600,
          textTransform: "uppercase" as const,
          letterSpacing: "0.5px",
          fontSize: "0.75rem",
          height: "28px",
          "&:hover": {
            transform: "scale(1.05)",
          },
          transition: "all 0.2s ease-in-out",
        },
        filled: {
          backgroundColor: "#ff6b35",
          "&:hover": {
            backgroundColor: "#e55a2b",
          },
        },
        outlined: {
          borderColor: "#ff6b35",
          color: "#ff6b35",
          backgroundColor: "rgba(255, 107, 53, 0.1)",
          "&:hover": {
            backgroundColor: "rgba(255, 107, 53, 0.15)",
            borderColor: "#e55a2b",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h6: {
          textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
        },
      },
    },
  },
});

export default function MUIProvider({ children }: MUIProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
