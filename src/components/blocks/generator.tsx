import { Constant, Product, Sum, Variable, Expression, Term } from "../../types/operands";
import Block from "./Block";
import BlockGroup from "./BlockGroup";
import type React from "react";

export const generateBlocks = (exprTree: Expression): React.ReactNode => {
	switch (true) {
		case exprTree instanceof Constant:
			return generateConstantBlock(exprTree);
		case exprTree instanceof Variable:
			return generateVariableBlock(exprTree);
		case exprTree instanceof Term:
			return generateTermBlock(exprTree);
		case exprTree instanceof Sum:
			return generateSumBlocks(exprTree);
		case exprTree instanceof Product:
			return generateProductBlocks(exprTree);
		default:
			return <div>Not Found!</div>;
	};
};

const generateConstantBlock = (constant: Constant): React.ReactNode => {
	return <Block expression={constant.toTex()} />;
};

const generateVariableBlock = (variable: Variable): React.ReactNode => {
	return <Block expression={variable.toTex()} />;
};

const generateTermBlock = (term: Term): React.ReactNode => {
	return <Block expression={term.toTex()} />;
};

const generateSumBlocks = (sum: Sum): React.ReactNode => {
	return (
		<BlockGroup
			mode="row"
			children={sum.addends.map((addend: Expression) =>
				generateBlocks(addend)
			)}
		/>
	);
};

const generateProductBlocks = (product: Product): React.ReactNode => {
	return (
		<BlockGroup
			mode="column"
			children={product.factors.map((factor: Expression) =>
				generateBlocks(factor)
			)}
		/>
	);
};