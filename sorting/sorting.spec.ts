import * as assert from "node:assert"
import { qSort } from "./q-sort";

describe("Sorting", () => {
  const preSorted = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,]
  const data = [
    { input: [4, 6, 0, 8, 7, 3, 1, 2, 5, 9,], name: "random" },
    { input: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0,], name: "reversed" },
    { input: preSorted, name: "pre-sorted" },
  ] as Array<{ input: number[]; name: string }>

  const sortingFns = [
    { fn: qSort, name: "QSort" }
  ] as Array<{ fn: <T>(arr: T[]) => T[]; name: string }>

  sortingFns.forEach(({ fn, name: fnName }) => {
    describe(`should ${fnName}`, () => {
      data.forEach(({ input, name }) => {
        it(`should sort the ${name} array`, () => {
          const sorted = fn([...input])
          assert.deepEqual(sorted, preSorted)
        })
      })
    })
  })
})
