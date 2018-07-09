<template>
  <md-avatar class="md-avatar-icon" :disabled="disabled" :style="{ 'background-color': backgroundColor }">
    <img :src="imageSrc"
         alt="People"
         v-if="imageSrc">
    <template v-else>
      {{ displayName }}
    </template>
  </md-avatar>
</template>

<script>
import { extractNameInitials } from '@/utils';

export default {
  props: {
    user:
    {
      type: Object,
    },
    src: {
      type: String,
    },
    name: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
  },
  computed: {
    imageSrc() {
      return this.src || this.user.avatarURL;
    },
    displayName() {
      return extractNameInitials(this.name || this.user.displayName || this.user.emailAddress);
    },
    backgroundColor() {
      const colorCodes = ['#fad689', '#d7c4bb', '#ffba84', '#b9887d', '#b5caa0', '#a8d8b9', '#a5dee4', '#b2b2d8', '#eea9a9'];
      const name = this.displayName.toLowerCase();
      const firstChar = name.charAt(0);
      let index = ((firstChar.charCodeAt(0) - 'a'.charCodeAt(0)) * colorCodes.length) / 26;
      index = parseInt(index, 10);
      return colorCodes[index];
    },
  },
};
</script>


<style lang="scss" scoped>
  .md-avatar-icon[disabled]{
    opacity: 0.6;
  }
</style>
