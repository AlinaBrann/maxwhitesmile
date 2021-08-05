<template>
  <label class="form-checkbox">
    <input
      type="checkbox"
      class="form-checkbox__input"
      @change="onInput()"
      v-model.trim="retValue"
    />
    <div class="form-checkbox__custom"></div>
    <div class="form-checkbox__caption" v-html="label"></div>
  </label>
</template>

<script>
export default {
  data() {
    return {
      retValue: this.field,
    };
  },

  methods: {
    errorReset() {
      this.$parent.errorReset();
    },

    onInput() {
      this.$emit("input", this.retValue);
    },
  },
  props: {
    field: {
      type: Boolean,
    },
    label: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.form-checkbox {
  cursor: pointer;
  display: flex;
  margin-bottom: rem(20px);

  &__input {
    position: absolute;
    left: -9999px;
    opacity: 0;
    visibility: hidden;
  }

  &__input:checked + .form-checkbox__custom {
    background-color: #fff;
    background-image: url("../../assets/images/checked_icon.svg");
  }

  &__custom {
    min-width: rem(26px);
    width: rem(26px);
    height: rem(26px);
    background: #ffffff;
    border: 1px solid #a4a4a4;
    background-size: rem(19px);
    background-repeat: no-repeat;
    background-position: center;
    transition: all 0.3s ease-in-out;
  }

  &__caption {
    font-size: rem(14px);
    line-height: rem(17px);
    margin-top: 1px;
    margin-left: rem(18px);
    a {
      color: $red_font;
    }
  }
  @media (min-width: $md) {
    &__custom {
      min-width: rem(21px);
      width: rem(21px);
      height: rem(21px);
      background-size: rem(15px);
    }
    &__caption {
      margin-left: rem(29px);
    }
  }
}

.error .form-checkbox__custom {
  background: #ff9999;
}
</style>
