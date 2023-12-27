import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const CheckBox = ({ handleChangeChecked, filterBy, dynamicNumber }) => {
  const { checked, label, id } = filterBy;

  return (
    <div>
      <FormControlLabel
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: 0,
          fontSize: ".8rem",
          fontFamily: `'Raleway', sans-serif`,
        }}
        value="end"
        labelPlacement="end"
        label={`${label} (${dynamicNumber})`}
        control={
          <Checkbox
            sx={{
              color: "white",
              "&$checked": {
                color: "#000",
              },
            }}
            color="warning"
            size="small"
            checked={checked}
            onChange={() => handleChangeChecked(id)}
            inputProps={{ "aria-label": "checkbox with small size" }}
          />
        }
      />
    </div>
  );
};

export default CheckBox;
