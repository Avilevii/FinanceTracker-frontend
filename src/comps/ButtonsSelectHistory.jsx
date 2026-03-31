import { Box } from "@mui/material";
import ButtonGlobal from "../globalComps/ButtonGlobal";

const ButtonsSelectHistory = ({
  onClickAll,
  onClickMonth,
  onClickRange,
  sx,
}) => {
  return (
    <Box sx={sx}>
      <ButtonGlobal onClick={onClickAll}>ALL</ButtonGlobal>
      <ButtonGlobal onClick={onClickMonth}>MONTH</ButtonGlobal>
      <ButtonGlobal onClick={onClickRange}>RANGE</ButtonGlobal>
    </Box>
  );
};
export default ButtonsSelectHistory;
