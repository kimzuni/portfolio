import type { NextConfig } from "next";



const nextConfig: NextConfig = {
	reactCompiler: true,
	env: {
		BUILD_TIME: `${Date.now()}`,
	},
};

export default nextConfig;
