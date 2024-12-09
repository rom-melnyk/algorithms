export function findMax<T>(arr: T[]): T {
  if (arr.length < 2) return arr[0]

  const center = Math.floor(arr.length / 2)
  const maxLeft = findMax(arr.slice(0, center))
  const maxRight = findMax(arr.slice(center))
  if (maxLeft === undefined) return maxRight
  if (maxRight === undefined) return maxLeft
  return maxLeft >= maxRight
    ? maxLeft
    : maxRight
}
