import { Box } from "@mui/material";
import ButtonGlobal from "../globalComps/ButtonGlobal";

const ButtonMoreData = ({ sx, onClick, styleButton }) => {
  return (
    <Box sx={sx}>
      <ButtonGlobal sx={styleButton} onClick={onClick}>
        MORE
      </ButtonGlobal>
    </Box>
  );
};
export default ButtonMoreData;
