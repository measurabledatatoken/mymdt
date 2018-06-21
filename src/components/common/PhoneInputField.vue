<template>
  <div class="phone-input">
    <md-menu class="country-code-selector" md-size="auto" mdFullWidth mdCloseOnSelect mdAlignTrigger v-on:md-opened="menuOpened"
      v-on:md-closed="menuClosed">
      <md-field md-inline md-menu-trigger v-bind:class="{ 'open': isMenuOpened }">
        <label class="label">{{ $t('message.phone.country_code_placeholder')}}</label>
        <md-input ref="countryCodeInput" v-model="countryCodeSearchText"></md-input>
        <md-icon v-show="!isMenuOpened" md-src="/static/icons/keyboard_arrow_down.svg">
        </md-icon>
        <md-icon v-show="isMenuOpened" md-src="/static/icons/keyboard_arrow_up.svg">
        </md-icon>
      </md-field>

      <md-menu-content>
        <md-menu-item @click="selectCountryCode(countryCodeItem)" v-for="countryCodeItem in filteredCountryCodeList"
          :key="countryCodeItem.code">
          <div class="country-code">{{countryCodeItem.code}}</div>
          <div class="dial-code">{{countryCodeItem.dial_code}}</div>
          <div class="icon-container">
            <md-icon v-if="countryCodeItem.dial_code === countryDailCode" class="done" md-src="/static/icons/done.svg"></md-icon>
          </div>
          <md-divider></md-divider>
        </md-menu-item>
      </md-menu-content>
    </md-menu>

    <md-field class="phone-number-input" md-inline>
      <label>{{ $t('message.phone.phone_number_placeholder')}}</label>
      <md-input type="number" v-model="phoneNumber" v-on:input="phoneNumberEntered"></md-input>
      <span v-if="isFullPhoneNumberEntered && !isFullPhoneNumberValid" class="md-helper-text">{{ $t('message.phone.invalid_phonenumber') }}</span>
    </md-field>
  </div>
</template>

<script>
import CountryCodeList from '@/data/CountryCode';
import { isValidPhoneNumber } from '@/utils';

export default {
  props: {
    initCountryDailCode: {
      default: null,
      type: String,
    },
    initPhoneNumber: {
      default: null,
      type: String,
    },
  },
  data() {
    return {
      countryCodeList: CountryCodeList,
      countryCodeSearchText: this.initCountryDailCode,
      phoneNumber: this.initPhoneNumber,
      countryDailCode: this.initCountryDailCode,
      isMenuOpened: false,
    };
  },
  computed: {
    // filter by dail code, country name or country code
    filteredCountryCodeList() {
      if (
        this.countryCodeSearchText === null || this.countryCodeSearchText.length === 0 ||
        this.countryDailCode === this.countryCodeSearchText
      ) {
        return this.countryCodeList;
      }

      let tempCountryCodeList = this.countryCodeList.filter(
        countryCodeItem => countryCodeItem.dial_code.indexOf(this.countryCodeSearchText) >= 0,
      );

      if (tempCountryCodeList.length === 0) {
        tempCountryCodeList = this.countryCodeList.filter(
          countryCodeItem => countryCodeItem.code.toLowerCase().indexOf(this.countryCodeSearchText.toLowerCase()) >= 0,
        );
      }

      if (tempCountryCodeList.length === 0) {
        tempCountryCodeList = this.countryCodeList.filter(
          countryCodeItem => countryCodeItem.name.toLowerCase().indexOf(this.countryCodeSearchText.toLowerCase()) >= 0,
        );
      }
      return tempCountryCodeList;
    },
    fullPhoneNumber() {
      if (this.countryDailCode == null || this.phoneNumber == null) {
        return '';
      }
      return this.countryDailCode.replace(/\s/g, '') + this.phoneNumber;
    },
    isFullPhoneNumberEntered() {
      if (this.countryDailCode == null || this.phoneNumber == null) {
        return false;
      }

      return this.countryDailCode.length > 0 && this.phoneNumber.length > 0;
    },
    isFullPhoneNumberValid() {
      if (this.isFullPhoneNumberEntered) {
        return isValidPhoneNumber(this.fullPhoneNumber);
      }
      return false;
    },
  },
  methods: {
    menuOpened() {
      this.isMenuOpened = true;
      this.$refs.countryCodeInput.$el.focus();
    },
    menuClosed() {
      this.isMenuOpened = false;
      this.$refs.countryCodeInput.$el.blur();
    },
    selectCountryCode(countryCodeItem) {
      this.countryCodeSearchText = countryCodeItem.dial_code;
      this.countryDailCode = countryCodeItem.dial_code;
      this.processFullPhoneEntered();
    },
    phoneNumberEntered() {
      this.processFullPhoneEntered();
    },
    processFullPhoneEntered() {
      const phoneNumberObj = {
        countryDailCode: this.countryDailCode,
        phoneNumber: this.phoneNumber,
        fullPhoneNumber: this.fullPhoneNumber,
      };

      if (this.isFullPhoneNumberValid) {
        this.$emit('phoneNumberEntered', phoneNumberObj);
      } else {
        this.$emit('phoneNumberInvalid', phoneNumberObj);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$menuItemHeight: 36px;

.phone-input {
  margin-left: $defaultPageMargin;
  margin-right: $defaultPageMargin;

}

.country-code-selector {
  float: left;
  width: 36%;
  height: $menuItemHeight;
  margin-right: 5%;

  .md-input {
    text-align: right;
  }

  .md-icon {
    width: 30%;
    height: 26px;
    margin-top: calc(#{$menuItemHeight} - 26px) / 2;
    background-color: transparent;
  }
}

.phone-number-input {
  width: 54%;
  height: $menuItemHeight;
}

.md-menu-content {
  border-radius: 0px 0px 4px 4px !important;
  overflow: hidden;

  /deep/ .md-scrollbar {
    &::-webkit-scrollbar {
      width: 0px;
    }
  }
  /deep/ .md-list {
    background-color: $theme-listing-bgcolor;
    padding: 0px;
  }

  .md-menu-item {
    height: $menuItemHeight;

    /deep/ .md-list-item-content {
      padding: 0px 8px;
      min-height: $menuItemHeight;
    }

    .country-code {
      float: left;
      width: 20%;
      font-size: 14px;
      color: $theme-placehoder-color;
    }

    .dial-code {
      float: left;
      width: 55%;
      text-align: right;
    }

    .icon-container {
      width: 30%;
      height: 28px;

      .md-icon {
        float: right;
      }
    }

    .md-divider {
      position: absolute;
      bottom: 0;
      width: 85%;
      height: 0px;
      border: solid 1px #eeeeee;
    }
  }
}

// icon color for country code selector and phone input
.md-field,
.md-menu-item {
  /deep/ .md-icon {
    svg {
      fill: $theme-color;
    }

    &:after {
      content: none;
    }
  }
}

.md-field,
.md-field.md-focused {
  margin: 0px;
  padding-top: 0px;
  min-height: $menuItemHeight;

  .md-input {
    width: 100%;
    height: $menuItemHeight;
  }

  label {
    color: $theme-placehoder-color;
    top: 8px;
  }

  &:after {
    border: solid 1px #bdbdbd;
  }

  &.open {
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
    border-radius: 4px 4px 0px 0px;
    background-color: white;

    &:after {
      border: solid 1px #eeeeee;
    }

    &:before {
      border: solid 1px #eeeeee;
    }
  }

  .md-helper-text {
    color: $theme-warning-color;
  }
}
</style>
