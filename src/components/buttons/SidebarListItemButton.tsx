// MUI
import { styled } from "@mui/material/styles"
import ListItemButton, { ListItemButtonProps } from "@mui/material/ListItemButton"

const CustomizeListItemButton = styled(ListItemButton)<ListItemButtonProps>(() => ({
    color: "white",

    "&.Mui-selected": {
        borderRadius: "50px",
        backgroundColor: "white", // Background when selected
        color: "#E65F2B",
    },
}))

export default function SidebarListItemButton(props: ListItemButtonProps) {
    return <CustomizeListItemButton {...props}>{props.children}</CustomizeListItemButton>
}