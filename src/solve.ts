import fs from 'fs'
import path from 'path'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

async function loadSolutions() {
  const projectRoot = process.cwd()
  const solutionsDir = path.join(projectRoot, 'src')
  const entries = fs.readdirSync(solutionsDir, { withFileTypes: true })

  const solutions = new Map()

  for (const entry of entries) {
    if (entry.isDirectory() && entry.name.match(/^day\d{2}$/)) {
      const dayNumber = entry.name.slice(3) // Extract "01" from "day01"
      const solutionPath = path.join(solutionsDir, entry.name, 'solution')
      try {
        const module = await import(solutionPath)
        const Solution = Object.values(module)[0] // Get the first exported class
        solutions.set(dayNumber, Solution)
      } catch (error) {
        console.warn(`Warning: Could not load solution for day ${dayNumber}`)
      }
    }
  }

  return solutions
}

async function main() {
  const argv = await yargs(hideBin(process.argv))
    .option('d', {
      alias: 'day',
      type: 'string',
      description: 'Day to solve',
    })
    .option('p', {
      alias: 'part',
      type: 'number',
      description: 'Part to solve (1 or 2)',
    })
    .option('i', {
      alias: 'input',
      type: 'string',
      description: 'Custom input',
    })
    .check((argv) => {
      if (argv.p && !argv.d) {
        throw new Error('Part can only be specified with a day')
      }
      if (argv.p && argv.p !== 1 && argv.p !== 2) {
        throw new Error('Part must be 1 or 2')
      }
      if (argv.i && !argv.p) {
        throw new Error('Custom input can only be used when specifying a part')
      }
      return true
    }).argv

  const solutions = await loadSolutions()

  if (argv.d) {
    const day = argv.d.padStart(2, '0')
    const Solution = solutions.get(day)
    if (!Solution) {
      console.error(`Day ${day} solution not found`)
      process.exit(1)
    }
    const solution = new Solution()
    console.log(solution.solve(argv.p, argv.i))
  } else {
    // Run all implemented solutions in order
    const sortedDays = Array.from(solutions.keys()).sort()
    for (const day of sortedDays) {
      const Solution = solutions.get(day)
      const solution = new Solution()
      console.log(solution.solve())
    }
  }
}

main().catch(console.error)
