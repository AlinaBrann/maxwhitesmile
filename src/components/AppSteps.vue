<template>
  <div class="steps" id="steps">
    <app-parallax :items="parallaxImages"></app-parallax>
    <div class="container">
      <div class="steps__title section__title _red">
        <span>МЕХАНИКА</span>
      </div>
      <div class="steps__content">
        <div class="steps__list">
          <div class="steps__item" v-for="(item, idx) in steps" :key="idx">
            <div class="steps__icon-wrapper">
              <img
                :src="require('../assets/images/steps/' + item.img)"
                alt=""
                class="steps__icon"
              />
            </div>
            <div class="steps__item-title">{{ item.title }}</div>
            <div class="steps__item-descr" v-html="item.text"></div>
          </div>
        </div>
      </div>
      <div class="steps__footer">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
import AppParallax from './AppParallax.vue'
import { each } from "lodash";

export default {
  props: ["steps"],
  components: { AppParallax},
  data: function () {
    return {
      publicPath: process.env.BASE_URL,
      parallaxImages: [
        {
          img: require("../assets/images/steps/background-1.png"),
          value: -2
        },
        {
          img: require("../assets/images/steps/background-2.png"),
          value: -4,
          width: "130%"
        },
        {
          img: require("../assets/images/steps/chocolate.png"),
          value: 3,
          class: "_separate"
        }
        
      ]
    };
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
    
  },
};
</script>

<style lang="scss">
.steps {
  position: relative;
  display: flex;
  // align-items: center;
  padding: rem(70px) 0;
  background: url("../assets/images/steps/background-mobile.png") no-repeat
    center;
  background-size: 123%;
  z-index: 2;
  .container {
    position: relative;
    z-index: 99;
  }
  &__title {
    color: $red_font;
  }
  &__content {
    position: relative;
    z-index: 9;
  }

  &__list {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    margin: 0 auto;
  }

  &__item {
    position: relative;
    margin-bottom: rem(34px);
    text-align: center;
    color: #4a3024;
    &:nth-of-type(3n + 1) {
      .steps__icon-wrapper::before {
        background: $yellow;
      }
    }
    &:nth-of-type(3n + 2) {
      .steps__icon-wrapper::before {
        background: $pink;
      }
    }
    &:nth-of-type(3n + 3) {
      .steps__icon-wrapper::before {
        background: $green;
      }
    }
  }

  &__icon {
    height: 100%;
    margin-right: rem(20px);
    object-fit: contain;
    &-wrapper {
      display: flex;
      justify-content: center;
      position: relative;
      height: rem(95px);
      margin-bottom: rem(27px);
      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        width: rem(77px);
        height: rem(77px);
        border-radius: 50%;
        z-index: -1;
      }
    }
  }

  &__item-title {
    font-size: rem(16px);
    font-family: "Bold";
    margin-bottom: 4px;
    text-transform: uppercase;
  }

  &__item-descr {
    max-width: 240px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 18px;
    a,
    span {
      color: $red_font;
      font-weight: 700;
      text-decoration: none;
    }
  }
  &__footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    .btn {
      margin-bottom: rem(15px);
    }
  }
  &__rules {
    margin-top: rem(10px);
    color: $red_font;
    font-size: rem(18px);
    line-height: rem(22px);
    border-bottom: 1px solid currentColor;
  }
  @media (min-width: $sm) {
    background: url("../assets/images/steps/background-tablet.png") no-repeat
      center;
    background-size: 143%;
    &:before {
      display: block;
      top: 88%;
      right: 0%;
    }
    &__item {
      margin-bottom: rem(64px);
    }
  }
  @media (min-width: $md) {
    padding: rem(100px) 0;
    background: none;

    &__list {
      display: flex;
      justify-content: space-around;
      flex-direction: row;
      max-width: rem(970px);
      padding-bottom: rem(70px);
      margin: 0 auto;
    }

    &__item {
      flex: 0 0 20%;
      margin-bottom: 0;
    }
    &__rules {
      margin-top: rem(5px);
    }
  }
}
</style>
