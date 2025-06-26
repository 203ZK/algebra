import { Box, Grid } from "@mui/material";
import { MathJax } from "better-react-mathjax";
import React from "react";

interface LaTeXCanvasProps {
  texExpression: string;
};

const boxStyles = {
  height: "100%",
  border: 2,
  display: "grid",
  borderColor: "black",
  borderRadius: "20px",
  placeItems: "center",
};

const LaTeXCanvas: React.FC<LaTeXCanvasProps> = ({ texExpression }) => {
  return (
    <Grid size={6}>
      <Box sx={boxStyles}>
        <MathJax inline dynamic style={{ fontSize: "2em" }}>
          {`\\(${texExpression}\\)`}
        </MathJax>
      </Box>
    </Grid >
  );
};

export default LaTeXCanvas;