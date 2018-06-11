<template>
  <BaseField :label="$t('message.transfer.notelbl')">
    <md-textarea
      :placeholder="$t('message.transfer.note_placeholder',{num: maxNum})"
      v-on:change="valueChanged($event.target.value)"
      :value="note"
      md-autogrow
      :md-counter="maxNum"
      :maxlength="maxNum"
    >
    </md-textarea>
  </BaseField>
</template>

<script>
import BaseField from '@/components/input/BaseField';

export default {
  props: {
    note: String,
    maxNum: {
      default: 140,
      type: Number,
    },
  },
  methods: {
    valueChanged(value) {
      this.$emit('infoEntered', value);
    },
  },
  components: {
    BaseField,
  },
};
</script>
