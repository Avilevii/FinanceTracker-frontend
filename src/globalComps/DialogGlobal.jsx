import Dialog from '@mui/material/Dialog';

const DialogGlobal = ({open, onClose, children, fullScreen, paperProps, sx }) => {
  
  return (
   <Dialog
   open={open}
   onClose={onClose}
   fullScreen={fullScreen ?? false}
   slotProps={{paper: paperProps}}
   sx={sx}
   >
    {children}
   </Dialog>
  )
}

export default  DialogGlobal