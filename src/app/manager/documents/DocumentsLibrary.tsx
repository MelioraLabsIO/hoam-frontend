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
import { Pill, VisuallyHidden } from "@/components/ui"

type FolderId = "all" | "gov" | "min" | "fin" | "forms"
type Doc = {
    name: string
    ext: "PDF" | "DOC" | "XLS"
    folder: Exclude<FolderId, "all">
    board: boolean
    updated: string
}

// Placeholder data until the Supabase tables exist.
const FOLDERS: { id: FolderId; name: string }[] = [
    { id: "all", name: "All documents" },
    { id: "gov", name: "Governing documents" },
    { id: "min", name: "Meeting minutes" },
    { id: "fin", name: "Financials" },
    { id: "forms", name: "Forms" },
]

const DOCS: Doc[] = [
    {
        name: "Declaration of CC&Rs (amended 2023)",
        ext: "PDF",
        folder: "gov",
        board: false,
        updated: "Mar 2, 2023",
    },
    {
        name: "Bylaws",
        ext: "PDF",
        folder: "gov",
        board: false,
        updated: "Mar 2, 2023",
    },
    {
        name: "Architectural design guidelines",
        ext: "PDF",
        folder: "gov",
        board: false,
        updated: "Jan 18, 2026",
    },
    {
        name: "Board meeting minutes — September",
        ext: "PDF",
        folder: "min",
        board: false,
        updated: "Oct 1, 2026",
    },
    {
        name: "Executive session notes — September",
        ext: "DOC",
        folder: "min",
        board: true,
        updated: "Oct 1, 2026",
    },
    {
        name: "2027 draft budget",
        ext: "XLS",
        folder: "fin",
        board: true,
        updated: "Oct 10, 2026",
    },
    {
        name: "Q3 financial statement",
        ext: "PDF",
        folder: "fin",
        board: false,
        updated: "Oct 8, 2026",
    },
    {
        name: "Architectural change request form",
        ext: "PDF",
        folder: "forms",
        board: false,
        updated: "Feb 4, 2026",
    },
    {
        name: "Annual meeting proxy form",
        ext: "PDF",
        folder: "forms",
        board: false,
        updated: "Oct 13, 2026",
    },
]

const FolderIcon = (p: IconProps) => (
    <StrokeIcon strokeWidth={1.8} {...p}>
        <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </StrokeIcon>
)

const HEADINGS = ["Name", "Folder", "Visible to", "Updated"]

const folderName = (id: FolderId) =>
    FOLDERS.find((f) => f.id === id)?.name ?? ""

export default function DocumentsLibrary() {
    const [folder, setFolder] = useState<FolderId>("all")
    const files = DOCS.filter((d) => folder === "all" || d.folder === folder)

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
                                p: 2,
                                borderRadius: `${theme.radius.xl}px`,
                                flexDirection: "column",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                                gap: 1.25,
                                textAlign: "left",
                                whiteSpace: "normal",
                                borderColor: "border.main",
                                ...(sel && {
                                    borderWidth: 2,
                                    borderColor: "primary.main",
                                    bgcolor: "background.sunken",
                                    "&:hover": {
                                        borderColor: "primary.main",
                                        bgcolor: "background.sunken",
                                    },
                                }),
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
                                    variant="body1"
                                    component="span"
                                    sx={{ fontWeight: "fontWeightSemiBold" }}
                                >
                                    {f.name}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    component="span"
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
                sx={{ pt: 1, px: 2.5, pb: 1.5 }}
                aria-label={folderName(folder)}
            >
                <TableContainer>
                    <Table sx={(theme) => ({ minWidth: theme.spacing(85) })}>
                        <TableHead>
                            <TableRow>
                                {HEADINGS.map((h) => (
                                    <TableCell key={h} sx={{ pt: 1.75 }}>
                                        {h}
                                    </TableCell>
                                ))}
                                <TableCell sx={{ pt: 1.75 }}>
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
                                            <Typography
                                                variant="tiny"
                                                component="span"
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
                                                {d.ext}
                                            </Typography>
                                            <Typography
                                                variant="inherit"
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
                                    <TableCell>
                                        <Pill tone={d.board ? "amber" : "blue"}>
                                            {d.board
                                                ? "Board only"
                                                : "All residents"}
                                        </Pill>
                                    </TableCell>
                                    <TableCell sx={{ color: "text.secondary" }}>
                                        {d.updated}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Link
                                            component="button"
                                            type="button"
                                            variant="label"
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
