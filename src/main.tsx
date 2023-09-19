import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RetroProvider } from "@/state/index.tsx";
import { ThemeProvider } from "@/components/themeProvider";
import { MDXProvider } from "@mdx-js/react";
import TimerProvider from "./components/TimerProvider.tsx";
import components from "@/components/markdownComponents.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RetroProvider>
      <ThemeProvider defaultTheme="dark" storageKey="host-a-retro">
        <TimerProvider>
          <MDXProvider components={components}>
            <App />
          </MDXProvider>
        </TimerProvider>
      </ThemeProvider>
    </RetroProvider>
  </React.StrictMode>,
);
