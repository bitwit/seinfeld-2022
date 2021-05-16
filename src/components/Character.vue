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
        top: this.em(130 + this.additionalTopOffset),
        right: this.em(100 + (this.calculatedIndex * 220)),
        zIndex: `${this.character.isAtTelevision ? 100 : 1}`
      }
    },
    headStyles: function () {
      return {
        top: this.em(this.character.headTopOffset),
        left: this.em(this.character.headLeftOffset)
      }
    },
    calculatedIndex: function() {
      if(this.character.isAtWindow) {
        return 4
      } 
      if(this.character.isAtTelevision) {
        return 2
      }
      else {
        return this.index
      }
    },
    additionalTopOffset: function() {
      return this.character.isAtTelevision ? 100 : 0
    }
  }),
  methods: {
    em: function(pixels: number): string {
      return `${pixels / 16}em`
    }
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

</style>