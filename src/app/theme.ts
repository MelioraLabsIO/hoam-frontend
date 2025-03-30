"use client"
import { createTheme } from "@mui/material/styles"

const lightPalette = {
    primary: {
        main: "#1976d2",
    },
    secondary: {
        main: "#9c27b0",
    },
    background: {
        default: "#f5f5f5",
        paper: "#ffffff",
    },
    text: {
        primary: "#000000",
    },
}


const darkPalette = {
    primary: {
        main: "#90caf9",
    },
    secondary: {
        main: "#f48fb1",
    },
    background: {
        default: "#121212",
        paper: "#1e1e1e",
    },
    text: {
        primary: "#ffffff",
    },
}


export const getTheme = (mode: "light" | "dark") =>
    createTheme({
        palette: {
            mode,
            ...(mode === "light" ? lightPalette : darkPalette),
        },
        spacing: 4,
        typography: {
            fontFamily: "var(--font-roboto)",
        },
        components: {
            MuiButton: {
                defaultProps: {
                    disableElevation: true,
                },
                styleOverrides: {
                    root: {
                        textTransform: "none",
                    },
                },
            },
        },

    })

export const theme = getTheme("light")