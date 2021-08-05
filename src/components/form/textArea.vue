<template>
  <label class="form-textarea">
    <div class="form-textarea__caption" v-if="label">{{ label }}</div>
    <textarea
      class="form-textarea__field"
      :placeholder="placeholder"
      v-model.trim="retValue"
      :name="name"
      @focus="errorReset()"
      @input="onInput()"
      @blur="onBlur()"
    ></textarea>

    <div class="error-hint" v-if="error">{{ error }}</div>
  </label>
</template>
<script>
export default {
  data() {
    return {
      retValue: this.field,
      nameValue: this.name || "",
    };
  },
  methods: {
    errorReset() {
      this.$parent.errorReset();
    },

    onInput() {
      this.$emit("input", this.retValue);
    },

    onBlur() {
      this.$emit("input", this.retValue);
    },
  },
  props: {
    field: String,
    name: String,
    label: {
      type: String,
    },
    error: {
      type: String,
    },
    value: [String, Number],
    placeholder: {
      type: String,
    },
  },
};
</script>
<style lang="scss" scoped>
.form-textarea {
  display: block;
  max-width: 100%;
  margin: 0 auto 20px;

  &__field {
    resize: none;
    min-height: 160px;
    width: 100%;
    font-size: 13px;
    text-transform: uppercase;
    border: 1px solid #a4a4a4;
    background: #ffffff;
    padding: 14px 18px 14px;
    transition: all 0.3s ease-in-out;
  }
  &__field:focus {
    border-color: #013f5d;
    outline: none;
  }
  &__caption {
    font-size: rem(14px);
    line-height: rem(16px);
    color: #000;
    text-transform: none;
    margin-bottom: rem(3px);
  }
}
</style>
