import { MathJaxContext } from 'better-react-mathjax';
import Visualiser from './Visualiser';
import "./App.css";

const config = {
  loader: { load: ['input/asciimath'] },
};

export default function App() {
  return (
    <MathJaxContext version={3} config={config}>
      <Visualiser />
    </MathJaxContext>
  );
}