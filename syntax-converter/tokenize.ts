export const operatorPriority = {
  "+": 10,
  "-": 10,
  "*": 100,
  "/": 100,
  "^": 1000,
}

export function isOperator(char: string): boolean {
  return char in operatorPriority
}

const operandRE = /[A-Za-z0-9]/
export function isOperand(char: string): boolean {
  return operandRE.test(char)
}

export type Token = string | Token[]

export function tokenize(input: string): Token[] {
  const tokens = [] as Token[]
  const hierarchy = [tokens]
  let lastGroup = tokens

  let index = -1
  while (++index < input.length) {
    const char = input[index]
    if (isOperator(char) || isOperand(char)) lastGroup.push(char)
    if (char === "(") {
      lastGroup = [] as Token[]
      hierarchy.push(lastGroup)
    }
    if (char === ")") {
      const finishedGroup = hierarchy.pop()!
      lastGroup = hierarchy[hierarchy.length - 1]
      if (!lastGroup) throw new Error(`Unexpected ")" at :${index}`)
      lastGroup.push(finishedGroup)
    }
  }

  if (hierarchy.length > 1) throw new Error(`Missing ")"`)
  return lastGroup
}
