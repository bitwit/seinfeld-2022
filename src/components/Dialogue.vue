<template>
    <div :class="typeClass" class="dialogue">
      <img 
        class="character-head" 
        :src="'./img/' + dialogue.character + '-' + imageName + '.png'"
        />
      <p class="description">&ldquo;{{dialogue.says}}&rdquo;</p>

      <button :class="typeClass" @click="acceptEvent()" class="accept">
        <span class="title">Next</span>
        <br>
        <span class="hotkey-button">space</span>
      </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Vuex from 'vuex'

export default Vue.component('dialogue', {
  props: {
    dialogue: Object
  },
  computed: Vuex.mapState({
    typeClass: function () {
      const obj: any = {}
      obj[`type-${this.dialogue.id}`] = true
      return obj
    },
    imageName: function () {
      return this.dialogue.expression || 'neutral'
    }
  }),
  methods: {
    acceptEvent: function () {
      this.$emit('accept-event')
    },
    rejectEvent: function () {
      this.$emit('reject-event')
    }
  }
})
</script>
<style lang="scss">
$browser-context: 16; // Default
@function em($pixels, $context: $browser-context) {
  @return #{$pixels/$context}em;
}

/* line 541, style.sass */
div.dialogues {
  position: absolute;
  z-index: 9999;
  width: 90%;
  height: 30%;
  bottom: em(10);
  left: 5%;
}
  /* line 549, style.sass */
  div.dialogues.displaying-false {
    display: none;
    pointer-events: none; }

/* line 553, style.sass */
div.dialogue {
  box-sizing: border-box;
  border-width: 0.625em;
  border-style: solid;
  padding: em(20);
  width: 100%;
  height: 100%;
  background-color: #FFF;
  text-align: left; 

  img.character-head {
    float: left;
    width: 6%;
    margin-right: 2%;
  }
  
  p.description {
    float: left;
    font-size: em(24);
    color: #333;
    padding: 0;
    margin: 0;
    width: 72%;
  }
}

  /* line 593, style.sass */
  div.dialogue button.accept, div.dialogue button.reject {
    float: left;
    outline: none;
    cursor: pointer;
    font-size: 1em;
    font-weight: bold;
    // margin: 1.25em 0;
    padding: 0.625em 0;
    border: 0.125em dotted inherit;
    -moz-border-radius: 0.25em;
    -webkit-border-radius: 0.25em;
    border-radius: 0.25em;
    width: 20.0%;
    background: none; 
    }

/* line 623, style.sass */
.hotkey-button {
  line-height: 1.5em;
  border: 1px solid gray;
  padding: 0 5px;
  margin: 0 5px;
  font-size: 0.8em;
  text-transform: uppercase;
  -webkit-box-shadow: 1px 0 1px 0 #fff, 0 2px 0 2px lightGray, 0 2px 0 3px #333;
  -moz-box-shadow: 1px 0 1px 0 #fff, 0 2px 0 2px lightGray, 0 2px 0 3px #333;
  box-shadow: 1px 0 1px 0 #fff, 0 2px 0 2px lightGray, 0 2px 0 3px #333;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  background: -moz-linear-gradient(left, #ffffff 0%, #e2e2e2 25%);
  background: -webkit-gradient(linear, left top, right top, color-stop(0%, #ffffff), color-stop(25%, #e2e2e2));
  background: -webkit-linear-gradient(left, #ffffff 0%, #e2e2e2 25%);
  background: -o-linear-gradient(left, #ffffff 0%, #e2e2e2 25%);
  background: -ms-linear-gradient(left, #ffffff 0%, #e2e2e2 25%);
  background: linear-gradient(to right, #ffffff 0%, #e2e2e2 25%); }

@media only screen and (max-width: 1024px) {
  .dialogue {
    font-size: em(9)
  }
}

</style>