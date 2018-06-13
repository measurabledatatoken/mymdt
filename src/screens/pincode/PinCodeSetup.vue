<template>
    <div>
       <PinCodeField :length=6></PinCodeField>

    </div>
</template>

<script>
import PinCodeField from '@/components/common/PinCodeField';


export default {
  metaInfo() {
    return {
      title: 'PIN',
    };
  },
  components: {
    PinCodeField,
  },
  data() {
    return {
      code: '',
    };
  },
};
</script>

<style>
</style>
