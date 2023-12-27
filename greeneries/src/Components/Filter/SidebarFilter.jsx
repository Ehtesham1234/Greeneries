import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import CheckBox from "./CheckBox";

const SidebarFilter = ({ dynamicNumber }) => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllIdentities, setShowAllIdentities] = useState(false);
  const [categories, setCategories] = useState([
    { id: 1, checked: false, label: "Author" },
    { id: 2, checked: false, label: "Writer" },
    { id: 3, checked: false, label: "Music" },
    { id: 4, checked: false, label: "Sound" },
    { id: 5, checked: false, label: "Audio" },
    { id: 6, checked: false, label: "Music video" },
  ]);

  const [identities, setIdentities] = useState([
    { id: 7, checked: false, label: "Editor" },
    { id: 8, checked: false, label: "Photographer" },
    { id: 9, checked: false, label: "Designer" },
    { id: 10, checked: false, label: "Editor" },
    { id: 11, checked: false, label: "Graphic designer" },
    { id: 12, checked: false, label: "Engineer" },
  ]);

  const handleChangeChecked = (id) => {
    const updatedCategories = categories.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setCategories(updatedCategories);

    const updatedIdentities = identities.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setIdentities(updatedIdentities);
  };

  const handleShowLessCategories = () => {
    setShowAllCategories(false);
  };

  const handleShowLessIdentities = () => {
    setShowAllIdentities(false);
  };

  return (
    <Box
      sx={{
        flex: "0 0 18rem",
        p: 1,
        border: "1px solid",
        borderRadius: 5,
        mt: 2,
        mr: 2,
        mb: 2,
      }}
    >
      <Box
        sx={{
          mb: 2,
          p: 2,
          borderColor: "grey.500",
        }}
      >
        <Typography variant="h6" sx={{ mb: 0.8, fontWeight: "bold" }}>
          Filter By Category
        </Typography>
        {categories
          .slice(0, showAllCategories ? categories.length : 5)
          .map((category) => (
            <CheckBox
              key={category.id}
              filterBy={category}
              handleChangeChecked={handleChangeChecked}
              dynamicNumber={dynamicNumber}
            />
          ))}
        {categories.length > 5 && !showAllCategories && (
          <Typography
            variant="body2"
            sx={{ mt: 0.5, color: "red", cursor: "pointer" }}
            onClick={() => setShowAllCategories(true)}
          >
            +{categories.length - 5} more
          </Typography>
        )}
        {showAllCategories && (
          <Typography
            variant="body2"
            sx={{ mt: 0.5, color: "red", cursor: "pointer" }}
            onClick={handleShowLessCategories}
          >
            Show less
          </Typography>
        )}

        <Typography variant="h6" sx={{ mb: 0.8, fontWeight: "bold" }}>
          Filter By Identity
        </Typography>
        {identities
          .slice(0, showAllIdentities ? identities.length : 5)
          .map((identity) => (
            <CheckBox
              key={identity.id}
              filterBy={identity}
              handleChangeChecked={handleChangeChecked}
              dynamicNumber={dynamicNumber}
            />
          ))}
        {identities.length > 5 && !showAllIdentities && (
          <Typography
            variant="body2"
            sx={{ mt: 0.5, color: "red", cursor: "pointer" }}
            onClick={() => setShowAllIdentities(true)}
          >
            +{identities.length - 5} more
          </Typography>
        )}
        {showAllIdentities && (
          <Typography
            variant="body2"
            sx={{ mt: 0.5, color: "red", cursor: "pointer" }}
            onClick={handleShowLessIdentities}
          >
            Show Less
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SidebarFilter;
