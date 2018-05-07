<template>
    <div id="layout">
        <div id='header'>
            <AppHeader></AppHeader>
        </div>
        <div id='content'>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import AppHeader from '@/components/AppHeader';

export default {
  components: {
    AppHeader,
  },
};
</script>

<style scoped>

</style>

