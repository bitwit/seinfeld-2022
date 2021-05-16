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

    <apartment />

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

let preloadedImageNames = [
"apartment-bg.png",
"apartment-couch.png",
"body-arms-down.png",
"body-arms-left.png",
"body-arms-right.png",
"body-arms-up.png",
"buzzer.png",
"default-body.png",
"elaine-angry.png",
"elaine-neutral.png",
"elaine-sarcastic.png",
"george-angry.png",
"george-happy.png",
"george-neutral.png",
"georgetiki.png",
"iphone.png",
"jerry-neutral.png",
"jerry-sarcastic.png",
"jerry-shame.png",
"jerry-shocked.png",
"jerry-skeptical.png",
"kramer-angry.png",
"kramer-happy.png",
"kramer-neutral.png",
"logo.png",
"newman-neutral.png",
"newman-angry.png",
"reporter-neutral.png",
"tv-and-reporter.png",
"tv.png",
"window-closed.png",
"window-open.png"
];

let preloadedImages: HTMLElement[] = []

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
  data: function() {
    return {
      images: []
    }
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
    this.preloadImages()
  },
  computed: Vuex.mapState({
    currentlyDisplayedEvent: function (state: AppState) { return state.currentlyDisplayedEvent },
    currentlyDisplayedDialogue: function (state: AppState) { return state.currentlyDisplayedDialogue },
    currentlyDisplayedCommercial: function (state: AppState) { return state.currentlyDisplayedCommercial },
    currentView: function (state: AppState) { return state.currentView }
  }),
  methods: {
    preloadImages: function () {
      let images = preloadedImageNames.map((imageName) => {
        let image = new Image();
        image.src = `/img/${imageName}`
        return image
      })
      preloadedImages = images;
    },
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
  border-width: em(10);
  border-style: solid;
  padding: 0 em(40);
  width: 66%;
  height: 75%;
  background-color: rgba($color: #ffffff, $alpha: 0.8);
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

 .dimensions-warning {
    display: none;
  }

@media only screen and (max-width: 1024px) {
  #app {
    font-size: em(10)
  }
}

@media only screen and (max-width: 650px) {
  .apartment-scene, 
  .announcements, 
  .dialogues, 
  .commercials, 
  .modal-container {
    display: none !important;
  }
  .dimensions-warning {
    display: block !important;
  }
}

</style>
