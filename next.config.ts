import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Permite acceder a recursos JS desde otra red (como Docker o WSL)
  allowedDevOrigins: ["172.29.144.1", "localhost", "127.0.0.1", "192.168.1.50"],
};

export default nextConfig;
