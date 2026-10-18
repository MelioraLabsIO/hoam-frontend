import type { Metadata } from "next"
import Link from "next/link"
import BookingPicker from "./BookingPicker"

export const metadata: Metadata = { title: "Book an amenity" }

// Placeholder data until the Supabase tables exist.
const MY_BOOKINGS = [
    { title: "Clubhouse · Book club", when: "Sun, Oct 18 · 2–4 PM" },
]

export default function OwnerAmenities() {
    return (
        <>
            <h1 className="h1">Book an amenity</h1>

            <div className="split">
                <BookingPicker />

                <aside className="split-side stack" style={{ gap: 16 }}>
                    <section className="card" style={{ padding: 18, gap: 12 }}>
                        <h2 className="h3">My bookings</h2>
                        {MY_BOOKINGS.map((b) => (
                            <div
                                key={b.title + b.when}
                                className="tile"
                                style={{
                                    background: "var(--blue-bg)",
                                    color: "var(--blue-fg)",
                                }}
                            >
                                <span className="strong">{b.title}</span>
                                <span className="text-sm">{b.when}</span>
                            </div>
                        ))}
                        <a href="#" className="link-strong">
                            Past bookings
                        </a>
                    </section>
                    <section className="card" style={{ padding: 18, gap: 8 }}>
                        <h2 className="h3">Your tenant</h2>
                        <span
                            className="text-md muted"
                            style={{ lineHeight: 1.45 }}
                        >
                            Jordan Lee at 9 Heron Way can book amenities. Their
                            bookings count toward that home&apos;s limits.
                        </span>
                        <Link href="/owner/homes" className="link-strong">
                            Change tenant access
                        </Link>
                    </section>
                </aside>
            </div>
        </>
    )
}
