<template>
  <div>
    <div class="label">{{ $t('message.transfer.notelbl') }}</div>

    <md-field>
      <md-input :placeholder="$t('message.transfer.note_placeholder',{num: maxNum})" v-on:change="valueChanged($event.target.value)"
        :value="note">
      </md-input>
    </md-field>
  </div>

</template>

<script>
export default {
  name: 'NoteInputField',
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
};
</script>

<style lang="scss" scoped>
.label {
  text-align: left;
  font-weight: bold;
  margin: 16px $defaultPageMargin 10px $defaultPageMargin;
  color: $label-color;
}

.md-field {
  width: calc(100% - #{2 * $defaultPageMargin});
  margin-left: $defaultPageMargin;
  min-height: 32px;
  padding-top: 0px;
}
</style>
