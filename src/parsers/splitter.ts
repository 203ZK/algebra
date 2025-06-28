import { ConstantNode, OperatorNode, ParenthesisNode, SymbolNode, type MathNode } from "mathjs";
import { Constant, Product, Quotient, Reciprocal, Sum, Term, Variable, Expression } from "../types/operands";

// const PLUS_ONE = new Constant(1);
const ZERO = new Constant(0);
const MINUS_ONE = new Constant(-1);

export const nodeToExpressionTree = (node: MathNode): Expression => {
  switch (node.type) {
    case "ConstantNode":
      const constantNode = node as ConstantNode;
      return new Constant(constantNode.value);
    case "OperatorNode":
      const operatorNode = node as OperatorNode;
      switch (operatorNode.op) {
        case "+":
          return sumToExpressionTree(operatorNode);
        case "-":
          return differenceToExpressionTree(operatorNode);
        case "*":
          return productToExpressionTree(operatorNode);
        case "/":
          return divisionToExpressionTree(operatorNode);
        default:
          return ZERO;
      }
    case "ParenthesisNode":
      const parenNode = node as ParenthesisNode;
      return nodeToExpressionTree(parenNode.content);
    case "SymbolNode":
      const symNode = node as SymbolNode;
      return new Variable(symNode.name);
    default:
      return ZERO;
  };
};

/** 
 * Converts a sum to an expression tree.
 */
export const sumToExpressionTree = (node: OperatorNode): Expression => {
  if (node.isUnary()) {
    return nodeToExpressionTree(node.args[0]);
  } else {
    const operand1: Expression = nodeToExpressionTree(node.args[0]);
    const operand2: Expression = nodeToExpressionTree(node.args[1]);
    
    const augend: Expression[] = operand1 instanceof Sum ? operand1.addends : [operand1];
    const addend: Expression[] = operand2 instanceof Sum ? operand2.addends : [operand2];
    return new Sum([...augend, ...addend]);
  }
};

/**
 * Converts a difference to an expression tree.
 */
export const differenceToExpressionTree = (node: OperatorNode): Expression => {
  if (node.isUnary()) {
    return negate(nodeToExpressionTree(node.args[0]));
  } else {
    const operand1: Expression = nodeToExpressionTree(node.args[0]);
    const operand2: Expression = nodeToExpressionTree(node.args[1]);
    
    const augend: Expression[] = operand1 instanceof Sum ? operand1.addends : [operand1];
    const addend: Expression[] = operand2 instanceof Sum
      ? operand2.addends.map((expr: Expression) => negate(expr))
      : [negate(operand2)];
    return new Sum([...augend, ...addend]);
  }
};

/**
 * Converts a product to an expression tree.
 */
export const productToExpressionTree = (node: OperatorNode): Expression => {
  const operand1: Expression = nodeToExpressionTree(node.args[0]);
  const operand2: Expression = nodeToExpressionTree(node.args[1]);

  // A term is defined by a coefficient and an indeterminate variable.
  if (operand1 instanceof Constant && operand2 instanceof Variable) {
    return new Term(operand1, operand2);
  } else if (operand1 instanceof Variable && operand2 instanceof Constant) {
    return new Term(operand2, operand1);
  }

  const multiplicand1: Expression[] = operand1 instanceof Product ? operand1.factors : [operand1];
  const multiplicand2: Expression[] = operand2 instanceof Product ? operand2.factors : [operand2];
  return new Product([...multiplicand1, ...multiplicand2]);
};

/**
 * Converts a division to an expression tree.
 */
export const divisionToExpressionTree = (node: OperatorNode): Expression => {
  const operand1: Expression = nodeToExpressionTree(node.args[0]);
  const operand2: Expression = nodeToExpressionTree(node.args[1]);
  const reciprocal: Reciprocal = new Reciprocal(operand2);
  return operand1 instanceof Constant && operand1.isEqualTo(1)
    ? reciprocal : new Quotient(operand1, reciprocal);
};

/**
 * Negates an expression.
 * If the expression is a product of -1 and another expression, it will simply take that other expression.
 * Else, the product of -1 and the expression itself will be returned.
 */
export const negate = (expression: Expression): Expression => {
  if (expression instanceof Product) {
    if (expression.factors[0] == MINUS_ONE) {
      return new Product(expression.factors.slice(1));
    } else {
      return new Product([MINUS_ONE, ...expression.factors]);
    }
  } else if (expression instanceof Constant) {
    return expression.negate();
  } else {
    return new Product([MINUS_ONE, expression]);
  }
};