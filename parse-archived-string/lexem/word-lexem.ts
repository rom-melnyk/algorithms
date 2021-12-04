import { Lexem } from './lexem';

export class WordLexem implements Lexem<string> {
  private static pattern = /^[a-z]$/;
  public static is(char: string): boolean {
    return WordLexem.pattern.test(char);
  }

  public begin: number;
  public end: number;

  public parsed = '';

  constructor(input: string, position = 0) {
    this.begin = position;
    this.end = position;

    this.parse(input);
  }

  private parse(input: string) {
    let cursor = this.begin;
    let char = input[cursor];

    if (!WordLexem.is(char)) {
      throw `Unexpected symbol "${char}" at :${this.end}; a letter is expected`;
    }

    while (WordLexem.is(char)) {
      this.parsed += char;
      cursor++;
      char = input[cursor];
    }

    this.end = cursor;
  }
}
