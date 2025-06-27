import React, { useEffect, useState } from "react";
import { Box, Grid, TextField } from "@mui/material";
import { parse, type MathNode } from "mathjs";
import LaTeXCanvas from "./components/latexcanvas";
import BlockCanvas from "./components/blockcanvas";
import { nodeToExpressionTree } from "./parsers/splitter.ts";

const Visualiser: React.FC = () => {
  const DEFAULT_ZERO = parse("0");
  const [AST, setAST] = useState<MathNode>(DEFAULT_ZERO);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const parsedTree = parse(input);

    if (input == "" || parsedTree === null) {
      setAST(DEFAULT_ZERO);
    } else {
      setAST(parsedTree);
    }
  };

  useEffect(() => {
    if (AST) {
      console.log(AST);
      console.log(nodeToExpressionTree(AST).toString());
    } else {
      console.log("No valid expression entered.");
    }
  }, [AST]);

  return (
    <>
      <div>
        <TextField
          type="text"
          style={{ width: '500px', paddingTop: 0 }}
          onChange={handleChange}
          placeholder="Type LaTeX expression, e.g. \\frac{1}{x}"
        />
        <button>Search</button>
      </div>
      <Box style={ { height: "70vh", paddingTop: "3rem" }}>
        <Grid container spacing={4} sx={{ height: "100%" }}>
          <LaTeXCanvas texExpression={AST ? AST.toTex() : ""} />
          <BlockCanvas parsedAST={AST} />
        </Grid>
      </Box>
    </>
  );
};

export default Visualiser;