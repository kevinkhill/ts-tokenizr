/* eslint-disable no-param-reassign */

import { ActionContext } from "./ActionContext";
import { excerpt } from "./excerpt";
import { ParsingError } from "./ParsingError";
import { State } from "./State";
import { Token } from "./Token";
import {
  Action,
  DepthError,
  Rule,
  TaggedState,
  Tags,
  TokenizrConfig
} from "./types";
import {
  postProcessPattern,
  postProcessState,
  processTags
} from "./util";

export class Tokenizr {
  static readonly defaults = {
    debug: false
  };

  config: TokenizrConfig;

  _len = 0;
  _pos = 0;
  _line = 1;
  _column = 1;
  _input = "";
  _eof = false;
  _stopped = false;
  _ctx: ActionContext;
  _rules: Array<Rule> = [];
  _pending: Array<Token> = [];
  _after: Action | null = null;
  _before: Action | null = null;
  _finish: Action | null = null;
  _tag: Tags = {};
  _state: Array<string> = ["default"];
  _transaction: Array<Array<Token>> = [];

  constructor(config?: Partial<TokenizrConfig>) {
    this.config = { ...Tokenizr.defaults, ...config };

    this._ctx = new ActionContext(this);
  }

  /**
   * Reset the internal state
   */
  reset(): this {
    this._input = "";
    this._len = 0;
    this._eof = false;
    this._pos = 0;
    this._line = 1;
    this._column = 1;
    this._state = ["default"];
    this._tag = {};
    this._transaction = [];
    this._pending = [];
    this._stopped = false;
    this._ctx = new ActionContext(this);

    return this;
  }

  /**
   * Create an error message for the current position
   */
  error(message: string): ParsingError {
    return new ParsingError(
      message,
      this._pos,
      this._line,
      this._column,
      this._input
    );
  }

  /**
   * Configure debug operation
   */
  debug(debug: boolean): this {
    this.config.debug = debug;

    return this;
  }

  /**
   * Provide (new) input string to tokenize
   */
  input(input: string): this {
    /*  sanity check arguments  */
    if (typeof input !== "string")
      throw new Error('parameter "input" not a String');

    /*  reset state and store new input  */
    this.reset();

    this._input = input;
    this._len = input.length;

    return this;
  }

  /**
   * Push state
   */
  push(state: string): this {
    this._state.push(state);

    this._log(
      "    STATE (PUSH): " +
        `old: <${this._state[this._state.length - 1]}>, ` +
        `new: <${state}>`
    );

    return this;
  }

  /**
   * Pop state
   */
  pop(): this | void {
    if (this._state.length < 2) {
      throw new Error("no more custom states to pop");
    }

    /*  pop old state  */
    this._log(
      "    STATE (POP): " +
        `old: <${this._state[this._state.length - 1]}>, ` +
        `new: <${this._state[this._state.length - 2]}>`
    );

    this._state.pop();

    return this;
  }

  /**
   * get/set state
   */
  state(): string;
  state(state: string): this;
  state(state?: string): this | string {
    if (typeof state === "string") {
      this._log(
        "    STATE (SET): " +
          `old: <${this._state[this._state.length - 1]}>, ` +
          `new: <${state}>`
      );

      this._state[this._state.length - 1] = state;

      return this;
    }

    return this._state[this._state.length - 1];
  }

  /**
   * Set a tag
   */
  tag(tag: string): this {
    this._tag[tag] = true;
    this._log(`    TAG (ADD): ${tag}`);
    return this;
  }

  /**
   * Check whether tag is set
   */
  tagged(tag: string): boolean {
    return this._tag[tag] === true;
  }

  /**
   * Unset a tag
   */
  untag(tag: string): this {
    delete this._tag[tag];
    this._log(`    TAG (DEL): ${tag}`);
    return this;
  }

  /**
   * Configure a tokenization before-rule callback
   */
  before(action: Action): this {
    this._before = action;
    return this;
  }

  /**
   * Configure a tokenization after-rule callback
   */
  after(action: Action): this {
    this._after = action;
    return this;
  }

  /**
   * Configure a tokenization finish callback
   */
  finish(action: Action): this {
    this._finish = action;
    return this;
  }

  /**
   * Configure a stateful tokenization rule
   */
  stateRule(
    state: string,
    pattern: RegExp,
    action: Function,
    name = "unknown"
  ): this {
    return this.pushRule({
      state: postProcessState(state),
      pattern: postProcessPattern(pattern),
      action,
      name
    });
  }

  /**
   * Configure a tokenization rule
   */
  rule(pattern: RegExp, action: Function, name = "unknown"): this {
    return this.pushRule({
      state: { state: "*", tags: [] },
      pattern: postProcessPattern(pattern),
      action,
      name
    });
  }

