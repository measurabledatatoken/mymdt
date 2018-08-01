<template>
  <md-switch 
    :class="['md-primary', 'mdt-switch']"
    v-model="model"
    @change="onChange"
  />
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    model() {
      return this.value;
    },
  },
  methods: {
    onChange(value) {
      this.$emit('input', value);
    },
  },
};
</script>
<style lang="scss" scoped>
$switch-width: 52px;
$thumb-size: 16px;
$padding-between-switch-and-thumb: 5px;
.mdt-switch {
  /deep/.md-switch {
    &.md-theme-default {
      .md-switch-container {
        background: $theme-disable-color-font;
        width: 52px;
        min-width: 52px;
        height: 24px;
      }
      .md-switch-thumb {
        background-color: white;
        width: 16px;
        height: 16px;
        transform: translate3d($padding-between-switch-and-thumb, 0, 0);
      }
      &.md-checked {
        .md-switch-container {
          background: $bluebtn-backgroundcolor;
        }
        &.md-primary {
          .md-switch-thumb {
            transform: translate3d(
              calc(
                #{$switch-width} - #{$thumb-size} - #{$padding-between-switch-and-thumb}
              ),
              0,
              0
            );
          }
        }
      }
    }
  }
}
</style>
