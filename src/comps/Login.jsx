import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Box, Typography, CircularProgress } from "@mui/material";

import InputGlobal from "../globalComps/InputGlobal";
import ButtonGlobal from "../globalComps/ButtonGlobal";
import {
  selectError,
  selectMessage,
  selectStatus,
} from "../features/authSlice.js";
import { loginThunk } from "../thunks/authThunk.js";
import { FAILED, LOADING, SUCCEEDED } from "../constants.js";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const message = useSelector(selectMessage);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  useEffect(() => {
    if (status === SUCCEEDED) {
      navigate("/home");
    }
  }, [status, navigate]);

  const handleChangeUserName = ({ target: { value } }) => setUserName(value);
  const handleChangePassword = ({ target: { value } }) => setPassword(value);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginThunk({ userName, password }));
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <InputGlobal
        label="User Name"
        onChange={handleChangeUserName}
        value={userName}
        autoFocus={true}
      />
      <InputGlobal
        label="Password"
        onChange={handleChangePassword}
        value={password}
        type="password"
      />
      <ButtonGlobal type="submit">submit</ButtonGlobal>
      {status === LOADING && <CircularProgress />}
      {status === SUCCEEDED && <Typography>{message}</Typography>}
      {status === FAILED && (
        <Typography sx={{ color: "red" }}>{error}</Typography>
      )}
    </Box>
  );
};

export default Login;
