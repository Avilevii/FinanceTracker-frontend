import TextField from '@mui/material/TextField';


const InputGlobal = ({label, type='text', onChange, value, style}) => {
  return (
        <TextField
          label={label}
          type={type}
          onChange={onChange}
          value={value}
          sx={style}
        />

  )
}
export default InputGlobal