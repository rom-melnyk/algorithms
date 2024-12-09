import * as assert from "node:assert"
import { findMax } from "./div-conquer"

describe("Divide and Conquer", () => {
  it("should find max of the array", () => {
    const arr = [
      ..."98324756982356".split("").map(n => Number(n)),
      100,
      ..."1205967865".split("").map(n => Number(n)),
    ]

    const max = findMax(arr)
    assert.equal(max, 100)
  })
})
