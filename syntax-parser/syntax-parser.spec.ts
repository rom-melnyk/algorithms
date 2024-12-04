import * as assert from "assert"
import { parse } from "./syntax-parser"

describe("Syntax Parser", () => {
  const data = [
    { input: "  A  +B ", expected: "AB+", },
    { input: "A + B + C - D", expected: "AB+C+D-", },
    { input: "A * B / C * D", expected: "AB*C/D*", },
    { input: "A + B / C - D * E", expected: "ABC/+DE*-", },
    { input: "((A + B) – C * (D / E)) + F", expected: "AB+CDE/*-F+", },
  ] as Array<{ input: string; expected: string }>

  data.forEach(({ input, expected }) => {
    it(`should parse "${input}" -> "${expected}"`, () => {
      const parsed = parse(input)
      assert.equal(parsed, expected)
    })
  })
})
