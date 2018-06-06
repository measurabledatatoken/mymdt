<template>
  <div class="qrcode-scan">
    <div class="overlay">
      <div class="instruction">
        {{ $t('message.qrcode.align_description') }}
      </div>
      <div class="photolibbtn-container">
        <label for="photolibbtn">
          {{ $t('message.qrcode.my_photo_library') }}
        </label>
      </div>
      <input v-on:change="onFileSelected($event)" id="photolibbtn" type="file">

    </div>
    <div class="overlay-border">
      <div class="frame topleft"></div>
      <div class="frame topright"></div>
      <div class="frame bottomleft"></div>
      <div class="frame bottomright"></div>
    </div>

    <qrcode-reader class="reader" @decode="onDecode" :video-constraints="videoConstraints">
    </qrcode-reader>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { SET_ETHADDRESS_SCANNED } from '@/store/modules/qrcode';
import { SET_ERROR_MESSAGE, SET_SHOW_ERROR_PROMPT } from '@/store/modules/common';
import { QrcodeReader, scanImageData, imageDataFromFile } from 'vue-qrcode-reader';
import { getEthAddressFromString } from '@/utils';
import BasePage from '@/screens/BasePage';

export default {
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.qrcode.title'),
    };
  },
  data() {
    return {
      videoConstraints: {
        audio: false, // don't request microphone access
        video: {
          facingMode: { ideal: 'environment' }, // use rear camera if available
        },
      },
    };
  },
  components: {
    QrcodeReader,
  },
  mounted() {
    this.setEthAddressScanned(null);
  },
  methods: {
    ...mapMutations({
      setEthAddressScanned: SET_ETHADDRESS_SCANNED,
      setErrorMessage: SET_ERROR_MESSAGE,
      setShowErrorPrompt: SET_SHOW_ERROR_PROMPT,
    }),
    onDecode(content) {
      const ethAddress = getEthAddressFromString(content);
      if (ethAddress === null) {
        this.setErrorMessage(this.$t('message.qrcode.eth_scan_wrong_type'));
        this.setShowErrorPrompt(true);
      } else {
        this.setEthAddressScanned(ethAddress);
        this.$router.back();
      }
    },
    onFileSelected(event) {
      const imgFile = event.target.files[0];
      imageDataFromFile(imgFile).then((imageData) => {
        const result = scanImageData(imageData);
        const ethAddress = getEthAddressFromString(result.data);

        if (ethAddress === null) {
          this.setErrorMessage(this.$t('message.qrcode.eth_scan_wrong_type'));
          this.setShowErrorPrompt(true);
        } else {
          this.setEthAddressScanned(ethAddress);
          this.$router.back();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$clip_left: 15%;
$clip_right: 85%;
$clip_top: 25%;
$clip_bottom: 65%;

.qrcode-scan {
  height: calc(100vh - #{$header-height});
}

.overlay {
  position: absolute;
  width: 100%;
  height: calc(100vh - #{$header-height});
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;

  clip-path: polygon(
    0% 0%,
    0% 100%,
    $clip_left 100%,
    $clip_left $clip_top,
    $clip_right $clip_top,
    $clip_right $clip_bottom,
    $clip_left $clip_bottom,
    $clip_left 100%,
    100% 100%,
    100% 0%
  );

  .instruction {
    position: absolute;
    top: calc(#{$clip_bottom} + 2%);
    width: 100%;
    color: $theme-font-color-msg;
  }

  .photolibbtn-container {
    color: $theme-font-color-btn;
    position: absolute;
    top: calc(#{$clip_bottom} + 10%);
    width: 100%;
  }

  input[type="file"] {
    display: none;
  }
}

.overlay-border {
  width: 100%;
  height: calc(100vh - #{$header-height});
  position: absolute;
  background-color: transparent;
  z-index: 2;

  .frame {
    position: absolute;
    width: 16px;
    height: 16px;
    border: solid 2px $theme-color;

    &.topleft {
      position: absolute;
      top: $clip_top;
      left: $clip_left;
      border-right: none;
      border-bottom: none;
    }

    &.topright {
      position: absolute;
      top: $clip_top;
      right: calc(100% - #{$clip_right});
      border-left: none;
      border-bottom: none;
    }

    &.bottomleft {
      position: absolute;
      bottom: calc(100% - #{$clip_bottom});
      left: $clip_left;
      border-right: none;
      border-top: none;
    }

    &.bottomright {
      position: absolute;
      bottom: calc(100% - #{$clip_bottom});
      right: calc(100% - #{$clip_right});
      border-left: none;
      border-top: none;
    }
  }
}

.reader {
  /deep/ .qrcode-reader__camera {
    object-fit: cover;
    height: 100% !important;
  }
}

</style>
