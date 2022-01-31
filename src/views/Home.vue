<template>
  <div class="hero">
    <div class="container">
      <div class="hero__content">
        <div class="hero__col">
          <h1 class="hero__title">Максимум твоей <br />улыбки</h1>
          <div class="hero__row _aife">
            <img
              src="../assets/images/hero/products.png"
              alt=""
              class="hero__products"
            />
            <button 
              class="hero__btn btn btn--bordered hidden-xs"
              @click="uploadCheck()"
            >
              Загрузить чек
            </button>
          </div>
          <AppSteps />
        </div>
        <div class="hero__col">
          <AppPrizes />
        </div>
      </div>
      <div class="hero__footer">
        <a 
          :href="`${publicPath}docs/rules.docx`" 
          class="hero__rules _red"
          target="_blank"
          >Скачать полные правила акции</a
        >
        <div class="hero__footer-text">
          Общий срок проведения акции с&nbsp;1&nbsp;февраля 2022 года
          по&nbsp;30&nbsp;апреля 2022&nbsp;года, включая период совершения
          покупок с&nbsp;1&nbsp;февраля 2022 года по&nbsp;31&nbsp;марта
          2022&nbsp;года. Организатор акции&nbsp;&mdash; ООО &laquo;Дэйли
          Партнерс.&raquo; <br />Информация об&nbsp;организаторе акции,
          о&nbsp;правилах ее&nbsp;проведения, сроках, количестве призов, месте
          и&nbsp;порядке их&nbsp;получения размещена на&nbsp;сайте
          <a href="www.maxwhitesmile.ru" target="_blank"
            >www.maxwhitesmile.ru</a
          >
          Количество призов ограничено. <br />*В&nbsp;промо акции участвует
          ограниченный ассортимент товаров Colgate, подробный перечень указан
          в&nbsp;правилах акции.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppSteps from "@/components/AppSteps.vue";
import AppPrizes from "@/components/AppPrizes.vue";
export default {
  name: "Home",
  components: {
    AppSteps,
    AppPrizes,
  },
  data: () => ({
    publicPath: process.env.BASE_URL,
  }),
  methods: {
    showModal(name) {
      this.$modal.show(name);
    },
    uploadCheck() {
      if (localStorage.getItem('uuid') != null) {
        let apmButton = document.querySelector(
          "#apm-scan-qr .apm-action-button"
        );
        if (apmButton) apmButton.click();
      } else {
        this.$modal.show("signup");
      }
    },
  },
  mounted() {
    // this.toCheckUpload()
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
    center top rem(-30px);
  background-size: 100%;
  .container {
    position: relative;
    padding-bottom: rem(18px);
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-top: rem(70px);
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
    width: 50%;
    font-size: rem(25px);
    line-height: 1.1;
    text-align: left;
    font-family: "Bold";
    text-shadow: 0 0 rem(20px) #fff, 0 0px rem(20px) #fff, 0 0px rem(50px) #fff,
      0 0px rem(70px) #fff;
    color: $red;
  }
  &__products {
    margin-top: rem(180px);
  }
  &__text {
    margin: rem(10px) auto;
    font-size: rem(16px);
    text-align: center;
    text-transform: uppercase;
    line-height: rem(19px);
    color: #fff;
  }
  &__footer {
    position: relative;
    z-index: 10;
    &-text {
      font-size: rem(10px);
      line-height: rem(10px);
    }
  }
  &__rules {
    position: relative;
    display: inline-block;
    margin-left: rem(30px);
    margin-bottom: rem(10px);
    font-family: "Bold";
    font-size: rem(18px);
    &::before {
      content: "";
      position: absolute;
      top: rem(4px);
      left: rem(-30px);
      width: rem(22px);
      height: rem(22px);
      background: url("../assets/images/icons/download.png") no-repeat center;
      background-size: contain;
    }
  }
  @media (min-width: $sm) {
    background-position: center top rem(-100px);
    .container {
      padding-bottom: rem(70px);
    }
    &__title {
      width: 40%;
      font-size: rem(58px);
    }
    &__col {
      width: 100%;
      flex: 0 0 100%;
    }
    &__row {
      margin: auto;
    }
    &__products {
      margin: rem(315px) auto 0;
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
    &__rules {
      margin-bottom: rem(10px);
      font-size: rem(23px);
      &::before {
        top: rem(9px);
      }
    }
    &__footer {
      &-text {
        font-size: rem(13px);
        line-height: rem(16px);
      }
    }
  }
  @media (min-width: $md) {
    background-image: url("../assets/images/hero/background-desktop.png");
    background-position: center top rem(-130px);
    background-size: 100%;
    .container {
      align-items: center;
    }
    &__row {
      max-width: 100%;
    }
    &__title {
      width: auto;
      text-align: left;
      font-size: rem(75px);
      line-height: rem(65px);
    }
    &__products {
      margin-top: rem(-30px);
      height: rem(442px);
    }
    &__content {
      flex-direction: row;
      padding-top: rem(170px);
    }
    &__row {
      flex-direction: row;
      justify-content: space-between;
    }
    &__col {
      flex: auto;
      width: auto;
    }
    &__btn {
      margin-bottom: rem(50px);
      margin-left: rem(20px);
      margin-right: auto;
    }
    &__rules {
      margin-bottom: rem(10px);
      font-size: rem(18px);
      &::before {
        top: rem(4px);
      }
    }
    &__footer {
      margin-top: rem(-40px);
      &-text {
        font-size: rem(10px);
        line-height: rem(10px);
      }
    }
  }
  @media (max-width: $xlg) {
  }
}
</style>
