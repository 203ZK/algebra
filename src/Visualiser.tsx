import { MathJax } from "better-react-mathjax";
import React, { useState } from "react";
import { TextField } from "@mui/material";
import { parse } from "mathjs";

const Visualiser: React.FC = () => {
  const [texExpression, setTexExpression] = useState('');

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
    <div>
      <div>
        <TextField
          type="text"
          style={ { width: '500px' } }
          onChange={handleChange}
          placeholder="Type LaTeX expression, e.g. \\frac{1}{x}"
        />
      </div>
      <div>
        <MathJax inline dynamic>
          {`\\(${texExpression}\\)`}
        </MathJax>
      </div>
    </div>
  );
};

export default Visualiser;