<template>
  <BaseField :label="$t('message.transfer.notelbl')">
    <md-textarea
      :placeholder="$t('message.transfer.note_placeholder',{num: maxNum})"
      :value="note"
      :md-counter="maxNum"
      :maxlength="maxNum"
      md-autogrow
      @change="valueChanged($event.target.value)"
    />
  </BaseField>
</template>

<script>
import BaseField from '@/components/input/BaseField';

export default {
  components: {
    BaseField,
  },
  props: {
    note: {
      type: String,
      default: null,
    },
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
};
</script>
