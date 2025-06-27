import { ConstantNode, OperatorNode, ParenthesisNode, SymbolNode, type MathNode } from "mathjs";
import { Constant, Product, Sum, Variable, type Expression } from "../types/operands";

export const nodeToExpressionTree = (node: MathNode): Expression => {
  switch (node.type) {
    case "ConstantNode":
      const constNode = node as ConstantNode;
      return new Constant(constNode.value);
    case "OperatorNode":
      const opNode = node as OperatorNode;
      switch (opNode.op) {
        case "+":
          const plus1: Expression = nodeToExpressionTree(opNode.args[0]);
          const plus2: Expression = nodeToExpressionTree(opNode.args[1]);
          return new Sum([plus1, plus2]);
        case "-":
          const minus1: Expression = nodeToExpressionTree(opNode.args[0]);
          const minus2: Expression = nodeToExpressionTree(opNode.args[1]);
          return new Sum([minus1, new Product([new Constant(-1), minus2])]);
        case "*":
          const mult1: Expression = nodeToExpressionTree(opNode.args[0]);
          const mult2: Expression = nodeToExpressionTree(opNode.args[1]);
          return new Product([mult1, mult2]);
        default:
          return new Constant(0);
      }
    case "ParenthesisNode":
      const parenNode = node as ParenthesisNode;
      return nodeToExpressionTree(parenNode.content);
    case "SymbolNode":
      const symNode = node as SymbolNode;
      return new Variable(symNode.name);
    default:
      return new Constant(0);
  };
};
