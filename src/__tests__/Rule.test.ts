import { Rule } from "../Rule";

let rule: Rule;

beforeEach(() => {
  rule = new Rule();
});

describe("Rule.setState()", () => {
  test(`should correctly parse "* #foobar"`, () => {
    const testString = "* #foobar";

    rule.setState(testString);

    expect(rule._state).toBe("*");
    expect(rule._tags).toHaveLength(1);
    expect(rule._tags).toContain("foobar");
  });

  test(`should correctly parse "foo #bar #baz"`, () => {
    const testString = "foo #bar #baz";

    rule.setState(testString);

    expect(rule._state).toBe("foo");
    expect(rule._tags).toHaveLength(2);
    expect(rule._tags).toContain("bar");
    expect(rule._tags).toContain("baz");
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
