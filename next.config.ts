import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Desabilitar verificação estrita de Server Components para compatibilidade com react-redux
    serverComponentsExternalPackages: ["@reduxjs/toolkit", "react-redux"],
  },
  // Remover configuração do Turbopack para evitar problemas de compatibilidade
  // turbopack: {
  //   root: process.cwd(),
  // },
  // Usar output standalone para evitar problemas de build
  output: "standalone",
};

export default nextConfig;
