import React, { useState } from "react";
import { Box, Grid, TextField } from "@mui/material";
import { parse } from "mathjs";
import LaTeXCanvas from "./components/latexcanvas";

const Visualiser: React.FC = () => {
  const [texExpression, setTexExpression] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const texInput = parse(input).toTex();

    if (texInput === "undefined") {
      setTexExpression("");
    } else {
      setTexExpression(texInput);
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
          <LaTeXCanvas texExpression={texExpression} />
          <LaTeXCanvas texExpression={texExpression} />
        </Grid>
      </Box>
    </>
  );
};

export default Visualiser;