<template>
    <md-card md-with-hover>
        <div v-on:click="$emit('goToAccountDetail')" class="md-card-header">
            <UserInfo :user="user"></UserInfo>
        </div>

        <md-card-actions md-alignment="space-between">
            <md-button v-on:click="$emit('transfer')">{{ $t('message.common.transferbtn') }}</md-button>
        </md-card-actions>

    </md-card>
</template>

<script>
import UserInfo from '@/components/common/UserInfo';

export default {
  props: ['user'],
  components: {
    UserInfo,
  },
};
</script>

<style lang="scss" scoped>
.md-card {
  border-radius: 0.5em;
  background-color: white;
  margin: 0.5em;
}


.md-card-header {
  height: 8em;
}


.md-card-actions {
  justify-content: center;
  height: 3em;
}

.md-button {
  color: $plainbtn-wordcolor !important;
  font-size: 16px;
  font-weight: bold;
}
</style>

