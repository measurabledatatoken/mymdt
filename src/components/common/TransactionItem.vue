<template>
  <md-list-item 
    v-bind="$attrs" 
    v-on="$listeners"
  >
    <md-avatar v-if="!!avatarUrl">
      <img
        :src="avatarUrl" 
        alt="Avatar"
      >
    </md-avatar>
    <div class="item-info">
      <div>
        <span class="title">
          {{ title }}
        </span>
        <span class="subtitle">
          {{ subtitle }}
        </span>
      </div>
      <div class="description">{{ description }}</div>
      <slot name="action">
        <div :class="['action', {'positive': positive } ]">
          <span>{{ formmattedAmount }}</span>
        </div>
      </slot>
    </div>
  </md-list-item>
</template>

<script>
import { formatAmount } from '@/utils';

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    amount: {
      type: Number,
      default: 0,
    },
    positive: {
      type: Boolean,
      default: false,
    },
    avatarUrl: {
      type: String,
      default: '',
    },
  },
  computed: {
    formmattedAmount() {
      return formatAmount(this.amount, {
        prefix: this.amount == 0 ? '' : this.positive ? '+' : '-',
        suffix: ` MDT`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.title {
  font-weight: bold;
  color: var(
    --md-theme-default-text-primary-on-background,
    rgba(0, 0, 0, 0.87)
  );
}

.subtitle {
  margin-left: 0.25rem;
  color: $label-color;
}

.description {
  margin-top: 0.25rem;
  font-size: 12px;
  color: $secondary-text-color;
}

.action {
  margin-top: 0.25rem;
  color: $label-color;
  font-weight: bold;
  text-align: right;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: normal;
  flex: 1;

  &.positive {
    color: $theme-font-color-btn;
  }
}
</style>
