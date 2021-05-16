export default class Character {
  id: string = ""
  expression: string = "neutral"
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
}