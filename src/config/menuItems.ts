// config/menuItems.js
import HomeIcon from "@mui/icons-material/Home"
import House from "@mui/icons-material/House"
import SettingsIcon from "@mui/icons-material/Settings"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import { SvgIconTypeMap } from "@mui/material"
import { Section } from "@/types/common"

type MenuItem = {

    text: Section
    icon: OverridableComponent<SvgIconTypeMap> & { muiName: string }
    path: string
    description: string

}
export const menuItems: MenuItem[] = [
    {
        text: "Dashboard",
        icon: HomeIcon,
        path: "/dashboard",
        description: "Main dashboard overview",
    },
    {
        text: "Houses",
        icon: House,
        path: "/houses",
        description: "User profile settings",
    },
    {
        text: "Settings",
        icon: SettingsIcon,
        path: "/settings",
        description: "Application settings",
    },
]