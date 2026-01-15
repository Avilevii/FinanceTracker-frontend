import Grid from "@mui/material/Grid";
import { filterIcons } from "../constance";
import { financeIconsMap } from "../icons";
import { styleBoxClick, styleGridItem, styleIconOnClick, styleIcons } from "../styles/gridIcons";
import Box from "@mui/material/Box";

const GridIcons = ({ onClickIcon, selectedIcon, }) => {
  const filteredIcons = Object.entries(financeIconsMap).filter(
    ([name]) => !filterIcons.includes(name)
  );
  const mapIcons = filteredIcons.map(( [name, icon ] ) => {
    const Icon = icon;
    return (
        <Grid
        key={name}
        size={{xs: 3, sm: 3, md: 2, lg: 1}}
        sx={styleGridItem}
        >
            <Box sx={{...styleBoxClick, ...(selectedIcon === name ? styleIconOnClick : {})}}> 
            <Box onClick={() => onClickIcon(name)} sx={styleIcons} >
                <Icon size={35}/>
            </Box>
            </Box>

        </Grid>
    )
  });

  return <Grid container spacing={1}>{mapIcons}</Grid>;
};
export default GridIcons;
