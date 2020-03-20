import { State } from "../State";

describe("new State()", () => {
  test(`should correctly parse "* #foobar"`, () => {
    const state = new State("* #foobar");

    expect(state.name).toBe("*");
    expect(state.tags).toHaveLength(1);
    expect(state.tags).toContain("foobar");
  });

  test(`should correctly parse "foo #bar #baz"`, () => {
    const state = new State("foo #bar #baz");

    expect(state.name).toBe("foo");
    expect(state.tags).toHaveLength(2);
    expect(state.tags).toContain("bar");
    expect(state.tags).toContain("baz");
  });

  test(`should throw when finding more / less than one state`, () => {
    // > 1 states
    expect(() => {
      // eslint-disable-next-line no-new
      new State("foo bar #baz");
    }).toThrow();

    // 0 states`
    expect(() => {
      // eslint-disable-next-line no-new
      new State("#foo #bar #baz");
    }).toThrow();
  });
});
