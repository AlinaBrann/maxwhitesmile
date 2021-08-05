<template>
  <div class="faq" id="faq" :class="styleType ? '_' + styleType : ''">
    <div class="container">
      <div class="faq__header">
        <h2
          class="faq__title section__title"
          :class="styleType != 'pink' ? '_red' : ''"
        >
          <span>{{ "Ответы на вопросы" | typograf }}</span>
        </h2>
      </div>
      <div class="faq__row">
        <div class="faq__content">
          <div class="faq__list">
            <div
              class="faq__item"
              v-for="(item, index) in items"
              :key="index"
              :class="item.isActive ? 'faq__item--active' : ''"
            >
              <div
                class="faq__item-header"
                @click="item.isActive = !item.isActive"
              >
                <h2 class="faq__item-title">
                  <span v-html="item.title"></span>
                </h2>
                <div class="faq__item-trigger">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M20.0948 13.0047H0.108643V7.00473H20.0948V13.0047Z"
                    />
                    <path
                      fill-rule="evenodd"
                      class="horizontal"
                      clip-rule="evenodd"
                      d="M13.0996 0.00472996L13.0996 20.0047L7.10376 20.0047L7.10376 0.00473022L13.0996 0.00472996Z"
                    />
                  </svg>
                </div>
              </div>
              <div
                class="faq__item-content"
                v-if="item.isActive"
                v-html="item.text"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    styleType: String,
    items: Array,
  },
  data: function () {
    return {};
  },
  methods: {
    toFeedback() {
      this.$modal.show("feedback");
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.faq {
  position: relative;
  padding-top: rem(43px);
  padding-bottom: rem(70px);
  z-index: 1;
  &._pink {
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
      filter: blur(400px);
      border-radius: 50%;
      z-index: 0;
    }
    
  }
  .container {
    position: relative;
    z-index: 1;
  }
  &__header {
    display: flex;
    justify-content: center;
  }
  &__content {
    width: 100%;
  }
  &__row {
    display: flex;
    align-items: center;
    width: 100%;
  }

  &__item {
    padding: rem(30px) 0px rem(12px) 0px;
    border-bottom: 1px solid $red_font;
    color: #4a3024;
    ._pink & {
      color: #fff;
      border-color: #fff;
    }
  }

  &__item--active {
    .faq__item-trigger {
      .horizontal {
        opacity: 0;
      }
    }
  }

  &__item-header {
    cursor: pointer;
    position: relative;
    margin-bottom: rem(18px);
  }
  &__item-trigger {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: rem(29px);
    height: rem(29px);
    display: flex;
    align-items: center;
    justify-content: center;
    border: rem(3px) solid $red_font;
    border-radius: 50%;
    svg {
      width: rem(10px);
      height: rem(10px);
    }
    path {
      fill: $red_font;
      transition: 0.5s;
      ._pink & {
        fill: #fff;
      }
    }
    ._pink & {
      border-color: #fff;
    }
  }
  &__item-title {
    display: flex;
    padding-right: rem(45px);
    font-size: rem(18px);
    line-height: 1;
    font-family: "Bold";
    text-transform: none;
    transition: color 0.3s ease-in-out;
    span {
      display: inline-block;
      vertical-align: top;
    }
  }

  &__item-content {
    width: 90%;
    margin-bottom: rem(18px);
    font-size: rem(16px);
    text-transform: none;
    color: $red_font;
    ._pink & {
      color: #fff;
    }
  }
  @media (min-width: $sm) {
    padding-top: rem(85px);
    padding-bottom: rem(85px);
    &__item {
      padding: rem(50px) 0px rem(20px) 0px;
    }
    &__item-header,
    &__item-content {
      margin-bottom: rem(30px);
    }
    &__item-title {
      padding-right: rem(70px);
    }
    &__item-trigger {
      width: rem(58px);
      height: rem(58px);
      border-width: rem(6px);
      svg {
        width: rem(20px);
        height: rem(20px);
      }
    }
  }
  @media (min-width: $md) {
    padding-top: rem(100px);
    padding-bottom: rem(100px);
  }
}
</style>
<style lang="scss">
.link {
  color: $red_font;
  text-decoration: underline;
  ._pink & {
    color: #fff;
  }
}
</style>
