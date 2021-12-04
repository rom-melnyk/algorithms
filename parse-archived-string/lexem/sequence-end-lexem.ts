import { Lexem } from './lexem';

export class SequenceEndLexem implements Lexem<string> {
  private static char = ']';
  public static is(char: string): boolean {
    return char === SequenceEndLexem.char;
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
    const char = input[this.begin];
    if (!SequenceEndLexem.is(char)) {
      throw `Unexpected symbol "${char}" at :${this.begin}; the "${SequenceEndLexem.char}" is expected`;
    }

    this.parsed = char;
    this.end = this.begin + 1;
  }
}
