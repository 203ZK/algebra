export interface Expression {
  toString(): string;
}

export interface Operation {
  symbol: string;
}

export class Constant implements Expression {
  value: number;

  constructor(val: number) {
    this.value = val;
  }

  getSign(): boolean { return this.value > 0; }

  negate(): Constant { return new Constant(-1 * this.value); }

  isEqualTo(val: number): boolean { return this.value == val; }

  toString(): string {
    return this.value >= 0 ? `${this.value}` : `(-${-this.value})`;
  }
}

export class Variable implements Expression {
  variable: string;

  constructor(varStr: string) {
    this.variable = varStr;
  }

  toString(): string {
    return `${this.variable}`;
  }
}

export class Term implements Expression {
  coefficient: Constant;
  variable: Variable;

  constructor(coeff: Constant = new Constant(1), varStr: Variable) {
    this.coefficient = coeff;
    this.variable = varStr;
  }

  getSign(): boolean {
    return this.coefficient.getSign();
  }

  toString(): string {
    return `${this.coefficient}${this.variable}`;
  }
}

export class Sum implements Expression {
  addends: Expression[];

  constructor(summands: Expression[]) {
    this.addends = summands;
  }

  toString(): string {
    return this.addends.join(" + ");
  }
}

export class Product implements Expression {
  factors: Expression[];

  constructor(multiplicands: Expression[]) {
    this.factors = multiplicands;
  }

  toString(): string {
    return this.factors.map((expr: Expression) => {
      const strRep: string = expr.toString();
      return strRep[0] == "(" ? strRep : "(" + strRep + ")";
    }).join(" * ");
  }
}

export class Reciprocal implements Expression {
  denominator: Expression;

  constructor(expr: Expression) {
    this.denominator = expr;
  }

  toString(): string {
    return `1 / [${this.denominator}]`;
  }
}

export class Quotient implements Expression {
  numerator: Expression;
  reciprocal: Reciprocal;

  constructor(num: Expression, rec: Reciprocal) {
    this.numerator = num;
    this.reciprocal = rec;
  }

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

