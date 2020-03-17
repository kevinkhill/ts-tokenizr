import fs from "fs";
import path from "path";

export function getSampleFileContents(filename): string {
  // eslint-disable-next-line no-sync
  return fs.readFileSync(path.join(__dirname, filename), "utf8");
}
