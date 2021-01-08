export type Person = 'Tim' | 'Mary' | 'Roman' | 'Astrid';
export const people: Person[] = ['Tim', 'Mary', 'Roman', 'Astrid'];

const allowedPeople = new Set<Person>(people);

export function validatePeople(ppl: Array<string | Person>): ppl is Person[] {
  ppl.forEach((p) => {
    if (!allowedPeople.has(p as Person)) {
      throw new Error(`Person "${p}" is not allowed here`);
    }
  });

  return true;
}
