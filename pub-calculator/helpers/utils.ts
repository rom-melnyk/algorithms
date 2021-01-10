/**
 * Group array of objects into a `Map<groupName, objects[]>`
 *                                     :           :
 *                                     :           :.. All the objects that share similar value of the `key` property
 *                                     :
 *                                     :......... Is the `object[key]`
 */
export function groupBy<K extends keyof V, V>(elements: V[], key: K): Map<V[K], V[]> {
  return elements.reduce((grouped, el) => {
    const groupName = el[key] ;
    let group = grouped.get(groupName);
    if (!group) {
      group = new Array<V>();
      grouped.set(groupName, group);
    }

    group.push(el);
    return grouped;
  }, new Map<V[K], V[]>());
}
