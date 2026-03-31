import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Box,
  ButtonGroup,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DialogGlobal from "./DialogGlobal";
import {
  buttonSubmitStyle,
  expensesButtonClickStyle,
  expensesButtonStyle,
  incomeButtonClickStyle,
  incomeButtonStyle,
  styleDialogContent,
  styleInputCreatCategory,
} from "../styles/createCategoryStyle.js";
import ButtonGlobal from "./ButtonGlobal";
import InputGlobal from "./InputGlobal";
import GridIcons from "./GridIcons";
import { selectUserId } from "../features/authSlice";
import { createCategoriesThunk } from "../thunks/categoriesThunk";

const CreateCategory = ({ open = false, onclose }) => {
  const income = "income";
  const expenses = "expenses";

  const dispatch = useDispatch();

  const [categoryName, setCategoryName] = useState("");
  const [hasError, setHasError] = useState(false);
  const [selectedType, setSelectedType] = useState(income);
  const [iconName, setIconName] = useState("");

  const userId = useSelector(selectUserId);

  const handleChange = ({ target: { value } }) => {
    setCategoryName(value);
  };

  const handleBlur = () => {
    if (categoryName === "") setHasError(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onclose();
    const newCategory = {
      userId,
      categoryName,
      categoryType: selectedType,
      iconName,
    };
    dispatch(createCategoriesThunk(newCategory));
  };

  const handleClickIconn = (iconName) => {
    setIconName(iconName);
  };

  return (
    <Box>
      <DialogGlobal
        open={open}
        onclose={onclose}
        fullScreen={true}
        paperProps={{
          sx: {
            backgroundColor:
              "var(--muidocs-palette-success-50, hsl(144, 72%, 95%))",
          },
        }}
      >
        <DialogTitle
          sx={{
            p: 1,
            bgcolor: "green",
            borderBottomRightRadius: "15px",
            borderBottomLeftRadius: "15px",
          }}
        >
          <Box sx={styleDialogContent}>
            <IconButton onClick={onclose}>
              <ArrowBackIcon sx={{ color: "black" }} />
            </IconButton>
            <Typography>CREATE</Typography>
          </Box>
        </DialogTitle>
        <br />
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={styleInputCreatCategory}>
              <InputGlobal
                variant="standard"
                onChange={handleChange}
                helperText={hasError ? "enter category name." : " "}
                onBlur={handleBlur}
                error={hasError}
                onClick={() => setHasError(false)}
                placeholder="Enter category name."
                autoFocus={true}
              />

              <Box>
                <ButtonGroup>
                  <ButtonGlobal
                    color="outlined"
                    onClick={() => setSelectedType(expenses)}
                    sx={{
                      ...expensesButtonStyle,
                      ...(selectedType === expenses
                        ? expensesButtonClickStyle
                        : {}),
                    }}
                    disableRipple={true}
                  >
                    expenses
                  </ButtonGlobal>
                  <ButtonGlobal
                    sx={{
                      ...incomeButtonStyle,
                      ...(selectedType === income
                        ? incomeButtonClickStyle
                        : {}),
                    }}
                    color="outlined"
                    onClick={() => setSelectedType(income)}
                    disableRipple={true}
                  >
                    income
                  </ButtonGlobal>
                </ButtonGroup>
              </Box>
              <GridIcons
                onClickIcon={handleClickIconn}
                selectedIcon={iconName}
              />
            </Box>
            <ButtonGlobal
              disabled={!(categoryName && iconName)}
              sx={buttonSubmitStyle}
              type="submit"
            >
              CREATE
            </ButtonGlobal>
          </Box>
        </DialogContent>
      </DialogGlobal>
    </Box>
  );
};
export default CreateCategory;
