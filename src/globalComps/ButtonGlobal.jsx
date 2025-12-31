import Button from "@mui/material/Button"

const  ButtonGlobal = ({color="contained",children, onClick, type='button'}) => {
  return (
    <Button
     variant={color}
     onClick={onClick}
     type={type}
     >
    {children}
    </Button>
  )
}
export default ButtonGlobal