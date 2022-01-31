<template>
  <modal
    :name="name"
    height="auto"
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
  z-index: 999999 !important;
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
  // min-height: 100vh;
  max-width: 100%;
  padding: rem(65px) rem(25px) rem(45px);
  background: #FFF;
  border-radius: rem(7px);
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
    background-image: url("../assets/images/icons/close_icon.svg");
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
    color: $red;
    text-align: center;
    & + .modal__text {
      margin-top: rem(-7px);
    }
  }
  &__subtitle {
    margin-bottom: rem(27px);
    font-size: rem(18px);
    color: $red;
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
    margin: rem(15px) 0 0;
    font-size: rem(14px);
    line-height: rem(17px);
    text-align: center;
    a {
      color: $red;
      border-bottom: 1px solid currentColor;
      &:hover {
        border-color: transparent;
      }
    }
  }
  &__list {
    width: 100%;
    margin: auto;
    &-item {
      position: relative;
      padding-left: rem(33px);
      margin-bottom: rem(20px);
      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: rem(8px);
        width: rem(8px);
        height: rem(8px);
        border-radius: 50%;
        background: $yellow;
      }
    }
  }
  &-success {
    &__title {
      position: relative;
      margin-bottom: rem(5px) !important;
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
      padding: rem(40px) rem(45px) rem(46px);
    }
    &--lg {
      width: rem(758px);
      padding: rem(40px) rem(25px) rem(46px);
    }
    &__title {
      margin-bottom: rem(60px);
      font-size: rem(35px);
      line-height: rem(38px);
    }
    &__text {
      margin-top: rem(27px);
    }
    &__list {
      width: 70%;
    }
    .btn {
      width: auto;
    }
    &__subtitle {
      margin-bottom: 0;
    }
    &-success {
      padding: rem(60px) rem(123px) rem(40px);
    }
  }
}
</style>
