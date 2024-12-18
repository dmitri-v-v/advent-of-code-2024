import { Solution, SolutionOutput } from '../solutionRunner'

enum DIRECTION {
  INCREASE = 1,
  DECREASE = -1,
  SAME = 0,
}

export default class Day02 extends Solution {
  constructor() {
    super('02', 'Red-Nosed Reports')
  }

  protected partOne(input: string): SolutionOutput {
    const reports = getReports(input)

    let safeCount = 0

    for (const report of reports) {
      const isSafe = isReportSafe(report)

      if (isReportSafe(report)) safeCount++
    }

    return safeCount
  }

  protected partTwo(input: string): SolutionOutput {
    return undefined
  }
}

const getReports = (input: string): number[][] =>
  input
    .split(/\r?\n/)
    .filter((line) => line.trim())
    .map((row) => row.split(' ').map(Number))

const getDirection = (num1: number, num2: number): DIRECTION => {
  if (num1 === num2) return DIRECTION.SAME
  if (num1 < num2) return DIRECTION.INCREASE
  return DIRECTION.DECREASE
}

const isReportSafe = (report: number[]): boolean => {
  if (report.length < 2) return false

  let initialDirection

  for (let i = 0; i < report.length - 1; i++) {
    let num1 = report[i]
    let num2 = report[i + 1]

    let diff = Math.abs(num2 - num1)

    if (diff > 3) return false

    const direction = getDirection(num1, num2)

    if (direction === DIRECTION.SAME) return false

    if (!initialDirection) {
      initialDirection = direction
      continue
    }

    if (direction !== initialDirection) return false
  }

  return true
}
