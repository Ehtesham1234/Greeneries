import React from "react";
import { Box } from "@mui/material";
import SidebarFilter from "../../Components/Filter/SidebarFilter";
import HeaderFilter from "../../Components/Filter/HeaderFilter";
import PlantCollections from "../../Components/Plants/PlantCollections";

const Collection = () => {
  return (
    <Box display="flex">
      <SidebarFilter />
      <Box display="flex" flexDirection="column" flexGrow={1}>
        <HeaderFilter />
        <Box flexGrow={1}>
          <PlantCollections />
        </Box>
      </Box>
    </Box>
  );
};

export default Collection;
