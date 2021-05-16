import AppState from '../AppState'

export default class Event {
  id: string
  character: string
  text: string
  scene: number
  expression: string | null
  image: string | null
  enters: boolean
  leaves: boolean
  moveToWindow: boolean
  moveFromWindow: boolean
  moveToTelevision: boolean

  constructor(data: any) {
    this.id = data.id
    this.character = data.character
    this.text = data.text
    this.scene = parseInt(data.scene || 0)
    this.expression = data.expression
    this.image = data.image
    this.enters = (data.enters == "1")
    this.leaves = (data.leaves == "1")
    this.moveToWindow = (data.moveToWindow == "1")
    this.moveFromWindow = (data.moveFromWindow == "1")
    this.moveToTelevision = (data.moveToTelevision == "1")
  }
}