<template>
  <md-card 
    v-bind="$attrs" 
    class="action-card" 
    v-on="$listeners"
  >
    <md-card-media>
      <img :src="imgSrc">
    </md-card-media>
    <md-card-header>
      <div class="md-title">{{ title }}</div>
    </md-card-header>

    <md-card-actions>
      <md-button 
        :to="to" 
        @click="$listeners.actionClick"
      >{{ actionName }}</md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
  props: {
    actionName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    imgSrc: {
      type: String,
      default: '',
    },
    to: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.md-card {
  padding: 16px;
}

.md-card-header {
  padding: 16px 0px 0px;
}

.md-card-media {
  img {
    width: 80px;
    height: 80px;
  }
}
.md-title {
  font-size: 14px;
  line-height: normal;
  color: $label-color;
}

.md-card-actions {
  justify-content: center;
  height: 3em;
}

.md-button {
  position: absolute;
  bottom: 12px;
  background-color: $bluebtn-backgroundcolor;
  color: $bluebtn-wordcolor !important;
  height: 24px;
  width: 105px;
  border-radius: 16px;
  font-weight: bold;
  letter-spacing: 0.1px;
  text-transform: none;
}
</style>
