import { readFileSync, existsSync } from "fs";
import { join } from "path";

export abstract class SolutionTemplate {
  private dayNumber: string;

  constructor(dayNumber: string) {
    this.dayNumber = dayNumber.padStart(2, "0");
  }

  protected getInput(part: number, defaultInput?: string): string {
    const inputPath = join(
      __dirname,
      "..",
      `day${this.dayNumber}`,
      `input${part}.txt`
    );

    if (existsSync(inputPath)) {
      return readFileSync(inputPath, "utf8");
    }

    if (!defaultInput) {
      throw new Error(`No input provided and ${inputPath} doesn't exist`);
    }

    return defaultInput;
  }

  abstract partOne(input: string): number;
  abstract partTwo(input: string): number;

  run(): void {
    const part = process.argv[2] || "both";
    const defaultInput = process.argv[3];

    if (part === "1" || part === "both") {
      const solution1 = this.partOne(this.getInput(1, defaultInput));
      console.log(`Part One Solution: ${solution1}`);
      if (solution1 !== 0) console.log("Solution found");
    }

    if (part === "2" || part === "both") {
      const solution2 = this.partTwo(this.getInput(2, defaultInput));
      console.log(`Part Two Solution: ${solution2}`);
      if (solution2 !== 0) console.log("Solution found");
    }
  }
}
