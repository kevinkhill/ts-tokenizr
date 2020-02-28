/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { Token } from "./Token";
import { Tokenizr } from "./Tokenizr";

export class ActionContext {
  _tokenizr: Tokenizr;
  _data: {};
  _repeat: boolean;
  _reject: boolean;
  _ignore: boolean;
  _match: null;

  constructor(tokenizr: Tokenizr) {
    this._tokenizr = tokenizr;
    this._data = {};
    this._repeat = false;
    this._reject = false;
    this._ignore = false;
    this._match = null;
  }

  /**
   * Store and retrieve user data attached to context
   */
  data(key: string, value) {
    const valueOld = this._data[key];

    if (arguments.length === 2) this._data[key] = value;

    return valueOld;
  }

  /*  retrieve information of current matching  */
  info() {
    return {
      line: this._tokenizr._line,
      column: this._tokenizr._column,
      pos: this._tokenizr._pos,
      len: this._match[0].length
    };
  }
  /*  pass-through functions to attached tokenizer  */
  push(...args) {
    this._tokenizr.push(...args);
    return this;
  }

  pop(...args) {
    return this._tokenizr.pop(...args);
  }

  state(...args) {
    if (args.length > 0) {
      this._tokenizr.state(...args);
      return this;
    }
    return this._tokenizr.state(...args);
  }

  tag(...args) {
    this._tokenizr.tag(...args);
    return this;
  }

  tagged(...args) {
    return this._tokenizr.tagged(...args);
  }

  untag(...args) {
    this._tokenizr.untag(...args);
    return this;
  }

  /*  mark current matching to be repeated from scratch  */
  repeat() {
    this._tokenizr._log("    REPEAT");
    this._repeat = true;
    return this;
  }

  /*  mark current matching to be rejected  */
  reject() {
    this._tokenizr._log("    REJECT");
    this._reject = true;
    return this;
  }

  /*  mark current matching to be ignored  */
  ignore() {
    this._tokenizr._log("    IGNORE");
    this._ignore = true;
    return this;
  }

  /*  accept current matching as a new token  */
  accept(type, value) {
    if (arguments.length < 2) value = this._match[0];
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
  /*  immediately stop tokenization  */
  stop() {
    this._tokenizr._stopped = true;
    return this;
  }
}
