import Box from "@mui/material/Box";
import DialogGlobal from "./DialogGlobal";
import { styleDialogContent } from "../styles/createCategoryStyle";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DialogContent from "@mui/material/DialogContent";
import GridEditCategory from "./GridEditCategory";
import { useDispatch, useSelector } from "react-redux";
import { selectItems, selectStatus } from "../features/categoriesSlice";
import { useState } from "react";
import useIsMobile from "../hooks/useIsMobile";
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

const EditCategory = ({ onClose, open, categoryType }) => {

  const dispatch = useDispatch();
  const statusEdit  = useSelector(selectStatus);
  console.log("I", statusEdit)

  const [openPopup, setOpenPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editNameCategory, setEditNameCategory] = useState('');
  const [idCategory, setIdCategory] = useState(null);

  const IconPopup = financeIconsMap[selectedCategory?.iconName];

  const isMobile = useIsMobile();

  const handleClickCategory = (category) => {
    setIdCategory(category.id)
    setSelectedCategory(category);
    setOpenPopup(true);
  };

  const handleClickEdit = () => {
    if(!editNameCategory || !idCategory) return;
    const id = idCategory;
    const newCategory = editNameCategory;
    dispatch(updateCategoryThunk({id, newCategory}));
    if(statusEdit === 'succeeded') setOpenPopup(false)
  }

  const categories = useSelector(selectItems);
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
          fullScreen={isMobile}
          onClose={() => setOpenPopup(false)}
          open={openPopup}
          paperProps={isMobile ? {sx: {backgroundColor:  "var(--muidocs-palette-success-50, hsl(144, 72%, 95%))",}} : stylePopup}
        >
          {isMobile ? (
            <DialogTitle sx={styleEditDialog}>
              <Box sx={styleDialogContent}>
                <IconButton onClick={() => setOpenPopup(false)}>
                  <ArrowBackIcon sx={{ color: "black" }} />
                </IconButton>
                <Typography>EDIT</Typography>
              </Box>
            </DialogTitle>
          ) : null}
          <DialogContent>
            <Box sx={styleBoxInputIcon}>
                <Box sx={styleBoxIconPopup}>
                <IconPopup size={20}/>
                </Box>:
            <InputGlobal
                defaultValue={selectedCategory?.categoryName}
                onChange={(event) => setEditNameCategory(event.target.value)}
                variant='standard'

            />
            </Box>
            <Box sx={styleButtonDelete}>
              <ButtonGlobal
              colorType="error"
              color='outlined'
              >
                delete
              </ButtonGlobal>
            </Box>
            <Box sx={styleButtonEdit}>
              <ButtonGlobal onClick={handleClickEdit}>send</ButtonGlobal>
            </Box>
          </DialogContent>
        </DialogGlobal>
      </DialogGlobal>
    </Box>
  );
};
export default EditCategory;
