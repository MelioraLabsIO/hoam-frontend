import type { Metadata } from "next"
import { PageHeader } from "@/components/ui"
import DocumentsLibrary from "./DocumentsLibrary"

export const metadata: Metadata = { title: "Documents" }

export default function ManagerDocuments() {
    return (
        <>
            <PageHeader
                eyebrow="Shared with residents unless marked board only"
                title="Documents"
                actions={
                    <>
                        <button type="button" className="btn">
                            New folder
                        </button>
                        <button type="button" className="btn btn-primary">
                            Upload
                        </button>
                    </>
                }
            />
            <DocumentsLibrary />
        </>
    )
}
