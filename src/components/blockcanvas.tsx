import type { MathNode } from "mathjs";
import type React from "react";
import { generateBlocks } from "./blocks/generator";
import { nodeToExpressionTree } from "../parsers/splitter";
import { Expression } from "../types/operands";
import { Box, Grid } from "@mui/material";

interface BlockCanvasProps {
  parsedAST: MathNode;
}

const boxStyles = {
  height: "100%",
  border: 2,
  display: "grid",
  borderColor: "black",
  borderRadius: "20px",
  placeItems: "center",
};

const BlockCanvas: React.FC<BlockCanvasProps> = ({ parsedAST }) => {
  const expressionTree: Expression = nodeToExpressionTree(parsedAST);

  return (
    <Grid size={6}>
      <Box sx={boxStyles}>
        {generateBlocks(expressionTree)}
      </Box>
    </Grid >
  );
};

export default BlockCanvas;
