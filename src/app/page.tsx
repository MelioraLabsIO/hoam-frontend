import styles from "./page.module.css"
import TemporarySidebar from "@/app/Sidebar"

export default function Home() {
    return (
        <>
            <TemporarySidebar />
            <div className={styles.page}>
                <main className={styles.main}></main>
            </div>
        </>
    )
}
