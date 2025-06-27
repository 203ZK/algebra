import { ConstantNode, OperatorNode, parse, SymbolNode, type MathNode } from "mathjs";

const test = (expression: string) => {
  const node: MathNode = parse(expression);

  node.traverse(function (node) {
    switch (node.type) {
      case 'OperatorNode':
        const opNode = node as OperatorNode;
        console.log(opNode.type, opNode.op);
        break
      case 'ConstantNode':
        const constNode = node as ConstantNode;
        console.log(constNode.type, constNode.value);
        break
      case 'SymbolNode':
        const symNode = node as SymbolNode;
        console.log(symNode.type, symNode.name);
        break
      default:
        console.log(node.type);
    }
  });
}

export default test;
