import { MathJax } from "better-react-mathjax";

const Block = ({ expression }: { expression: string }) => {
  return (
    <div
      style={{
        height: "30px",
        lineHeight: "30px",
        width: "80px",
        border: "3px solid black",
        padding: "5px",
      }}
      className="block"
    >
      <MathJax inline dynamic style={{ fontSize: "1.4em" }}>
        {`\\(${expression}\\)`}
      </MathJax>
    </div>
  );
};

export default Block;
