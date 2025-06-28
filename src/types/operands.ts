import { parse } from "mathjs";

export abstract class Expression {
  abstract getExpressionType(): string;
  abstract toString(): string;

  toTex = (): string => parse(this.toString()).toTex();
}

export interface Operation {
  symbol: string;
}

export class Constant extends Expression {
  value: number;

  constructor(val: number) {
    super();
    this.value = val;
  }

  getSign = (): boolean => this.value > 0;

  negate = (): Constant => new Constant(-1 * this.value);

  isEqualTo = (val: number): boolean => this.value == val;

  getExpressionType = (): string => "constant";

  toString(): string {
    return this.value >= 0 ? `${this.value}` : `(-${-this.value})`;
  }
}

export class Variable extends Expression {
  variable: string;

  constructor(varStr: string) {
    super();
    this.variable = varStr;
  }

  getExpressionType = (): string => "variable";

  toString(): string {
    return `${this.variable}`;
  }
}

export class Term extends Expression {
  coefficient: Constant;
  variable: Variable;

  constructor(coeff: Constant = new Constant(1), varStr: Variable) {
    super();
    this.coefficient = coeff;
    this.variable = varStr;
  }

  getSign = (): boolean => this.coefficient.getSign();

  getExpressionType = (): string => "term"; 

  toString(): string {
    return `${this.coefficient}${this.variable}`;
  }

  toTex = (): string => this.toString();
}

export class Sum extends Expression {
  addends: Expression[];

  constructor(summands: Expression[]) {
    super();
    this.addends = summands;
  }

  getExpressionType = (): string => "sum";

  toString(): string {
    return this.addends.join(" + ");
  }
}

export class Product extends Expression {
  factors: Expression[];

  constructor(multiplicands: Expression[]) {
    super();
    this.factors = multiplicands;
  }

  getExpressionType = (): string => "product";

  toString(): string {
    return this.factors.map((expr: Expression) => {
      const strRep: string = expr.toString();
      return strRep[0] == "(" ? strRep : "(" + strRep + ")";
    }).join(" * ");
  }
}

export class Reciprocal extends Expression {
  denominator: Expression;

  constructor(expr: Expression) {
    super();
    this.denominator = expr;
  }

  getExpressionType = (): string => "reciprocal";

  toString(): string {
    return `1 / [${this.denominator}]`;
  }
}

export class Quotient extends Expression {
  numerator: Expression;
  reciprocal: Reciprocal;

  constructor(num: Expression, rec: Reciprocal) {
    super();
    this.numerator = num;
    this.reciprocal = rec;
  }

  getExpressionType = (): string => "quotient";

  toString(): string {
    return `[${this.numerator}] * [${this.reciprocal}]`;
  }
}

// export class Unary implements Expression {
//   operation: Operation;
//   operand: Expression;

//   constructor(op: Operation, oprd: Expression) {
//     this.operation = op;
//     this.operand = oprd;
//   }
// }

