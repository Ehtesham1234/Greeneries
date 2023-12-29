import React from "react";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Typography,
  TextField,
} from "@mui/material";

const HeaderFilter = () => {
  const [sortBy, setSortBy] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <FormControl variant="outlined" size="small">
        <Typography variant="subtitle1">Sort By</Typography>
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
          <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
        </Select>
      </FormControl>
      <TextField
        variant="outlined"
        size="small"
        label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Box>
  );
};

export default HeaderFilter;
