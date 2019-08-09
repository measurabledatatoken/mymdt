<template>
  <div class="rewards-container">
    <ClaimMDTInDappCard />
  </div>
</template>

<script>
import ClaimMDTInDappCard from '@/components/common/ClaimMDTInDappCard';

export default {
  components: {
    ClaimMDTInDappCard,
  },
};
</script>

<style lang="scss" scoped>
.rewards-container {
  flex: 1;
}
</style>
