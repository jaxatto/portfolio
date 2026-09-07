import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { SiteConfigProvider } from "@providers/SiteConfig";
// @ts-expect-error SCSS is handled by the bundler at runtime.
import "./styles/main.scss";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <SiteConfigProvider config={{ isJobSeeking: true }}>
        <App />
      </SiteConfigProvider>
    </React.StrictMode>,
  );
}
