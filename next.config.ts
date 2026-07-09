import type { NextConfig } from "next";



const nextConfig: NextConfig = {
	reactCompiler: true,
	env: {
		BUILD_TIME: `${Date.now()}`,
	},
	async headers() {
		return [
			{
				source: "/api/:path*",
				headers: [
					{
						key: "Access-Control-Allow-Origin",
						value: "*",
					},
					{
						key: "Access-Control-Allow-Methods",
						value: "*",
					},
					{
						key: "Access-Control-Allow-Headers",
						value: "*",
					},
					{
						key: "Cache-Control",
						value: "no-store, max-age=0",
					},
				],
			},
		];
	},
};

export default nextConfig;
