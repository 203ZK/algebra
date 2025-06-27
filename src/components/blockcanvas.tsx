import type { MathNode } from "mathjs";
import type React from "react";

interface BlockCanvasProps {
  parsedAST: MathNode | null;
}

const BlockCanvas: React.FC<BlockCanvasProps> = ({ parsedAST: _MathNode }) => {
  return null;
};

export default BlockCanvas;