import { useState } from "react";
import Box from "@mui/material/Box";
import InputGlobal from "../globalComps/InputGlobal";
import Typography from "@mui/material/Typography";
import ButtonGlobal from "../globalComps/ButtonGlobal";
import {
  styleBoxIncome,
  styleBoxTree,
  styleBoxTwoIncome,
  styleButtonSend,
  styleInputIncome,
} from "../styles/incomeStyle";
import CategoriesGridGlobal from "../globalComps/CategoriesGridGlobal";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../features/categoriesSlice";
import { selectUserId } from "../features/authSlice";
import { createCategoriesThunk } from "../thunks/categoriesThunk";
import { createHistoryThunk } from "../thunks/historyThunk";
import { selectMessage } from "../features/historySlice";

const IncomeTranaction = () => {
  const [amount, setAmount] = useState("0");
  const [categoryId, setCategoryId] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null)

  const dispatch = useDispatch();

  const allCategories = useSelector(selectItems);
  const userId = useSelector(selectUserId);
  const message = useSelector(selectMessage);

  const categories = allCategories.filter(
    ({ categoryType }) => categoryType === "income"
  );
  const actions = [
    { id: "createCategory", categoryName: "הוספה", iconName: "create" },
    { id: "edit", categoryName: "עריכה", iconName: "edit" },
  ];

  const handleClickInput = () => {
    if (amount === "0") {
      setAmount("");
      setHasError(false);
    }
  };

  const handleBlur = () => {
    if (amount === "") {
      setAmount("0");
      setHasError(true);
    }
  };

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  const handleClickCategory = (category) => {
    const { id, categoryName, iconName } = category;
    if (id === "edit"){
    return  setSelectedCat(null)
    };
    if (id === "createCategory");
    if (category.userId === 0) {
      const newCategory = {
        userId,
        categoryName,
        categoryType: "income",
        iconName,
      };
      dispatch(createCategoriesThunk(newCategory));
    }
    setCategoryId(id);
    setSelectedCat(id);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newHistory = {
      userId,
      amount,
      categoryId,
      description: "HI",
    };
    dispatch(createHistoryThunk(newHistory));
    setAmount("0");
    setSelectedCat(null)
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={styleBoxIncome}>
      <Box sx={styleBoxTwoIncome}>
        <Typography sx={{ whiteSpace: "nowrap" }}>ILS</Typography>
        <InputGlobal
          variant="standard"
          error={hasError}
          style={styleInputIncome}
          onClick={handleClickInput}
          value={amount}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={hasError ? "enter amount." : ""}
        />
      </Box>
      <Typography>
        <br />
        CATEGORIES
        <br />
        <br />
      </Typography>
      <Box sx={{ px: 6 }}>
        <CategoriesGridGlobal
          selectedCat={selectedCat}
          categories={categories}
          onCategoryClick={handleClickCategory}
          actions={actions}
        />
        {message && <Typography>{message}</Typography>}
      </Box>
      <Box sx={styleBoxTree}>
        <ButtonGlobal
          type="submit"
          sx={styleButtonSend}
          disabled={amount > 0 && categoryId ? false : true}
        >
          send
        </ButtonGlobal>
      </Box>
    </Box>
  );
};

export default IncomeTranaction;
