import { Token } from "./Token";
import { Tokenizr } from "./Tokenizr";

export class ActionContext {
  _tokenizr: Tokenizr;
  _repeat = false;
  _reject = false;
  _ignore = false;
  _data: Record<string, unknown> = {};
  _match: RegExpExecArray | null = null;

  constructor(tokenizr: Tokenizr) {
    this._tokenizr = tokenizr;
  }

  /**
   * Store and retrieve user data attached to context
   */
  data(key: string): unknown;
  data(key: string, value: unknown): void;
  data(key: string, value?: unknown): unknown | true {
    if (typeof value === "undefined") {
      return this._data[key];
    }

    this._data[key] = value;

    return true;
  }

  /**
   * Retrieve information of current matching
   */
  info(): Record<string, number> {
    const len = this._match ? this._match[0].length : NaN;

    return {
      line: this._tokenizr._line,
      column: this._tokenizr._column,
      pos: this._tokenizr._pos,
      len
    };
  }

  /**
   * Pass-through to the attached tokenizer
   *
   * @inheritdoc
   */
  push(state: string): this {
    this._tokenizr.push(state);

    return this;
  }

  /**
   * Pass-through to the attached tokenizer
   *
   * @inheritdoc
   */
  pop(): this {
    this._tokenizr.pop();

    return this;
  }

  /**
   * Get / Set state in the context
   *
   * @todo dont like this...
   */
  state(state?: string): this | string {
    if (typeof state === "undefined") {
      return this._tokenizr.state();
    }

    this._tokenizr.state(state);

    return this;
  }

  /**
   * Pass-through to the attached tokenizer
   *
   * @inheritdoc
   */
  tag(tag: string): this {
    this._tokenizr.tag(tag);

    return this;
  }

  /**
   * Pass-through to the attached tokenizer
   *
   * @inheritdoc
   */
  tagged(tag: string): boolean {
    return this._tokenizr.tagged(tag);
  }

  /**
   * Pass-through to the attached tokenizer
   *
   * @inheritdoc
   */
  untag(tag: string): this {
    this._tokenizr.untag(tag);

    return this;
  }

  /**
   * Mark current matching to be repeated from scratch
   */
  repeat(): this {
    this._tokenizr._log("    REPEAT");
    this._repeat = true;

    return this;
  }

  /**
   * Mark current matching to be rejected
   */
  reject(): this {
    this._tokenizr._log("    REJECT");
    this._reject = true;

    return this;
  }

  /**
   * Mark current matching to be ignored
   */
  ignore(): this {
    this._tokenizr._log("    IGNORE");
    this._ignore = true;

    return this;
  }

  /**
   * Accept current matching as a new token
   *
   * @todo does`this._match[0]` always have a string if the action
   *       is getting called from a rule that matched the pattern?
   */
  accept(type: string): this;
  accept(type: string, value: unknown): this;
  accept(type: string, value?: unknown): this {
    // I believe that since we are accepting, that it is safe to
    // assume that this._match[0] is a string, so we'll check if
    // this._match is not null, and error if so. x_x
    if (this._match === null) {
      throw Error("this._match was null when trying to .accept()");
    }

    if (arguments.length < 2) {
      // eslint-disable-next-line no-param-reassign
      value = this._match[0];
    }

    this._tokenizr._log(
      `    ACCEPT: type: ${type}, value: ` +
        `${JSON.stringify(value)} (${typeof value}), text: "${
          this._match[0]
        }"`
    );

    this._tokenizr._pending.push(
      new Token(
        type,
        value,
        this._match[0],
        this._tokenizr._pos,
        this._tokenizr._line,
        this._tokenizr._column
      )
    );

    return this;
  }

  /**
   * Immediately stop tokenization
   */
  stop(): this {
    this._tokenizr._stopped = true;

    return this;
  }
}
