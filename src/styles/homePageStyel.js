import { backgroundStyle } from "./headecolor";

export const styleBoxHome = {
  minHeight: "88.7vh",
  backgroundColor: "var(--muidocs-palette-success-50, hsl(144, 72%, 95%))",
};

export const styleHeaderHome = {
  minHeight: "40vh",
  ...backgroundStyle,
  borderEndEndRadius: "20px",
  borderEndStartRadius: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

export const stylepaperBalance = {
  minWidth: 250,
  minHeight: 150,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: 5,
  border: "2px solid black",
  gap: 6,
  py: 3,
  backgroundColor:
    "var(--muidocs-palette-success-50, hsla(143, 69%, 95%, 0.83))",
};
