import Grid from "@mui/material/Grid";
import { financeIconsMap } from "../icons";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import {
  styleBoxClickIcon,
  styleBoxIcon,
  styleGridItem,
} from "../styles/categoriesGridStyle";
import { Box } from "@mui/system";
import { styleIconOnClick } from "../styles/gridIcons";

const CategoriesGridGlobal = ({
  categories = [],
  onCategoryClick,
  actions = [],
  selectedCat,
}) => {
  const items = [...categories, ...actions];
  const maxNameCategory = (name, maxLength = 8) => {
    return name.length > maxLength ? name.slice(0, maxLength) + ".." : name;
  };

  const mapCategories = items.map(({ id, categoryName, iconName, userId }) => {
    const Icon = financeIconsMap[iconName];
    const isSelected = selectedCat === id;

    return (
      <Grid key={id} size={{ xs: 4, sm: 3, md: 2, lg: 1 }} sx={styleGridItem}>
        
          <Box
            sx={{ ...styleBoxClickIcon, ...(isSelected && styleIconOnClick) }}
          >
            <Box
              sx={{
                ...styleBoxIcon,
                ...(typeof id === "string" && {
                  bgcolor: "red",
                }),
              }}
              onClick={() => {
                onCategoryClick({ id, categoryName, iconName, userId });
              }}
            >
              <Icon
                size={35}
                style={{ color: "white"}}
              />
            </Box>
            <Typography>{maxNameCategory(categoryName)}</Typography>
          </Box>
      </Grid>
    );
  });
  return (
    <Grid container spacing={2}>
      {mapCategories}
    </Grid>
  );
};
export default CategoriesGridGlobal;
