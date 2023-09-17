import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RetroProvider } from "@/state/index.tsx";
import { ThemeProvider } from "@/components/themeProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RetroProvider>
      <ThemeProvider defaultTheme="dark" storageKey="host-a-retro">
        <App />
      </ThemeProvider>
    </RetroProvider>
  </React.StrictMode>,
);
