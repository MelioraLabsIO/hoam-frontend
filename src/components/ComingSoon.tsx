"use client"

import React from "react"
import { Box, Container, IconButton, Paper, Stack, Typography } from "@mui/material"
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material"

export default function ComingSoon() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)",
                color: "white",
                textAlign: "center",
                px: 3,
                py: 10,
            }}
        >
            <Container maxWidth="md">
                <Paper
                    elevation={10}
                    sx={{
                        p: { xs: 4, md: 8 },
                        borderRadius: 4,
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        color: "white",
                    }}
                >
                    <Typography
                        variant="overline"
                        sx={{ letterSpacing: 4, fontWeight: "bold", mb: 2, display: "block", color: "rgba(255,255,255,0.7)" }}
                    >
                        Our website is under construction
                    </Typography>

                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{
                            fontSize: { xs: "3rem", md: "5rem" },
                            fontWeight: 800,
                            mb: 2,
                            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                        }}
                    >
                        HOAM
                    </Typography>

                    <Typography
                        variant="h5"
                        sx={{ mb: 6, fontWeight: 300, color: "rgba(255,255,255,0.9)" }}
                    >
                        Homeowner Association Management. Simplifying community living.
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 4, fontWeight: 500 }}>
                        Stay tuned for more updates!
                    </Typography>

                    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
                        {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, index) => (
                            <IconButton
                                key={index}
                                sx={{
                                    color: "white",
                                    border: "1px solid rgba(255,255,255,0.3)",
                                    "&:hover": {
                                        backgroundColor: "rgba(255,255,255,0.1)",
                                        borderColor: "white",
                                    },
                                }}
                            >
                                <Icon />
                            </IconButton>
                        ))}
                    </Stack>

                    <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)", mt: 4, display: "block" }}>
                        Powered by{" "}
                        <Box
                            component="a"
                            href="https://melioralabs.io"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                color: "white",
                                textDecoration: "none",
                                fontWeight: "bold",
                                "&:hover": { textDecoration: "underline" },
                            }}
                        >
                            Meliora Labs
                        </Box>
                    </Typography>
                </Paper>

                <Box sx={{ mt: 8 }}>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
                        &copy; {new Date().getFullYear()} Homeowner Association Management. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    )
}
