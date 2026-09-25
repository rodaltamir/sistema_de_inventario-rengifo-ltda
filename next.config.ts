import type { NextConfig } from "next";

const extraOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((s) => s.trim())
  : [];

const nextConfig: NextConfig = {
  output: "standalone",
  // Permite acceder a recursos JS desde la red local en desarrollo
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "192.168.*.*",
    "10.*.*.*",
    "172.*.*.*",
    "rengifo_ltda",
    "Rengifo_Ltda",
    "rengifo-ltda",
    "*.local",
    "*.lan",
  ],
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
      allowedOrigins: [
        "localhost:8080",
        "localhost:3000",
        "localhost",
        "127.0.0.1:8080",
        "127.0.0.1:3000",
        "127.0.0.1",
        "Rengifo_Ltda:8080",
        "rengifo_ltda:8080",
        "Rengifo_Ltda:3000",
        "rengifo_ltda:3000",
        "Rengifo_Ltda",
        "rengifo_ltda",
        "rengifo-ltda:8080",
        "rengifo-ltda:3000",
        "rengifo-ltda",
        "192.168.*.*",
        "192.168.0.24:8080",
        "192.168.0.24:3000",
        "192.168.0.24",
        "10.*.*.*",
        "172.*.*.*",
        "*.local:8080",
        "*.local:3000",
        "*.local",
        "*.lan:8080",
        "*.lan:3000",
        "*.lan",
        ...extraOrigins,
      ],
    },
  },
};

export default nextConfig;
