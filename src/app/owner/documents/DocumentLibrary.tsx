"use client"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import Link from "@mui/material/Link"
import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { StrokeIcon, type IconProps } from "@/components/icons"
import { VisuallyHidden } from "@/components/ui"

type FolderId = "all" | "gov" | "min" | "fin" | "forms"

// Placeholder data until the Supabase tables exist.
const FOLDERS: { id: FolderId; name: string }[] = [
    { id: "all", name: "All documents" },
    { id: "gov", name: "Governing documents" },
    { id: "min", name: "Meeting minutes" },
    { id: "fin", name: "Financials" },
    { id: "forms", name: "Forms" },
]

const DOCS: {
    name: string
    ext: string
    folder: Exclude<FolderId, "all">
    updated: string
}[] = [
    {
        name: "Declaration of CC&Rs (amended 2023)",
        ext: "PDF",
        folder: "gov",
        updated: "Mar 2, 2023",
    },
    { name: "Bylaws", ext: "PDF", folder: "gov", updated: "Mar 2, 2023" },
    {
        name: "Architectural design guidelines",
        ext: "PDF",
        folder: "gov",
        updated: "Jan 18, 2026",
    },
    {
        name: "Board meeting minutes — September",
        ext: "PDF",
        folder: "min",
        updated: "Oct 1, 2026",
    },
    {
        name: "Q3 financial statement",
        ext: "PDF",
        folder: "fin",
        updated: "Oct 8, 2026",
    },
    {
        name: "2027 proposed budget (for the Nov 12 vote)",
        ext: "PDF",
        folder: "fin",
        updated: "Oct 13, 2026",
    },
    {
        name: "Architectural change request form",
        ext: "PDF",
        folder: "forms",
        updated: "Feb 4, 2026",
    },
    {
        name: "Annual meeting proxy form",
        ext: "PDF",
        folder: "forms",
        updated: "Oct 13, 2026",
    },
    {
        name: "Lease addendum for tenants",
        ext: "PDF",
        folder: "forms",
        updated: "May 9, 2026",
    },
]

const FolderIcon = (p: IconProps) => (
    <StrokeIcon strokeWidth={1.8} {...p}>
        <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </StrokeIcon>
)

const folderName = (id: FolderId) =>
    FOLDERS.find((f) => f.id === id)?.name ?? ""

export default function DocumentLibrary() {
    const [folder, setFolder] = useState<FolderId>("all")
    const files = DOCS.filter((d) => folder === "all" || d.folder === folder)
    const headCell = { pt: 1.75 }

    return (
        <>
            <Box
                role="group"
                aria-label="Folders"
                sx={(theme) => ({
                    display: "grid",
                    gridTemplateColumns: `repeat(auto-fit, minmax(min(${theme.spacing(25)}, 100%), 1fr))`,
                    gap: 1.5,
                })}
            >
                {FOLDERS.map((f) => {
                    const n =
                        f.id === "all"
                            ? DOCS.length
                            : DOCS.filter((d) => d.folder === f.id).length
                    const sel = f.id === folder
                    return (
                        <Button
                            key={f.id}
                            aria-pressed={sel}
                            onClick={() => setFolder(f.id)}
                            sx={(theme) => ({
                                minHeight: theme.spacing(11),
                                flexDirection: "column",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                                textAlign: "left",
                                whiteSpace: "normal",
                                gap: 1.25,
                                p: sel ? 1.875 : 2,
                                borderRadius: `${theme.radius.xl}px`,
                                border: sel ? 2 : 1,
                                borderColor: sel
                                    ? "primary.main"
                                    : "border.main",
                                bgcolor: sel
                                    ? "background.sunken"
                                    : "background.paper",
                                color: "text.primary",
                                "&:hover": {
                                    bgcolor: sel
                                        ? "background.sunken"
                                        : "background.paper",
                                    borderColor: sel
                                        ? "primary.main"
                                        : "border.strong",
                                },
                            })}
                        >
                            <FolderIcon
                                sx={{
                                    color: sel
                                        ? "primary.main"
                                        : "text.secondary",
                                }}
                            />
                            <Stack component="span" sx={{ gap: 0.25 }}>
                                <Typography
                                    component="span"
                                    sx={{ fontWeight: "fontWeightSemiBold" }}
                                >
                                    {f.name}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {n} {n === 1 ? "file" : "files"}
                                </Typography>
                            </Stack>
                        </Button>
                    )
                })}
            </Box>

            <Card
                component="section"
                aria-label={folderName(folder)}
                sx={{ pt: 1, px: 2.5, pb: 1.5, gap: 0 }}
            >
                <TableContainer>
                    <Table sx={(theme) => ({ minWidth: theme.spacing(75) })}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={headCell}>Name</TableCell>
                                <TableCell sx={headCell}>Folder</TableCell>
                                <TableCell sx={headCell}>Updated</TableCell>
                                <TableCell sx={headCell}>
                                    <VisuallyHidden>Actions</VisuallyHidden>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {files.map((d) => (
                                <TableRow key={d.name}>
                                    <TableCell>
                                        <Stack
                                            direction="row"
                                            sx={{
                                                alignItems: "center",
                                                gap: 1.25,
                                            }}
                                        >
                                            <Box
                                                component="span"
                                                aria-hidden="true"
                                                sx={(theme) => ({
                                                    ...theme.typography
                                                        .dateMonth,
                                                    width: theme.spacing(4.25),
                                                    height: theme.spacing(5),
                                                    flex: "0 0 auto",
                                                    borderRadius: `${theme.radius.xs * 0.75}px`,
                                                    bgcolor: "neutral.soft",
                                                    color: "neutral.softContrast",
                                                    display: "flex",
                                                    alignItems: "flex-end",
                                                    justifyContent: "center",
                                                    pb: 0.75,
                                                })}
                                            >
                                                {d.ext}
                                            </Box>
                                            <Typography
                                                variant="body2"
                                                component="span"
                                                sx={{
                                                    fontWeight:
                                                        "fontWeightSemiBold",
                                                }}
                                            >
                                                {d.name}
                                            </Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell sx={{ color: "text.secondary" }}>
                                        {folderName(d.folder)}
                                    </TableCell>
                                    <TableCell sx={{ color: "text.secondary" }}>
                                        {d.updated}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Link
                                            href="#"
                                            aria-label={`Download ${d.name}`}
                                        >
                                            Download
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </>
    )
}
