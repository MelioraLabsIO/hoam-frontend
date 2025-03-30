// MUI
import { Divider, Stack, Typography } from "@mui/material"

// Components
import GlobalSearchInput from "@/components/ui/AppHeader/GlobalSearchInput"

// Types
import { Section } from "@/types/common"
import NotificationButton from "@/components/ui/Sidebar/NotificationsButton"

type AppHeaderProps = Readonly<{
    sectionName: Section
}>
export default function AppHeader(props: AppHeaderProps) {
    return (
        <>
            <Stack direction="row" justifyContent={"space-between"} alignItems="center" p={5}>
                <Typography variant={"h4"}>{props.sectionName}</Typography>
                <Stack direction="row" spacing={2}>
                    <GlobalSearchInput />
                    <NotificationButton />
                </Stack>
            </Stack>
            <Divider variant={"fullWidth"} sx={{ mb: 3 }} component={"hr"} />
        </>
    )
}