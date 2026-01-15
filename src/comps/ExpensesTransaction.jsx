import Box from "@mui/material/Box"
// import { styleExpensesBox } from "../styles/expensesTransactionStyle";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategoriesThunk } from "../thunks/categoriesThunk";
import { createHistoryThunk } from "../thunks/historyThunk";
import { styleBoxIncome, styleBoxTree, styleBoxTwoIncome, styleButtonSend, styleInputIncome } from "../styles/incomeStyle";
import CreateCategory from "../globalComps/CreateCategory";
import { selectItems, selectMessage } from "../features/categoriesSlice";
import { selectUserId } from "../features/authSlice";
import InputGlobal from "../globalComps/InputGlobal";
import CategoriesGridGlobal from "../globalComps/CategoriesGridGlobal";
import ButtonGlobal from "../globalComps/ButtonGlobal";

const ExpensesTransaction = () => {
 const [amount, setAmount] = useState("");
   const [categoryId, setCategoryId] = useState(0);
   const [hasError, setHasError] = useState(false);
   const [selectedCat, setSelectedCat] = useState(null);
   const [createCategory, setCreateCategory] = useState(false)
 
   const dispatch = useDispatch();
 
   const allCategories = useSelector(selectItems);
   const userId = useSelector(selectUserId);
   const message = useSelector(selectMessage);
 
   const categories = allCategories.filter(
     ({ categoryType }) => categoryType === "expenses"
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
     }
     else if(id === "createCategory"){
       setSelectedCat(false);
       setCreateCategory(true)
       return;
     }
     else if(category.userId === 0) {
       const newCategory = {
         userId,
         categoryName,
         categoryType: "expenses",
         iconName,
       };
       dispatch(createCategoriesThunk(newCategory));
     }
     else{
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
     };
     dispatch(createHistoryThunk(newHistory));
     setAmount("0");
     setSelectedCat(null)
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
         <Typography sx={{ml: '3%'}}>
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
     </Box>
   );
}
export default ExpensesTransaction