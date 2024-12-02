import { readdirSync } from "fs";
import { join } from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const PUZZLE_TITLES: Record<string, string> = {
  // '01': 'Trebuchet?!',
};

async function runDayPart(day: string, part: number): Promise<boolean> {
  const solutionPath = join(__dirname, `day${day}/solution.ts`);

  try {
    const { stdout } = await execAsync(`ts-node ${solutionPath} ${part}`);
    return stdout.includes("Solution found");
  } catch {
    return false;
  }
}

async function runDay(day: string) {
  const part1Solved = await runDayPart(day, 1);
  const part2Solved = await runDayPart(day, 2);

  const status = part1Solved && part2Solved ? "✅" : part1Solved ? "🔸" : "❌";

  console.log(`Day ${day}: ${PUZZLE_TITLES[day]}: ${status}`);
}

async function main() {
  const specificDay = process.argv[2]?.padStart(2, "0");

  if (specificDay) {
    await runDay(specificDay);
    return;
  }

  const dayFolders = readdirSync(__dirname)
    .filter((f) => f.match(/^day\d{2}$/))
    .sort();

  for (const folder of dayFolders) {
    const day = folder.slice(3);
    await runDay(day);
  }
}

main().catch(console.error);
