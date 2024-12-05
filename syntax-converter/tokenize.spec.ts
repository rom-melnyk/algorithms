import * as assert from "assert"
import { isOperand, isOperator, tokenize } from "./tokenize"

describe("Syntax Parser / Tokenize", () => {
  describe("isOperand", () => {
    const data = [
      { input: ["A", "c", "4"], expected: true, },
      { input: [" ", "_", "*"], expected: false, },
    ] as Array<{ input: string[]; expected: string }>

    data.forEach(({ input, expected }) => {
      it(`should consider "${input.join(', ')}" as operands`, () => {
        input.forEach(ch => assert.equal(isOperand(ch), expected))
      })
    })
  })

  describe("isOperator", () => {
    const data = [
      { input: ["+", "-", "*", "/", "^"], expected: true, },
      { input: [" ", "_", "b", "A", "0"], expected: false, },
    ] as Array<{ input: string[]; expected: string }>

    data.forEach(({ input, expected }) => {
      it(`should consider "${input.join(', ')}" as operator`, () => {
        input.forEach(ch => assert.equal(isOperator(ch), expected))
      })
    })
  })

  describe("tokenize", () => {
    it("should ignore spaces", () => {
      const input = "  a +b   "
      const tokens = tokenize(input)
      assert.deepEqual(tokens, ["a", "+", "b"])
    })

    it(`should tokenize the parentheses`, () => {
      const input = "A + (B - C * (K + L) / F ) "
      const tokens = tokenize(input)
      assert.deepEqual(tokens, [
        "A", "+",
        [
          "B", "-", "C", "*",
          ["K", "+", "L"],
          "/", "F",
        ],
      ])
    })

    it("should throw on invalid parentheses", () => {
      const data = [
        "A + (B + C()",
        "A + )",
      ]

      data.forEach(input => {
        assert.throws(() => tokenize(input))
      })
    })
  })
})
