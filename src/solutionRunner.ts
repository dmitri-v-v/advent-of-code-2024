import fs from 'fs'
import path from 'path'

export type SolutionOutput = string | number | undefined

export abstract class Solution {
  private dayNumber: string
  private title: string

  constructor(dayNumber: string, title: string) {
    this.dayNumber = dayNumber.padStart(2, '0')
    this.title = title
  }

  // To be implemented by each day's solution
  protected abstract partOne(input: string): SolutionOutput
  protected abstract partTwo(input: string): SolutionOutput

  private getFileInput(): string {
    const inputPath = path.join(process.cwd(), 'src', `day${this.dayNumber}`, 'input.txt')
    return fs.readFileSync(inputPath, 'utf-8')
  }

  public solve(part?: number, customInput?: string): string {
    const input = customInput ?? this.getFileInput()
    const part1Result = part === 2 ? undefined : this.partOne(input)
    const part2Result = part === 1 ? undefined : this.partTwo(input)

    const status = part1Result && part2Result ? '✅' : part1Result ? '🔸' : '❌'

    let output = `Day ${this.dayNumber}: ${this.title}: ${status}`

    if (part1Result) output += ` Part 1: ${part1Result}`

    if (part2Result) output += `${part1Result ? ' |' : ''} Part 2: ${part2Result}`

    return output
  }
}
