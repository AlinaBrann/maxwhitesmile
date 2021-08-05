<template>
  <modal
    :name="name"
    :adaptive="true"
    :scrollable="true"
    @before-open="beforeOpen"
  >
    <div
      class="modal"
      :class="[
        'modal-' + name,
        size ? 'modal--' + size : '',
        success ? 'modal-success' : '',
      ]"
    >
      <div class="modal__close" @click="closeModal(name)"></div>
      <div class="modal__header">
        <h2
          class="modal__title"
          :class="success ? 'modal-success__title' : ''"
          v-html="title"
        ></h2>
      </div>
      <slot name="content"></slot>
    </div>
  </modal>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
    },
    name: {
      type: String,
    },
    title: {
      type: String,
    },
    success: {
      type: Boolean,
    },
  },
  methods: {
    closeModal(name) {
      this.$emit("closeModal", name);
    },
    beforeOpen(event) {
      this.$parent.beforeOpen(event);
    },
  },
  mounted() {
    // this.$modal.show("success_modal");
  },
};
</script>

<style lang="scss">
.vm--container {
  overflow: auto;
  .vm--overlay {
    background: rgba(26, 21, 17, 0.85);
  }
}
.vm--modal {
  top: 0 !important;
  left: 0 !important;
  height: auto !important;
  width: auto !important;
  min-height: 100vh;
  justify-content: center;
  overflow: visible !important;
  display: flex;
  align-items: center;
  box-shadow: none !important;
  background-color: transparent !important;

  @media (min-width: $md) {
    padding: 20px 0;
  }
}

.modal {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: rem(440px);
  min-height: 100vh;
  max-width: 100%;
  padding: rem(65px) rem(25px) rem(45px);
  background: #fff;
  &-check_photo {
    min-height: auto;
  }
  &__close {
    cursor: pointer;
    position: absolute;
    top: rem(6px);
    right: rem(6px);
    width: rem(48px);
    height: rem(48px);
    background-image: url("../assets/images/close_icon.svg");
    background-repeat: no-repeat;
    background-size: rem(26px);
    background-position: center;
    transition: 0.4s;
  }

  &__title {
    margin-bottom: rem(30px);
    font-size: rem(24px);
    line-height: rem(30px);
    font-family: "Bold";
    text-transform: uppercase;
    color: $red_font;
    text-align: center;
    & + .modal__text {
      margin-top: rem(-7px);
    }
  }
  &__subtitle {
    margin-bottom: rem(27px);
    font-size: rem(16px);
    color: $red_font;
    font-family: "Bold";
    text-align: center;
  }
  &__text {
    margin-top: rem(0px);
    margin-bottom: rem(16px);
    text-align: center;
    font-size: rem(16px);
    line-height: rem(19px);
  }
  &-signup {
    width: rem(758px);
  }
  &__another-option {
    margin: rem(15px) 0 rem(27px);
    font-size: rem(14px);
    line-height: rem(17px);
    text-align: center;
    a {
      color: $red_font;
      border-bottom: 1px solid currentColor;
      &:hover {
        border-color: transparent;
      }
    }
  }
  &-success {
    &__title {
      position: relative;
      padding-top: rem(76px);
      margin-bottom: rem(5px) !important;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        width: rem(60px);
        height: rem(60px);
        transform: translateX(-50%);
        background: url("../assets/images/success.svg") no-repeat center;
      }
    }
  }
  .success_modal {
    &__text {
      margin-top: 0;
    }
    &-back {
      font-size: rem(12px);
      color: #afafaf;
      text-align: center;
    }
    &-image {
      margin: auto;
    }
  }
  .btn {
    width: 100%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  @media (min-width: $sm) {
    min-height: auto;
    justify-content: flex-start;
    padding: rem(50px) rem(85px) rem(60px);
    &--md {
      width: rem(574px);
      padding: rem(40px) rem(25px) rem(46px);
    }
    &--lg {
      width: rem(758px);
      padding: rem(40px) rem(25px) rem(46px);
    }
    &__title {
      margin-bottom: rem(25px);
      font-size: rem(28px);
      line-height: rem(34px);
    }
    &__text {
      margin-top: rem(27px);
    }
    .btn {
      width: auto;
    }
    &__subtitle {
      margin-bottom: 0;
    }
    &-success {
      padding: rem(80px) rem(123px);
    }
  }
}
</style>
