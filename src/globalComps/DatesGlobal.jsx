import { DatePicker } from "@mui/x-date-pickers";
import Box from "@mui/material/Box";

import dayjs from "dayjs";

const DatesGlobal = ({
  label,
  valueSingle,
  valueRange,
  onlyPast = false,
  onChange,
  mode = "single",
  sx,
  slotProps,
  defaultValue,
  variant,
  open,
  onClose,
  views,
}) => {
  const limit = onlyPast ? dayjs() : undefined;

  const [startDate, endDate] = Array.isArray(valueRange) ? valueRange : [null, null];


  if (variant === "button") {
    return (
      <Box sx={sx}>
        <DatePicker
          label={label}
          value={valueSingle}
          onChange={onChange}
          maxDate={limit}
          defaultValue={defaultValue}
          open={open}
          onClose={onClose}
          views={views}
          slotProps={{
            textField: {
              sx: {
                width: 0,
                height: 0,
                minWidth: 0,
                minHeight: 0,
                opacity: 0,
                pointerEvents: "none",
              },
            },
          }}
        />
      </Box>
        );
  };

  return (
    <Box>
      {mode === "range" ? (
        <Box sx={sx}>
          <DatePicker
            slotProps={slotProps}
            calendars={1}
            maxDate={limit}
            value={startDate}
            onChange={(newValue) => {
              onChange([newValue, endDate])
            }}
           label='start date'
          />

          <DatePicker
            slotProps={slotProps}
            calendars={1}
            maxDate={limit}
            value={endDate}
            onChange={(newValue) => {
              onChange([startDate, newValue])
            }}
            label='end date'
          />
        </Box>
        
      ) : (

        <DatePicker
          label={label}
          value={valueSingle}
          onChange={onChange}
          maxDate={limit}
          slotProps={slotProps}
          defaultValue={defaultValue}
        />
      )}
    </Box>
  );
};
export default DatesGlobal;


