import { Rule } from "../Rule";

let rule: Rule;

beforeEach(() => {
  rule = new Rule();
});

describe("Rule.setState()", () => {
  test(`should correctly parse "* #foobar"`, () => {
    const testString = "* #foobar";

    rule.setState(testString);

    expect(rule.hasState("*")).toBeTruthy();
    expect(rule.getState("*")?._tags).toHaveLength(1);
    expect(rule.getState("*")?.hasTag("foobar")).toBeTruthy();
  });

  test(`should correctly parse "foo #bar #baz"`, () => {
    const testString = "foo #bar #baz";

    rule.setState(testString);

    expect(rule.hasState("foo")).toBeTruthy();
    expect(rule.getState("foo")?._tags).toHaveLength(2);
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
