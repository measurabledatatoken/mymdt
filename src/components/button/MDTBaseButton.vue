<template>
    <md-button v-bind="$attrs" @click="$emit('click')" class="md-raised">
        <slot></slot>
    </md-button>
</template>

<style lang="scss" scoped>
.md-button.md-raised {
  width: 86%;
  height: 48px;
  margin: 0px;
  z-index: 4;
}
</style>

