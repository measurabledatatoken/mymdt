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
  name: 'MdSubheader',
  props: ['user', 'src', 'name'],
  computed: {
    imageSrc() {
      return this.src || this.user.imageSrc; // TODO: user should contain profile pic url. But not sure if the field is imageSrc
    },
    displayName() {
      return extractNameInitials(this.name || this.user.displayName || this.user.emailAddress);
    },
  },
};
</script>
