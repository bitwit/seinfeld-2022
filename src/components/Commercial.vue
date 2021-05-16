<template>
    <div :class="typeClass" class="commercial">
    <h1>Commercial</h1>
    <img class="logo" src="../../public/img/logo.png" />
    <p class="description">{{commercial.text}}</p>

    <button :class="typeClass" @click="acceptEvent()" class="accept">
      <span class="title">Next</span>
      <br>
      <span class="hotkey-button">space</span>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.component('commercial', {
  props: {
    commercial: Object
  },
  computed: {
    typeClass: function () {
      const obj: any = {}
      obj[`type-${this.commercial.id}`] = true
      return obj
    }
  },
  methods: {
    acceptEvent: function () {
      this.$emit('accept-event')
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
div.commercials {
  position: absolute;
  z-index: 9999;
  width: 90%;
  height: 80%;
  top: 10%;
  left: 5%; 
}

div.commercials.displaying-false {
  display: none;
  pointer-events: none; 
}

div.commercial {
  box-sizing: border-box;
  border-width: 0.625em;
  border-style: solid;
  padding: em(20);
  width: 100%;
  height: 100%;
  background-color: #FFF;
  text-align: left; 

  h1 {
    text-align: center;
  }

  p.description {
    font-size: 1.75em;
    color: #333;
    padding: 0;
    margin: 0;
    text-align: center;
  }
}

div.commercial button.accept, div.commercial button.reject {
  display: block;
  outline: none;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  padding: 0.625em 0;
  border: 0.125em dotted inherit;
  -moz-border-radius: 0.25em;
  -webkit-border-radius: 0.25em;
  border-radius: 0.25em;
  width: 20.0%;
  background: none; 
  margin: 0 auto;
}

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

</style>