import React from "react";
import { Box, FormControl, Select, MenuItem, Typography } from "@mui/material";
const HeaderFilter = () => {
  const [sortBy, setSortBy] = React.useState("");
  const [viewAs, setViewAs] = React.useState("");

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
      <FormControl variant="outlined" size="small">
        <Typography variant="subtitle1">View As</Typography>
        <Select
          value={viewAs}
          onChange={(e) => setViewAs(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="grid">Grid</MenuItem>
          <MenuItem value="list">List</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default HeaderFilter;
