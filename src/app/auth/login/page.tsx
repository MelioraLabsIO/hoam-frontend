"use client"

import AuthUI from "../../auth/Auth"

export default function Login() {
    return (
        <div className="container" style={{ padding: "50px 0", maxWidth: 400, margin: "0 auto" }}>
            <h1>Login</h1>
            <AuthUI />
        </div>
    )
}