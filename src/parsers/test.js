"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mathjs_1 = require("mathjs");
var expression = "";
var node = (0, mathjs_1.parse)(expression);
node.traverse(function (node, path, parent) {
    switch (node.type) {
        case 'OperatorNode':
            var opNode = node;
            console.log(opNode.type, opNode.op);
            break;
        case 'ConstantNode':
            var constNode = node;
            console.log(constNode.type, constNode.value);
            break;
        case 'SymbolNode':
            var symNode = node;
            console.log(symNode.type, symNode.name);
            break;
        default:
            console.log(node.type);
    }
});
