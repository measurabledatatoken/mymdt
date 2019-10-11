<template>
  <BaseEarnMDTItem
    :title="title"
    v-bind="$attrs"
    class="earn-mdt-task-item"
    md-src="/static/icons/get-mdt.svg"
  >
    <template slot="action">
      <div class="earn-mdt-task-item__action">
        <WebViewLink :to="url">
          <MDTSecondaryButton class="earn-mdt-task-item-action__claim-button">
            {{ caption }}
          </MDTSecondaryButton>
        </WebViewLink>
      </div>
    </template>
  </BaseEarnMDTItem>
</template>

<script>
import BaseEarnMDTItem from '@/components/task/BaseEarnMDTItem';
import MDTSecondaryButton from '@/components/button/MDTSecondaryButton';
import WebViewLink from '@/components/common/WebViewLink';

export default {
  components: {
    BaseEarnMDTItem,
    MDTSecondaryButton,
    WebViewLink,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    caption: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.earn-mdt-task-item {
  .earn-mdt-task-item__action {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .earn-mdt-task-item-action__amount-to-earn {
      font-size: 0.875rem;
      font-weight: bold;
      color: $theme-color;
      margin-right: 0.625rem;
    }

    .earn-mdt-task-item-action__claim-button {
      margin-right: 0px;
      margin-left: 0px;
    }
  }
}
</style>
