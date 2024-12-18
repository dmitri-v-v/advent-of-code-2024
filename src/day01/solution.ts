import { Solution, SolutionOutput } from '../solutionRunner'

export default class Day01 extends Solution {
  constructor() {
    super('01', 'Historian Hysteria')
  }

  private getLists(input: string): { leftList: number[]; rightList: number[] } {
    const lines = input.split(/\r?\n/).filter((line) => line.trim())

    let leftList: number[] = []
    let rightList: number[] = []

    for (const line of lines) {
      const [numLeft, numRight] = line.split(/\s+/).map(Number)
      leftList.push(numLeft)
      rightList.push(numRight)
    }

    return { leftList, rightList }
  }

  partOne(input: string): SolutionOutput {
    let { leftList, rightList } = this.getLists(input)

    leftList = leftList.sort()
    rightList = rightList.sort()

    if (leftList.length !== rightList.length) {
      console.error('Got unequal arrays')
    }

    let totalDiff = 0

    for (let i = 0; i < leftList.length; i++) {
      const diff = Math.abs(rightList[i] - leftList[i])
      totalDiff += diff
    }

    return totalDiff
  }

  partTwo(input: string): SolutionOutput {
    let { leftList, rightList } = this.getLists(input)

    const rightListCounts = new Map<number, number>()

    for (const num of rightList) {
      const count = rightListCounts.get(num)
      rightListCounts.set(num, count ? count + 1 : 1)
    }

    let similarityScore = 0

    for (const num of leftList) {
      const count = rightListCounts.get(num)
      const increase = num * (count ?? 0)
      similarityScore += increase
    }

    return similarityScore
  }
}
