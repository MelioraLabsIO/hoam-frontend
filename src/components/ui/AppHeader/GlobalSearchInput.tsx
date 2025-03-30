import { InputAdornment, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

export default function GlobalSearchInput() {
    return (
        <TextField
            placeholder="Search for anything..."
            variant="outlined"
            fullWidth
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="action" />
                        </InputAdornment>
                    ),
                    sx: {
                        height: "50px",
                        borderRadius: "100px", // Fully rounded corners
                        bgcolor: "#ffffff",    // White background
                        "& fieldset": {
                            borderColor: "#e0e0e0", // Light border color
                        },
                        "&:hover fieldset": {
                            borderColor: "#bdbdbd", // Darker on hover
                        },
                    },
                },
            }}
            sx={{
                width: 400,
            }}
        />
    )
}