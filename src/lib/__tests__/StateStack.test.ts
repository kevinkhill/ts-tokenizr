import { StateStack } from "../StateStack";

describe("new StateStack()", () => {
  const strings = new StateStack("default");

  test(`should have the correct functionality`, () => {
    expect(strings).toHaveLength(1);
    expect(strings.peek()).toBe("default");

    strings.push("A");

    expect(strings).toHaveLength(2);
    expect(strings.peek()).toBe("A");

    strings.push("B");

    expect(strings).toHaveLength(3);
    expect(strings.pop()).toBe("B");
    expect(strings).toHaveLength(2);
    expect(strings.pop()).toBe("A");

    // Cannot pop the default state
    expect(strings.isEmpty).toBeTruthy();
    expect(() => strings.pop()).toThrowError();
    expect(strings.peek()).toBe("default");

    strings.push("X");
    strings.push("Y");
    strings.push("Z");
    strings.clear();

    expect(strings.isEmpty).toBeTruthy();
    expect(strings.peek()).toBe("default");
  });
});
