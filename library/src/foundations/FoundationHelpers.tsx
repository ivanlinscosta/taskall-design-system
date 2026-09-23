import * as React from "react";

export function useCssVar(varName: string): string {
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    const updateValue = () => {
      const probe = document.createElement("div");
      probe.style.display = "none";
      probe.style.color = `var(${varName})`;
      document.body.appendChild(probe);
      
      const computed = getComputedStyle(probe).color;
      
      if (computed === "" || computed === "rgba(0, 0, 0, 0)") {
        probe.style.color = "";
        probe.style.width = `var(${varName})`;
        const width = getComputedStyle(probe).width;
        if (width !== "auto" && width !== "") {
          setValue(width);
        } else {
          const directValue = getComputedStyle(document.body).getPropertyValue(varName).trim();
          setValue(directValue);
        }
      } else {
        setValue(computed);
      }
      
      document.body.removeChild(probe);
    };

    updateValue();
    
    const observer = new MutationObserver(updateValue);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-color-mode", "data-brand", "data-density", "data-shape"] });
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-color-mode", "data-brand", "data-density", "data-shape"] });
    
    return () => observer.disconnect();
  }, [varName]);

  return value;
}

export function useDirectCssVar(varName: string): string {
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    const updateValue = () => {
      const directValue = getComputedStyle(document.body).getPropertyValue(varName).trim();
      setValue(directValue);
    };

    updateValue();
    
    const observer = new MutationObserver(updateValue);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-color-mode", "data-brand", "data-density", "data-shape"] });
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-color-mode", "data-brand", "data-density", "data-shape"] });
    
    return () => observer.disconnect();
  }, [varName]);

  return value;
}

export const PageContainer: React.FC<{ children: React.ReactNode; title: string; description: string }> = ({
  children,
  title,
  description,
}) => (
  <div style={{ maxWidth: 1024, margin: "0 auto", padding: "var(--hive-space-32) 0", color: "var(--hive-content-primary)", fontFamily: "var(--hive-font-family)" }}>
    <h1 style={{ font: "var(--hive-font-h1)", margin: "0 0 var(--hive-space-16) 0" }}>{title}</h1>
    <p style={{ font: "var(--hive-font-paragraph-l)", color: "var(--hive-content-secondary)", margin: "0 0 var(--hive-space-48) 0", maxWidth: "80ch" }}>
      {description}
    </p>
    {children}
  </div>
);

export const Section: React.FC<{ title: string; description?: string; children: React.ReactNode }> = ({
  title,
  description,
  children,
}) => (
  <section style={{ marginBottom: "var(--hive-space-64)" }}>
    <h3 style={{ font: "var(--hive-font-h3)", margin: "0 0 var(--hive-space-8) 0", borderBottom: "1px solid var(--hive-border-subtle)", paddingBottom: "var(--hive-space-16)" }}>
      {title}
    </h3>
    {description && (
      <p style={{ font: "var(--hive-font-paragraph-m)", color: "var(--hive-content-secondary)", margin: "0 0 var(--hive-space-24) 0" }}>
        {description}
      </p>
    )}
    <div>{children}</div>
  </section>
);

export const Grid: React.FC<{ children: React.ReactNode; minWidth?: number }> = ({ children, minWidth = 240 }) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}px, 1fr))`, gap: "var(--hive-space-24)" }}>
    {children}
  </div>
);
