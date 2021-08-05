<template>
  <div class="home">
    <Hero>
      <div class="hero__content">
        <div class="hero__title">
          ПОЗДРАВЬТЕ КАЖДОГО,<br />КТО НАУЧИЛ ВАЖНОМУ
        </div>
        <img
          src="../assets/images/hero/hero-1.png"
          srcset="
            ../assets/images/hero/hero-1.png,
            ../assets/images/hero/hero-1@2x.png 2x
          "
          alt=""
        />
        <div class="hero-nav-title">Выберите торговую сеть</div>
      </div>
      <div class="hero-nav">
        <router-link
          v-for="(item, idx) in heroNav"
          :key="idx"
          class="hero-nav__item"
          :class="item.path == 'Home' ? '_disabled' : ''"
          :to="{ name: item.path }"
        >
          <img
            class="hero-nav__img"
            :src="require(`../assets/images/hero/${item.logo}@2x.png`)"
            alt=""
          />
        </router-link>
      </div>
    </Hero>
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from "@/components/AppHero.vue";

export default {
  name: "Home",
  components: {
    Hero,
  },
  data: function () {
    return {
      heroNav: [
        {
          path: "Dixy",
          logo: "dixy",
        },
        {
          path: "Megamart",
          logo: "megamart",
        },
      ],
    };
  },
  mounted() {
    // this.$modal.show("signup");

    const params = this.$route.query;
    if (params.email === "0") {
      let socId =
        params.identity_vk || params.identity_fb || params.identity_ok || "";

      //console.log(socId);

      if (socId.length < 1) {
        this.$modal.show("common_error", {
          text: "Что-то пошло не так!",
        });
        this.$router.push("/");
      } else {
        this.$store.commit("SIGNUP_SOC_ID", socId);
        this.$modal.show("soc_signup");
        this.$router.push({ name: "Home" });
      }
    } else if (params.result === "1") {
      this.$store.commit("SET_TOKEN", params.auth_key);

      this.$store.dispatch("GetProfile").then(() => {
        this.$router.push("/account");
      });
    }
  },
  methods: {
    toCheckUpload() {
      let apmButton = document.querySelector("#apm-scan-qr .apm-action-button");
      apmButton.click();
      // this.$modal.show("temporarily_unavailable" );
    },
  },
  created() {},
};
</script>
<style lang="scss">
.home {
  .hero {
    &__title {
      margin-top: auto;
      margin-bottom: rem(48px);
    }
    &-nav {
      &__img {
        max-width: 70%;
        max-height: rem(11px);
        @media (min-width: $sm) {
          max-height: rem(34px);
        }
      }
    }
  }
}
</style>
