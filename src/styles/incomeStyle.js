import { backgroundStyle } from "./headecolor";

export const styleBoxIncome = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "var(--muidocs-palette-success-50, hsl(144, 72%, 95%))",
};

export const styleBoxTwoIncome = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  justifyContent: "center",
};

export const styleBoxTree = {
  position: "fixed",
  bottom: 20,
  left: "50%",
  transform: "translateX(-50%)",
};

export const styleInputIncome = {
  "& input": { textAlign: "center", fontSize: "24px" },
};

export const styleButtonSend = {
            width: "50vw",
            maxWidth: 400,
            borderRadius: "30px",
            ...backgroundStyle,
          }