  /**
   * Determine and return next token
   */
  token(): Token | null {
    /*  if no more tokens are pending, try to determine a new one  */
    if (this._pending.length === 0) {
      this._tokenize();
    }

    /*  return now potentially pending token  */
    if (this._pending.length > 0) {
      const token = this._pending.shift();

      if (token) {
        if (this._transaction.length > 0) {
          this._transaction[0].push(token);
        }

        this._log(`TOKEN: ${token.toString()}`);

        return token;
      }
    }

    /*  no more tokens  */
    return null;
  }

  /**
   * Determine and return all tokens
   */
  tokens(): Array<Token> {
    const result: Array<Token> = [];

    let token;

    while ((token = this.token()) !== null) result.push(token);

    return result;
  }

  /**
   * Determine and generate tokens
   */
  // *tokenGenerator() {
  //   let token;

  //   while ((token = this.token()) !== null) {
  //     yield token;
  //   }
  // }

  /**
   * Peek at the next token or token at particular offset
   */
  peek(offset = 0): Token {
    for (let i = 0; i < this._pending.length + offset; i++) {
      this._tokenize();
    }

    if (offset >= this._pending.length) {
      throw new Error("not enough tokens available for peek operation");
    }

    this._log(`PEEK: ${this._pending[offset].toString()}`);

    return this._pending[offset];
  }

  /**
   * Skip one or more tokens
   */
  skip(len = 1): this {
    for (let i = 0; i < this._pending.length + len; i++) {
      this._tokenize();
    }

    if (len > this._pending.length) {
      throw new Error("not enough tokens available for skip operation");
    }

    while (len-- > 0) {
      this.token();
    }

    return this;
  }

  /**
   * Consume the current token (by expecting it to be a particular symbol)
   */
  consume(type: string, value?: unknown): Token {
    for (let i = 0; i < this._pending.length + 1; i++) {
      this._tokenize();
    }

    if (this._pending.length === 0) {
      throw new Error(
        "not enough tokens available for consume operation"
      );
    }

    const token = this.token() as Token;

    this._log(`CONSUME: ${token.toString()}`);

    const raiseError = (
      expectedValue: unknown,
      expectedType: string
    ): void => {
      throw new ParsingError(
        `expected: <type: ${type}, value: ${JSON.stringify(
          expectedValue
        )} (${expectedType})>, ` +
          `found: <type: ${token.type}, value: ${JSON.stringify(
            token.value
          )} (${typeof token.value})>`,
        token.pos,
        token.line,
        token.column,
        this._input
      );
    };

    if (value && !token.isA(type, value)) {
      raiseError(value, typeof value);
    } else if (!token.isA(type)) {
      raiseError("*", "any");
    }

    return token;
  }

  /**
   * Open tokenization transaction
   */
  begin(): this {
    this._log(`BEGIN: level ${this._transaction.length}`);

    this._transaction.unshift([]);

    return this;
  }

  /**
   * Determine depth of still open tokenization transaction
   */
  depth(): number {
    if (this._transaction.length === 0) {
      throw new Error(
        "cannot determine depth -- no active transaction"
      );
    }

    return this._transaction[0].length;
  }

  /**
   * Close (successfully) tokenization transaction
   */
  commit(): this {
    if (this._transaction.length === 0) {
      throw new Error(
        "cannot commit transaction -- no active transaction"
      );
    }

    this._transaction.shift();

    this._log(`COMMIT: level ${this._transaction.length}`);

    return this;
  }

  /**
   * Close (unsuccessfully) tokenization transaction
   */
  rollback(): this {
    if (this._transaction.length === 0) {
      throw new Error(
        "cannot rollback transaction -- no active transaction"
      );
    }

    this._pending = this._transaction[0].concat(this._pending);

    this._transaction.shift();

    this._log(`ROLLBACK: level ${this._transaction.length}`);

    return this;
  }

  /**
   * Execute multiple alternative callbacks
   */
  alternatives(...alternatives: Array<() => never>): any {
    let result = null;
    let depths: Array<DepthError> = [];

    for (let i = 0; i < alternatives.length; i++) {
      try {
        this.begin();
        result = alternatives[i].call(this);
        this.commit();
        break;
      } catch (error) {
        this._log(`EXCEPTION: ${error.toString()}`);
        depths.push({ error, depth: this.depth() });
        this.rollback();
        continue;
      }
    }

    if (result === null && depths.length > 0) {
      depths = depths.sort((a, b) => a.depth - b.depth);

      throw depths[0].error;
    }

    return result;
  }

  /**
   * Output a debug message
   */
  _log(msg: string): void {
    if (this.config.debug) {
      /* eslint no-console: off */
      console.log(`tokenizr: ${msg}`);
    }
  }

