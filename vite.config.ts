import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const mdx = await import("@mdx-js/rollup");

  return {
    optimizeDeps: {
      include: ["react/jsx-runtime"],
    },
    plugins: [
      mdx.default({ remarkPlugins: [] }),
      {
        name: "create-",
      },
      react(),
    ],
    assetsInclude: ["./src/energisers/*.md"],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
