<template>
  <md-card :md-with-hover="hover" :disabled="disabled">
    <div v-on:click="$emit('goToAccountDetail')" class="md-card-header">
        <UserInfo :user="user" :small="small" :disabled="disabled"></UserInfo>
    </div>
    <md-divider v-if="!small" />
    <md-card-actions v-if="!small">
      <MDTSubtleButton class="md-primary" v-on:click="$emit('transfer')">{{ $t('message.common.transferbtn') }}</MDTSubtleButton>
    </md-card-actions>
  </md-card>
</template>

<script>
import UserInfo from '@/components/common/UserInfo';
import MDTSubtleButton from '@/components/button/MDTSubtleButton';

export default {
  props: {
    user: Object,
    small: Boolean,
    hover: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    UserInfo,
    MDTSubtleButton,
  },
};
</script>

<style lang="scss" scoped>
.md-card {
  border-radius: 0.5em;
  background-color: white;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  margin: 0.5em;

  &[disabled] {
    background-color: $theme-disable-color-font;
  }
}

.md-card-actions {
  justify-content: center;
  height: 3em;

  .md-button {
    font-weight: bold;
    width: 100%;

    /deep/ .md-button-content {
      text-transform: none;
    }
  }
}

</style>

