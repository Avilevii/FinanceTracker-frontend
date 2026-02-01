import Box from "@mui/material/Box";
// import { styleExpensesBox } from "../styles/expensesTransactionStyle";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createHistoryThunk } from "../thunks/historyThunk";
import {
  styleBoxDate,
  styleBoxIncome,
  styleBoxTree,
  styleBoxTwoIncome,
  styleButtonSend,
  styleDate,
  styleInputIncome,
} from "../styles/incomeStyle";
import CreateCategory from "../globalComps/CreateCategory";
import { selectItems, selectMessage } from "../features/categoriesSlice";
import { selectUserId } from "../features/authSlice";
import InputGlobal from "../globalComps/InputGlobal";
import CategoriesGridGlobal from "../globalComps/CategoriesGridGlobal";
import ButtonGlobal from "../globalComps/ButtonGlobal";
import dayjs from "dayjs";
import DatesGlobal from "../globalComps/DatesGlobal";
import EditCategory from "../globalComps/EditCategory";

const ExpensesTransaction = () => {
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);
  const [createCategory, setCreateCategory] = useState(false);
  const [valueDate, setValueDate] = useState(null);
  const [editCategory, setEditCategory] = useState(false);

  const clientDate = valueDate?.format("DD/MM/YYYY");

  const dispatch = useDispatch();

  const allCategories = useSelector(selectItems);
  const userId = useSelector(selectUserId);
  const message = useSelector(selectMessage);

  const categories = allCategories.filter(
    ({ categoryType }) => categoryType === "expenses",
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
    const { id } = category;
    if (id === "edit") {
      setSelectedCat(null);
      setEditCategory(true);
    } else if (id === "createCategory") {
      setSelectedCat(false);
      setCreateCategory(true);
      return;
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
      description: "HI",
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
            label="בחר תאריך"
            onlyPast={true}
            sx={styleDate}
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
            disabled={!(amount > 0 && categoryId)}
          >
            send
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
        categoryType="expenses"
      />
    </Box>
  );
};
export default ExpensesTransaction;
