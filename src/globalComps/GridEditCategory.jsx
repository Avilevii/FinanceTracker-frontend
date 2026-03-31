import { useSelector } from "react-redux";

import { Grid, Box, Typography } from "@mui/material";

import { selectUserId } from "../features/authSlice";
import { financeIconsMap } from "../icons";
import {
  sryleTypography,
  styleIcon,
  styleItemBox,
} from "../styles/gridEditStyle";
import { maxNameCategory } from "../utils";

const GridEditCategory = ({
  categories = [],
  onClickCategory,
  categoryType,
}) => {
  const userId = useSelector(selectUserId);

  const categoriesFiltered = categories.filter(
    (category) =>
      category.userId === userId && category.categoryType === categoryType,
  );

  const mapCategories = categoriesFiltered.map((category) => {
    const Icon = financeIconsMap[category.iconName];
    if (!Icon) return null;
    return (
      <Grid key={category.id} size={{ xs: 3, sm: 2, md: 2, lg: 1 }}>
        <Box sx={styleItemBox}>
          <Box sx={styleIcon} onClick={() => onClickCategory(category)}>
            <Icon size={30} />
          </Box>
          <Typography sx={sryleTypography}>
            {maxNameCategory(category.categoryName)}
          </Typography>
        </Box>
      </Grid>
    );
  });

  return (
    <Grid container spacing={1}>
      {mapCategories}
    </Grid>
  );
};
export default GridEditCategory;
