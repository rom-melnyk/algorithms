import { isOperand, isOperator, operatorPriority } from "./tokenize";

function last<T>(array: T[]): T | undefined {
  return array[array.length - 1]
}

export function infix2postfix(input: string): string {
  const operators = [] as string[]
  let result = ""

  let index = -1
  while (++index < input.length) {
    const token = input[index]

    if (isOperand(token)) {
      result += token
    }

    if (isOperator(token)) {
      let lastOp = last(operators)
      while (lastOp && operatorPriority[token] <= operatorPriority[lastOp] && lastOp !== "(") {
        result += operators.pop()
        lastOp = last(operators)
      }

      operators.push(token)
    }

    if (token === "(") {
      operators.push(token)
    }

    if (token === ")") {
      let lastOp = last(operators)
      while (lastOp && lastOp !== "(") {
        result += operators.pop()
        lastOp = last(operators)
      }

      if (lastOp === "(") operators.pop()
      if (!lastOp) throw new Error(`Unexpected ")" at :${index}`)
    }
  }

  while (operators.length) result += operators.pop()!

  return result
}
