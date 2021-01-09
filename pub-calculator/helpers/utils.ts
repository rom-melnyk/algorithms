/**
 * Group array of objects into a `Map<hash, objects[]>`
 *                                     :      :
 *                                     :      :.. All the objects that share same value of the `hash`.
 *                                     :
 *                                     :......... Is a product of `getGroupingHash(object)`.
 */
export function groupBy<K extends string | number, V>(elements: V[], getGroupingHash: (el: V) => K): Map<K, V[]> {
  return elements.reduce((grouped, el) => {
    const key = getGroupingHash(el);
    let group = grouped.get(key);
    if (!group) {
      group = new Array<V>();
      grouped.set(key, group);
    }

    group.push(el);
    return grouped;
  }, new Map<K, V[]>());
}
