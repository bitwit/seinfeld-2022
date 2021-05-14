import Vue from 'vue'
import Vuex from 'vuex'
import AppState from './AppState'
import Scene from './classes/Scene'
import EventCard from './classes/EventCard'
import Character from './classes/Character'

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
      state.scenes = [state.scenes[0]]
      console.log("game is 1 season only")
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
    prepareForNextScene: function (state: AppState) {
      state.currentView = 'season-summary'
    },
    nextSeason: function (state: AppState) {
      state.currentSceneIndex++
      state.progress = 0
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
      state.progress = state.progressInterval
    },

    unpause: function (state: AppState) {
      state.isPaused = false
    },

    acceptFirstEvent: function (state: AppState) {
      const event = state.announcements.shift()
      if(!event) { return }
      event.onAccept(state)
      state.scenes[state.currentSceneIndex].eventsAccepted.push(event)
    },

    processEndGame: function (state: AppState) {
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
      // if(context.state.currentWeekIndex >= context.state.weeks.length) {
      //     context.commit('prepareForNextSeason')
      // } else if(!context.state.isPaused) {
      //   setTimeout(() => {
      //     context.dispatch('tick')
      //   }, context.state.tickSpeed)
      // }
    },

    acceptEvent: function (context) {
      context.commit('acceptFirstEvent')
      context.dispatch('resumeSimulation')
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
      if(context.state.currentSceneIndex >= context.state.scenes.length - 1) {
        context.commit('processEndGame')
      }
      else {
        context.commit('switchView', 'drink-building')
      }
    }
  }
})


