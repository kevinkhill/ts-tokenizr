import { excerpt } from "./excerpt";

export class ParsingError extends Error {
  pos: number;
  line: number;
  column: number;
  input: string;

  constructor(
    message: string,
    pos: number,
    line: number,
    column: number,
    input: string
  ) {
    super(message);

    this.name = "ParsingError";
    this.message = message;
    this.pos = pos;
    this.line = line;
    this.column = column;
    this.input = input;
  }

  /**
   * Render a useful string representation
   */
  toString(): string {
    const l = excerpt(this.input, this.pos);
    const prefix1 = `line ${this.line} (column ${this.column}): `;

    let prefix2 = "";

    for (let i = 0; i < prefix1.length + l.prologText.length; i++)
      prefix2 += " ";

    const msg =
      "Parsing Error: " +
      this.message +
      "\n" +
      prefix1 +
      l.prologText +
      l.tokenText +
      l.epilogText +
      "\n" +
      prefix2 +
      "^";

    return msg;
  }
}
