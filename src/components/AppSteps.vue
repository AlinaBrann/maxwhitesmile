<template>
  <div class="steps" id="steps">
    <div class="steps__list">
      <div class="steps__item" v-for="(item, idx) in steps" :key="idx">
        <div class="steps__icon-wrapper">
          <img
            :src="require('../assets/images/icons/' + item.img)"
            alt=""
            class="steps__icon"
          />
        </div>
        <div 
          class="steps__item-title"  
          :class="{ 'hidden-xs': item.uploadCheck }"
          v-html="item.title">
        </div>
        <button 
          v-if="item.uploadCheck"
          class="hero__btn btn btn--primary visible-xs"
          @click="uploadCheck()"
        >
          Загрузить чек
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      publicPath: process.env.BASE_URL,
      steps: [
        {
          img: "tube.png",
          title: "<b>Купите <br>1&nbsp;продукт</b> от&nbsp;Colgate<sup>*</sup>",
        },
        {
          img: "world.png",
          title:
            "<b>Зарегистрируйте чек</b> <br>на&nbsp;сайте <a href='www.maxwhitesmile.ru' target='_blank'>www.maxwhitesmile.ru</a> ",
          uploadCheck: true
        },
        {
          img: "prize.png",
          title: "<b>Участвуйте <br>в&nbsp;розыгрыше</b> призов! ",
        },
      ],
    };
  },
  methods: {
    showModal(name) {
      this.$modal.show(name);
    },
    uploadCheck() {
      if (this.$store.getters.user) {
        let apmButton = document.querySelector(
          "#apm-scan-qr .apm-action-button"
        );
        if (apmButton) apmButton.click();
      } else {
        this.$modal.show("signup");
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.steps {
  position: relative;
  display: flex;
  width: 100%;
  // align-items: center;
  z-index: 2;
  &__list {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    margin: 0 auto;
  }

  &__item {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: rem(34px);
    color: #282828;
  }

  &__icon {
    height: 100%;
    object-fit: contain;
    &-wrapper {
      display: flex;
      justify-content: center;
      position: relative;
      width: rem(55px);
      height: rem(45px);
      margin-right: rem(17px);
      flex-shrink: 0;
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
    font-size: rem(19px);
    line-height: 1.1;
    b {
      font-family: "Bold";
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
    color: $red;
    font-size: rem(18px);
    line-height: rem(22px);
    border-bottom: 1px solid currentColor;
  }
  @media (min-width: $sm) {
    &__item {
      flex: 0;
      margin-bottom: 0;
    }
    &__list {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      width: 100%;
      padding-bottom: rem(70px);
      margin: 0 auto;
    }
    &__icon {
      &-wrapper {
        width: rem(32px);
      }
    }

  }
  @media (min-width: $md) {
    background: none;

    &__list {
      justify-content: space-around;
    }
    &__item {
      flex: auto;
      margin-bottom: 0;
    }
    &__item-title {
      font-size: rem(25px);
    }
    &__rules {
      margin-top: rem(5px);
    }
    &__icon {
      &-wrapper {
        width: auto;
      }
    }
  }
}
</style>
