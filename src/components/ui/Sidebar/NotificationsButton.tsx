import { Button } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive"

export default function NotificationButton() {

    return <Button
        variant={"contained"}
        sx={{
            backgroundColor: "white",
            borderRadius: "80%",
        }}>
        <IconButton disableRipple>
            <NotificationsActiveIcon />
        </IconButton>
    </Button>

}