import Button from "@mui/material/Button"

const  ButtonGlobal = ({color="contained",children, onClick, type='button', sx, disabled=false, disableRipple=false, colorType}) => {
  return (
    <Button
    sx={sx}
     variant={color}
     onClick={onClick}
     type={type}
     disabled={disabled}
     disableRipple={disableRipple}
     color={colorType}
     >
    {children}
    </Button>
  )
}
export default ButtonGlobal