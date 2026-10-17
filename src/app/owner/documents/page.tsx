import type { Metadata } from "next"
import DocumentLibrary from "./DocumentLibrary"

export const metadata: Metadata = { title: "Documents" }

export default function OwnerDocuments() {
    return (
        <>
            <h1 className="h1">Documents</h1>
            <DocumentLibrary />
        </>
    )
}
