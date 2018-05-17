<template>
    <div>
        <qrcode-reader class="reader" @decode="onDecode" @locate="onLocate">
            <div>Scan Code</div>
        </qrcode-reader>
    </div>
</template>

<script>
import { QrcodeReader } from 'vue-qrcode-reader';

export default {
  name: 'QRCodeScanPage',
  metaInfo() {
    return {
      title: this.$t('message.qrcode.title'),
    };
  },
  components: {
    QrcodeReader,
  },
  methods: {
    onDecode(content) {
      console.log(`QRCode ${content}`);
    },
    onLocate(points) {
      console.log(`QRCode ${points}`);
    },
  },
  created() {
    this.$store.commit('setNavigationTitle', this.$metaInfo.title);
  },
};
</script>

<style lang="scss" scoped>
.reader {
  height: 100%;
}
</style>
