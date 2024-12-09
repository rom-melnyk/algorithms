export function qSort<T>(arr: T[]): T[] {
  if (arr.length < 2) return arr

  const center = Math.floor(arr.length / 2)
  const centerEl = arr[center]
  let left = [] as T[]
  let right = [] as T[]
  for (let i = 0; i < arr.length; i++) {
    if (i === center) continue
    const element = arr[i];
    if (element <= centerEl) left.push(element)
    else right.push(element)
  }

  left = qSort(left)
  right = qSort(right)
  return [...left, centerEl, ...right]
}
