import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoMdExit } from "react-icons/io";

import { Box, DialogContentText, DialogActions } from "@mui/material";

import DialogGlobal from "../globalComps/DialogGlobal";
import ButtonGlobal from "../globalComps/ButtonGlobal";
import { styleButtonsLogout, styleDialogLogout } from "../styles/logoutStyle";
import { logout } from "../features/authSlice";
import { resetStateBalance } from "../features/balanceSlice";
import { resetStateHistory } from "../features/historySlice";
import { resetStateCategories } from "../features/categoriesSlice";

const Logout = ({ sx, variant }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickExit = () => {
    dispatch(logout());
    dispatch(resetStateBalance());
    dispatch(resetStateHistory());
    dispatch(resetStateCategories());
    localStorage.removeItem("userId");
    navigate("/auth");
  };

  return (
    <Box>
      <ButtonGlobal color={variant} sx={sx} onClick={handleOpen}>
        <IoMdExit size={23} />
      </ButtonGlobal>
      <DialogGlobal
        paperProps={styleDialogLogout}
        open={open}
        onClose={handleClose}
      >
        <DialogContentText>Exiting the app?</DialogContentText>
        <DialogActions>
          <ButtonGlobal onClick={handleClose} sx={styleButtonsLogout}>
            CANCEL
          </ButtonGlobal>

          <ButtonGlobal
            colorType="error"
            onClick={handleClickExit}
            sx={{ ...styleButtonsLogout, px: 3.6 }}
          >
            EXIT
          </ButtonGlobal>
        </DialogActions>
      </DialogGlobal>
    </Box>
  );
};
export default Logout;
