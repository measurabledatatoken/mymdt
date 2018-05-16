<template>
    <md-card md-with-hover>
        <div v-on:click="$emit('goToAccountDetail')" class="md-card-header">
            <div class="md-avatar md-avatar-icon">
                <p class="md-ripple avatar">NT</p>
            </div>
            <div class="md-title"> {{ user.displayName }}</div>
            <div class="md-subtitle"> {{ user.emailAddress }}</div>

            <div class="mdt-count"> {{ user.mdtBalance.toFixed(4) }} MDT</div>
        </div>

        <md-divider></md-divider>
        <md-card-actions md-alignment="space-between">
            <md-button v-on:click="$emit('transfer')">{{ $t('message.home.transferbtn') }}</md-button>
        </md-card-actions>

    </md-card>
</template>

<script>
export default {
  props: ['user'],
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.md-card {
  border-radius: 0.5em;
  background-color: white;
  margin: 0.5em;
}

.md-avatar-icon {
  float: left;
  background-color: #fad689;

  .md-ripple {
      font-size: 0.7em;
      letter-spacing: 0.08em;
      color: white;
      font-weight: bold;
  }
}

.md-card-header {
    height: 8em;
}

.md-title, .md-subtitle {
    float: left;
    color: #4a4a4a;
    font-size: 1em;
}

.md-card-actions {
  justify-content: center;
  height: 3em;
}

.md-divider {
  background-color: #eef3f8;
  width: 80%;
  margin-left: 10%;
}

.mdt-count {
  float: right;
  color: #4a4a4a;
  font-size: 20px;
  font-weight: bold;
  margin-top: 28px;
  line-height: 40px;
}

.md-button {
  color: $plainbtn-wordcolor !important;
  font-size: 16px;
  font-weight: bold;
}
</style>

