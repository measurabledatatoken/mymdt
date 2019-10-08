<template>
  <div class="header">
    <div class="header-wrapper">
      <div class="header__background"/>
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>

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

  .content {
    position: relative;
  }
}
</style>
