import React, { useState, useRef } from "react";
import { Container, Typography, Box, Button, AppBar, Toolbar, CssBaseline } from "@mui/material";
import CanvasSection from "./components/CanvasSection";
import Controls from "./components/Controls";
import OutputImages from "./components/OutputImages";
import "./App.css";

const App = () => {
  const [image, setImage] = useState(null);
  const [brushSize, setBrushSize] = useState(5);
  const canvasRef = useRef(null);
  const maskCanvasRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleClearCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    const maskCtx = maskCanvasRef.current.getContext("2d");

    // Clear both canvases
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    maskCtx.clearRect(0, 0, maskCanvasRef.current.width, maskCanvasRef.current.height);

    // Reset the mask canvas to a black background
    maskCtx.fillStyle = "black";
    maskCtx.fillRect(0, 0, maskCanvasRef.current.width, maskCanvasRef.current.height);
  };

  const handleExportMask = () => {
    const maskCanvas = maskCanvasRef.current;
    const maskDataURL = maskCanvas.toDataURL("image/png");

    // Display the mask
    const maskImg = document.getElementById("mask-output");
    maskImg.src = maskDataURL;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar position="sticky" sx={{ width: "100%" }}>
        <Toolbar>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            Image Inpainting Widget
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ padding: "20px 0", flex: 1 }}>
        <Typography variant="body1" align="center" gutterBottom>
          Upload an image, draw a mask, and export the mask for inpainting!
        </Typography>
        <Box textAlign="center" marginBottom={3}>
          <Button variant="contained" component="label" color="primary" sx={{
              padding: "8px 20px",
              fontSize: "14px",
              borderRadius: "8px",
              textTransform: "none",
              width: { xs: "70%", sm: "auto" },
            }}>
            Upload Image
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </Button>
        </Box>

        {image && (
          <>
            <CanvasSection
              image={image}
              canvasRef={canvasRef}
              maskCanvasRef={maskCanvasRef}
              brushSize={brushSize}
            />
            <Controls
              brushSize={brushSize}
              setBrushSize={setBrushSize}
              onClearCanvas={handleClearCanvas}
              onExportMask={handleExportMask}
            />
            <OutputImages image={image} />
          </>
        )}
      </Container>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: "#3f51b5",
          color: "white",
          padding: "10px 0",
          position: "relative",
          bottom: 0,
          width: "100%", 
        }}
      >
        <Typography variant="body2" align="center">
          &copy; 2024 Image Inpainting App | Made By Nitin Bharti.
        </Typography>
      </Box>
    </Box>
  );
};

export default App;
