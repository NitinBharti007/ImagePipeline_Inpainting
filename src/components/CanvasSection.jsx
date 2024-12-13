import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const CanvasSection = ({ image, canvasRef, maskCanvasRef, brushSize }) => {
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });

  const handleDraw = (x, y) => {
    const canvas = canvasRef.current;
    const maskCanvas = maskCanvasRef.current;
    const ctx = canvas.getContext("2d");
    const maskCtx = maskCanvas.getContext("2d");

    // Draw the brush on the canvas
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, 2 * Math.PI);
    ctx.fill();

    // Draw the mask on the hidden mask canvas
    maskCtx.fillStyle = "white";
    maskCtx.beginPath();
    maskCtx.arc(x, y, brushSize, 0, 2 * Math.PI);
    maskCtx.fill();
  };

  const handleMouseDraw = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    handleDraw(x, y);
  };

  const handleTouchDraw = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const touch = e.touches[0];
    const x = (touch.clientX - rect.left) * scaleX;
    const y = (touch.clientY - rect.top) * scaleY;

    handleDraw(x, y);
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    const handleTouchMove = (e) => {
      e.preventDefault(); // Prevent scrolling while drawing
      handleTouchDraw(e);
    };

    // Add event listeners for touch and mouse interactions
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });

    // Cleanup event listener on unmount
    return () => {
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, [canvasRef, handleTouchDraw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const maskCanvas = maskCanvasRef.current;
    const ctx = canvas.getContext("2d");
    const maskCtx = maskCanvas.getContext("2d");

    // Set canvas size to the image dimensions when the image is loaded
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvasWidth = img.width;
      const canvasHeight = img.height;

      setCanvasDimensions({ width: canvasWidth, height: canvasHeight });

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      maskCanvas.width = canvasWidth;
      maskCanvas.height = canvasHeight;

      ctx.drawImage(img, 0, 0);
      maskCtx.fillStyle = "black";
      maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
    };
  }, [image]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      marginBottom={3}
      position="relative"
      sx={{
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "16px",
        borderRadius: "8px",
        backgroundColor: "#fff",
        width: "80%",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Draw Mask on Image
      </Typography>

      <Box
        position="relative"
        width="100%"
        height="auto"
        overflow="hidden"
        sx={{
          width: "100%",
          maxWidth: "700px",
          height: "auto",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            background: `url(${image}) no-repeat center/contain`,
            backgroundSize: "contain",
            border: "2px solid #ccc",
            cursor: "crosshair",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            width: "100%",
            height: "auto",
          }}
          onMouseMove={(e) => e.buttons === 1 && handleMouseDraw(e)}
        />
        <canvas ref={maskCanvasRef} style={{ display: "none" }} />
      </Box>
    </Box>
  );
};

export default CanvasSection;
