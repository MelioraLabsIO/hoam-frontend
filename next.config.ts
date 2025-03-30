import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        })
        return config
    },
    async redirects() {
        return [
            {
                source: "/login",
                destination: "/auth/login",
                permanent: true,
            },
        ]
    },
}

export default nextConfig
