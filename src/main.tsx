import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RetroProvider } from "@/state/index.tsx";
import { ThemeProvider } from "@/components/themeProvider";
import TimerProvider from "./components/TimerProvider.tsx";
import { MDXProvider } from "@mdx-js/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RetroProvider>
      <ThemeProvider defaultTheme="dark" storageKey="host-a-retro">
        <TimerProvider>
          <MDXProvider>
            <App />
          </MDXProvider>
        </TimerProvider>
      </ThemeProvider>
    </RetroProvider>
  </React.StrictMode>,
);
