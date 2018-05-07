<template>
    <div id="layout">
        <div id='header'>
            <Header></Header>
        </div>
        <div id='content'>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header';

export default {
  components: {
    Header,
  },
};
</script>

<style scoped>

</style>

