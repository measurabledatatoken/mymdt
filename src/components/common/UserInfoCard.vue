<template>
  <md-card :md-with-hover="hover">
    <div 
      class="md-card-header" 
      @click="$emit('goToAccountDetail')"
    >
      <UserInfo 
        :user="user" 
        :small="small" 
        :disabled="disabled"
      />
    </div>
    <md-divider v-if="!small" />
    <md-card-actions v-if="!small">
      <MDTSubtleButton 
        :disabled="disabled" 
        class="md-primary" 
        @click="$emit('transfer')"
      >{{ $t('message.common.transferbtn') }}</MDTSubtleButton>
    </md-card-actions>
  </md-card>
</template>

<script>
import UserInfo from '@/components/common/UserInfo';
import MDTSubtleButton from '@/components/button/MDTSubtleButton';

export default {
  components: {
    UserInfo,
    MDTSubtleButton,
  },
  props: {
    user: {
      type: Object,
      default: null,
    },
    small: {
      type: Boolean,
      default: false,
    },
    hover: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.md-card {
  border-radius: 0.5em;
  background-color: white;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  margin: 0.5em;
}

.md-card-actions {
  justify-content: center;

  .md-button {
    font-weight: bold;
    width: 100%;
    min-height: 2rem;

    /deep/ .md-button-content {
      text-transform: none;
    }
  }
}
</style>
