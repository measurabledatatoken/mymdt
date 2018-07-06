<template>
  <div :id="id"/>
</template>

<script>
import VueScript2 from 'vue-script2';

const url = {
  g: {
    base: '//g.alicdn.com/sd/nvc/1.1.112/guide.js?t=2015052012',
    pc: '//g.alicdn.com/sd/smartCaptcha/0.0.1/index.js',
  },
  aeis: {
    base: '//aeis.alicdn.com/sd/nvc/1.1.112/guide.js?t=2015052012',
    pc: '//aeis.alicdn.com/sd/smartCaptcha/0.0.1/index.js',
  },
};
export default {
  data() {
    return {
      sc: undefined,
      id: `sc${parseInt(Math.random() * 1000000, 10)}`,
    };
  },
  props: {
    h5: { type: Boolean, default: false },
    appkey: { type: String, required: true },
    scene: { type: String, required: true },
    // eslint-disable-next-line
    h5scene: {type: String},
    aeis: { type: Boolean, default: false },
    lang: { type: String, default: 'en' },
    option: { type: Object, default() { return {}; } },
  },
  mounted() {
    this.$_setOpt();
    this.$_loadJs();
  },
  destroyed() {
    if (this.sc && this.sc.destroy) {
      this.sc.destroy();
    }
  },
  methods: {
    $_loadJs() {
      if (window.smartCaptcha) {
        this.$_initCaptcha();
        this.$emit('load');
      } else {
        VueScript2.load(url[!this.aeis ? 'g' : 'aeis'].base)
          .then(() => {
            VueScript2.load(url[!this.aeis ? 'g' : 'aeis'].pc)
              .then(() => {
                this.$_initCaptcha();
                this.$emit('load');
              });
          });
      }
    },
    $_setOpt() {
      const option = this.option || {};
      const ncScene = this.h5 ? this.h5scene : this.scene;

      window.NVC_Opt = {
        appkey: this.appkey,
        scene: ncScene,
        renderTo: `#${this.id}`,
        trans: { key1: 'code0', nvcCode: 600 },
        elements: option.elements || [
          '//img.alicdn.com/tfs/TB17cwllsLJ8KJjy0FnXXcFDpXa-50-74.png',
          '//img.alicdn.com/tfs/TB17cwllsLJ8KJjy0FnXXcFDpXa-50-74.png',
        ],
        bg_back_prepared: option.bg_back_prepared || '//img.alicdn.com/tps/TB1skE5SFXXXXb3XXXXXXXXXXXX-100-80.png',
        bg_front: option.bg_front || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABQCAMAAADY1yDdAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefk5w+ruswAAAAfSURBVFjD7cExAQAAAMKg9U9tCU+gAAAAAAAAAIC3AR+QAAFPlUGoAAAAAElFTkSuQmCC',
        obj_ok: option.obj_ok || '//img.alicdn.com/tfs/TB1rmyTltfJ8KJjy0FeXXXKEXXa-50-74.png',
        bg_back_pass: option.bg_back_pass || '//img.alicdn.com/tfs/TB1KDxCSVXXXXasXFXXXXXXXXXX-100-80.png',
        obj_error: option.obj_error || '//img.alicdn.com/tfs/TB1q9yTltfJ8KJjy0FeXXXKEXXa-50-74.png',
        bg_back_fail: option.bg_back_fail || '//img.alicdn.com/tfs/TB1w2oOSFXXXXb4XpXXXXXXXXXX-100-80.png',
        language: 'cn',
        upLang: option.upLang || {
          cn: {
            _ggk_guide: option.ggk_guide || '请在屏幕上滑动，刮出两面盾牌',
            _ggk_success: option.ggk_success || '恭喜您成功刮出盾牌<br/>继续下一步操作吧',
            _ggk_loading: option.ggk_loading || '加载中',
            // eslint-disable-next-line
            _ggk_fail: option.ggk_fail || ['呀，盾牌不见了<br/>请', 'javascript:noCaptcha.reset()', '再来一次', '或', 'http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN', '反馈问题'],
            // eslint-disable-next-line
            _ggk_action_timeout: option.ggk_action_timeout || ['我等得太久啦<br/>请', 'javascript:noCaptcha.reset()', '再来一次', '或', 'http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN', '反馈问题'],
            // eslint-disable-next-line
            _ggk_net_err: option.ggk_net_err || ['网络实在不给力<br/>请', 'javascript:noCaptcha.reset()', '再来一次', '或', 'http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN', '反馈问题'],
            // eslint-disable-next-line
            _ggk_too_fast: option.ggk_too_fast || ['您刮得太快啦<br/>请', 'javascript:noCaptcha.reset()', '再来一次', '或', 'http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN', '反馈问题'],

          },
        },
      };
    },
    $_initCaptcha() {
      const option = this.option || {};
      // eslint-disable-next-line
      this.sc = new window.smartCaptcha({
        renderTo: `#${this.id}`,
        width: option.width || 300,
        height: option.height || 42,
        default_txt: option.default_txt || '点击按钮开始智能验证',
        success_txt: option.success_txt || '验证成功',
        fail_txt: option.fail_txt || '验证失败，请在此点击按钮刷新',
        scaning_txt: option.scaning_txt || '智能检测中',
        _startTEXT: 'test',

        success: (data) => {
          this.$emit('callback', {
            token: window.NVC_Opt.token,
            sessionId: data.sessionId,
            sig: data.sig,
          });
        },
      });
      this.sc.init();

      this.$_MonitorNoCaptchaDom();
    },
    // monitor dom for second verification element. Localize the text of slide verification.
    $_MonitorNoCaptchaDom() {
      const option = this.option || {};
      document.querySelector('#SM_BTN_WRAPPER_1').addEventListener('DOMNodeInserted', () => {
        const noCaptchaElementList = document.getElementsByClassName('nc-lang-cnt');
        if (noCaptchaElementList.length > 0) {
          const noCaptchaElement = noCaptchaElementList[0];
          const ncLangKey = noCaptchaElement.dataset.ncLang;

          switch (ncLangKey) {
            case '_Loading': {
              noCaptchaElement.innerText = option.nc_loading || '加载中';
              break;
            }
            case '_startTEXT': {
              noCaptchaElement.innerText = option.nc_startText || '请按住滑块，拖动到最右边';
              break;
            }
            case '_yesTEXT': {
              noCaptchaElement.innerText = option.nc_yesText || '验证通过';
              break;
            }
            default: {
              break;
            }
          }
        }
      }, false);
    },
  },
};
</script>
