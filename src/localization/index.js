import Vue from 'vue';
import VueI18n from 'vue-i18n';

import EN_US from '@/localization/locales/en-us.json';
import ZH_CN from '@/localization/locales/zh-cn.json';
import ZH_HK from '@/localization/locales/zh-hk.json';

const messages = {
  'en-us': {
    message: EN_US,
  },
  'zh-hk': {
    message: ZH_HK,
  },
  'zh-hant': {
    message: ZH_HK,
  },

  'zh-cn': {
    message: ZH_CN,
  },
  'zh-hans': {
    message: ZH_CN,
  },
};

const dateTimeFormats = {
  'en-us': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
      hour12: false,
    },
    'long-date': {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  },
  'zh-hk': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
      hour12: false,
    },
    'long-date': {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  },
  'zh-cn': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
      hour12: false,
    },
    'long-date': {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  },
  numeric: {
    short: {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    },
  },
};

Vue.use(VueI18n);

export default new VueI18n({
  locale: 'en-us',
  fallbackLocale: 'en-us',
  messages,
  dateTimeFormats,
});
