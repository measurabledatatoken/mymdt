<template>
  <md-card md-with-hover>
    <div v-on:click="$emit('goToAccountDetail')" class="md-card-header">
        <UserInfo :user="user" :small="small"></UserInfo>
    </div>
    <md-divider v-if="!small" />
    <md-card-actions v-if="!small" md-alignment="space-between">
      <md-button v-on:click="$emit('transfer')">{{ $t('message.common.transferbtn') }}</md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
import UserInfo from '@/components/common/UserInfo';

export default {
  props: {
    user: Object,
    small: Boolean,
  },
  components: {
    UserInfo,
  },
};
</script>

<style lang="scss" scoped>
.md-card {
  border-radius: 0.5em;
  background-color: white;
  margin: 0.5em;
}

.md-card-actions {
  justify-content: center;
  height: 3em;
}

.md-button {
  color: $plainbtn-wordcolor !important;
  font-size: 16px;
  font-weight: bold;

  /deep/ .md-button-content {
    text-transform: none;
  }
}
</style>

