/** @type {import('next').NextConfig} */
const nextConfig = {
        env: {
            backendBaseUrl: 'http://localhost:5000/api',
        },
        eslint: {
            ignoreDuringBuilds: true,
        },
};


export default nextConfig;
