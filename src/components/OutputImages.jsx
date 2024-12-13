import React from "react";
import { Box, Typography } from "@mui/material";

const OutputImages = ({ image }) => {
  return (
    <Box textAlign="center" marginTop={3}>
      <Typography variant="h6" gutterBottom>
        Original Image and Mask
      </Typography>
      <Box 
        display="flex" 
        justifyContent="center" 
        gap={3} 
        flexWrap="wrap"
        sx={{
          '& img': {
            maxWidth: '100%',
            width: '250px', 
            border: '2px solid #ccc',
            borderRadius: '8px',
            objectFit: 'cover',
          },
        }}
      >
        <img src={image} alt="Original" />
        <img id="mask-output" alt="Mask Output" />
      </Box>
    </Box>
  );
};

export default OutputImages;
