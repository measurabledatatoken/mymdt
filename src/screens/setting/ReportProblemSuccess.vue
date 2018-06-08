<template>
  <div class="view">
    <div class="content">
      <div class="icon">
        <md-icon md-src="/static/icons/transaction-success.svg"></md-icon>
      </div>
      <p class="message">{{ $t('message.reportProblemSuccess.message') }}</p>
    </div>
    <MDTPrimaryButton @click="$router.go(-3)">{{ $t('message.common.done') }}</MDTPrimaryButton>
  </div>
</template>

<script>
import BasePage from '@/screens/BasePage';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';

export default {
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.reportProblemSuccess.title'),
    };
  },
  methods: {
  },
  components: {
    MDTPrimaryButton,
  },
};
</script>

<style lang="scss" scoped>
.view {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .content {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  .icon {
    flex: 3;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;

    .md-icon {
      width: 4.5rem;
      height: 4.5rem;
      margin: 0 auto;
    }
  }

  .message {
    flex: 4;
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    font-size: 1.25rem;
  }

  .md-button {
    bottom: 24px;
  }
}

</style>
