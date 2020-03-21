import { Rule } from "../Rule";

let rule: Rule;

beforeEach(() => {
  rule = new Rule();
});

describe("Rule.setPattern() & Rule.test() & MatchResult", () => {
  test(`should correctly set a simple pattern and match input`, () => {
    rule.setPattern(/[a-z]+/);

    expect(rule.hasPattern).toBeTruthy();

    const match = rule.test("tacos");

    expect(match.matched).toBeTruthy();
    expect(match).toHaveLength(1);
    expect(match.result[0]).toBe("tacos");
  });

  test(`should return a failed match object if the pattern fails`, () => {
    rule.setPattern(/[a-z]+/);

    expect(rule.hasPattern).toBeTruthy();

    const match = rule.test("12 tacos");

    expect(match.matched).toBeFalsy();
    expect(match).toHaveLength(0);
  });

  test(`should correctly set a capture group pattern and match input`, () => {
    rule.setPattern(/([A-Z])#([0-9]+)/);

    expect(rule.hasPattern).toBeTruthy();

    const match = rule.test("H#512");

    expect(match.matched).toBeTruthy();
    expect(match).toHaveLength(3);
    expect(match.result[0]).toBe("H#512");
    expect(match.result[1]).toBe("H");
    expect(match.result[2]).toBe("512");
  });
});

describe("Rule.setState()", () => {
  test(`should correctly parse "* #foobar"`, () => {
    const testString = "* #foobar";

    rule.setState(testString);

    expect(rule.hasState("*")).toBeTruthy();
    expect(rule.getState("*")?.tags).toHaveLength(1);
    expect(rule.getState("*")?.hasTag("foobar")).toBeTruthy();
  });

  test(`should correctly parse "foo #bar #baz"`, () => {
    const testString = "foo #bar #baz";

    rule.setState(testString);

    expect(rule.hasState("foo")).toBeTruthy();
    expect(rule.getState("foo")?.tags).toHaveLength(2);
    expect(rule.getState("foo")?.hasTag("bar")).toBeTruthy();
    expect(rule.getState("foo")?.hasTag("baz")).toBeTruthy();
  });

  test(`should correctly parse "foo, bar"`, () => {
    const testString = "foo, bar";

    rule.setState(testString);

    expect(rule.hasState("foo")).toBeTruthy();
    expect(rule.hasState("bar")).toBeTruthy();
  });

  test(`should throw when parsing finds more/less than one state`, () => {
    // Two states
    expect(() => {
      rule.setState("foo bar #baz");
    }).toThrow();

    // No states
    expect(() => {
      rule.setState("#foo #bar #baz");
    }).toThrow();
  });
});
