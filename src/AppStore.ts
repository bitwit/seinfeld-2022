import Vue from 'vue'
import Vuex from 'vuex'
import AppState from './AppState'
import Season from './classes/Season'
import EventCard from './classes/EventCard'
import Bartender from './classes/Bartender'
import Ingredient from './classes/Ingredient'

Vue.use(Vuex)

export default new Vuex.Store({
  state: new AppState(),

  mutations: {
    /* Debug */
    superSpeedMode: function(state: AppState) {
      state.tickSpeed = 1
      state.progressInterval = 3.0
      console.log("super speed activated!")
    },
    singleSeason: function(state: AppState) {
      state.seasons = [state.seasons[0]]
      console.log("game is 1 season only")
    },
    addCash: function(state: AppState, amount: number) {
      state.businessObject.stats.cash += amount
      console.log("added cash", amount)
    },
    addIngredient: function(state: AppState, ingredientId: string) {
      state.drinkSpecial.push(new Ingredient({ 
        id: ingredientId, 
        name: ingredientId, 
        mixProperties: "", 
        badMixProperties: ""
      }))
    },
    triggerEvent: function(state: AppState, eventId: string) {
      for(let event of state.events) {
        if(event.id == eventId){
          state.announcements.push(event)
          state.isPaused = true
          return;
        }
      }
    },
    /* //Debug */
    
    resetCountdown: function (state: AppState) {
      state.countdownProgress = 0 
    },
    clearAnnouncements: function (state: AppState) {
      state.announcements.length = 0
    },
    switchView: function (state: AppState, newView: string) {
      console.log('switch view', newView)
      state.currentView = newView
    },
    prepareForNextSeason: function (state: AppState) {
      state.currentWeekIndex = 0
      state.currentView = 'season-summary'
    },
    nextSeason: function (state: AppState) {
      state.currentSeasonIndex++
      state.currentWeekIndex = 0
      state.progress = 0
      for(let week of state.weeks) {
        week.result = null
      }
    },
    tickCountdown: function (state: AppState) {
      state.countdownProgress -= state.tickSpeed
      if(state.countdownProgress <= 0) {
        state.countdownProgress = 0
      }
    },
    tick: function (state: AppState) {
      state.progress += state.progressInterval
      if(state.progress <= 10) {
        return
      }
      //Week has completed
      console.log('week completed', state.businessObject)
      const season = state.seasons[state.currentSeasonIndex]
      const week = state.weeks[state.currentWeekIndex]
      const result = state.businessObject.weekComplete(
        state,
        season,
        week,
        (event: EventCard) => {
          state.events.splice(state.events.indexOf(event), 1)
          state.announcements.length = 0
          state.announcements.push(event)
        }
      )
      week.result = result.weekHistory
      state.isPaused = result.didTriggerEvent
      state.progress = state.progressInterval
      state.currentWeekIndex++
      // Did season complete?
      if(state.currentWeekIndex >= state.weeks.length) {
        const season = state.seasons[state.currentSeasonIndex]
        state.businessObject.seasonComplete(season)
      }
    },

    unpause: function (state: AppState) {
      state.isPaused = false
    },

    setBarName: function(state: AppState, barName: string) {
      if(barName === "") {
        state.barName = "Some Random Bar"
        return
      }
      state.barName = barName
    },

    setBartendersSelection: function (state: AppState, bartenders: Bartender[]) {
      state.selectedBartenders = bartenders
    },

    setSpecialDrink: function (state: AppState, drink: Ingredient[]) {
      state.drinkSpecial = drink
    },
    
    acceptFirstEvent: function (state: AppState) {
      const event = state.announcements.shift()
      if(!event) { return }
      event.onAccept(state)
      state.businessObject.assets.unshift(event) // Add it to our current assets
      state.seasons[state.currentSeasonIndex].eventsAccepted.push(event)
    },

    rejectFirstEvent: function (state: AppState) {
      const event = state.announcements.shift()
      if (event && event.isRejectable) {
        event.onReject(state)
        state.seasons[state.currentSeasonIndex].eventsRejected.push(event)
      } else if(event) {
        state.announcements.unshift(event)
      }
    },

    processEndGame: function (state: AppState) {
      const endResult = state.businessObject.processEndGame(state)
      state.ending = endResult
      state.currentView = 'end'
    }

  },
      
  actions: {
    startCountdown: function (context) {
      context.commit('resetCountdown')
      context.dispatch('tickCountdown')
    },

    tickCountdown: function (context) {
      context.commit('tickCountdown')
      if(context.state.countdownProgress <= 0) {
        context.dispatch('startSimulation')
      }
      else {
        setTimeout(() => {
          context.dispatch('tickCountdown')
        }, context.state.tickSpeed)
      }
    },

    startSimulation: function (context) {
      console.log("start simulation")
      context.dispatch('tick')
    },

    tick: function (context) {
      context.commit('tick')
      if(context.state.currentWeekIndex >= context.state.weeks.length) {
          context.commit('prepareForNextSeason')
      } else if(!context.state.isPaused) {
        setTimeout(() => {
          context.dispatch('tick')
        }, context.state.tickSpeed)
      }
    },

    acceptEvent: function (context) {
      context.commit('acceptFirstEvent')
      if(context.state.businessObject.flags.isFired) {
        context.commit('processEndGame')
      } else {
        context.dispatch('resumeSimulation')
      }
    },

    rejectEvent: function (context) {
      context.commit('rejectFirstEvent')
      if(context.state.announcements.length == 0) {
        context.dispatch('resumeSimulation')
      }
    },

    resumeSimulation: function (context) {
      console.log('resuming simulation')
      context.commit('clearAnnouncements')
      context.commit('unpause')
      context.dispatch('tick')
    },
    nextSeason: function (context) {
      context.commit('nextSeason')
      context.dispatch('startCountdown')
    },
    nextSeasonOrEnd: function (context) {
      if(context.state.currentSeasonIndex >= context.state.seasons.length - 1) {
        context.commit('processEndGame')
      }
      else {
        context.commit('switchView', 'drink-building')
      }
    }
  }
})


