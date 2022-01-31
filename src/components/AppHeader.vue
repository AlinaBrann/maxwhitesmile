<template>
  <header class="header">
    <div class="container">
      <div class="header__row">
        <router-link :to="{ name: 'Home' }">
          <img
            src="@/assets/images/logo.png"
            class="header__logo _left"
            alt=""
          />
        </router-link>
        <div class="header__inner">
          <div class="header__hamburger" @click="showBurger()">
            <img
              src="../assets/images/hamburger_icon.svg"
              alt=""
              class="header__hamburger-pic"
            />
          </div>
          <div class="header__nav">
            <router-link
              class="header__nav-link"
              active-class="header__nav-link--active"
              :to="{ name: 'Home' }"
            >
              Об Акции
            </router-link>
            <a
              :href="`${publicPath}docs/rules.docx`"
              class="header__nav-link"
              active-class="header__nav-link--active"
            >
              Правила
            </a>
            <a
              href=""
              class="header__nav-link"
              active-class="header__nav-link--active"
              @click.prevent="uploadCheck()"
            >
              Загрузить чек
            </a>
            <router-link
              v-for="(item, idx) in navigation"
              :key="idx"
              class="header__nav-link"
              active-class="header__nav-link--active"
              :to="{ name: item.path }"
              v-html="item.name"
            >
            </router-link>

            <!-- <router-link
              class="header__nav-link"
              active-class="header__nav-link--active"
              to="/account"
              v-if="user"
            >
              Личный кабинет
            </router-link>
            <a
              class="header__nav-link"
              href="javascript:void(0)"
              @click="clickPrize()"
              v-else
              >Личный кабинет</a
            > -->
            <a
              v-if="user"
              href=""
              @click.prevent="logout()"
              class="header__nav-link _exit"
            ></a> 
          </div>
        </div>

        <div class="header__menu_mob">
          <button class="header__menu_mob-close" @click="showBurger()"></button>
          <router-link
            class="header__nav-link"
            active-class="header__nav-link--active"
            :to="{ name: 'Home' }"
          >
            Об Акции
          </router-link>
          <a
            :href="`${publicPath}docs/rules.docx`"
            class="header__nav-link"
            active-class="header__nav-link--active"
          >
            Правила
          </a>
          <a
            href="#"
            class="header__nav-link"
            active-class="header__nav-link--active"
            @click="uploadCheck(), showBurger()"
          >
            Загрузить чек
          </a>
          <router-link
            v-for="(item, idx) in navigation"
            :key="idx"
            class="header__nav-link"
            active-class="header__nav-link--active"
            @click.native="showBurger()"
            :to="{ name: item.path }"
            v-html="item.name"
          >
          </router-link>
          <a
            v-if="user"
            href=""
            @click.prevent="logout()"
            class="header__nav-link _exit"
          >Выйти</a> 
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      navigation: [
        {
          name: "Вопрос-ответ",
          path: "Faq",
        },
        {
          name: "Победители",
          path: "Winners",
        },
        {
          name: "Обратная связь",
          path: "Feedback",
        },
      ],
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    homePage() {
      if (this.$route.path === "/") {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
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

    showModal(name) {
      this.$modal.show(name);
    },
    logout() {
      this.$store.dispatch("LogOut");
      document.location.reload();
    },
    showBurger() {
      let header = document.querySelector(".header");
      if (!header.classList.contains("header--mob_active"))
        header.classList.add("header--mob_active");
      else header.classList.remove("header--mob_active");
    },
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
.header {
  position: relative;
  width: 100%;
  height: rem(40px);
  background: #ffffff;
  flex-shrink: 0;
  z-index: 999;
  .container {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
  }
  &__row {
    display: flex;
    align-items: center;
    width: 100%;
  }
  &.header--mob_active {
    .header__hamburger {
      opacity: 0;
      visibility: hidden;
    }

    .header__menu_mob {
      display: flex;
    }
  }
  &__logo {
    position: absolute;
    top: 0;
    height: rem(91px);
  }
  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: auto;
  }
  &__nav {
    position: relative;
    width: 100%;
    display: none;
    align-items: center;
  }

  &__nav-link {
    margin-bottom: rem(30px);
    font-size: rem(18px);
    line-height: 1.4;
    text-align: center;
    color: $grey;
    text-transform: uppercase;
    border-bottom: 1px solid transparent;
    transition: all 0.3s ease-in-out;

    &.router-link-exact-active {
      color: $red;
    }
  }

  &__nav-link:not(._exit):hover {
    color: $red;
  }
  &__nav-retail {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
  }
  &__nav-retail-img {
    max-height: rem(35px);
    margin-bottom: rem(30px);
  }
  &__hamburger {
    display: block;
    margin: auto 0 auto auto;
  }

  &__menu_mob {
    display: none;
    position: absolute;
    width: 100%;
    top: 0px;
    right: 0;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    padding-top: 0;
    padding-bottom: 60px;
    z-index: 10;
    .btn--default {
      background-color: transparent;
    }

    .btn {
      margin-bottom: 21px;
      min-width: 280px;
    }

    .btn:last-child {
      margin-top: 20px;
    }
  }

  &__menu_mob-close {
    cursor: pointer;
    align-self: flex-end;
    margin: rem(8px) rem(8px) rem(30px) 0;
    width: rem(34px);
    height: rem(34px);
    flex-shrink: 0;
    margin-bottom: rem(30px);
    background: #ffffff url("../assets/images/icons/close_icon.svg") no-repeat center;
    background-size: rem(16px);
  }
  @media (min-width: $sm) {
    height: rem(47px);
    &__logo {
      height: rem(107px);
    }
    &__nav {
      display: flex;
    }
    &__nav_mob {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &__hamburger,
    &__menu_mob {
      display: none;
    }
    &__nav-link {
      font-size: rem(12px);
      margin-left: rem(20px);
      margin-bottom: 0;
      line-height: 1.4;
      text-align: center;
      color: $grey;
      text-transform: none;
      border-bottom: 1px solid transparent;
      transition: all 0.3s ease-in-out;
      &._exit {
        width: rem(27px);
        height: rem(23px);
        margin-top: rem(3px);
        background: url("../assets/images/exit.svg") no-repeat center;
        background-size: contain;
      }
    }
  }
  @media (min-width: $md) {
    height: rem(117px);
    &__logo {
      height: rem(267px);
    }
    
    &__nav-link {
      font-size: rem(25px);
      margin-left: rem(20px);
      letter-spacing: rem(1px);
    }

    
  }
}

.header__menu_mob {
  display: none;
}

.header__menu_mob.active {
  display: flex !important;
}
</style>
