import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Typography } from "@mui/material";

import dayjs from "dayjs";

import InputGlobal from "../globalComps/InputGlobal";
import ButtonGlobal from "../globalComps/ButtonGlobal";
import {
  styleBoxDate,
  styleBoxIncome,
  styleBoxTree,
  styleBoxTwoIncome,
  styleButtonSend,
  styleDate,
  styleInputIncome,
} from "../styles/incomeStyle";
import CategoriesGridGlobal from "../globalComps/CategoriesGridGlobal";
import { selectCategories } from "../features/categoriesSlice";
import { selectUserId } from "../features/authSlice";
import { createHistoryThunk } from "../thunks/historyThunk";
import { selectMessage } from "../features/historySlice";
import CreateCategory from "../globalComps/CreateCategory";
import DatesGlobal from "../globalComps/DatesGlobal";
import EditCategory from "../globalComps/EditCategory";
import { ACTIONS, CREATE_CATEGORY, EDIT, FORMAT_DATE } from "../constants";

const TransactionForm = ({ categoryType }) => {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);
  const [createCategory, setCreateCategory] = useState(false);
  const [valueDate, setValueDate] = useState(null);
  const [editCategory, setEditCategory] = useState(false);

  const allCategories = useSelector(selectCategories);
  const userId = useSelector(selectUserId);
  const message = useSelector(selectMessage);

  const clientDate = valueDate?.format(FORMAT_DATE);

  const categoriesByType = allCategories.filter(
    ({ categoryType: type }) => type === categoryType,
  );
  const actions = ACTIONS;

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

  const handleChange = ({ target: { value } }) => {
    setAmount(value);
  };

  const handleClickCategory = (category) => {
    const { id } = category;

    if (id === EDIT) {
      setSelectedCat(null);
      setEditCategory(true);
    } else if (id === CREATE_CATEGORY) {
      setSelectedCat(false);
      setCreateCategory(true);
    } else {
      setCategoryId(id);
      setSelectedCat(id);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newHistory = {
      userId,
      amount,
      categoryId,
      description: "",
      clientDate,
    };
    dispatch(createHistoryThunk(newHistory));
    setAmount("0");
    setSelectedCat(null);
  };

  return (
    <Box>
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
            helperText={hasError ? "enter amount." : " "}
            autoFocus={true}
          />
        </Box>
        <Box sx={styleBoxDate}>
          <DatesGlobal
            label="select date"
            onlyPast={true}
            slotProps={styleDate}
            defaultValue={dayjs()}
            value={valueDate}
            onChange={setValueDate}
          />
        </Box>
        <Typography sx={{ ml: "3%" }}>
          <br />
          CATEGORIES
          <br />
          <br />
        </Typography>
        <Box sx={{ px: 6, mb: 10 }}>
          <CategoriesGridGlobal
            selectedCat={selectedCat}
            categories={categoriesByType}
            onCategoryClick={handleClickCategory}
            actions={actions}
          />
          {message && <Typography>{message}</Typography>}
        </Box>
        <Box sx={styleBoxTree}>
          <ButtonGlobal
            type="submit"
            sx={styleButtonSend}
            disabled={!(amount > 0 && categoryId)}
          >
            ADD TRANSACTION
          </ButtonGlobal>
        </Box>
      </Box>
      <CreateCategory
        onclose={() => setCreateCategory(false)}
        open={createCategory}
      />
      <EditCategory
        open={editCategory}
        onClose={() => setEditCategory(false)}
        categoryType={categoryType}
      />
    </Box>
  );
};

export default TransactionForm;
