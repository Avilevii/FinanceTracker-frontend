import Popper from "@mui/material/Popper";
import { backgroundStyle } from "./headecolor";

export const styleBoxIncome = {
  display: "flex",
  flexDirection: "column",
  // backgroundColor: "var(--muidocs-palette-success-50, hsl(144, 72%, 95%))",
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
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const styleInputIncome = {
  "& input": { textAlign: "center", fontSize: "24px" },
};

export const styleButtonSend = {
  width: "50vw",
  maxWidth: 400,
  borderRadius: "30px",
  ...backgroundStyle,
};

export const styleBoxDate = {
  mt: 2,
  mx: "auto",
  width: { xs: 150, sm: 350 },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const styleDate = {
  textField: {
    InputLabelProps: {
      shrink: true, // כופה שה-label תמיד מעל השדה
      sx: {
        color: "green", // צבע ה-label
      },
    },
    InputProps: {
      sx: {
        backgroundColor: "white",
        borderRadius: 3,
        height: 40,
      },
    },
  },
  popper: {},
};
