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
              v-for="(item, idx) in navigation"
              :key="idx"
              class="header__nav-link"
              active-class="header__nav-link--active"
              :to="{ name: item.path }"
              v-html="item.name"
            >
            </router-link>

            <a
              href="#"
              class="header__nav-link"
              active-class="header__nav-link--active"
              @click="showModal('feedback')"
            >
              Обратная связь
            </a>
            <router-link
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
              @click="showModal('authorization')"
              v-else
              >Личный кабинет</a
            >
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
            v-for="(item, idx) in navigation"
            :key="idx"
            class="header__nav-link"
            active-class="header__nav-link--active"
            @click.native="showBurger()"
            :to="{ name: item.path }"
            v-html="item.name"
          >
          </router-link>
          <div class="header__nav-retail">
            <router-link
              v-for="(item, i) in retailsNav"
              :key="i + 1"
              class="header__nav-retail-item"
              :to="{ name: item.path }"
            >
              <img
                class="header__nav-retail-img"
                :src="require(`../assets/images/hero/${item.logo}@2x.png`)"
                alt=""
              />
            </router-link>
          </div>
          <a
            href="#"
            class="header__nav-link"
            active-class="header__nav-link--active"
            @click="showModal('feedback'), showBurger()"
          >
            Обратная связь
          </a>
          <router-link
            class="header__nav-link"
            active-class="header__nav-link--active"
            to="/account"
            @click.native="showBurger()"
            v-if="user"
          >
            Личный кабинет
          </router-link>
          <a
            class="header__nav-link"
            href="javascript:void(0)"
            @click="showModal('authorization')"
            v-else
            >Личный кабинет</a
          >
          <a
            v-if="user"
            href=""
            @click.prevent="logout()"
            class="header__nav-link _exit"
            >Выход</a
          >
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      navigation: [
        {
          name: "Главная",
          path: "Home",
        },
      ],
      retailsNav: [
        {
          path: "/",
          logo: "pyaterochka",
        },
        {
          path: "Dixy",
          logo: "dixy",
        },
        {
          path: "Megamart",
          logo: "megamart",
        },
        {
          path: "/",
          logo: "viktoria",
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
    clickPrize() {
      if (this.$store.getters.user) {
        let apmButton = document.querySelector(
          "#apm-scan-qr .apm-action-button"
        );
        if (apmButton) apmButton.click();
      } else {
        this.$modal.show("authorization");
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
    toCheckUpload() {
      if (this.$store.getters.user) {
        let apmButton = document.querySelector(
          "#apm-scan-qr .apm-action-button"
        );
        if (apmButton) apmButton.click();
      } else {
        this.$modal.show("authorization");
      }
    },
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0px;
  left: 0;
  width: 100%;
  background: #ffffff;
  z-index: 999;
  .container {
    position: relative;
    padding-top: rem(17px);
    padding-bottom: rem(17px);
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
    height: rem(21px);
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
    color: #000;
    text-transform: uppercase;
    border-bottom: 1px solid transparent;
    transition: all 0.3s ease-in-out;

    &.router-link-exact-active {
      border-bottom-color: currentColor;
    }
  }

  &__nav-link:not(._exit):hover {
    border-bottom-color: currentColor;
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
    background: #ffffff url("../assets/images/close_icon.svg") no-repeat center;
    background-size: rem(16px);
  }
  @media (min-width: $sm) {
    &__logo {
      height: rem(38px);
    }
    &__menu_mob {
      max-width: 45%;
      box-shadow: -5px 4px 10px rgba(0, 0, 0, 0.15);
    }
  }
  @media (min-width: $md) {
    &__logo {
      height: rem(35px);
    }
    &__nav {
      display: flex;
    }
    &__nav-link {
      font-size: rem(16px);
      margin-left: rem(34px);
      margin-bottom: 0;
      line-height: 1.4;
      text-align: center;
      color: #a1224e;
      text-transform: none;
      border-bottom: 1px solid transparent;
      transition: all 0.3s ease-in-out;
      &._exit {
        width: rem(27px);
        height: rem(23px);
        background: url("../assets/images/exit.svg") no-repeat center;
        background-size: contain;
      }
    }
    .container {
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
  }
}

.header__menu_mob {
  display: none;
}

.header__menu_mob.active {
  display: flex !important;
}
</style>
