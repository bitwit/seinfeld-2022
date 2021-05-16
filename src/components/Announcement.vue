<template>
    <div :class="typeClass" class="announcement">
    <img 
      v-if="event.image != null"
      class="event-image" 
      :src="'./img/' + event.image + '.png'"
      />
    <p class="description">{{event.text}}</p>

    <button :class="typeClass" @click="acceptEvent()" class="accept">
      <span class="title">Next</span>
      <br>
      <span class="hotkey-button">space</span>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.component('announcement', {
  props: {
    event: Object
  },
  computed: {
    typeClass: function () {
      const obj: any = {}
      obj[`type-${this.event.id}`] = true
      return obj
    }
  },
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
div.announcements {
  position: absolute;
  z-index: 9999;
  width: 90%;
  height: 50%;
  top: 25%;
  left: 5%; 
}

div.announcements.displaying-false {
  display: none;
  pointer-events: none; 
}

div.announcement {
  box-sizing: border-box;
  border-width: 0.625em;
  border-style: solid;
  padding: em(20);
  width: 100%;
  height: 100%;
  background-color: #FFF;
  text-align: left; 

  img.event-image {
    display: block;
    max-width: em(160);
    max-height: em(120);
    margin: 0 auto;
  }

  p.description {
    font-size: 1.75em;
    color: #333;
    padding: 0;
    margin: 0;
    text-align: center;
  }
}

div.announcement button.accept, div.announcement button.reject {
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

@media only screen and (max-width: 1024px) {
  .announcement {
    font-size: em(9)
  }
}

</style>