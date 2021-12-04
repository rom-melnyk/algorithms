import { Lexem } from './lexem';
import { WordLexem } from './word-lexem';
import { SequenceLexem } from './sequence-lexem';

/**
 * (Word or Sequence) repeated multiple times
 */
export class WholeStringLexem implements Lexem<string> {
  public static is(char: string): boolean {
    return WordLexem.is(char) || SequenceLexem.is(char);
  }

  public begin: number;
  public end: number;

  public parsed = '';

  constructor(input: string, position: number) {
    this.begin = position;
    this.end = position;

    this.parse(input);
  }

  private parse(input: string) {
    let cursor = this.begin;
    let char = input[cursor];

    if (!WholeStringLexem.is(char)) {
      throw `Unexpected symbol "${char}" at :${this.begin}; a number or a letter is expected`;
    }

    while (WholeStringLexem.is(char)) {
      let lexem!: WordLexem | SequenceLexem;
      if (WordLexem.is(char)) {
        lexem = new WordLexem(input, cursor);
      } else if (SequenceLexem.is(char)) {
        lexem = new SequenceLexem(input, cursor);
      }

      this.parsed += lexem.parsed;
      cursor = lexem.end;
      char = input[cursor];
    }

    this.end = cursor;
  }
}
