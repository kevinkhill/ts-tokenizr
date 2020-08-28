import { MatchResult } from "../MatchResult";

function regexMatch(regex: RegExp, subject: string): MatchResult {
  return new MatchResult(regex.exec(subject));
}

describe("MatchResult", () => {
  test(`should correctly match a simple pattern`, () => {
    const match = regexMatch(/[a-z]+/, "tacos");

    expect(match.matched).toBeTruthy();
    expect(match).toHaveLength(1);
    expect(match.result[0]).toBe("tacos");
  });

  test(`should return a failed match object if the pattern fails`, () => {
    const match = regexMatch(/[a-z]+/, "12");

    expect(match.matched).toBeFalsy();
    expect(match).toHaveLength(0);
  });

  test(`should correctly set a capture group pattern and match input`, () => {
    const match = regexMatch(/([A-Z])#([0-9]+)/, "H#512");

    expect(match.matched).toBeTruthy();
    expect(match).toHaveLength(3);
    expect(match.result[0]).toBe("H#512");
    expect(match.result[1]).toBe("H");
    expect(match.result[2]).toBe("512");
  });
});
