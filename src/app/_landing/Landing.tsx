"use client"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import { AutoGrid, BrandMark } from "@/components/ui"
import NextLinkComposed from "@/theme/NextLinkComposed"

type Portal = {
    href: string
    n: number
    name: string
    text: string
    style: "dark" | "owner" | "tenant"
}

/** Landing page body: portal cards and the "who sees what" table. */
export function Landing({
    portals,
    access,
}: {
    portals: readonly Portal[]
    access: [string, string, string, string][]
}) {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                pt: 4,
                pb: 7,
                px: { xs: 2, sm: 4, md: 7 },
            }}
        >
            <Stack
                sx={(theme) => ({
                    maxWidth: theme.spacing(145),
                    mx: "auto",
                    gap: 3.5,
                })}
            >
                <Stack
                    component="header"
                    direction="row"
                    sx={{
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 1.5,
                    }}
                >
                    <Stack
                        direction="row"
                        sx={{ alignItems: "center", gap: 1.25 }}
                    >
                        <BrandMark />
                        <Typography variant="h5" component="span">
                            HOAM
                        </Typography>
                    </Stack>
                    <Button href="/auth/login" variant="contained">
                        Sign in
                    </Button>
                </Stack>

                <Stack
                    sx={(theme) => ({
                        gap: 1,
                        maxWidth: theme.layout.authCard.lg,
                        pt: 2,
                    })}
                >
                    <Typography
                        variant="overline"
                        color="text.secondary"
                        sx={{ fontWeight: "fontWeightSemiBold" }}
                    >
                        Willow Creek HOA
                    </Typography>
                    <Typography variant="h1">Who sees what
                    </Typography>
                    <Typography
                        variant="h6"
                        component="p"
                        color="text.secondary"
                        sx={{
                            fontWeight: "fontWeightRegular",
                            lineHeight: 1.5,
                            textWrap: "pretty",
                        }}
                    >
                        Three portals, one community. Each person signs in to
                        the portal for their role, and only sees what that role
                        allows.
                    </Typography>
                </Stack>

                <AutoGrid kind="cards">
                    {portals.map((p) => {
                        const dark = p.style === "dark"
                        const tenant = p.style === "tenant"
                        return (
                            <Card
                                key={p.href}
                                component={NextLinkComposed}
                                href={p.href}
                                variant={dark ? "dark" : "outlined"}
                                sx={{
                                    gap: 1,
                                    textDecoration: "none",
                                    ...(!dark && {
                                        border: 2,
                                        borderColor: tenant
                                            ? "teal.main"
                                            : "primary.main",
                                        "&:hover": {
                                            borderColor: tenant
                                                ? "teal.main"
                                                : "primary.main",
                                        },
                                    }),
                                }}
                            >
                                <Typography
                                    variant="overline"
                                    color={
                                        dark
                                            ? "nav.sub"
                                            : tenant
                                              ? "teal.softContrast"
                                              : "primary.main"
                                    }
                                >
                                    Portal {p.n}
                                </Typography>
                                <Typography variant="h3" component="span">
                                    {p.name}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color={dark ? "nav.text" : "text.secondary"}
                                    sx={{ lineHeight: 1.45 }}
                                >
                                    {p.text}
                                </Typography>
                            </Card>
                        )
                    })}
                </AutoGrid>

                <Card component="section" sx={{ pt: 1, px: 2.5, pb: 2, gap: 0 }}>
                    <TableContainer>
                        <Table
                            sx={(theme) => ({
                                minWidth: theme.spacing(102.5),
                                "& .MuiTableCell-root": {
                                    fontSize: theme.typography.body1.fontSize,
                                },
                            })}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ width: "24%", pt: 2 }}>
                                        Feature
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: "25%",
                                            color: "text.primary",
                                            fontWeight: "fontWeightBold",
                                        }}
                                    >
                                        HOA Manager
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: "25%",
                                            color: "primary.main",
                                            fontWeight: "fontWeightBold",
                                        }}
                                    >
                                        Owner
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: "26%",
                                            color: "teal.softContrast",
                                            fontWeight: "fontWeightBold",
                                        }}
                                    >
                                        Tenant
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {access.map(([feature, m, o, t]) => (
                                    <TableRow key={feature}>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            sx={{
                                                color: "text.primary",
                                                fontWeight:
                                                    "fontWeightSemiBold",
                                                py: 1.75,
                                                pr: 1.5,
                                            }}
                                        >
                                            {feature}
                                        </TableCell>
                                        {[m, o, t].map((value, i) => (
                                            <TableCell
                                                key={i}
                                                sx={{
                                                    color: value
                                                        ? "text.primary"
                                                        : "text.faint",
                                                    py: 1.75,
                                                }}
                                            >
                                                {value || "Not shown"}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1.75 }}
                    >
                        “Not shown” means the screen doesn&apos;t exist in that
                        portal at all. It isn&apos;t greyed out or locked,
                        it&apos;s simply not there.
                    </Typography>
                </Card>
            </Stack>
        </Box>
    )
}
