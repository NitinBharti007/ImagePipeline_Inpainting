# Image Inpainting Widget

## Description
This is an image inpainting application that allows users to upload an image, draw a mask, and export the mask for inpainting.

## How to Run the Project Locally

### Prerequisites:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

### Steps:
1. **Clone the repository**:
   ```bash
   git clone https://github.com/NitinBharti007/ImagePipeline_Inpainting.git
2. **Navigate to the project directory**:
   ```bash
   cd image-inpainting-widget
3. **Install the dependencies**:
   ```bash
   npm install
4. **Run the development server**:
   ```bash
   npm run start
The application should now be running locally at http://localhost:3000

### Libraries Used:
- **React** – JavaScript library for building user interfaces
- **Material UI** – React components for faster and easier web development

### Challenges Faced and Solutions:
**Challenge 1**: Handling Canvas Scaling for Different Screen Sizes
- **Problem**: Ensuring that users can draw on the canvas consistently across various screen sizes.
- **Solution**: I calculated the scaling factor using the canvas's width and height relative to the screen dimensions, ensuring consistent drawing.

**Challenge 2**: Exporting Mask from Canvas
- **Problem**: Exporting the mask generated on the canvas in a usable format.
- **Solution**: I used the toDataURL() method on the canvas to convert the mask into a downloadable PNG format.

### Contact
For any queries or issues, feel free to open an issue on the repository or contact me at dev.nitin63@gmail.com
