import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { SiteConfigProvider } from "@providers/SiteConfig";
import { ThemeProvider } from "@providers/Theme";
import "./styles/theme.css";
// @ts-expect-error SCSS is handled by the bundler at runtime.
import "./styles/main.scss";
import "./styles/theme-bridge.css";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <ThemeProvider>
        <SiteConfigProvider config={{ isJobSeeking: true }}>
          <App />
        </SiteConfigProvider>
      </ThemeProvider>
    </React.StrictMode>,
  );
}
