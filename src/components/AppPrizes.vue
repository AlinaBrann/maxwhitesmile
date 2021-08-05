<template>
  <div class="prizes" id="prizes" :class="styleType ? '_' + styleType : ''">
    <app-parallax :items="parallaxImages" v-if="styleType != 'pink'"></app-parallax>
    <img
      src="../assets/images/prizes/pink-bg-left.png"
      alt=""
      class="prizes__background _left"
    />
    <img
      src="../assets/images/prizes/pink-bg-right.png"
      alt=""
      class="prizes__background _right"
    />
    <div class="container">
      <h1
        class="prizes__title section__title"
        :class="styleType != 'pink' ? '_red' : ''"
      >
        <span>{{ title }}</span>
      </h1>
      <div class="prizes__list">
        <div class="prizes__item" v-for="(item, index) in prizes" :key="index">
          <h3 v-if="item.blockTitle" class="prizes__item-title">
            {{ item.blockTitle }}
          </h3>
          <div class="prizes__item-img-wrapper">
            <img
              v-if="item.img2x"
              :src="require(`../assets/images/prizes/${item.img}`)"
              :srcset="`${item.img2x} 2x`"
              alt=""
              class="prizes__item-img"
            />
            <img
              v-else-if="item.img"
              :src="require(`../assets/images/prizes/${item.img}`)"
              alt=""
              class="prizes__item-img"
            />
          </div>

          <div class="prizes__item-info">
            <p
              class="prizes__item-text"
              v-if="item.text"
              v-html="item.text"
            ></p>
          </div>
        </div>
      </div>
      <div class="prizes__footer">
        <slot> </slot>
      </div>
    </div>
  </div>
</template>

<script>
import AppParallax from './AppParallax.vue';
export default {
  props: {
    title: String,
    styleType: String,
    prizes: Array,
  },
  components: {AppParallax},
  data: function () {
    return {
      parallaxImages: [
        {
          img: require("../assets/images/prizes/background-1.png"),
          value: -6
        },
        {
          img: require("../assets/images/prizes/background-2.png"),
          value: 8,
          width: "95%"
        }
      ]
    };
  },
  methods: {},
};
</script>

<style lang="scss">
.prizes {
  position: relative;
  display: flex;
  align-items: center;
  z-index: 1;
  padding: rem(50px) 0 rem(20px);
  &._pink {
    color: #fff;
    background: $red_font;
    overflow: hidden;
    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 90%;
      height: 90%;
      transform: translate(-50%, -50%);
      background: #d03969;
      border-radius: 50%;
      filter: blur(400px);
      z-index: 0;
    }
  }
  &__background {
    position: absolute;
    display: none;

    &._left {
      top: 0;
      left: 0;
    }
    &._right {
      bottom: 0;
      right: 0;
    }
  }
  .container {
    position: relative;
  }

  &__list {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 80%;
    margin: 0 auto;
  }

  &__item {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: rem(50px);
    &:nth-of-type(3n + 1) {
      .prizes__item-img-wrapper::before {
        background: $pink;
      }
    }
    &:nth-of-type(3n + 2) {
      .prizes__item-img-wrapper::before {
        background: $green;
      }
    }
    &:nth-of-type(3n + 3) {
      .prizes__item-img-wrapper::before {
        background: $yellow;
      }
    }
  }

  &__item--main {
    margin-top: -25px;
  }

  &__item-title {
    text-align: center;
    text-transform: uppercase;
    font-size: rem(18px);
    font-family: "Bold";
    margin-bottom: rem(20px);
  }
  &__item-img-wrapper {
    position: relative;
    width: rem(182px);
    height: rem(145px);
    margin-bottom: rem(16px);
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 20%;
      width: rem(145px);
      height: rem(145px);
      border-radius: 50%;
      z-index: -1;
    }
    ._pink & {
      &::before {
        display: none;
      }
    }
  }
  &__item-descr {
    margin-bottom: 12px;
    text-align: center;
    font-size: 28px;
    line-height: 32px;
  }

  &__item-text {
    font-size: rem(16px);
    line-height: rem(20px);
    text-transform: none;
    text-align: center;
    ._accent {
      font-family: "Bold";
      color: $red_font;
      ._pink & {
        color: #fff;
      }
    }
  }
  &__footer {
    text-align: center;
    &:not(:empty) {
      margin: rem(40px) 0 rem(20px);
    }
    a {
      font-size: rem(18px);
      border-bottom: 1px solid currentColor;
      transition: 0.3s;
      &:hover {
        border-color: transparent;
      }
    }
  }
  @media (min-width: $sm) {
    padding: rem(85px) 0 rem(20px);
    &__background {
      display: none;
      ._pink & {
        display: block;
      }
      &._left {
        top: 0;
        left: -10%;
      }
      &._right {
        bottom: 0;
        right: -5%;
      }
    }
    &__item {
      flex: 0 0 auto;
      width: 45%;
      margin-bottom: rem(65px);
    }
    &__item-img-wrapper {
      height: rem(143px);
      &:before {
        display: none;
      }
    }
  }
  @media (min-width: $md) {
    padding: rem(100px) 0 rem(20px);
    &__background {
      &._left {
        left: 0;
      }
      &._right {
        right: 0;
      }
    }
    &__list {
      justify-content: space-around;
      flex-direction: row;
      align-items: flex-start;
    }
    &__item {
      flex: 0 0 auto;
      width: 25%;
      margin-bottom: rem(80px);
    }
  }
}
</style>
