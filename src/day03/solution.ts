import { Solution, SolutionOutput } from '../solutionRunner'

const REGEX = /mul\((\d+),(\d+)\)/g

export default class Day03 extends Solution {
  constructor() {
    super('03', 'Mull It Over')
  }

  protected partOne = (input: string): SolutionOutput => findMultiplesSum(input)

  protected partTwo = (input: string): SolutionOutput => {
    const disablePattern = /don't\(\).+?do\(\)/gs
    let strippedInput = input.replace(disablePattern, '')
    return findMultiplesSum(strippedInput)
  }
}

const findMultiplesSum = (input: string): number => {
  let result = 0

  for (const match of input.matchAll(REGEX)) {
    const [_, num1, num2] = match
    const product = Number(num1) * Number(num2)
    result += product
  }

  return result
}
