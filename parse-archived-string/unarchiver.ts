/**
 * See the EBNF notation in {@file ./README.md}.
 * Pay attention on following part of the EBNF:
 *
 *     ```
 *     sequence        = number, "[", whole_string, "]" ;
 *     whole_string    = word | sequence, { word | sequence } ;
 *     ````
 *
 * In other words, the `whole_string` corresponds to the input itself,
 * and the `whole_string` can reside inside the repeated `sequence`.
 *
 * Another point, the `sequence[word]` can be "unarchived" non-recursively.
 */
export function unarchive(input: string): string {
  return replaceSequence(input);
}

const isSequence = /\d+\[/;
const nonRecursiveSequence = /(\d+)\[([a-z]+)\]/;

function replaceSequence(input: string): string {
  return isSequence.test(input)
    // Proceed deeper as `sequence[sequence[...]]` is allowed.
    ? replaceSequence(
      // "Unarchive" non-recursive `sequence[word]` entry.
      input.replace(
        nonRecursiveSequence,
        (_, number, sequenceContent) => repeat(number, sequenceContent)
      )
    )
    : input;
}

function repeat(times: string | number, text: string): string {
  return Array(Number(times)).fill(text).join('');
}
