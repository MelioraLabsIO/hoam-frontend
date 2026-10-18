"use client"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

/** Small grey document thumbnail labelled "PDF". */
export default function PdfBadge() {
    return (
        <Box
            aria-hidden="true"
            sx={(theme) => ({
                width: theme.spacing(4.25),
                height: theme.spacing(5),
                flex: "0 0 auto",
                borderRadius: `${theme.radius.xs}px`,
                bgcolor: "neutral.soft",
                color: "neutral.softContrast",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                pb: 0.75,
            })}
        >
            <Typography variant="tiny" component="span">
                PDF
            </Typography>
        </Box>
    )
}
