<template>
  <div class="profile account page">
    <div class="container">
      <div class="page__content _lg">
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
            <button class="btn btn--secondary" @click="showModalChecks()">
              Загруженные чеки
            </button>
          </div>
          <a
            href="#"
            @click.prevent="deleteProfile()"
            class="account__delete _outside-prizes"
            v-if="!prizes"
            >Удалить учетную запись</a
          >
        </div>
        <div class="account__header" v-if="!prizes">
          <h2 class="account__header-title-mt">У вас пока нет призов</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data: function () {
    return {
      name: null,
      lastname: null,
      phone: null,
      email: null,
      city: null,
      checks: [],
      prizes: [],
    };
  },

  methods: {
    toCheckUpload() {
      let apmButton = document.querySelector("#apm-scan-qr .apm-action-button");
      if (apmButton) apmButton.click();
      let $this = this;
      let modalTrigger = document.querySelector(".modal-trigger");
      modalTrigger.addEventListener("click", function (e) {
        e.preventDefault();
        $this.$modal.show("check_requirements");
      });
    },
    showModal(name) {
      this.$modal.show(name);
    },
    closeModal(name) {
      this.$modal.hide(name);
    },
    showModalChecks() {
      this.$modal.show("checks", { items: this.checks });
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
      // this.prizes = response.result.prize;
    });
    this.$store.dispatch("GetPrizes").then((response) => {
      this.prizes = response.result;
    });
    this.$store.dispatch("GetChecks").then((response) => {
      this.checks = response.result;
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
    color: $red;

    &-mt {
      font-family: "Bold";
      font-size: rem(24px);
      text-align: center;
      text-transform: uppercase;
      color: $red;
      z-index: -1;
      margin-top: rem(35px);
    }
  }
  &__back-to-home {
    display: flex;
    align-items: center;
    margin-bottom: rem(25px);
    color: $red;
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
      color: $red;
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
