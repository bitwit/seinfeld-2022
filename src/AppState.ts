import { httpGet } from './utilities'
import CSVtoJSON  from 'csvtojson'
import Event from './classes/EventCard'
import Character from './classes/Character'
import EventDialogue from './classes/EventDialogue'
import Commercial from './classes/Commercial'

export default class AppState {

  characters = {
    jerry: new Character("jerry", -60, 60),
    george: new Character("george", -50, 60),
    elaine: new Character("elaine", -40, 60),
    kramer: new Character("kramer", -70, 60),
    newman: new Character("newman", -50, 60)
  }

  charactersInScene: Character[] = []

  events: Event[] = []
  eventDialogue: {[eventId: string]: EventDialogue[]} = {}
  commercials: Commercial[] = []

  currentView = 'intro'
  eventPresentationQueue: Event[] = []
  currentlyDisplayedEvent: Event | null = null
  currentDialogueQueue: EventDialogue[] = []
  currentlyDisplayedDialogue: EventDialogue | null = null
  currentlyDisplayedCommercial: Commercial | null = null

  currentSceneIndex = 0

  // Timer related
  progress: number = 0
  progressInterval: number = 1
  maxProgressBeforeNextEvent: number = 2
  tickSpeed: number = 1000
  isPaused: boolean = false

  constructor() {

    /* CSV Loading */
    let events = httpGet('./data/TOJAM2021 - Seinfeld 2022 - Events.csv')
    let dialogue = httpGet('./data/TOJAM2021 - Seinfeld 2022 - EventDialogue.csv')
    let commercials = httpGet('./data/TOJAM2021 - Seinfeld 2022 - Commercials.csv')

    Promise.all([
      CSVtoJSON().fromString(events),
      CSVtoJSON().fromString(dialogue),
      CSVtoJSON().fromString(commercials),
    ])
    .then(([events, dialogue, commercials]) => {
      let cleanEvents = events.filter((x:any) => { return x.id != "" })
      for(let data of cleanEvents) {
        this.events.push(new Event(data))
      }
      console.log("events", this.events)

      let cleanDialogue = dialogue.filter((x:any) => { return x.eventId != "" })
      for(let data of cleanDialogue) {
        if (this.eventDialogue[data.eventId] != null) {
          this.eventDialogue[data.eventId].push(new EventDialogue(data))
        } else {
          this.eventDialogue[data.eventId] = [new EventDialogue(data)]
        }
      }
      console.log("dialogue", this.eventDialogue)

      let cleanCommercials = commercials.filter((x:any) => { return x.id != "" })
      for(let data of cleanCommercials) {
        this.commercials.push(new Commercial(data))
      }
      console.log("commercials", this.commercials)
    })
  }
}