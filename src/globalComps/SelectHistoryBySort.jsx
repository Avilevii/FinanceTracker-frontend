import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const SelectHistoryBySort = ({
  open,
  onClose,
  onChange,
  listItems = [],
  label,
  value,
  widthElement,
}) => {
  const listItemsMap = listItems.map((item) => (
    <MenuItem value={item} key={item}>
      {item}
    </MenuItem>
  ));

  return (
    <Box sx={{ width: widthElement }}>
      <FormControl variant="standard" fullWidth>
        <Select
          value={value}
          onChange={onChange}
          open={open}
          onClose={onClose}
          disableUnderline
          displayEmpty
        >
          <MenuItem value="">{label}</MenuItem>
          {listItemsMap}
        </Select>
      </FormControl>
    </Box>
  );
};
export default SelectHistoryBySort;
