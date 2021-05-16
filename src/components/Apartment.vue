<template>
  <div class="apartment-scene">
    <character 
      :character="jerry"
      :index="0"
    />
    <transition-group name="character-group" tag="div">
      <character 
        v-for="(character, index) in characters" 
        :key="character.id" 
        :character="character"
        :index="index + 1"
      />
    </transition-group>
    <div class="couch"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Vuex from 'vuex'
import AppState from '../AppState'

export default Vue.component('apartment', {
  computed: Vuex.mapState({
    currentView: function (state: AppState) { return state.currentView },
    characters: function (state: AppState) { return state.charactersInScene },
    jerry: function (state: AppState) { return state.characters.jerry },
  }),
  methods: {
    characterStyles: function (index: number, mood: string) {
      return {
        top: `${Math.random() * 100 / 16}em`,
        left: `${index * 120 / 16}em`,
      }
    }
  }
})
</script>

<style lang="scss">
$browser-context: 16; // Default
@function em($pixels, $context: $browser-context) {
  @return #{$pixels/$context}em;
}

.apartment-scene {
  background: url(../../public/img/apartment-bg.png) no-repeat;
  background-size: contain;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}
.couch {
  background: url(../../public/img/apartment-couch.png) no-repeat;
  // width: em(1000);
  // height: em(562.5);
  width: 100%;
  height: 100%;
  background-size: cover;

  position: relative;
  z-index: 10;
}

.character-group-enter-active, .character-group-leave-active {
  transition: all 1s;
}
.character-group-enter, .character-group-leave-to {
  opacity: 0;
  transform: translateX(em(50));
}

</style>