<template>
  <div 
    :style="{ width, height }" 
    class="content-placeholder-text"
  >
    <div class="content-placeholder__background"/>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '0.625rem',
    },
  },
};
</script>

<style lang="scss" scoped>
.content-placeholder-text {
  display: block;
  background-color: #eef3f8;
  overflow: hidden;
  position: relative;
  border-radius: 0.125rem;
  margin-top: 0.375rem;
  margin-bottom: 0.375rem;

  .content-placeholder__background {
    animation: content-placeholder-animation 1s linear infinite;
    background: linear-gradient(
      to right,
      rgba(15, 15, 15, 0) 0%,
      rgba(235, 235, 235, 0.4) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 70%;
  }
}

@keyframes content-placeholder-animation {
  0% {
    transform: translateX(-50%);
  }

  100% {
    transform: translateX(300%);
  }
}
</style>
