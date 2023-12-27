import React from "react";
import { Box } from "@mui/material";
import SidebarFilter from "../../Components/Filter/SidebarFilter";
import HeaderFilter from "../../Components/Filter/HeaderFilter";
import PlantCollection from "../../Components/Plants/PlantCollection";

const Collection = () => {
  return (
    <Box display="flex">
      <SidebarFilter />
      <Box display="flex" flexDirection="column" flexGrow={1}>
        <HeaderFilter />
        <Box flexGrow={1}>
          <PlantCollection />
        </Box>
      </Box>
    </Box>
  );
};

export default Collection;
