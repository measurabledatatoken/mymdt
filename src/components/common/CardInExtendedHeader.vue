<template>
  <ExtendedHeaderContainer>
    <md-card>
      <md-card-header>
        <div class="md-title">{{ title }}</div>
        <div class="md-subhead">{{ subheading }}</div>
      </md-card-header>
      <md-card-content>
        <slot />
      </md-card-content>
    </md-card>
  </ExtendedHeaderContainer>
</template>

<script>
import ExtendedHeaderContainer from '@/components/containers/ExtendedHeaderContainer';
export default {
  components: {
    ExtendedHeaderContainer,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    subheading: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.md-card {
  border-radius: 0.5em;
  background-color: white;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.25);
  margin: 0 0.5em 0.5em 0.5em;

  .md-card-header {
    .md-title {
      margin-bottom: 0.5rem;
    }
  }
}
</style>
