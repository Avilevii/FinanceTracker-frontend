import TextField from "@mui/material/TextField";

const InputGlobal = ({
  label,
  type = "text",
  onChange,
  value,
  style,
  error = false,
  variant,
  helperText,
  onClick,
  onBlur,
}) => {
  return (
    <TextField
      label={label}
      type={type}
      onChange={onChange}
      value={value}
      sx={style}
      error={error}
      variant={variant}
      helperText={helperText}
      onClick={onClick}
      onBlur={onBlur}
    />
  );
};
export default InputGlobal;
