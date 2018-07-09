<template>
  <md-avatar class="md-avatar-icon" :disabled="disabled">
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
      type: String,
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
  },
};
</script>


<style lang="scss" scoped>
  .md-avatar-icon[disabled]{
    opacity: 0.6;
  }
</style>
