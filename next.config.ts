import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Desabilitar verificação estrita de Server Components para compatibilidade com react-redux
    serverComponentsExternalPackages: ['@reduxjs/toolkit', 'react-redux'],
  },
  // Configuração para Turbopack
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
