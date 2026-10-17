import type { Metadata } from "next"
import DuesPayment from "./DuesPayment"

export const metadata: Metadata = { title: "Dues & payments" }

// Placeholder data until the Supabase tables exist.
const HISTORY: {
    date: string
    home: string
    description: string
    amount: string
    waived?: boolean
}[] = [
    {
        date: "Jul 28",
        home: "14 Willow Bend Ct",
        description: "Q3 assessment",
        amount: "$285.00",
    },
    {
        date: "Jul 28",
        home: "9 Heron Way",
        description: "Q3 assessment",
        amount: "$285.00",
    },
    {
        date: "Apr 30",
        home: "Both homes",
        description: "Q2 assessment",
        amount: "$570.00",
    },
    {
        date: "Feb 15",
        home: "14 Willow Bend Ct",
        description: "Late fee · waived by board",
        amount: "$25.00",
        waived: true,
    },
]

export default function OwnerDues() {
    return (
        <>
            <h1 className="h1">Dues &amp; payments</h1>

            <DuesPayment />

            <section className="card" style={{ gap: 4, paddingTop: 22 }}>
                <h2 className="h2">Payment history</h2>
                <div className="table-wrap">
                    <table className="table" style={{ minWidth: 600 }}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Home</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Receipt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {HISTORY.map((p) => (
                                <tr key={p.date + p.home + p.description}>
                                    <td>{p.date}</td>
                                    <td>{p.home}</td>
                                    <td className="muted">{p.description}</td>
                                    <td
                                        className={
                                            p.waived ? "strong muted" : "strong"
                                        }
                                        style={
                                            p.waived
                                                ? {
                                                      textDecoration:
                                                          "line-through",
                                                  }
                                                : undefined
                                        }
                                    >
                                        {p.waived && (
                                            <span className="visually-hidden">
                                                Waived:{" "}
                                            </span>
                                        )}
                                        {p.amount}
                                    </td>
                                    <td>
                                        {p.waived ? (
                                            <span className="muted">—</span>
                                        ) : (
                                            <a
                                                href="#"
                                                className="strong"
                                                aria-label={`Receipt PDF, ${p.description}, ${p.home}`}
                                            >
                                                PDF
                                            </a>
                                        )}
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
