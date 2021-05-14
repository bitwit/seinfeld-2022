import EventCard from './classes/EventCard'
import Scene from './classes/Scene'
import Character from './classes/Character'
import CSVtoJSON  from 'csvtojson'
import { httpGet } from './utilities'

export default class AppState {

  scenes: Scene[] = [
    new Scene("1", "Intro"),
    new Scene("2", "Apartment"),
    new Scene("3", "Apartment"),
    new Scene("4", "Apartment"),
    new Scene("5", "Apartment")
  ]
  characters: Character[] = []
  events: EventCard[] = []

  currentView = 'intro'
  announcements: EventCard[] = []

  currentSceneIndex = -1

  // Timer related
  progress: number = 0
  progressInterval: number = 0.25
  tickSpeed: number = 20
  isPaused: boolean = false
  countdownProgress: number = 0

  constructor() {
    /* CSV Loading */
    let characters = httpGet('./data/TOGAMEJAM2020 - Bartenders.csv')
    let events = httpGet('./data/TOGAMEJAM2020 - Events.csv')

    Promise.all([
      CSVtoJSON().fromString(characters),
      CSVtoJSON().fromString(events)
    ])
    .then(([characters, events]) => {
      for(let data of characters) {
        this.characters.push(new Character(data))
      }
      let cleanEvents = events.filter((x:any) => { return x.id != "" })
      for(let data of cleanEvents) {
        this.events.push(new EventCard(data))
      }
    })
  }
}