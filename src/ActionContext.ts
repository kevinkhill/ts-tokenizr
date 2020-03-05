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
  data(key: string, value?: unknown): unknown | void {
    if (!value) {
      return this._data[key];
    }

    this._data[key] = value;
  }

  /**
   * Retrieve information of current matching
   */
  info(): Record<string, number> {
    return {
      line: this._tokenizr._line,
      column: this._tokenizr._column,
      pos: this._tokenizr._pos,
      len: this._match[0].length
    };
  }

  /**
   * Pass-through functions to attached tokenizer
   */
  push(...args: Array<unknown>): this {
    this._tokenizr.push(...args);

    return this;
  }

  pop(...args) {
    return this._tokenizr.pop(...args);
  }

  /**
   * Get / Set state in the context
   *
   * @todo dont like this...
   */
  state(...args) {
    if (args.length > 0) {
      this._tokenizr.state(...args);

      return this;
    }

    return this._tokenizr.state(...args);
  }

  tag(...args): this {
    this._tokenizr.tag(...args);

    return this;
  }

  tagged(...args): boolean {
    return this._tokenizr.tagged(...args);
  }

  untag(...args): this {
    this._tokenizr.untag(...args);

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
   */
  accept(type: string, value?: never): this {
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
