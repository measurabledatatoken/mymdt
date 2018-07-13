<template>
  <section 
    v-if="active"
    class="nda-screen"
  >
    <md-button
      class="close-button" 
      @click="handleCloseClick"
    >
      <md-icon 
        class="close-button__icon" 
        md-src="/static/icons/popup-close.svg"
      />
    </md-button>
    <div class="nda-screen__content">
      <h2>{{ $t('message.betaTesting.NDA') }}</h2>
      <p>This non-disclosure agreement (NDA) binding contract between you (the Recipient) and Mobile Internet Limited (the Discloser). You must agree to and accept all of the agreement, or you don’t have the right to use the Services. Your using the Services in any way means that you agree to all of these Terms, and these Terms will remain in effect while you use the Services. 


      1.	The Discloser intends to disclose information (the Confidential Information) to the Recipient for the purpose of beta testing of the application (the Purpose).

      2.	The Recipient and any members within The Recipient’s organization undertakes not to use the Confidential Information for any purpose except the Purpose, without first obtaining the written agreement of the Discloser.

      3.	The Recipient undertakes to keep the Confidential Information secure and not to disclose it to any third party except to its employees and professional advisers who need to know the same for the Purpose, who know they owe a duty of confidence to the Discloser and who are bound by obligations equivalent to those in clause 2 above and this clause 3.
      4.	The undertakings in clauses 2 and 3 above apply to all of the information disclosed by the Discloser to the Recipient, regardless of the way or form in which it is disclosed or recorded but they do not apply to:

      a)	any information which is or in future comes into the public domain (unless as a result of the breach of this Agreement); or

      b)	any information which is already known to the Recipient and which was not subject to any obligation of confidence before it was disclosed to the Recipient by the Discloser.

      5.	Nothing in this Agreement will prevent the Recipient from making any disclosure of
      the Confidential Information required by law or by any competent authority

      6.	The Recipient will, on request from the Discloser, return all copies and records of the Confidential Information to the Discloser and will not retain any copies or records of
      the Confidential Information both physical and electronic.

      7.	Neither this Agreement nor the supply of any information grants the Recipient any licence, interest or right in respect of any intellectual property rights of the Discloser except the right to copy the Confidential Information solely for the Purpose.

      8.	The undertakings in clauses 2 and 3 will continue in force for 10 years from the date of this agreement.

      9.	This Agreement is governed by, and is to be construed in accordance with, the law of Hong Kong Law. The Hong Kong Courts will have non-exclusive jurisdiction to deal with any dispute which has arisen or may arise out of, or in connection with, this Agreement.
      </p>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleCloseClick() {
      this.$emit('update:active', false);
    },
  },
};
</script>

<style lang="scss" scoped>
.nda-screen {
  background-color: white;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  text-align: left;

  .close-button {
    min-width: auto;

    .close-button__icon {
      /deep/ svg {
        fill: $home-bgcolor;
      }
    }
  }

  .nda-screen__content {
    padding: 0 $defaultPageMargin $defaultPageMargin $defaultPageMargin;
    overflow: scroll;
    height: 100%;

    > h2 {
      line-height: 1;
    }

    > p {
      white-space: pre-line;
      width: 100%;
    }
  }
}
</style>
