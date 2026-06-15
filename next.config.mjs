import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

/** @type {import('next').NextConfig} */
export default function nextConfig(phase) {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      // Keep dev output separate from production output so dev does not read stale build artifacts.
      distDir: ".next-dev",
      allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.18.196"],
    };
  }

  return {};
}
