import { parseTaggedState } from "../taggedState";

describe("parseTaggedState()", () => {
  test(`should correctly parse "* #foobar"`, () => {
    const testString = "* #foobar";
    const { state, tags } = parseTaggedState(testString);

    expect(state).toBe("*");
    expect(tags).toHaveLength(1);
    expect(tags).toContain("foobar");
  });

  test(`should correctly parse "foo #bar #baz"`, () => {
    const testString = "foo #bar #baz";
    const { state, tags } = parseTaggedState(testString);

    expect(state).toBe("foo");
    expect(tags).toHaveLength(2);
    expect(tags).toContain("bar");
    expect(tags).toContain("baz");
  });
});
