import Vue from 'vue'
import Vuex from 'vuex'
import AppState from './AppState'
import Event from './classes/EventCard'
import Character from './classes/Character'

Vue.use(Vuex)

export default new Vuex.Store({
  state: new AppState(),

  mutations: {
    /* Debug */
    superSpeedMode: function(state: AppState) {
      state.tickSpeed = 1
      state.progressInterval = 5.0
      console.log("super speed activated!")
    },
    triggerEvent: function(state: AppState, eventId: string) {
      for(let event of state.events) {
        if(event.id == eventId){
          state.eventPresentationQueue.push(event)
          state.isPaused = true
          return;
        }
      }
    },
    /* //Debug */
    
    switchView: function (state: AppState, newView: string) {
      console.log('switch view', newView)
      state.currentView = newView
    },
    prepareForNextEvent: function (state: AppState) {
      console.log("prepare next event")
      let nextEvent = state.eventPresentationQueue.shift()
      if(nextEvent) {
        state.currentlyDisplayedEvent = nextEvent
        state.currentDialogueQueue = state.eventDialogue[nextEvent.id] || []
        console.log("event dialogue queue", state.currentDialogueQueue)
        state.isPaused = true
      }
    },
    prepareForNextScene: function (state: AppState) {
      console.log("prepare next scene, commercials")
      let commercial = state.commercials.shift()
      if(commercial) {
        state.currentlyDisplayedCommercial = commercial
        state.isPaused = true
      }
    },
    nextScene: function (state: AppState) {
      console.log("nextScene")
      state.currentSceneIndex++
      state.progress = 0
      state.charactersInScene = []
      state.eventPresentationQueue = state.events.filter((x) => { return x.scene == state.currentSceneIndex })
      console.log(`events in scene ${state.currentSceneIndex} > ${state.eventPresentationQueue.length}`)
      if (state.eventPresentationQueue.length == 0) {
        state.currentView = 'end';
      }
    },
    tick: function (state: AppState) {
      state.progress += state.progressInterval
      console.log("tick", state.progress)
      if(state.progress <= state.maxProgressBeforeNextEvent) {
        return
      }
      state.progress = state.progressInterval
    },

    unpause: function (state: AppState) {
      state.isPaused = false
    },

    acceptEvent: function (state: AppState) {
      if (state.currentlyDisplayedCommercial != null) {
        state.currentlyDisplayedCommercial = null
        console.log('commercial end', state)
        return;
      }

      if (state.currentlyDisplayedEvent != null) {
        let event = state.currentlyDisplayedEvent
        if (event.enters) {
          let characters: any = state.characters
          let character: Character = characters[event.character]
          state.charactersInScene.unshift(character)
        } else if (event.leaves) {
          state.charactersInScene = state.charactersInScene.filter((x) => { return x.id != event.character })
        }
        if (event.moveToWindow) {
          let characters: any = state.characters
          let character: Character = characters[event.character]
          character.isAtWindow = true
        } else if (event.moveFromWindow) {
          let characters: any = state.characters
          let character: Character = characters[event.character]
          character.isAtWindow = false
        }
        if(event.moveToTelevision) {
          let characters: any = state.characters
          let character: Character = characters[event.character]
          character.isAtTelevision = true
        }

        state.currentlyDisplayedEvent = null
      }

      if (state.currentDialogueQueue.length > 0) {
        while (true) {
          let nextDialogue = state.currentDialogueQueue.shift() || null
          state.currentlyDisplayedDialogue = nextDialogue
          if (nextDialogue) {
            if (nextDialogue.expression) {
              let characters: any = state.characters
              let character: Character = characters[nextDialogue.character]
              character.expression = nextDialogue.expression
            }
            if (nextDialogue.says) {
              break
            }
          } else {
            break
          }
        }
      } else {
        state.currentlyDisplayedDialogue = null
      }
    },

    processEndGame: function (state: AppState) {
      state.currentView = 'end'
    }

  },
      
  actions: {
    startSimulation: function (context) {
      console.log("start simulation")
      context.dispatch('tick')
    },

    tick: function (context) {
      context.commit('tick')
      if(context.state.progress == context.state.maxProgressBeforeNextEvent) {
        if (context.state.eventPresentationQueue.length == 0) {
          context.commit('prepareForNextScene')
          if(context.state.currentlyDisplayedCommercial == null) {
            context.commit('nextScene')
          }
        } else {
          context.commit('prepareForNextEvent')
        }
      } else if(!context.state.isPaused) {
        setTimeout(() => {
          context.dispatch('tick')
        }, context.state.tickSpeed)
      }
    },

    acceptEvent: function (context) {
      if (!context.state.isPaused) {
        console.log("not paused, early exiting accept event")
        return;
      }

      if (context.state.currentlyDisplayedCommercial != null) {
        context.dispatch('nextScene')
      }

      console.log("accepting event")
      context.commit('acceptEvent')
      if (
        context.state.currentDialogueQueue.length == 0 
        && context.state.currentlyDisplayedDialogue == null
        && context.state.currentlyDisplayedCommercial == null
        ) {
        context.dispatch('resumeSimulation')
      } else {
        console.log(
          context.state.currentlyDisplayedDialogue?.character, 
          ":",
          context.state.currentlyDisplayedDialogue?.says
          )
      }
    },

    rejectEvent: function (context) {
      context.commit('rejectFirstEvent')
      if(context.state.eventPresentationQueue.length == 0) {
        context.dispatch('resumeSimulation')
      }
    },

    resumeSimulation: function (context) {
      console.log('resuming simulation')
      context.commit('unpause')
      context.dispatch('tick')
    },
    nextScene: function (context) {
      context.commit('nextScene')
      context.dispatch('tick')
    }
  }
})


