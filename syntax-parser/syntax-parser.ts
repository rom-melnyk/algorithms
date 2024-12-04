const operatorPriority = {
  "+": 10,
  "-": 10,
  "*": 100,
  "/": 100,
}

function isOperator(char: string): boolean {
  return char in operatorPriority
}

const operandRE = /[A-Za-z]+/
function isOperand(char: string): boolean {
  return operandRE.test(char)
}

type TokenList = string | TokenList[]

function tokenize(input: string, startFrom = 0): Array<TokenList | TokenList[]> {
  const result = [] as Array<TokenList | TokenList[]>

  let index = startFrom
  while (index < input.length) {
    const char = input[index]
    if (isOperator(char) || isOperand(char)) result.push(char)
    if (char === "(") result.push(tokenize(input, index + 1))
    if (char === ")") {
      if (startFrom > 0) return result
      else throw new Error(`Unexpected "(" at :${index}`)
    }
    index++
  }

  if (startFrom > 0) throw new Error(`Missing ")"`)
  return result
}

function shouldReverseOpOrder(operators: string[]) {
  if (operators.length < 2) return false
  const lastOp = operators[operators.length - 1]
  const prevOp = operators[operators.length - 2]
  return operatorPriority[lastOp] > operatorPriority[prevOp]
}

function parseTokens(tokens: TokenList[]): string[] {
  const operators = [] as string[]
  const result = [] as string[]

  let index = 0
  while (index < tokens.length) {
    const token = tokens[index]

    if (Array.isArray(token)) {
      const groupResult = parseTokens(token)
      result.push(groupResult.join(""))
      continue
    }

    if (isOperand(token)) {
      result.push(token)
    } else if (isOperator(token)) {
      operators.push(token)
      while (shouldReverseOpOrder(operators)) {
        const lastOp = operators.pop()!
        const prevOp = operators.pop()!
        result.push(lastOp, prevOp)
      }
    }

    index++
  }

  while (operators.length) result.push(operators.pop()!)

  return result
}

export function parse(input: string): string {
  const tokens = tokenize(input)
  const result = parseTokens(tokens)

  return  result.join("")
}
