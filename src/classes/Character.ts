export default class Character {
  id: string = ""
  expression: string = "neutral"
  bodyExpression: string = "arms-down"
  headTopOffset: number = 0
  headLeftOffset: number = 0
  isAtWindow: boolean = false
  isAtTelevision: boolean = false

  constructor(
    id: string, 
    headTopOffset: number = 0, 
    headLeftOffset: number = 0
    ) {
    this.id = id
    this.headTopOffset = headTopOffset
    this.headLeftOffset = headLeftOffset
  }

  resetPosture() {
    this.expression = "neutral"
    this.bodyExpression = "arms-down"
  }
}