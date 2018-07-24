
<template>
  <div class="padded-container">
    <slot/>
  </div>
</template>

<style lang="scss">
.padded-container {
  padding-left: $defaultPageMargin;
  padding-right: $defaultPageMargin;
}
</style>
