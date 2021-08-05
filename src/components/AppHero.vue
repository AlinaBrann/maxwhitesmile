/* eslint-disable */
<template>
  <div class="hero">
    <div class="container">
      <slot> </slot>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    // Feedback,
  },
  methods: {
    showModal(name) {
      this.$modal.show(name);
    },

    toCheckUpload() {
      // if (this.$store.getters.user) {
      //   let apmButton = document.querySelector(
      //     "#apm-scan-qr .apm-action-button"
      //   );
      //   if (apmButton) apmButton.click();
      // } else {
      //   this.$modal.show("authorization");
      // }
      this.$modal.show("temporarily_unavailable");
    },
  },
  mounted() {
    // this.toCheckUpload()
    this.showModal("receipt_question");
  },
};
</script>
<style lang="scss" scoped>
.hero {
  font-size: 10px;
  position: relative;
  z-index: 9;
  display: flex;
  align-items: center;
  background: url("../assets/images/hero/background-mobile.jpg") no-repeat
    center;
  background-size: cover;
  border-bottom: 3px solid $yellow;
  .container {
    position: relative;
    max-width: rem(1300px);
    height: 100vh;
    padding-top: rem(95px);
    padding-bottom: rem(40px);
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    margin: 0 auto;
  }
  &__row {
    display: flex;
    width: 100%;
    margin-top: auto;
    flex-direction: column;
    margin-bottom: 30px;
  }
  &__col {
    position: relative;
  }
  &__title {
    font-size: rem(28px);
    line-height: 1.1;
    text-align: center;
    text-transform: uppercase;
    font-family: "Bold";
    color: #f2d2a6;
  }
  &__text {
    margin: rem(10px) auto;
    font-size: rem(16px);
    text-align: center;
    text-transform: uppercase;
    line-height: rem(19px);
    color: #fff;
  }
  &-nav {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: stretch;
    justify-content: center;
    margin-bottom: -3px;
    &-title {
      margin-top: auto;
      margin-bottom: rem(12px);
      font-size: rem(16px);
      color: #fff;
    }
    &__item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: rem(13px) 0;
      width: rem(70px);
      background: #fff;
      border-bottom: 3px solid #d7377b;
      &:only-child {
        width: rem(280px);
      }
      &:first-of-type {
        border-top-left-radius: rem(5px);
      }
      &:last-of-type {
        border-top-right-radius: rem(5px);
      }
      &:not(:last-of-type) {
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          height: rem(30px);
          border-right: 1px solid #e3e2e2;
        }
      }
      &._disabled {
        pointer-events: none;
        cursor: default;
      }
    }
    &__img {
      max-height: rem(34px);
    }
  }
  @media (min-width: $sm) {
    .container {
      padding-bottom: rem(70px);
      display: flex;
      align-items: center;
    }
    &__title {
      font-size: rem(48px);
      margin-bottom: rem(22px);
    }
    &__row {
      margin: auto;
    }
    &__content {
      padding-top: rem(113px);
    }
    &__text {
      width: 80%;
    }
    &-nav {
      &-title {
        margin-bottom: rem(22px);
        font-size: rem(34px);
      }
      &__item {
        padding: rem(23px) 0;
        width: rem(152px);
      }
    }
  }
  @media (min-width: $md) {
    background-image: url("../assets/images/hero/background-desktop.jpg");
    .container {
      height: 100vh;
      align-items: center;
      overflow: hidden;
    }
    &__row {
      max-width: 100%;
    }
    &__title {
      text-align: left;
    }
    &__text {
      width: 100%;
      margin: 0;
      text-align: left;
      font-size: rem(24px);
      line-height: rem(29px);
    }
    &__content {
      max-width: 70%;
      padding-top: 0;
    }
    &__row {
      flex-direction: row;
      justify-content: space-between;
    }
    &__col {
      width: 50%;
    }
    &-nav {
      &-title {
        margin-bottom: rem(22px);
        font-size: rem(18px);
      }
      &__item {
        width: rem(243px);
        border-bottom-width: 5px;
        &:only-child {
          width: rem(424px);
        }
        &:not(:last-of-type) {
          &::after {
            height: rem(44px);
            border-right-width: 2px;
          }
        }
      }
    }
  }
  @media (max-width: $xlg) {
  }
}
</style>
