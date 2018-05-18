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
            <input id="photolibbtn" type="file">

        </div>
        <div class="overlay-border">
            <div class="frame topleft"></div>
            <div class="frame topright"></div>
            <div class="frame bottomleft"></div>
            <div class="frame bottomright"></div>
        </div>

        <qrcode-reader class="reader" @decode="onDecode" :video-constraints="videoConstraints">
        </qrcode-reader>

        <md-dialog-alert :md-active.sync="wrongEthAddress" :md-content="$t('message.qrcode.eth_scan_wrong_type')"
            :md-confirm-text="$t('message.common.okay')" />
    </div>
</template>

<script>
import { QrcodeReader } from 'vue-qrcode-reader';
import { getEthAddressFromString } from '@/utils';

export default {
  name: 'QRCodeScanPage',
  metaInfo() {
    return {
      title: this.$t('message.qrcode.title'),
    };
  },
  data() {
    return {
      wrongEthAddress: false,
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
  methods: {
    onDecode(content) {
      const ethAddress = getEthAddressFromString(content);
      if (ethAddress === null) {
        this.wrongEthAddress = true;
      } else {
        this.$store.commit('setEthAddressScanned', ethAddress);
        this.$router.back();
      }
      console.log(`QRCode onDecode content:${content} eth:${ethAddress}`);
    },
  },
  created() {
    this.$store.commit('setNavigationTitle', this.$metaInfo.title);
  },
};
</script>

<style lang="scss" scoped>
$clip_left: 15%;
$clip_right: 85%;
$clip_top: 20%;
$clip_bottom: 60%;

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
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
    top: 62%;
    width: 100%;
    color: $theme-font-color-msg;
  }

  .photolibbtn-container {
    color: $theme-font-color-btn;
    position: absolute;
    top: 70%;
    width: 100%;
  }

  input[type="file"] {
    display: none;
  }
}

.overlay-border {
  width: 70%;
  height: 40%;
  position: absolute;
  left: $clip_left;
  top: calc(#{$clip_top} + #{$header-height});
  background-color: transparent;
  z-index: 2;

  .frame {
    position: absolute;
    width: 16px;
    height: 16px;
    border: solid 2px $theme-color;

    &.topleft {
      position: absolute;
      border-right: none;
      border-bottom: none;
    }

    &.topright {
      position: absolute;
      right: 0;
      border-left: none;
      border-bottom: none;
    }

    &.bottomleft {
      position: absolute;
      bottom: 0;
      border-right: none;
      border-top: none;
    }

    &.bottomright {
      position: absolute;
      bottom: 0;
      right: 0;
      border-left: none;
      border-top: none;
    }
  }
}

.md-dialog {
  font-size: 20px;
  font-weight: bold;
  text-align: center;

  /deep/ .md-dialog-content {
    padding-top: 40px;
  }

  /deep/ .md-button {
    width: 100%;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
