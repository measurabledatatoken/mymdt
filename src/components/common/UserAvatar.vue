<template>
  <md-avatar class="md-avatar-icon">
    <img :src="imageSrc" alt="People" v-if="imageSrc">
    <template v-else>
      {{ displayName }}
    </template>
  </md-avatar>
</template>

<script>
import { extractNameInitials } from '@/utils';

export default {
  props: ['user', 'src', 'name'],
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
