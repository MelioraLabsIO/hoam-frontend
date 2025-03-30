// MUI
import { styled } from "@mui/material/styles"
import ListItemButton, { ListItemButtonProps } from "@mui/material/ListItemButton"

type ExtendedMenuItemButtonProps = ListItemButtonProps & { open: boolean }
const CustomizeListItemButton = styled(ListItemButton)<ListItemButtonProps & { open: boolean }>((props) => {
    const { open } = props
    return {
        color: "white",
        justifyContent: open ? "initial" : "center",
        borderRadius: open ? "100px" : "100%",
        margin: open ? "4px 12px" : "4px auto",
        width: open ? "auto" : "10px",
        "&:hover": {
            backgroundColor: "#E65F2B",
        },
        "&.Mui-selected": {
            backgroundColor: "white",
            color: "#E65F2B",
            "&:hover": {
                backgroundColor: "white",
            },
        },
    }
})

export default function SidebarListItemButton(props: ExtendedMenuItemButtonProps) {
    return <CustomizeListItemButton {...props}>{props.children}</CustomizeListItemButton>
}