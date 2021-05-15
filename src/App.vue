<template>
  <div id="app">

    <div v-if="currentlyDisplayedEvent != null" class="announcements">
      <announcement :event="currentlyDisplayedEvent" @accept-event="acceptEvent()" />
    </div>
    <div v-if="currentlyDisplayedDialogue != null" class="dialogues">
      <dialogue :dialogue="currentlyDisplayedDialogue" @accept-event="acceptEvent()" />
    </div>
    <div v-if="currentlyDisplayedCommercial != null" class="commercials">
      <commercial :commercial="currentlyDisplayedCommercial" @accept-event="acceptEvent()" />
    </div>

    <div class="main-view view-container">
        <apartment />
    </div><!-- main view -->

    <div v-if="currentView == 'intro' || currentView == 'end'" class="modal-sections">
      <div class="modal-container">
        <intro-section v-if="currentView == 'intro'" />
        <end-section v-if="currentView == 'end'" />
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Vuex from 'vuex'
import AppState from './AppState'
import AppStore from './AppStore'
import { debug } from './utilities'

import IntroSection from './components/IntroSection.vue'
import EndSection from './components/EndSection.vue'

import AnnouncementView from './components/Announcement.vue'
import CharacterView from './components/Character.vue'
import Apartment from './components/Apartment.vue'
import Dialogue from './components/Dialogue.vue'
import Commercial from './components/Commercial.vue'

export default Vue.extend({
  name: 'App',
  components: {
    IntroSection,
    EndSection,

    AnnouncementView, 
    CharacterView,
    Apartment,
    Dialogue,
    Commercial
  },
 created: function () {
    document.addEventListener('keydown', (e) => {
      if(!e.repeat) {
        this.handleKeyDown(e.key)
      }
    })
    debug.superSpeed = () => {
      this.$store.commit('superSpeedMode')
    }
    debug.triggerEvent = (name: string) => {
      this.$store.commit('triggerEvent', name)
    }
  },
  computed: Vuex.mapState({
    currentlyDisplayedEvent: function (state: AppState) { return state.currentlyDisplayedEvent },
    currentlyDisplayedDialogue: function (state: AppState) { return state.currentlyDisplayedDialogue },
    currentlyDisplayedCommercial: function (state: AppState) { return state.currentlyDisplayedCommercial },
    currentView: function (state: AppState) { return state.currentView }
  }),
  methods: {
    switchView: function (viewName: string) {
      this.$store.commit('switchView', viewName)
    },

    handleKeyDown: function (key: string) {
      // console.log('keydown happened', key)
      switch (key) {
        case "Escape":
          this.rejectEvent()
          break
        case " ":
          this.acceptEvent()
          break
      }
    },

    acceptEvent: function () {
      this.$store.dispatch('acceptEvent')
    },

    rejectEvent: function () {
      this.$store.dispatch('rejectEvent')
    },
  }

});
</script>

<style lang="scss">
$browser-context: 16; // Default

@function em($pixels, $context: $browser-context) {
  @return #{$pixels/$context}em;
}

html { height: 100% }
body { height: 100% }

@font-face {
  font-family: 'ComicPapyrus';
  src: url("../public/fonts/ComicPapyrus.ttf") format("truetype");
  font-weight: normal;
  font-style: normal; }

#app {
  font-size: em(16);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: em(1000);
  height: em(562.5);
  margin: 0 auto;
  position: relative;
}

.main-title {
  background: rgba($color: #C68E5B, $alpha: 1);
  border: em(1) solid #333;
  margin: em(10);
  padding: em(10);
  font-size: em(20);
}

/* line 541, style.sass */
div.modal-sections {
  position: absolute;
  z-index: 9999;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0; 
}

/* line 553, style.sass */
div.modal-container {
  box-sizing: border-box;
  margin: 2% auto 0;
  border-width: 0.625em;
  border-style: solid;
  padding: 0 2.5em;
  width: 66%;
  height: 75%;
  background-color: rgba($color: #ffffff, $alpha: 0.8);
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

</style>
