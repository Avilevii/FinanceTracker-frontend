import Grid from "@mui/material/Grid";
import { financeIconsMap } from "../icons";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import { styleBoxIcon, styleGridItem } from "../styles/categoriesGridStyle";
import { Box } from "@mui/system";

const CategoriesGridGlobal = ({ categories=[], onCategoryClick, actions=[], selectedCat }) => {
    
    const items = [...categories, ...actions]
  const maxNameCategory = (name, maxLength = 8) => {
   return name.length > maxLength ? name.slice(0, maxLength) + ".." : name;
  };

  const mapCategories = items.map(
    ({ id, categoryName, iconName, userId }) => {
        const Icon = financeIconsMap[iconName];
      const isSelected = selectedCat === id;

      return (
        <Grid
          key={id}
          size={{xs: 4, sm: 3, md: 2, lg: 1}}
          onClick={() => {
            onCategoryClick({id, categoryName, iconName, userId});
          }}
          sx={styleGridItem}
        >
          <Badge
            color="success"
            badgeContent="✓"
            invisible={!isSelected}
            overlap="circular"
          >
            <Box sx={{...styleBoxIcon, ...(typeof id === 'string' && {
                bgcolor: 'red'
            })
            }}>
            <Icon size={35} style={{color: typeof id === 'string' ? 'white': ""}} />
            </Box>
          </Badge>
          <Typography>{maxNameCategory(categoryName)}</Typography>
        </Grid>
      );
    }
  );
  return (
    <Grid container spacing={2}>
      {mapCategories}
    </Grid>
  );
};
export default CategoriesGridGlobal;
