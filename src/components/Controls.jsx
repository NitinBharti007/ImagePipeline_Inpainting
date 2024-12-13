import React from "react";
import { Box, Slider, Typography, Button, Tooltip } from "@mui/material";

const Controls = ({ brushSize, setBrushSize, onClearCanvas, onExportMask }) => {
  return (
    <Box textAlign="center" marginBottom={3}>
      <Typography variant="body1" marginBottom={2} marginTop={2}>
        Brush Size: {brushSize}
      </Typography>
      <Slider
        value={brushSize}
        min={1}
        max={50}
        onChange={(e, newValue) => setBrushSize(newValue)}
        sx={{
          width: "80%",
          maxWidth: "400px",
          margin: "auto",
          "& .MuiSlider-rail": {
            backgroundColor: "#ccc",
          },
          "& .MuiSlider-track": {
            backgroundColor: "#3f51b5",
          },
        }}
      />
      <Box
        marginTop={2}
        display="flex"
        justifyContent="center"
        gap={2}
        flexDirection={{ xs: "column", sm: "row" }}
        alignItems="center"
      >
        <Tooltip title="Clear the canvas" arrow>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClearCanvas}
            sx={{
              padding: "8px 20px",
              fontSize: "14px",
              borderRadius: "8px",
              textTransform: "none",
              width: { xs: "70%", sm: "auto" },
            }}
          >
            Clear Canvas
          </Button>
        </Tooltip>
        <Tooltip title="Export the mask image" arrow>
          <Button
            variant="contained"
            color="primary"
            onClick={onExportMask}
            sx={{
              padding: "8px 20px",
              fontSize: "14px",
              borderRadius: "8px",
              textTransform: "none",
              width: { xs: "70%", sm: "auto" },
            }}
          >
            Export Mask
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Controls;
