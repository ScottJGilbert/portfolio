export const themeTokens = {
  light: {
    surface: "#F8FAF8",
    surfaceLow: "#F2F4F2",
    surfaceHigh: "#FFFFFF",
    text: "#191C1B",
    primary: "#012D1D",
    primaryStrong: "#1B4332",
    accent: "#C1ECD4",
    outlineGhost: "rgba(65, 72, 68, 0.2)",
  },
  dark: {
    surface: "#041710",
    surfaceLow: "#01110B",
    surfaceHigh: "#1A2E26",
    text: "#D1E8DC",
    primary: "#95D4B3",
    primaryStrong: "#253931",
    accent: "#414844",
    outlineGhost: "rgba(65, 72, 68, 0.25)",
  },
} as const;

export const semanticScale = {
  surface: {
    base: "surface",
    section: "surfaceLow",
    card: "surfaceHigh",
  },
  typography: {
    display: "clamp(2.25rem, 6vw, 4rem)",
    headline: "clamp(1.5rem, 4vw, 2.25rem)",
    body: "1rem",
    label: "0.75rem",
  },
  radius: {
    md: "0.75rem",
    xl: "1.5rem",
    pill: "9999px",
  },
} as const;
