import { Stack } from "../Stack";

describe("new Stack()", () => {
  test(`should have the correct functionality`, () => {
    const strings = new Stack();

    strings.push("A");

    expect(strings).toHaveLength(1);

    strings.push("B");

    expect(strings).toHaveLength(2);

    expect(strings.peek()).toBe("B");

    strings.push("C");

    expect(strings).toHaveLength(3);

    strings.pop();

    expect(strings).toHaveLength(2);
    expect(strings.peek()).toBe("B");

    strings.pop();

    expect(strings.isNotEmpty).toBeTruthy();

    strings.pop();

    expect(strings.isEmpty).toBeTruthy();

    strings.push("X");
    strings.push("Y");
    strings.push("Z");
    strings.clear();

    expect(strings.isEmpty).toBeTruthy();

    expect(strings.peek()).toBeUndefined();
  });
});
