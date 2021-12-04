export interface Lexem<R = string> {
  begin: number;
  end: number;
  parsed: R;
  // new (input: string, position: number): Lexem<R>;
}

