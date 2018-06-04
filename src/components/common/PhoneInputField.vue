<template>
    <div class="phone-input">
        <md-menu class="country-code-selector" md-size="auto" mdFullWidth mdCloseOnSelect mdAlignTrigger v-on:md-opened="menuOpened"
            v-on:md-closed="menuClosed">
            <md-field md-inline md-menu-trigger>
                <label>{{ $t('message.phone.country_code_placeholder')}}</label>
                <md-input v-model="typedCountryCode"></md-input>
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
            <md-input type="number" v-model="phoneNumber"></md-input>
        </md-field>
    </div>
</template>

<script>
import CountryCodeList from '@/data/CountryCode';

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
  },
  methods: {
    menuOpened() {
      this.isMenuOpened = true;
    },
    menuClosed() {
      this.isMenuOpened = false;
    },
    selectCountryCode(countryCodeItem) {
      this.selectedCountryCode = countryCodeItem.dial_code;
      this.typedCountryCode = this.selectedCountryCode;
    },
  },
};
</script>

<style lang="scss" scoped>
$inputItemHeight: 48px;
$menuItemHeight: 36px;

.phone-input {
  margin-left: $defaultPageMargin;
  margin-right: $defaultPageMargin;
}

.country-code-selector {
  float: left;
  width: 35%;
  height: $inputItemHeight;
  margin-right: 5%;

  .md-input {
    text-align: right;
  }

  .md-icon {
    width: 30%;
    height: 26px;
    margin-top: 12px;
  }
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

.phone-number-input {
  width: 55%;
  height: $inputItemHeight;
}

// icon color for country code selector and phone input
.md-field,
.md-menu-item {
  /deep/ .md-icon {
    svg {
      fill: $theme-color;
    }
  }
}

.md-field,
.md-field.md-focused {
  margin: 0px;
  padding-top: 0px;

  .md-input {
    width: 100%;
    height: $inputItemHeight;
  }

  label {
    color: $theme-placehoder-color;
    top: 16px;
  }

  &:after {
    border: solid 1px #bdbdbd;
  }
}
</style>
