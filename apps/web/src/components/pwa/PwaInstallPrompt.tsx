"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "sw-pwa-install-dismissed";

export function PwaInstallPrompt() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    if (localStorage.getItem(DISMISS_KEY) === "1") return;

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  if (!visible || !promptEvent) return null;

  async function install() {
    if (!promptEvent) return;
    await promptEvent.prompt();
    await promptEvent.userChoice;
    setVisible(false);
    setPromptEvent(null);
  }

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
    setPromptEvent(null);
  }

  return (
    <div className="pwa-install" role="region" aria-label="Install Spinwheels app">
      <div className="pwa-install-inner">
        <div>
          <strong>Install Spinwheels</strong>
          <p>Add to your home screen for quick access — works like an app.</p>
        </div>
        <div className="pwa-install-actions">
          <button type="button" className="pwa-install-btn" onClick={install}>
            Install
          </button>
          <button type="button" className="pwa-install-dismiss" onClick={dismiss} aria-label="Dismiss">
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
