import AppState from '../AppState'

export default class EventCard {
  id: string
  name: string
  character: string
  expression: string | null
  image: string | null
  text: string
  acceptText: string

  constructor(data: any) {
    this.id = data.id
    this.name = data.name
    this.character = data.character
    this.text = data.text
    this.expression = data.expression
    this.image = data.image
  
    this.acceptText = data.acceptText == "" ? "OK" : data.acceptText
  }

  hasBusinessMetConditions(
    state: AppState
  ): boolean {

    return true
  }

  tick(): void {

  }

  onAccept(state: AppState) {

  }

  onReject(state: AppState) {

  }

  onDestroy() {

  }

}