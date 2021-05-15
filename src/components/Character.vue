<template>
  <div class="character" :style="characterStyles">
    <img 
      class="character-head" 
      :src="'./img/' + character.id + '-' + character.expression + '.png'"
      :style="headStyles" />
    <div class="character-body"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Vuex from 'vuex'
export default Vue.component('character', {
  props: {
    character: Object,
    index: Number
  },
  computed: Vuex.mapState({
    characterStyles: function () {
      return {
        top: `130px`,
        right: `${100 + (this.calculatedIndex * 220)}px`
      }
    },
    headStyles: function () {
      return {
        top: `${this.character.headTopOffset}px`,
        left: `${this.character.headLeftOffset}px`,
      }
    },
    calculatedIndex: function() {
      if(this.character.isAtWindow) {
        return 4
      } else {
        return this.index
      }
    }
  }),
  methods: {

  }
})
</script>

<style lang="scss">
$browser-context: 16; // Default
@function em($pixels, $context: $browser-context) {
  @return #{$pixels/$context}em;
}
.character {
   position: absolute;
   transition-property: top left z-index;
   transition-duration: 1.5s;
   transition-timing-function: linear;

  .character-head {
    position: relative;
    z-index: 10;
    width: em(80);
  }
  .character-body {
    background: url('../../public/img/default-body.png');
    width: em(180);
    height: em(240);
    background-size: cover;
    margin: 0 auto;
  }
}


@media only screen and (max-width: 1024px) {
  .character {
    font-size: em(8);
    background-size: cover;
  }
}
</style>