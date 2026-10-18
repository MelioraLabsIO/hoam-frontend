"use client"

import { useState } from "react"

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

const folderName = (id: FolderId) =>
    FOLDERS.find((f) => f.id === id)?.name ?? ""

export default function DocumentLibrary() {
    const [folder, setFolder] = useState<FolderId>("all")
    const files = DOCS.filter((d) => folder === "all" || d.folder === folder)

    return (
        <>
            <div
                role="group"
                aria-label="Folders"
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(min(200px, 100%), 1fr))",
                    gap: 12,
                }}
            >
                {FOLDERS.map((f) => {
                    const n =
                        f.id === "all"
                            ? DOCS.length
                            : DOCS.filter((d) => d.folder === f.id).length
                    const sel = f.id === folder
                    return (
                        <button
                            key={f.id}
                            type="button"
                            aria-pressed={sel}
                            onClick={() => setFolder(f.id)}
                            className="stack"
                            style={{
                                minHeight: 88,
                                textAlign: "left",
                                padding: sel ? 15 : 16,
                                borderRadius: 16,
                                border: sel
                                    ? "2px solid var(--primary)"
                                    : "1px solid var(--border)",
                                background: sel
                                    ? "var(--surface-sunken)"
                                    : "var(--surface)",
                                color: "var(--ink)",
                                gap: 10,
                                cursor: "pointer",
                            }}
                        >
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke={sel ? "var(--primary)" : "var(--muted)"}
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            </svg>
                            <span className="stack" style={{ gap: 2 }}>
                                <span className="strong">{f.name}</span>
                                <span className="text-sm muted">
                                    {n} {n === 1 ? "file" : "files"}
                                </span>
                            </span>
                        </button>
                    )
                })}
            </div>

            <section
                className="card"
                style={{ padding: "8px 20px 12px", gap: 0 }}
                aria-label={folderName(folder)}
            >
                <div className="table-wrap">
                    <table className="table" style={{ minWidth: 600 }}>
                        <thead>
                            <tr>
                                <th style={{ paddingTop: 14 }}>Name</th>
                                <th style={{ paddingTop: 14 }}>Folder</th>
                                <th style={{ paddingTop: 14 }}>Updated</th>
                                <th style={{ paddingTop: 14 }}>
                                    <span className="visually-hidden">
                                        Actions
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map((d) => (
                                <tr key={d.name}>
                                    <td>
                                        <div
                                            className="row"
                                            style={{ gap: 10 }}
                                        >
                                            <span
                                                aria-hidden="true"
                                                style={{
                                                    width: 34,
                                                    height: 40,
                                                    flex: "0 0 auto",
                                                    borderRadius: 6,
                                                    background:
                                                        "var(--gray-bg)",
                                                    color: "var(--gray-fg)",
                                                    fontSize: 10,
                                                    fontWeight: 700,
                                                    display: "flex",
                                                    alignItems: "flex-end",
                                                    justifyContent: "center",
                                                    paddingBottom: 6,
                                                }}
                                            >
                                                {d.ext}
                                            </span>
                                            <span className="strong">
                                                {d.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="muted">
                                        {folderName(d.folder)}
                                    </td>
                                    <td className="muted">{d.updated}</td>
                                    <td style={{ textAlign: "right" }}>
                                        <a
                                            href="#"
                                            className="strong"
                                            aria-label={`Download ${d.name}`}
                                        >
                                            Download
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}
