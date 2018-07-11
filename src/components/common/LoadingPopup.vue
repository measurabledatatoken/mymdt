<template>
  <div class="spinner-overlay">
    <div class="spinner-cointainer">
      <img 
        :src="src" 
        class="spinner"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.spinner-overlay {
  position: fixed;
  top: 0;
  z-index: 9;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  .spinner-cointainer {
    position: fixed;
    width: 160px;
    height: 155px;
    background-color: #ffffff;
    border-radius: 4px;
    @include center_horizontal_and_Vertical;

    .spinner {
      position: absolute;
      width: 70%;
      @include center_horizontal_and_Vertical;
    }
  }
}
</style>
