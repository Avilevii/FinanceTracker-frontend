import Button from "@mui/material/Button"

const  ButtonGlobal = ({color="contained",children, onClick, type='button', sx, disabled=false}) => {
  return (
    <Button
    sx={sx}
     variant={color}
     onClick={onClick}
     type={type}
     disabled={disabled}
     >
    {children}
    </Button>
  )
}
export default ButtonGlobal