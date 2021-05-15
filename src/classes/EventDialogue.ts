import AppState from '../AppState'

export default class EventDialogue {
  eventId: string
  character: string
  says: string | null
  expression: string | null

  constructor(data: any) {
    this.eventId = data.eventId
    this.character = data.character
    this.says = (data.says == "") ? null : data.says
    this.expression = (data.expression == "") ? null : data.expression
  }

}