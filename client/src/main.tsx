import { Component, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error("React error:", error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ fontFamily: "sans-serif", padding: "20px", maxWidth: "600px", margin: "40px auto" }}>
          <h2 style={{ color: "#c00" }}>Ошибка приложения</h2>
          <pre style={{ fontSize: "12px", color: "#333", whiteSpace: "pre-wrap", wordBreak: "break-all", background: "#fee", padding: "12px", borderRadius: "6px" }}>
            {this.state.error.message}{"\n\n"}{this.state.error.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
