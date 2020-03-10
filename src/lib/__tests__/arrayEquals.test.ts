import { arrayEquals } from "../arrayEquals";

describe("arrayEquals()", () => {
  test(`should correctly compare arrays`, () => {
    expect(arrayEquals(["A"], ["A"])).toBeTruthy();

    expect(arrayEquals(["A", "B"], ["A", "B"])).toBeTruthy();

    expect(arrayEquals([1], [1])).toBeTruthy();

    expect(arrayEquals([1, 2, 3], [1, 2, 3])).toBeTruthy();

    expect(
      arrayEquals(["tag1", "tag2"], ["tag1", "tag2"])
    ).toBeTruthy();

    expect(arrayEquals(["tag1", "tag2"], ["tag1"])).toBeFalsy();
  });
});
