import React, { useState } from "react";
import { Box, Grid, TextField } from "@mui/material";
import { parse, type MathNode } from "mathjs";
import LaTeXCanvas from "./components/latexcanvas";
import BlockCanvas from "./components/blockcanvas";

const Visualiser: React.FC = () => {
  // const [texExpression, setTexExpression] = useState<string>('');
  const [AST, setAST] = useState<MathNode | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const parsedTree = parse(input);

    if (parsedTree === null) {
      setAST(null);
    } else {
      setAST(parsedTree);
    }
  };

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