import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const backendTarget = "http://localhost:9090";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: backendTarget,
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => {
          if (/^\/api\/(auth|admin|customer|retailer)(\/|$)/.test(path)) {
            return path;
          }
          return path.replace(/^\/api/, "");
        },
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq, req) => {
            proxyReq.removeHeader("origin");
            proxyReq.removeHeader("referer");
            proxyReq.removeHeader("sec-fetch-site");
            proxyReq.removeHeader("sec-fetch-mode");
            proxyReq.removeHeader("sec-fetch-dest");

            proxyReq.setHeader("host", "localhost:9090");
            proxyReq.setHeader("x-forwarded-host", "localhost:5173");
            proxyReq.setHeader("x-forwarded-proto", "http");

            if (req.headers.origin) {
              proxyReq.setHeader("origin", backendTarget);
            }
          });
        }
      }
    }
  }
});
