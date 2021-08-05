<template>
  <div id="app">
    <Header v-if="showHeader" />
    <div class="app-content">
      <router-view />
    </div>
    <Footer />
    <Feedback />
    <Authorization />
    <Signup :network="network" />
    <Recover />
    <SocSignup />
    <SuccessSignup />
    <SuccessRecover />
    <SuccessProfile />
    <SuccessProfileDelete />
    <SuccessCheck />
    <SuccessFeedback />
    <SendSmsModal />
    <EnterCode />
    <CommonError />
    <TemporarilyUnavailable />
    <Checks />
    <CheckPhoto />
    <Apmcheck v-if="this.apmInit"></Apmcheck>
  </div>
</template>
<script>
import Header from "@/components/AppHeader.vue";
import Footer from "@/components/AppFooter.vue";
import Feedback from "@/components/modals/feedback.vue";
import Authorization from "@/components/modals/authorization.vue";
import Signup from "@/components/modals/signup.vue";
import TemporarilyUnavailable from "@/components/modals/temporarilyUnavailable.vue";

//import AccessError from "@/components/modals/accessError.vue";
//import CameraAccess from "@/components/modals/cameraAccess.vue";
import SendSmsModal from "@/components/modals/sendSMS.vue";
import EnterCode from "@/components/modals/enterCode.vue";
import Checks from "@/components/modals/checks.vue";
import CheckPhoto from "@/components/modals/checkPhoto.vue";

import SuccessCheck from "@/components/modals/successCheck.vue";
import SuccessSignup from "@/components/modals/successSignup.vue";
import SuccessRecover from "@/components/modals/successRecover.vue";
import SuccessProfile from "@/components/modals/successProfile.vue";
import SuccessFeedback from "@/components/modals/successFeedback.vue";
import SuccessProfileDelete from "@/components/modals/successProfileDelete.vue";

//import UploadCheck from "@/components/modals/uploadCheck.vue";
import CommonError from "@/components/modals/commonError.vue";
import Recover from "@/components/modals/recover.vue";
import SocSignup from "@/components/modals/soc_signup.vue";

import Apmcheck from "@/components/Apmcheck.vue";

export default {
  components: {
    Header,
    Footer,
    Feedback,
    Authorization,
    Signup,
    //  AccessError,
    //	CameraAccess,
    SuccessCheck,
    SuccessSignup,
    SuccessRecover,
    SuccessProfile,
    SocSignup,
    SuccessFeedback,
    SuccessProfileDelete,
    //  UploadCheck,
    CommonError,
    Apmcheck,
    Recover,
    SendSmsModal,
    EnterCode,
    TemporarilyUnavailable,
    Checks,
    CheckPhoto,
  },
  data: function () {
    return {
      showHeader: true,
      apmInit: false,
      network: null,
    };
  },
  methods: {
    checkAuth(t) {
      if (this.$store.getters.token) {
        if (!this.$store.getters.user) {
          this.$store.dispatch("GetProfile").then((response) => {
            if (response.error != 0) {
              if (this.$route.path !== "/") {
                this.$router.push("/");
              }
            } else {
              setTimeout(function () {
                t.apmInit = true;
              }, 1000);
            }
          });
        }
      }
    },
  },
  mounted() {
    let t = this;

    this.$root.$on("onLogined", function () {
      t.apmInit = true;
    });
    clearImmediate;
    this.checkAuth(t);
  },
  watch: {
    $route(to, from) {
      document.title = to.meta.title || "";
      this.network = to.meta.network;
    },
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: "Light";
  src: url("./assets/fonts/AvenirNextCyr-Light.woff") format("woff"),
    url("./assets/fonts/AvenirNextCyr-Light.eot") format("eot"),
    url("./assets/fonts/AvenirNextCyr-Light.ttf") format("ttf");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "Bold";
  src: url("./assets/fonts/AvenirNextCyr-Bold.woff") format("woff"),
    url("./assets/fonts/AvenirNextCyr-Bold.eot") format("eot"),
    url("./assets/fonts/AvenirNextCyr-Bold.ttf") format("ttf");
  font-weight: normal;
  font-style: normal;
}

html {
  font-size: 16px;

  @media (min-width: $sm) {
    font-size: 16px;
  }
  @media (min-width: $md) {
    font-size: 16px;
  }
  @media (min-width: 1440px) {
    font-size: 18px;
  }
}

.app-content {
  flex: 1;
  z-index: 1;
  @media (min-width: 640px) {
    display: flex;

    & > div {
      flex: 1;
    }
  }
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: "Light";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  overflow-x: hidden;
  position: relative;
  min-width: 320px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
