export interface Expression {}

export interface Operation {
  symbol: string;
}

export class Constant implements Expression {
  value: number;

  constructor(val: number) {
    this.value = val;
  }
}

export class Variable implements Expression {
  variable: string;

  constructor(varStr: string) {
    this.variable = varStr;
  }
}

export class Term implements Expression {
  coefficient: Constant;
  variable: Variable;

  constructor(coeff: Constant = new Constant(1), varStr: Variable) {
    this.coefficient = coeff;
    this.variable = varStr;
  }
}

export class Sum implements Expression {
  addends: Expression[];

  constructor(summands: Expression[]) {
    this.addends = summands;
  }
}

export class Product implements Expression {
  factors: Expression[];

  constructor(multiplicands: Expression[]) {
    this.factors = multiplicands;
  }
}

export class Unary implements Expression {
  operation: Operation;
  operand: Expression;

  constructor(op: Operation, oprd: Expression) {
    this.operation = op;
    this.operand = oprd;
  }
}

