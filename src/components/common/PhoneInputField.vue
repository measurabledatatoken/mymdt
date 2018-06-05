<template>
  <div class="phone-input">
    <md-menu class="country-code-selector" md-size="auto" mdFullWidth mdCloseOnSelect mdAlignTrigger v-on:md-opened="menuOpened"
      v-on:md-closed="menuClosed">
      <md-field md-inline md-menu-trigger v-bind:class="{ 'open': isMenuOpened }">
        <label>{{ $t('message.phone.country_code_placeholder')}}</label>
        <md-input ref="countryCodeInput" v-model="typedCountryCode"></md-input>
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
            <md-icon v-if="countryCodeItem.dial_code === selectedCountryCode" class="done" md-src="/static/icons/done.svg"></md-icon>
          </div>
          <md-divider></md-divider>
        </md-menu-item>
      </md-menu-content>
    </md-menu>

    <md-field class="phone-number-input" md-inline>
      <label>{{ $t('message.phone.phone_number_placeholder')}}</label>
      <md-input type="number" v-on:keydown="phoneNumberEntered($event.target.value)"></md-input>
      <span v-if="isFullPhoneNumberEntered && !isFullPhoneNumberValid" class="md-helper-text">{{ $t('message.phone.invalid_phonenumber') }}</span>
    </md-field>
  </div>
</template>

<script>
import CountryCodeList from '@/data/CountryCode';
import { isValidPhoneNumber } from '@/utils';

export default {
  data() {
    return {
      countryCodeList: CountryCodeList,
      // for filter only
      typedCountryCode: null,
      // final selected code
      selectedCountryCode: null,
      phoneNumber: null,
      isMenuOpened: false,
    };
  },
  computed: {
    // filter by dail code, country name or country code
    filteredCountryCodeList() {
      if (this.typedCountryCode === null || this.typedCountryCode.length === 0 || this.selectedCountryCode === this.typedCountryCode) {
        return this.countryCodeList;
      }

      let tempCountryCodeList = this.countryCodeList.filter(
        countryCodeItem => countryCodeItem.dial_code.indexOf(this.typedCountryCode) >= 0,
      );

      if (tempCountryCodeList.length === 0) {
        tempCountryCodeList = this.countryCodeList.filter(
          countryCodeItem => countryCodeItem.code.toLowerCase().indexOf(this.typedCountryCode.toLowerCase()) >= 0,
        );
      }

      if (tempCountryCodeList.length === 0) {
        tempCountryCodeList = this.countryCodeList.filter(
          countryCodeItem => countryCodeItem.name.toLowerCase().indexOf(this.typedCountryCode.toLowerCase()) >= 0,
        );
      }
      return tempCountryCodeList;
    },
    fullPhoneNumber() {
      return this.selectedCountryCode + this.phoneNumber;
    },
    isFullPhoneNumberEntered() {
      if (this.selectedCountryCode == null || this.phoneNumber == null) {
        return false;
      }

      return this.selectedCountryCode.length > 0 && this.phoneNumber.length > 0;
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
      console.log('menuOpened');
      this.isMenuOpened = true;
      this.$refs.countryCodeInput.$el.focus();
    },
    menuClosed() {
      this.isMenuOpened = false;
      this.$refs.countryCodeInput.$el.blur();
    },
    selectCountryCode(countryCodeItem) {
      this.selectedCountryCode = countryCodeItem.dial_code.replace(/\s/g, '');
      this.typedCountryCode = this.selectedCountryCode;
      this.processFullPhoneEntered();
    },
    phoneNumberEntered(phoneNumber) {
      this.phoneNumber = phoneNumber;
      this.processFullPhoneEntered();
    },
    processFullPhoneEntered() {
      if (this.isFullPhoneNumberValid) {
        this.$emit('phoneNumberEntered', this.fullPhoneNumber);
      } else {
        // TODO: display error
        this.$emit('phoneNumberInvalid', this.fullPhoneNumber);
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
  width: 35%;
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
  width: 55%;
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
      width: 50%;
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
    padding-left: 8px;
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
