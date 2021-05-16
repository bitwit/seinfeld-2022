<template>
  <div class="character" :style="characterStyles">
    <img 
      class="character-head" 
      :src="'./img/' + character.id + '-' + character.expression + '.png'"
      :style="headStyles" />
    <img 
      class="character-body" 
      :src="'./img/body-' + character.bodyExpression + '.png'"
      />
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
        top: this.em(200 + this.additionalTopOffset),
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
      return this.character.isAtTelevision ? 115 : 0
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
   width: em(180);
   height: em(240);

  .character-head {
    position: absolute;
    z-index: 10;
    width: em(80);
  }
  .character-body {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background: url('../../public/img/body-arms-down.png');
    background-size: cover;
    margin: 0 auto;
  }
}

</style>