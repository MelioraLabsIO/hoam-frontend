"use client"

import * as React from "react"
import { ReactNode, useState } from "react"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"

// Import your icons
import { menuItems } from "@/config/menuItems"
import SidebarListItemButton from "@/components/buttons/SidebarListItemButton"
import { useRouter } from "next/navigation"
import AppHeader from "@/components/ui/AppHeader/AppHeader"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import { Section } from "@/types/common"
import CustomizedDrawer from "@/components/ui/Sidebar/CustomizedDrawer"


const Sidebar = ({ children }: { children: ReactNode }) => {
    const router = useRouter()

    // States
    const [open, setOpen] = useState(true)
    const [selectedItem, setSelectedItem] = React.useState<Section>("Dashboard")

    /********************************************* HANDLERS ************************************************/
    const toggleDrawer = () => {
        setOpen(prevState => !prevState)
    }

    const handleMenuItemClick = (text: Section, path: string) => {
        setSelectedItem(text)
        router.push(path)
    }

    return (
        <Box sx={{ display: "flex" }}>
            <CustomizedDrawer
                variant="permanent"
                open={open}
            >
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: 2,
                    justifyContent: open ? "space-between" : "center",
                }}>
                    {open ? (
                        <>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Avatar sx={{ bgcolor: "#FF6B35", width: 32, height: 32, marginRight: 1 }}>P</Avatar>
                                <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                                    HOAM
                                </Typography>
                            </Box>
                            <IconButton
                                onClick={toggleDrawer}
                                sx={{ color: "#ffffff" }}
                            >
                                <ChevronLeft />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <Avatar sx={{ bgcolor: "#FF6B35", width: 32, height: 32 }}>P</Avatar>
                            <IconButton
                                onClick={toggleDrawer}
                                sx={{
                                    color: "#ffffff",
                                    position: "absolute",
                                    right: "-12px",
                                    top: "20px",
                                    bgcolor: "#121212",
                                    width: 24,
                                    height: 24,
                                    "&:hover": { bgcolor: "#2c2c2c" },
                                }}
                            >
                                <ChevronRight />
                            </IconButton>
                        </>
                    )}
                </Box>
                <List>
                    {menuItems.map(({ text, path, icon: Icon }) => (
                        <ListItem key={text} disablePadding>
                            <SidebarListItemButton
                                open={open}
                                onClick={() => handleMenuItemClick(text, path)}
                                selected={selectedItem === text}
                            >
                                <ListItemIcon
                                >
                                    <Icon />
                                </ListItemIcon>
                                {open && <ListItemText primary={text} />}
                            </SidebarListItemButton>
                        </ListItem>
                    ))}
                </List>

                <Box sx={{
                    position: "absolute",
                    bottom: 16,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <Avatar sx={{ bgcolor: "#FF6B35", width: 36, height: 36 }}>?</Avatar>
                </Box>
            </CustomizedDrawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    transition: "margin 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
                    marginLeft: 0,
                }}
            >
                {/* Your DashboardToolbar component would go here */}
                <AppHeader sectionName={selectedItem} />
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 3,
                    ml: 1,
                }}>
                    <Typography variant="h5" component="h1">Dashboard</Typography>
                    {/* Search and profile components would go here */}
                </Box>

                {children}
            </Box>
        </Box>
    )
}

export default Sidebar