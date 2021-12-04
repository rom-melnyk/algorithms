import { WholeStringLexem } from './lexem/whole-string-lexem';

/**
 * See the EBNF notation in {@file ./README.md}.
 * The topmost element of the input is the `WholeStringLexem`
 * which is `(WordLexem | SequenceLexem)` repeated 1+ times.
 */
export function unarchive(input: string): string {
  const wholeString = new WholeStringLexem(input, 0);
  return wholeString.parsed;
}