  /**
   * Determine and return the next token
   */
  _tokenize(): void {
    /*  helper function for finishing parsing  */
    const finish = (): void => {
      if (!this._eof) {
        if (this._finish !== null) {
          this._finish.call(this._ctx, this._ctx);
        }

        this._eof = true;

        this._pending.push(
          new Token("EOF", "", "", this._pos, this._line, this._column)
        );
      }
    };

    /*  tokenize only as long as we were not stopped and there is input left  */
    if (this._stopped || this._pos >= this._len) {
      finish();
      return;
    }

    /*  loop...  */
    let continued = true;
    while (continued) {
      continued = false;

      /*  some optional debugging context  */
      if (this.config.debug) {
        const e = excerpt(this._input, this._pos);
        const tags = Object.keys(this._tag)
          .map(tag => `#${tag}`)
          .join(" ");

        this._log(
          `INPUT: state: <${
            this._state[this._state.length - 1]
          }>, tags: <${tags}>, text: ` +
            (e.prologTrunc ? "..." : '"') +
            `${e.prologText}<${e.tokenText}>${e.epilogText}` +
            (e.epilogTrunc ? "..." : '"') +
            `, at: <line ${this._line}, column ${this._column}>`
        );
      }

      /*  iterate over all rules...  */
      for (let i = 0; i < this._rules.length; i++) {
        if (this.config.debug) {
          this._log(
            `  RULE: state(s): <${State.stringify(
              this._rules[i].state
            )}>, pattern: ${this._rules[i].pattern.source}`
          );
        }

        /*  one of rule's states (and all of its tags) has to match  */
        //@TODO state is still not working right...
        //@TODO state can be an array...
        let matches = false;
        const states = this._rules[i].state.map(item => item.state);
        let idx = states.indexOf("*");

        if (idx < 0)
          idx = states.indexOf(this._state[this._state.length - 1]);

        if (idx >= 0) {
          matches = true;
          let tags = this._rules[i].state[idx].tags;
          tags = tags.filter(tag => !this._tag[tag]);
          if (tags.length > 0) matches = false;
        }

        if (!matches) continue;

        /*  match pattern at the last position  */
        this._rules[i].pattern.lastIndex = this._pos;
        let found = this._rules[i].pattern.exec(this._input);
        this._rules[i].pattern.lastIndex = this._pos;

        if (
          (found = this._rules[i].pattern.exec(this._input)) !== null &&
          found.index === this._pos
        ) {
          if (this.config.debug)
            this._log("    MATCHED: " + JSON.stringify(found));

          /*  pattern found, so give action a chance to operate
              on it and act according to its results  */
          this._ctx._match = found;
          this._ctx._repeat = false;
          this._ctx._reject = false;
          this._ctx._ignore = false;

          if (this._before !== null) {
            this._before.call(
              this._ctx,
              this._ctx,
              found,
              this._rules[i]
            );
          }

          this._rules[i].action.call(this._ctx, this._ctx, found);

          if (this._after !== null) {
            this._after.call(
              this._ctx,
              this._ctx,
              found,
              this._rules[i]
            );
          }

          /*  reject current action, continue matching  */
          if (this._ctx._reject) {
            continue;
          }

          /*  repeat matching from scratch  */
          if (this._ctx._repeat) {
            continued = true;
            break;
          }

          /*  ignore token  */
          if (this._ctx._ignore) {
            this._progress(this._pos, this._rules[i].pattern.lastIndex);
            this._pos = this._rules[i].pattern.lastIndex;

            if (this._pos >= this._len) {
              finish();
              return;
            }

            continued = true;
            break;
          }

          /*  accept token(s)  */
          if (this._pending.length > 0) {
            this._progress(this._pos, this._rules[i].pattern.lastIndex);
            this._pos = this._rules[i].pattern.lastIndex;

            if (this._pos >= this._len) {
              finish();
            }

            return;
          }

          /*  nothing worked  */
          throw new Error(
            `action of pattern "${this._rules[i].pattern.source}" neither rejected nor accepted any token(s)`
          );
        }
      }
    }

    /*  no pattern matched at all  */
    throw this.error("token not recognized");
  }

  /**
   * Progress the line/column counter
   */
  private _progress(from: number, until: number): void {
    const line = this._line;
    const column = this._column;
    const s = this._input;

    for (let i = from; i < until; i++) {
      const c = s.charAt(i);

      if (c === "\r") {
        this._column = 1;
      } else if (c === "\n") {
        this._line++;
        this._column = 1;
      } else if (c === "\t") {
        this._column += 8 - (this._column % 8);
      } else {
        this._column++;
      }
    }

    this._log(
      `    PROGRESS: characters: ${until - from}, ` +
        `from: <line ${line}, column ${column}>, ` +
        `to: <line ${this._line}, column ${this._column}>`
    );
  }

  private pushRule(rule: Rule): this {
    this._rules.push(rule);

    this._log(
      `rule: configure rule (state: ${rule.state.state}, pattern: ${rule.pattern.source})`
    );

    return this;
  }
}
