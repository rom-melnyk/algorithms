import { Lexem } from './lexem';
import { NumberLexem } from './number-lexem';
import { WholeStringLexem } from './whole-string-lexem';
import { SequenceBeginLexem } from './sequence-begin-lexem';
import { SequenceEndLexem } from './sequence-end-lexem';

export class SequenceLexem implements Lexem<string> {
  public static is(char: string): boolean {
    return NumberLexem.is(char);
  }

  public begin: number;
  public end: number;

  public parsed = '';

  private number = 0;
  private sequenceStart = '';
  private sequenceContent = '';
  private sequenceStop = '';

  constructor(input: string, position = 0) {
    this.begin = position;
    this.end = position;

    this.parse(input);
  }

  public parse(input: string) {
    this.parseNumber(input);
    this.parseSequenceBegin(input);
    this.parseSequenceContent(input);
    this.parseSequenceEnd(input);

    this.parsed = Array(this.number)
      .fill(this.sequenceContent)
      .join('');
  }

  private parseNumber(input: string) {
    const number = new NumberLexem(input, this.end);
    this.number = number.parsed;
    this.end = number.end;
  }

  private parseSequenceBegin(input: string) {
    const sequenceStart = new SequenceBeginLexem(input, this.end);
    this.sequenceStart = sequenceStart.parsed;
    this.end = sequenceStart.end;
  }

  private parseSequenceContent(input: string) {
    const sequenceContent = new WholeStringLexem(input, this.end);
    this.sequenceContent = sequenceContent.parsed;
    this.end = sequenceContent.end;
  }

  private parseSequenceEnd(input: string) {
    const sequenceStop = new SequenceEndLexem(input, this.end);
    this.sequenceStop = sequenceStop.parsed;
    this.end = sequenceStop.end;
  }
}
