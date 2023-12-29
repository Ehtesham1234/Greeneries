import { Icon } from "@iconify/react";
import Box from "@mui/material/Box";

const Iconify = ({ icon, width = 20, sx, ...other }) => (
  <Box
    component={Icon}
    className="component-iconify"
    icon={icon}
    sx={{ width, height: width, ...sx }}
    {...other}
  />
);

export default Iconify;
