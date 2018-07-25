<template>
  <md-avatar 
    :disabled="disabled" 
    :style="{ 'background-color': backgroundColor }" 
    class="md-avatar-icon"
  >
    <img 
      v-if="imageSrc"
      :src="imageSrc"
      alt="People"
    >
    <template v-else>
      {{ displayName }}
    </template>
  </md-avatar>
</template>

<script>
import { extractNameInitials } from '@/utils';

export default {
  props: {
    user: {
      type: Object,
      default: null,
    },
    src: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    imageSrc() {
      return this.src || this.user.avatarURL;
    },
    displayName() {
      return extractNameInitials(
        this.name || this.user.displayName || this.user.emailAddress,
      );
    },
    backgroundColor() {
      const colorCodes = [
        '#fad689',
        '#d7c4bb',
        '#ffba84',
        '#b9887d',
        '#b5caa0',
        '#a8d8b9',
        '#a5dee4',
        '#b2b2d8',
        '#eea9a9',
      ];
      const name = this.displayName.toLowerCase();
      const firstChar = name.charAt(0);
      let index =
        ((firstChar.charCodeAt(0) - 'a'.charCodeAt(0)) * colorCodes.length) /
        26;
      index = Math.min(index, colorCodes.length - 1);
      index = Math.max(0, index);
      index = parseInt(index, 10);
      return colorCodes[index];
    },
  },
};
</script>


<style lang="scss" scoped>
.md-avatar-icon[disabled] {
  opacity: 0.6;
}
</style>
