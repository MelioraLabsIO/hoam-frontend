import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    async redirects() {
        return [
            { source: "/login", destination: "/auth/login", permanent: true },
            // Old placeholder routes now live in the HOA Manager portal.
            { source: "/dashboard", destination: "/manager", permanent: false },
            {
                source: "/houses",
                destination: "/manager/residents",
                permanent: false,
            },
            { source: "/settings", destination: "/manager", permanent: false },
        ]
    },
}

export default nextConfig
