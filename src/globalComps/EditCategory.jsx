import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import GridEditCategory from "./GridEditCategory";
import { selectCategories, selectStatus } from "../features/categoriesSlice";
import DialogGlobal from "./DialogGlobal";
import { styleDialogContent } from "../styles/createCategoryStyle.js";
import {
  styleBoxIconPopup,
  styleBoxInputIcon,
  styleButtonDelete,
  styleButtonEdit,
  styleDialog,
  styleEditDialog,
  stylePopup,
} from "../styles/editCategoryStyle";
import InputGlobal from "./InputGlobal";
import { financeIconsMap } from "../icons";
import ButtonGlobal from "./ButtonGlobal";
import { updateCategoryThunk } from "../thunks/categoriesThunk";
import { SUCCEEDED } from "../constants";

const EditCategory = ({ onClose, open, categoryType }) => {
  const dispatch = useDispatch();

  const [openPopup, setOpenPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editNameCategory, setEditNameCategory] = useState("");
  const [idCategory, setIdCategory] = useState(null);

  const statusEdit = useSelector(selectStatus);
  const categories = useSelector(selectCategories);

  const IconPopup = financeIconsMap[selectedCategory?.iconName];

  const handleClickCategory = (category) => {
    setIdCategory(category.id);
    setSelectedCategory(category);
    setOpenPopup(true);
  };

  const handleClickEdit = () => {
    if (editNameCategory && idCategory) {
      const id = idCategory;
      const newCategory = editNameCategory;
      dispatch(updateCategoryThunk({ id, newCategory }));
    }

    if (statusEdit === SUCCEEDED) setOpenPopup(false);
  };

  return (
    <Box>
      <DialogGlobal
        paperProps={styleDialog}
        onClose={onClose}
        open={open}
        fullScreen={true}
      >
        <DialogTitle sx={styleEditDialog}>
          <Box sx={styleDialogContent}>
            <IconButton onClick={onClose}>
              <ArrowBackIcon sx={{ color: "black" }} />
            </IconButton>
            <Typography>EDIT</Typography>
          </Box>
        </DialogTitle>

        <DialogContent>
          <GridEditCategory
            categoryType={categoryType}
            categories={categories}
            key={categoryType}
            onClickCategory={handleClickCategory}
          />
        </DialogContent>

        <DialogGlobal
          onClose={() => setOpenPopup(false)}
          open={openPopup}
          paperProps={stylePopup}
        >
          <DialogContent>
            <Box sx={styleBoxInputIcon}>
              <Box sx={styleBoxIconPopup}>
                <IconPopup size={20} />
              </Box>
              :
              <InputGlobal
                defaultValue={selectedCategory?.categoryName}
                onChange={(event) => setEditNameCategory(event.target.value)}
                variant="standard"
              />
            </Box>
            <Box sx={styleButtonDelete}>
              <ButtonGlobal colorType="error" color="outlined">
                delete
              </ButtonGlobal>
            </Box>
            <Box sx={styleButtonEdit}>
              <ButtonGlobal onClick={handleClickEdit}>update</ButtonGlobal>
            </Box>
          </DialogContent>
        </DialogGlobal>
      </DialogGlobal>
    </Box>
  );
};
export default EditCategory;
