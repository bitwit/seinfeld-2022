<template>
  <div class="intro-wrapper">
    <div class="intro-text-area">
      <img class="logo" src="../../public/img/logo.png" />
      <h1>Seinfeld 2022</h1>
      <p class="intro-description">
        The gang is back to tackle modernity.
      </p>
    </div>
    <button @click="newGame()" class="game-start">
      <span class="title">Start</span>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Vuex from 'vuex'
export default Vue.component('intro-section', {
  methods: {
    newGame: function () {
      this.$store.commit('switchView', 'main')
      this.$store.dispatch('nextScene')
    }
  }
})
</script>

<style lang="scss">
$browser-context: 16; // Default
@function em($pixels, $context: $browser-context) {
  @return #{$pixels/$context}em;
}

img.logo {
  display: block;
  width: em(160);
  margin: 0 auto;
}

h1 {
  font-size: em(28);
}

.game-start {
  display: block;
  margin: em(20) auto 0;
  width: 60%;
  height: em(50);
  font-size: em(28);
  background: cornflowerblue;
  color: white;
  border: 0;
  border-radius: em(4);
  cursor: pointer;
  &:hover {
    background-color: rgba($color: #338833, $alpha: 1.0);
  }
}

</style>