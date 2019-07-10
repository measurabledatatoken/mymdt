<template>
  <div class="header">
    <div class="header-wrapper">
      <div class="header__background"/>
      <md-card>
        <md-card-header>
          <div class="md-title">{{ title }}</div>
          <div class="md-subhead">{{ subheading }}</div>
        </md-card-header>
        <md-card-content>
          <slot />
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
export default {
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
$header-padding-top: 0.5rem;

.header {
  .header-wrapper {
    padding-top: $header-padding-top;
    position: relative;
  }

  .header__background {
    background-color: $home-bgcolor;
    height: calc(8em + 0.5em + #{$header-padding-top});
    width: 100%;
    position: absolute;
    top: 0;
  }
}

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
