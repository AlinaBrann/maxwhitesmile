<template>
  <div class="profile account">
    <div class="account__content">
      <div class="container">
        <router-link
          class="account__back-to-home visible-xs"
          :to="{ name: 'Home' }"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 7.72727L15 0V15L0 7.72727Z" fill="#A1224E" />
          </svg>
          На главную
        </router-link>
        <div class="account__header">
          <h2 class="account__header-title">личный кабинет</h2>
        </div>
        <div class="account__info">
          <div class="account__name">{{ lastname }} {{ name }}</div>
          <div class="account__row" v-if="phone">
            <span>Телефон: </span>
            <span>{{ phone }}</span>
          </div>
          <div class="account__row" v-if="email">
            <span>E-mail: </span>
            <span>{{ email }}</span>
          </div>
          <div class="account__row" v-if="city">
            <span>Город: </span>
            <span>{{ city }}</span>
          </div>
          <div class="account__footer">
            <button class="btn btn--primary" @click="toCheckUpload()">
              Зарегистрировать чек
            </button>
            <button class="btn btn--secondary" @click="showModal('checks')">
              Загруженные чеки
            </button>
          </div>
          <a href="#" @click.prevent="deleteProfile()" class="account__delete _outside-prizes" v-if="!prizes">Удалить учетную запись</a>
        </div>
      </div>
    </div>

    <PrizesBlock styleType="pink" title="Выигранные призы" v-if="prizes" :prizes="prizes">
      <a href="#" @click.prevent="deleteProfile()" class="account__delete">Удалить учетную запись</a>
    </PrizesBlock>
    
  </div>
</template>

<script>
import PrizesBlock from "@/components/AppPrizes.vue";

export default {
  components: {
    PrizesBlock,
  },
  data: function () {
    return {
      name: null,
      lastname: null,
      phone: null,
      email: null,
      city: null,
      prizes: [],
      prizesTest: [
        {
          img: "megamart.png",
          img2x: require("../../assets/images/prizes/megamart@2x.png"),
          text: "Сертификат в МЕГАМАРТ номиналом <span class='_accent'>500 рублей</span>",
        },
        {
          img: "yandex.png",
          img2x: require("../../assets/images/prizes/yandex@2x.png"),
          text: "Подписка «Яндекс Плюс» на <span class='_accent'>30 дней</span>",
        },
        {
          img: "prize_6.png",
          img2x: require("../../assets/images/prizes/prize_6@2x.png"),
          text: "Универсальный сертификат Giftery на&nbsp;<span class='_accent'>10&nbsp;000 рублей</span>",
        },
      ],
    };
  },

  methods: {
    toCheckUpload() {
      let apmButton = document.querySelector("#apm-scan-qr .apm-action-button");
      if (apmButton) apmButton.click();
    },
    showModal(name) {
      this.$modal.show(name);
    },
    closeModal(name) {
      this.$modal.hide(name);
    },

    logout() {
      this.$store.dispatch("LogOut");
      document.location.reload();
    },
    deleteProfile() {
      this.$store.dispatch("DeleteProfile").then(() => {
        this.$store.dispatch("LogOut");
        this.$modal.show("success_delete");
      });
      
    },
  },
  mounted() {
    this.$store.dispatch("GetProfile").then((response) => {
      // console.log(response);

      this.name = response.result.profile.name;
      this.lastname = response.result.profile.surname;
      this.phone = response.result.profile.phone;
      this.email = response.result.profile.email;
      this.password = response.result.profile.password;
      this.city = response.result.profile.city;
      this.countChecks = response.result.countChecks;
    });
    this.$store.dispatch("GetPrizes").then((response) => {
      this.prizes = response.result;
    });
  },
};
</script>

<style lang="scss" scoped>
.account {
  &__header-title {
    position: relative;
    margin-bottom: rem(35px);
    font-family: "Bold";
    font-size: rem(24px);
    text-align: center;
    text-transform: uppercase;
    color: $red_font;
    z-index: -1;
  }
  &__back-to-home {
    display: flex;
    align-items: center;
    margin-bottom: rem(25px);
    color: $red_font;
    font-family: "Bold";
    font-size: rem(14px);
    svg {
      margin-right: rem(8px);
    }
  }
  &__content {
    position: relative;
    padding-top: rem(70px);
    padding-bottom: rem(50px);
    min-height: calc(90vh);
    border-bottom: rem(3px) solid $yellow;
    z-index: 2;
    &:before {
      content: "";
      position: absolute;
      display: none;
      top: 80%;
      right: 4%;
      width: rem(280px);
      height: rem(280px);
      background: url("../../assets/images/steps/chocolate.png") no-repeat
        center;
      background-size: contain;
    }
  }
  &__info {
    text-align: center;
  }
  &__name {
    margin-bottom: rem(30px);
    font-family: "Bold";
    font-size: rem(18px);
    color: #4a3024;
  }
  &__row {
    margin-bottom: rem(20px);
    font-size: rem(18px);
  }
  &__footer {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: rem(50px);
    padding: 0 rem(35px);
    .btn {
      &:first-of-type {
        margin-bottom: rem(15px);
      }
    }
  }
  &__delete {
    &._outside-prizes {
      display: inline-block;
      margin-top: rem(30px);
      color: $red_font;
      border-bottom: 1px solid currentColor;
      &:hover {
        border-block-color: transparent;
      }
    }
  }
  @media (min-width: $sm) {
    &__header-title {
      margin-bottom: rem(50px);
      font-size: rem(28px);
    }
    &__content {
      min-height: auto;
      padding-top: rem(100px);
      padding-bottom: rem(78px);
      background: url("../../assets/images/steps/background.png") no-repeat
        center;
      background-size: 123%;
      &:before {
        display: block;
      }
    }
    &__name {
      margin-bottom: rem(35px);
    }
    &__footer {
      flex-direction: row;
      padding: 0;
      .btn {
        &:first-of-type {
          margin-bottom: 0;
          margin-right: rem(50px);
        }
      }
    }
  }
  @media (min-width: $md) {
    &__content {
      padding-top: rem(170px);
      padding-bottom: rem(100px);
    }
  }
}
</style>
