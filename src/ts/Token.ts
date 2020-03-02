/* eslint-disable @typescript-eslint/explicit-function-return-type */

export class Token {
  type: string;
  value: unknown;
  text: string;
  pos: number;
  line: number;
  column: number;

  constructor(
    type: string,
    value: unknown,
    text: string,
    pos = 0,
    line = 0,
    column = 0
  ) {
    this.type = type;
    this.value = value;
    this.text = text;
    this.pos = pos;
    this.line = line;
    this.column = column;
  }

  toString(): string {
    return [
      `<type: ${this.type}, `,
      `value: ${JSON.stringify(this.value)}, `,
      `text: ${JSON.stringify(this.text)}, `,
      `pos: ${this.pos}, `,
      `line: ${this.line}, `,
      `column: ${this.column}>`
    ].join();
  }

  isA(type: string, value?: unknown): boolean {
    if (type !== this.type) {
      return false;
    }

    if (value && value !== this.value) {
      return false;
    }

    return true;
  }
}
