import EventCard from './EventCard'

export default class Scene {
  id: string
  name: string

  eventsAccepted: EventCard[] = []

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
  }
}