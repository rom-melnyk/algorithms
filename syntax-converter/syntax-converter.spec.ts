import * as assert from "assert"
import { infix2postfix } from "./syntax-converter"

describe("Syntax Converter", () => {
  const data = [
    { input: "  A  +B ", expected: "AB+", },
    { input: "A + B + C - D", expected: "AB+C+D-", },
    { input: "A * B / C * D", expected: "AB*C/D*", },
    { input: "A + B / C - D * E", expected: "ABC/+DE*-", },
    { input: "((A + B) - C * (D / E)) + F", expected: "AB+CDE/*-F+", },
  ] as Array<{ input: string; expected: string }>

  data.forEach(({ input, expected }) => {
    it(`should parse "${input}" -> "${expected}"`, () => {
      const parsed = infix2postfix(input)
      assert.equal(parsed, expected)
    })
  })
})
