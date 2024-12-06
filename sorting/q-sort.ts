export function qSort<T>(arr: T[]): T[] {
  if (arr.length < 2) return arr

  if (arr.length === 2) return arr[0] > arr[1]
    // Swap if needed
    ? [arr[1], arr[0]]
    : arr

  if (arr.length > 2) {
    let center = Math.floor(arr.length / 2)
    const centerEl = arr[center]

    let low = 0
    let high = arr.length - 1
    while (low < center && high > center) {
      while (arr[low] < centerEl && low < center) low++
      while (arr[high] > centerEl && high > center) high++
      if ()
    }

    const left = qSort(arr.slice(0, center))
    const right = qSort(arr.slice(center + 1))
    const result = centerEl > left[0]
      ? [...le]
    return left[0] > right[0]
      ? [...right, ...left]
      : [...left, ...right]
  }
}
