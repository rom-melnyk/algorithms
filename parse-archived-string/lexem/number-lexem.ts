import { Lexem } from './lexem';

export class NumberLexem implements Lexem<number> {
  private static pattern = /^[0-9]$/;
  public static is(char: string): boolean {
    return NumberLexem.pattern.test(char);
  }

  public begin: number;
  public end: number;
  public parsed = 0;

  constructor(input: string, position = 0) {
    this.begin = position;
    this.end = position;

    this.parse(input);
  }

  private parse(input: string) {
    let parsed = '';
    let cursor = this.begin;
    let char = input[cursor];

    if (!NumberLexem.is(char)) {
      throw `Unexpected symbol "${char}" at :${this.end}; a number is expected`;
    }

    while (char && NumberLexem.is(char)) {
      parsed += char;
      cursor++;
      char = input[cursor];
    }

    this.parsed = Number(parsed);
    this.end = cursor;
  }
}
